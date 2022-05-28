'use strict';

const debug = require('../lib/debug');

const {
  _isBasicType
} = require('../lib/helper');

const {
  AnnotationItem,
  PropItem,
} = require('../langs/common/items');

const {
  //   Symbol,
  Modify,
  //   Exceptions,
  //   Types
} = require('../langs/common/enum');

const DSL = require('@darabonba/parser');

class BaseResolver {
  constructor(astNode, combinator, globalAst) {
    this.ast = astNode;
    this.combinator = combinator;
    this.config = combinator.config;

    this.comments = globalAst.comments ? globalAst.comments : {};
    this.commentsSet = [];
  }

  resolveAnnotations(annotations, belong) {
    if (annotations.length > 0) {
      let comments = [];
      annotations.forEach(annotation => {
        comments.push(this.resolveAnnotation(annotation, belong));
      });
      return comments;
    }
    return [];
  }

  resolveAnnotation(annotation, belong) {
    let type = annotation.value.indexOf('/**') === 0 ? 'multi' : 'single';
    let content = '';
    if (type === 'multi') {
      content = annotation.value.substring(3, annotation.value.length - 2)
        .trim().split('\n').filter(c => c.length > 0).map(c => {
          if (c.indexOf(' * ') === 0) {
            return c.substring(3);
          } else if (c.indexOf('* ') === 0) {
            return c.substring(2);
          }
          return c;
        });
    } else {
      content = annotation.value.substring(2).trim();
    }
    return new AnnotationItem(belong, type, content);
  }

  getBackComments(index) {
    return DSL.comment.getBackComments(this.comments, index);
  }

  getBetweenComments(begin, end) {
    return DSL.comment.getBetweenComments(this.comments, begin, end);
  }

  getFrontComments(index) {
    return DSL.comment.getFrontComments(this.comments, index);
  }

  getComments(node, position = 'front') {
    if (typeof node.tokenRange === 'undefined') {
      return [];
    }
    switch (position) {
    case 'back':
      return this.getBackComments(node.tokenRange[1]);
    case 'between':
      return this.getBetweenComments(node.tokenRange[0], node.tokenRange[1]);
    default:
      return this.getFrontComments(node.tokenRange[0]);
    }
  }

  addAnnotations(obj, node, position = 'front') {
    let comments = this.getComments(node, position);
    if (comments.length > 0) {
      comments.forEach(c => {
        if (this.commentsSet.indexOf(c.index) < 0) {
          if (typeof obj.annotations !== 'undefined') {
            obj.annotations.push(this.resolveAnnotation(c, obj.index));
          } else {
            debug.stack(obj, node);
          }
          this.commentsSet.push(c.index);
        }
      });
    }
  }

  findComments(obj, node, position = 'front') {
    let comments = this.getComments(node, position);

    if (comments.length > 0) {
      comments.forEach(c => {
        if (this.commentsSet.indexOf(c.index) < 0) {
          if (typeof obj.body !== 'undefined') {
            obj.body.push(this.resolveAnnotation(c, obj.index));
          } else if (typeof obj.value !== 'undefined') {
            obj.value.push(this.resolveAnnotation(c, obj.index));
          } else {
            debug.stack('Invalid data node', obj, node);
          }
          this.commentsSet.push(c.index);
        }
      });
    }
  }

  initAnnotation(annotation) {
    let topComments = this.getFrontComments(annotation.index);
    topComments.map(c => {
      this.object.topAnnotation.push(this.resolveAnnotation(c, this.object.index));
    });
    if (annotation && annotation.value) {
      this.object.annotations.push(this.resolveAnnotation(annotation, this.object.index));
    }
  }

  resolveProps(ast) {
    this.comments = ast.comments;
    ast.moduleBody.nodes.filter((item) => {
      return item.type === 'type';
    }).forEach(item => {
      const prop = new PropItem();
      prop.name = item.vid.lexeme.replace('@', '_');
      prop.type = this.resolveType(item.value, item);
      prop.addModify(Modify.protected());
      if (item.tokenRange) {
        let comments = this.getFrontComments(item.tokenRange[0]);
        if (comments.length > 0) {
          comments.forEach(c => {
            this.object.addBodyNode(this.resolveAnnotation(c, this.object.index));
          });
        }
      }
      this.object.addBodyNode(prop);
    });
  }

  resolveType(typeNode, sourceNode, prop) {
    let typeInfo = {objectType: 'module'};
    if (typeNode.idType) {
      if (typeNode.idType === 'model') {
        typeInfo['objectType'] = 'model';
        typeInfo['lexeme'] = this.combinator.addModelInclude(typeNode.lexeme);
        return typeInfo;
      } else if (typeNode.idType === 'module') {
        typeInfo['lexeme'] = this.combinator.addInclude(typeNode.lexeme);
        return typeInfo;
      } else if (typeNode.idType === 'typedef') {
        typeInfo['lexeme'] = this.combinator.addTypedefInclude(typeNode.lexeme);
        return typeInfo;
      } else if (typeNode.idType === 'builtin_model') {
        typeInfo['objectType'] = 'builtin_model';
        return this.combinator.addInclude(typeNode.lexeme);
      }
      debug.stack(typeNode, sourceNode);
    } else if (typeNode.type) {
      if (typeNode.type === 'fieldType') {
        return this.resolveType(typeNode.fieldType, typeNode);
      } else if (typeNode.type === 'modelBody') {
        // is sub model
        typeInfo['objectType'] = 'model';
        typeInfo['lexeme'] = this.combinator.addModelInclude([this.object.name, sourceNode.fieldName.lexeme].join('.'));
        return typeInfo;
      } else if (_isBasicType(typeNode.type)) {
        return this.resolveType(typeNode.type, typeNode);
      } else if (typeNode.type === 'basic') {
        return this.resolveType(typeNode.name, sourceNode);
      } else if (typeNode.type === 'model') {
        let name = typeNode.name;
        if (typeNode.moduleName) {
          name = typeNode.moduleName + '.' + name;
        }
        typeInfo['objectType'] = 'model';
        typeInfo['lexeme'] = this.combinator.addModelInclude(name);
        return typeInfo;
      } else if (typeNode.type === 'module_instance') {
        typeInfo['lexeme'] = this.combinator.addInclude(typeNode.name);
        return typeInfo;
      } else if (typeNode.type === 'param') {
        if (typeNode.paramType.idType) {
          typeInfo['objectType'] = 'model';
          typeInfo['lexeme'] = this.combinator.addModelInclude(typeNode.paramType.lexeme);
          return typeInfo;
        }
        return this.resolveType(typeNode.paramType, typeNode);
      } else if (typeNode.type === 'array') {
        const subType = typeNode.subType ? typeNode.subType : typeNode.itemType;
        const arrayType = {
          lexeme: 'array',
          objectType: 'array',
          itemType: this.resolveType(subType)
        };
        return arrayType;
      } else if (typeNode.type === 'moduleModel') {
        let tmp = [];
        typeNode.path.forEach(item => {
          tmp.push(item.lexeme);
        });
        typeInfo['objectType'] = 'model';
        typeInfo['lexeme'] = this.combinator.addModelInclude(tmp.join('.'));
        return typeInfo;
      } else if (typeNode.type === 'moduleTypedef') {
        let tmp = [];
        typeNode.path.forEach(item => {
          tmp.push(item.lexeme);
        });
        typeInfo['lexeme'] = this.combinator.addTypedefInclude(tmp.join('.'));
        return typeInfo;
      } else if (typeNode.type === 'subModel') {
        let tmp = [];
        typeNode.path.forEach(item => {
          tmp.push(item.lexeme);
        });
        typeInfo['objectType'] = 'model';
        typeInfo['lexeme'] = this.combinator.addModelInclude(tmp.join('.'));
        return typeInfo;
      }
      debug.stack(typeNode, sourceNode);
    } else if (typeNode.lexeme) {
      return this.resolveType(typeNode.lexeme, sourceNode);
    } else if (typeNode === 'array') {
      let itemType;
      if (sourceNode.fieldItemType.type === 'modelBody') {
        typeInfo['objectType'] = 'model';
        typeInfo['lexeme'] = this.combinator.addModelInclude(sourceNode.itemType);
        itemType = typeInfo;
      } else if (sourceNode.fieldItemType.idType === 'model') {
        typeInfo['objectType'] = 'model';
        typeInfo['lexeme'] = this.combinator.addModelInclude(sourceNode.fieldItemType.lexeme);
        itemType = typeInfo;
      } else {
        itemType = this.resolveType(sourceNode.fieldItemType, sourceNode);
      }
      const arrayType = {
        lexeme: 'array',
        objectType: 'array',
        itemType: itemType
      };
      return arrayType;
    } else if (typeNode === 'map') {
      const keyType = this.resolveType(sourceNode.keyType);
      const valType = this.resolveType(sourceNode.valueType);
      const mapType = {
        lexeme: 'map',
        objectType: 'map',
        keyType: keyType,
        valType: valType
      };
      return mapType;
    } else if (typeNode) {
      return typeNode;
    }

    if (typeof typeNode === 'string' && typeNode.length > 0) {
      typeInfo['objectType'] = 'model';
      typeInfo['lexeme'] = this.combinator.addModelInclude(typeNode);
      return typeInfo;
    }
    debug.stack('Unsupported type node', { typeNode, sourceNode });
  }
}

module.exports = BaseResolver;