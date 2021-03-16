'use strict';

const assert = require('assert');
const debug = require('../../lib/debug');
const CombinatorBase = require('../common/combinator');
const Emitter = require('../../lib/emitter');
const PackageInfo = require('./package_info');

const {
  Symbol,
} = require('../common/enum');

const {
  AnnotationItem,
  ConstructItem,
  FuncItem,
  PropItem,

  GrammerVar,
  GrammerCall,
  GrammerCatch,
  GrammerValue,
  BehaviorToMap,
} = require('../common/items');

const {
  _isBasicType,
  _upperFirst,
  _config,
  _convertStaticParam,
  _toSnakeCase,
  _toCamelCase,
  _avoidKeywords,
  _isKeywords,
  _exception,
  _symbol,
  _deepClone,
  _isSnakeCase
} = require('../../lib/helper');


function _name(name) {
  return _avoidKeywords(_toSnakeCase(name));
}

function _type(type) {
  const config = _config();
  let t = type instanceof Object ? type.lexeme : type;
  if (t) {
    if (config.typeMap[t]) {
      return config.typeMap[t];
    }
    if (t.indexOf('map[') === 0) {
      return 'dict';
    }
    if (!_isBasicType(t)) {
      return t;
    }
    if (t[0] === '$') {
      t = t.replace('$', 'Tea');
    }
  }
  return t;
}

class Combinator extends CombinatorBase {
  constructor(config, imports) {
    super(config, imports);
    this.eol = '';
    this.clientMap = {};
    if (this.config.modelDirName) {
      this.config.model.dir = this.config.modelDirName;
    }

    // Darafile: name (Tea Package name)
    if (!_isSnakeCase(this.config.package)) {
      debug.stack('python package name is must be snake case, Example: alibabacloud_tea.');
    }
  }

  addInclude(className, fromPackage) {
    let importName = '';
    let fromName = '';
    let needAlias = false;
    let alias = '';

    if (className.indexOf('$') > -1) {
      let coreClassName = this.coreClass(className);
      let coreNamespl = coreClassName.split('.');
      importName = coreNamespl[coreNamespl.length - 1];
      coreNamespl.splice(coreNamespl.length - 1, 1);
      fromName = coreNamespl.join('.');
    }

    if (this.thirdPackageNamespace[className]) {
      // is third package
      importName = _toCamelCase(this.thirdPackageClient[className]);
      fromName = this.thirdPackageNamespace[className] + '.' + this.thirdPackageClient[className];

      if (importName === _toCamelCase(this.config.client.defaultName)) {
        needAlias = true;
      }

      this.includeList.forEach(item => {
        if (item.alias) {
          if (item.alias === importName) {
            needAlias = true;
          }
        } else {
          if (item.import === importName && item.from !== fromName) {
            needAlias = true;
          }
        }
      });

      if (needAlias === true) {
        className = className.replace(/[^a-zA-Z0-9_]/, '');
        // import classname as classname
        if (/^[A-Z]+$/.test(importName[0])) {
          alias = className + importName;
        } else {
          alias = _toSnakeCase(className) + '_' + importName;
        }
      }
    }

    if (fromPackage) {
      fromName = fromPackage;
    }

    let existResult = this.includeList.some(item => item.import === importName && item.from === fromName);

    if (!existResult) {
      this.includeList.push({
        'from': fromName,
        'import': importName,
        'alias': alias,
      });
    }

    let packageName = '';
    if (alias) {
      packageName = alias;
    } else {
      packageName = importName;
    }

    this.clientMap[packageName] = this.thirdPackageClient[className];
    return packageName;
  }

  addModelInclude(modelName) {
    let accessPath = modelName.split('.');
    let importName = '';
    let fromName = '';
    let resultName = '';
    let alias = '';

    if (modelName.indexOf('$') > -1) {
      let coreModelName = this.coreClass(modelName);
      let coreNamespl = coreModelName.split('.');
      importName = coreNamespl[coreNamespl.length - 1];
      coreNamespl.splice(coreNamespl.length - 1, 1);
      fromName = coreNamespl.join('.');
      resultName = fromName.split('.').join('_') + '_' + importName + '.' + modelName.split('.').join('');
    } else if (accessPath.length > 1 && this.thirdPackageNamespace[accessPath[0]]) {
      // is third package
      importName = 'models';
      fromName = this.thirdPackageNamespace[accessPath[0]];
      const className = accessPath[0].replace(/[^a-zA-Z0-9_]/, '');
      alias = _toSnakeCase(className) + '_models';
      resultName = alias + '.' + accessPath.slice(1).map(item => _upperFirst(item)).join('');
    } else {
      // self model
      fromName = this.config.package;
      importName = 'models';
      if (this.config.emitType === 'model') {
        resultName = modelName.split('.').map(m => _upperFirst(m)).join('');
        return resultName;
      }
      alias = _toSnakeCase(this.config.name) + '_' + importName;
      resultName = alias + '.' + modelName.split('.').map(m => _upperFirst(m)).join('');
    }

    let existResult = this.includeList.some(item => {
      if (item.import === importName && item.from === fromName) {
        return true;
      }
    });

    if (!existResult) {
      this.includeList.push({
        'from': fromName,
        'import': importName,
        'alias': alias,
      });
    }
    return resultName;
  }

  combine(objectArr = []) {
    super.combine(objectArr);
    this.config.dir = this.config.outputDir + '/' + this.config.package + '/';
    const [clientObjectItem] = objectArr.filter(obj => obj.type === 'client');
    this.combineClient(clientObjectItem);
    this.includeList = [];
    const models = objectArr.filter(obj => obj.type === 'model');
    if (models.length > 0) {
      this.combineModel(models);
    }
  }

  checkSyntax(content, emitter) {
    const includeList = this.includeList;
    includeList.forEach(i => {
      let importName = i.import;
      if (i.alias) {
        importName = i.alias;
      }

      const re = new RegExp(importName);
      const ignoreModule = ['sys', 'unicode_literals'];
      if (!re.test(content) && ignoreModule.indexOf(importName) === -1) {
        this.includeList.splice(this.includeList.indexOf(i), 1);
      }
    });

    let contentLine = content.split(emitter.eol);
    contentLine.forEach((l, index) => {
      const symbol = ['+', '-', '=', '*', '/', '%'];
      l = l.replace(/(\s*$)/g, '');
      if (symbol.indexOf(l[l.length - 1]) > -1) {
        contentLine[index] = `${l}\\`;
      }
    });
    return contentLine.join(emitter.eol);
  }

  combineClient(object) {
    this.config.emitType = 'client';
    this.includeList = object.includeList;
    if (this.config.packageInfo) {
      const packageInfo = new PackageInfo(this.config);
      packageInfo.emit(this.config.packageInfo, this.requirePackage);
    }
    let emitter, outputParts = {
      head: '',
      body: '',
      foot: ''
    };
    // generate __init__.py
    emitter = new Emitter(this.config);
    emitter.config.filename = '__init__';
    emitter.emitln('__version__ = "1.0.0"');
    emitter.save();
    /******************************** emit foot ********************************/
    if (this.config.exec) {
      emitter = new Emitter(this.config);
      this.emitExec(emitter);
      outputParts.foot = emitter.output;
    }
    /******************************** emit body ********************************/
    emitter = new Emitter(this.config);

    this.emitClass(emitter, object);
    
    outputParts.body = this.checkSyntax(emitter.output, emitter);
    /******************************** emit head *******************************/
    emitter = new Emitter(this.config);
    emitter.emitln('# -*- coding: utf-8 -*-');
    if (object.topAnnotation.length > 0) {
      this.emitAnnotations(emitter, object.topAnnotation);
    }

    this.emitInclude(emitter);
    outputParts.head = emitter.output;

    /***************************** combine output ******************************/
    const config = _deepClone(this.config);
    if (_isSnakeCase(this.config.clientName)) {
      config.filename = this.config.clientName;
    } else {
      debug.stack('python clientName is must be snake case, Example: rpc_client.');
    }

    this.combineOutputParts(config, outputParts);
  }

  combineModel(models) {
    this.config.emitType = 'model';
    let emitter, outputParts = {
      head: '',
      body: '',
      foot: ''
    };
    let includeSet = [];
    // merge includeList
    models.forEach(object => {
      object.includeList.forEach(include => {
        let key = `${include.import}:${include.from}`;
        if (includeSet.indexOf(key) === -1) {
          this.includeList.push(include);
          includeSet.push(key);
        }
      });

      object.subObject.forEach(subObject => {
        subObject.includeList.forEach(include => {
          let key = `${include.import}:${include.from}`;
          if (includeSet.indexOf(key) === -1) {
            this.includeList.push(include);
            includeSet.push(key);
          }
        });
      });
    });
    /******************************** emit body ********************************/
    emitter = new Emitter(this.config);
    models.forEach((object, i) => {
      if (object.subObject && object.subObject.length > 0) {
        object.subObject.forEach((obj, j) => {
          this.emitClass(emitter, obj);
          emitter.emitln().emitln();
        });
      }
      this.emitClass(emitter, object);
      emitter.emitln().emitln();
    });
    outputParts.body = this.checkSyntax(emitter.output, emitter);

    /******************************** emit head ********************************/
    emitter = new Emitter(this.config);
    emitter.emitln('# -*- coding: utf-8 -*-');
    for (let i = 0; i < models.length; i++) {
      if (models[0].topAnnotation) {
        this.emitAnnotations(emitter, models[0].topAnnotation);
        break;
      }
    }

    this.emitInclude(emitter);
    outputParts.head = emitter.output;

    /***************************** combine output ******************************/
    const config = _deepClone(this.config);
    config.layer = '';
    config.filename = 'models';
    this.combineOutputParts(config, outputParts);
  }

  getClassName(name) {
    let className = name;
    if (this.config.emitType === 'client') {
      className = this.config.clientName;
    } else {
      className = name.split('.').map(item => _upperFirst(item)).join('');
    }
    if (_isKeywords(className)) {
      className = _avoidKeywords(className);
    }
    return _toCamelCase(className);
  }

  emitClass(emitter, object) {
    var parent = '';
    let className = this.getClassName(object.name);

    let tmp = [];
    if (!(object.extends instanceof Array)) {
      object.extends = [object.extends];
    }

    object.extends.forEach(baseClass => {
      tmp.push(baseClass);
    });
    if (tmp.length > 0) {
      parent = '(' + tmp.join(', ') + ')';
    } else {
      parent = '(object)';
    }

    emitter.emitln(`class ${className}${parent}:`, this.level);

    this.levelUp();
    if (object.annotations.length > 0) {
      this.emitAnnotations(emitter, object.annotations);
    }
    const notes = this.resolveNotes(object.body);
    if (Object.keys(notes).length > 0) {
      this.emitNotes(emitter, notes);
    }
    let props = object.body.filter(node => node instanceof PropItem);
    let propItems = object.body.filter(node => node instanceof PropItem || node instanceof AnnotationItem);

    if (object.body.filter(node => node instanceof ConstructItem).length === 0) {
      object.body.unshift(new ConstructItem());
    }

    // emit body nodes : PropItem | FuncItem | ConstructItem | AnnotationItem
    object.body.forEach(node => {
      if (node instanceof FuncItem) {
        this.emitFunc(emitter, node);
      } else if (node instanceof ConstructItem) {
        if (this.config.emitType === 'model') {
          this.emitConstruct(emitter, node, propItems, false);
        } else if (this.config.emitType === 'client') {
          if (propItems.length > 0) {
            // emit @type
            propItems.forEach(p => {
              if (p instanceof AnnotationItem) {
                this.emitAnnotation(emitter, p);
              } else if (p instanceof PropItem) {
                const type = this.typeHint(p.type);
                if (type) {
                  emitter.emitln(`${_name(p.name)} = None  # type: ${type}`, this.level);
                }
              }
            });
            emitter.emitln();
          }
          this.emitConstruct(emitter, node, [], true);
        }
      }
    });

    if (this.config.emitType === 'model') {
      this.emitValidate(emitter, className, props, notes);
      this.emitToMap(emitter, className, props, notes);
      this.emitFromMap(emitter, className, props, notes);
    }
    this.levelDown();
  }

  emitComplexValidate(emitter, name, fieldType, depth) {
    if (fieldType.objectType) {
      if (fieldType.objectType === 'array') {
        if (depth > 0) {
          emitter.emitln(`for k${depth} in ${name}:`, this.level);
          this.levelUp();
          this.emitComplexValidate(emitter, `k${depth}`, fieldType.itemType, depth + 1);
          this.levelDown();
        } else {
          emitter.emitln(`if self.${_name(name)}:`, this.level);
          this.levelUp();
          emitter.emitln(`for k in self.${_name(name)}:`, this.level);
          this.levelUp();
          this.emitComplexValidate(emitter, 'k', fieldType.itemType, depth + 1);
          this.levelDown();
          this.levelDown();
        }
      } else if (fieldType.objectType === 'map') {
        if (depth > 0) {
          emitter.emitln(`for v${depth} in ${name}.values():`, this.level);
          this.levelUp();
          this.emitComplexValidate(emitter, `v${depth}`, fieldType.valType, depth + 1);
          this.levelDown();
        } else {
          emitter.emitln(`if self.${_name(name)}:`, this.level);
          this.levelUp();
          emitter.emitln(`for v in self.${_name(name)}.values():`, this.level);
          this.levelUp();
          this.emitComplexValidate(emitter, 'v', fieldType.valType, depth + 1);
          this.levelDown();
          this.levelDown();
        }
      } else if (fieldType.objectType === 'model') {
        emitter.emitln(`if ${name}:`, this.level);
        this.levelUp();
        emitter.emitln(`${name}.validate()`, this.level);
        this.levelDown();
        emitter.needSave = true;
      }
    }
  }

  emitValidate(emitter, className, props, notes) {
    //print validate
    emitter.emitln('');
    emitter.emitln('def validate(self):', this.level);
    this.levelUp();
    let haveValidate = false;
    props.forEach(prop => {

      let required = prop.notes.filter(item => item.key === 'required');
      let maxLength = prop.notes.filter(item => item.key === 'maxLength');
      let pattern = prop.notes.filter(item => item.key === 'pattern');
      let maximum = prop.notes.filter(item => item.key === 'maximum');
      let minimum = prop.notes.filter(item => item.key === 'minimum');

      if (required.length > 0) {
        emitter.emitln(
          `self.validate_required(self.${_name(prop.name)}, '${_name(prop.name)}')`,
          this.level
        );
        haveValidate = true;
      }
      if (maxLength.length > 0 || pattern.length > 0 || maximum.length > 0 || minimum.length > 0) {
        emitter.emitln(`if self.${_name(prop.name)} is not None:`, this.level);
        this.levelUp();

        if (maxLength.length > 0) {
          emitter.emitln(`self.validate_max_length(self.${_name(prop.name)}, '${_name(prop.name)}', ${maxLength[0].value})`, this.level);
        }

        if (pattern.length > 0) {
          emitter.emitln(`self.validate_pattern(self.${_name(prop.name)}, '${_name(prop.name)}', '${pattern[0].value}')`, this.level);
        }

        if (maximum.length > 0) {
          emitter.emitln(`self.validate_maximum(self.${_name(prop.name)}, '${_name(prop.name)}', ${maximum[0].value})`, this.level);
        }

        if (minimum.length > 0) {
          emitter.emitln(`self.validate_minimum(self.${_name(prop.name)}, '${_name(prop.name)}', ${minimum[0].value})`, this.level);
        }
        this.levelDown();
        haveValidate = true;
      }


      if (prop.type.objectType === 'array' || prop.type.objectType === 'map') {
        let emt = new Emitter(emitter.config);
        this.emitComplexValidate(emt, prop.name, prop.type, 0);
        if (emt.needSave === true) {
          haveValidate = true;
          emitter.emit(emt.output);
        }
      } else if (prop.type.objectType === 'model') {
        emitter.emitln(`if self.${_name(prop.name)}:`, this.level);
        this.levelUp();
        emitter.emitln(`self.${_name(prop.name)}.validate()`, this.level);
        this.levelDown();
        haveValidate = true;
      }
    });

    if (props.length === 0 || !haveValidate) {
      emitter.emitln('pass', this.level);
    }
    this.levelDown();
    emitter.emitln();
  }

  emitComplexToMap(emitter, prop, carrier, depth) {
    const name = prop.name;
    const fieldName = prop.fieldName;
    const type = prop.type;
    const parentType = prop.parentType;

    if (type.objectType === 'array') {
      if (depth > 0) {
        emitter.emitln(`l${depth} = []`, this.level);
        emitter.emitln(`for k${depth} in ${name}:`, this.level);
        this.levelUp();
        const propInfo = {
          name: `k${depth}`,
          fieldName: fieldName,
          type: type.itemType,
          parentType: type.lexeme
        };
        this.emitComplexToMap(emitter, propInfo, `l${depth}`, depth + 1);
        this.levelDown();
        if (parentType === 'array') {
          emitter.emitln(`${carrier}.append(l${depth})`, this.level);
        } else if (parentType === 'map') {
          const num = depth - 1 > 0 ? depth - 1 : '';
          emitter.emitln(`${carrier}[k${num}] = l${depth}`, this.level);
        }
      } else {
        emitter.emitln(`result['${fieldName}'] = []`, this.level);
        emitter.emitln(`if self.${_name(name)} is not None:`, this.level);
        this.levelUp();
        emitter.emitln(`for k in self.${_name(name)}:`, this.level);
        this.levelUp();
        if (type.itemType.valType || type.itemType.itemType) {
          const propInfo = {
            name: 'k',
            fieldName: fieldName,
            type: type.itemType,
            parentType: type.lexeme
          };
          this.emitComplexToMap(emitter, propInfo, `result['${name}']`, depth + 1);
        } else {
          if (type.itemType.objectType === 'model') {
            emitter.emitln(`result['${fieldName}'].append(k.to_map() if k else None)`, this.level);
            emitter.needSave = true;
          } else {
            emitter.needSave = false;
          }
        }
        this.levelDown();
        this.levelDown();
      }
    } else if (type.objectType === 'map') {
      if (depth > 0) {
        emitter.emitln(`d${depth} = {}`, this.level);
        emitter.emitln(`for k${depth} ,v${depth} in ${name}.items():`, this.level);
        this.levelUp();
        const propInfo = {
          name: `v${depth}`,
          fieldName: fieldName,
          type: type.valType,
          parentType: type.lexeme
        };
        this.emitComplexToMap(emitter, propInfo, `d${depth}`, depth + 1);
        this.levelDown();
        if (parentType === 'array') {
          emitter.emitln(`${carrier}.append(d${depth})`, this.level);
        } else if (parentType === 'map') {
          const num = depth - 1 > 0 ? depth - 1 : '';
          emitter.emitln(`${carrier}[k${num}] = d${depth}`, this.level);
        }
      } else {
        emitter.emitln(`result['${fieldName}'] = {}`, this.level);
        emitter.emitln(`if self.${_name(name)} is not None:`, this.level);
        this.levelUp();
        emitter.emitln(`for k, v in self.${_name(name)}.items():`, this.level);
        this.levelUp();
        if (type.valType.valType || type.valType.itemType) {
          const propInfo = {
            name: 'v',
            fieldName: fieldName,
            type: type.valType,
            parentType: type.lexeme
          };
          this.emitComplexToMap(emitter, propInfo, `result['${name}']`, depth + 1);
        } else {
          if (type.valType.objectType === 'model') {
            emitter.emitln(`result['${fieldName}'][k] = v.to_map()`, this.level);
            emitter.needSave = true;
          } else {
            emitter.needSave = false;
          }
        }
        this.levelDown();
        this.levelDown();
      }
    } else if (type.objectType === 'model' || !this.config.typeMap[type] && !this.thirdPackageNamespace[type]) {
      const num = depth - 1 > 0 ? depth - 1 : '';
      if (parentType === 'array') {
        emitter.emitln(`l${num}.append(k${num}.to_map() if k${num} else None)`, this.level);
      } else if (parentType === 'map') {
        emitter.emitln(`d${num}[k${num}] = v${num}.to_map()`, this.level);
      }
      emitter.needSave = true;
    }
  }

  emitToMap(emitter, className, props, notes) {
    emitter.emitln('def to_map(self):', this.level);
    this.levelUp();
    emitter.emitln(`_map = super(${className}, self).to_map()`, this.level);
    emitter.emitln('if _map is not None:', this.level);
    this.levelUp();
    emitter.emitln('return _map', this.level);
    this.levelDown();
    emitter.emitln();
    emitter.emitln('result = dict()', this.level);
    props.forEach(prop => {
      let noteName = prop.notes.filter(item => item.key === 'name');
      let name = noteName.length > 0 ? noteName[0].value : prop.name;
      if (prop.type.objectType === 'array' || prop.type.objectType === 'map') {
        let emt = new Emitter(emitter.config);
        const propInfo = {
          name: prop.name,
          fieldName: name,
          parentType: prop.type.objectType,
          type: prop.type,
        };
        this.emitComplexToMap(emt, propInfo, null, 0);
        if (emt.needSave === true) {
          emitter.emit(emt.output);
        } else {
          emitter.emitln(`if self.${_name(prop.name)} is not None:`, this.level);
          this.levelUp();
          emitter.emitln(`result['${name}'] = self.${_name(prop.name)}`, this.level);
          this.levelDown();
        }

      } else {
        emitter.emitln(`if self.${_name(prop.name)} is not None:`, this.level);
        this.levelUp();
        if (prop.type.objectType === 'model') {
          emitter.emitln(`result['${name}'] = self.${_name(prop.name)}.to_map()`, this.level);
        } else {
          emitter.emitln(`result['${name}'] = self.${_name(prop.name)}`, this.level);
        }
        this.levelDown();
      }
    });

    emitter.emitln('return result', this.level);
    this.levelDown();
    emitter.emitln();
  }

  emitComplexFromMap(emitter, prop, carrier, depth) {
    const name = prop.name;
    const fieldName = prop.fieldName;
    const type = prop.type;
    const parentType = prop.parentType;

    if (type.objectType === 'array') {
      if (depth > 0) {
        const propInfo = {
          name: `k${depth}`,
          fieldName: fieldName,
          type: type.itemType,
          parentType: type.lexeme
        };

        emitter.emitln(`l${depth} = []`, this.level);
        emitter.emitln(`for k${depth} in ${name}:`, this.level);
        this.levelUp();
        this.emitComplexFromMap(emitter, propInfo, `l${depth}`, depth + 1);
        this.levelDown();
        if (parentType === 'array') {
          emitter.emitln(`${carrier}.append(l${depth})`, this.level);
        } else if (parentType === 'map') {
          const num = depth - 1 > 0 ? depth - 1 : '';
          emitter.emitln(`${carrier}['k${num}'] = l${depth}`, this.level);
        }
      } else {
        emitter.emitln(`self.${_name(name)} = []`, this.level);
        emitter.emitln(`if m.get('${fieldName}') is not None:`, this.level);
        this.levelUp();
        emitter.emitln(`for k in m.get('${fieldName}'):`, this.level);
        this.levelUp();
        if (type.itemType.valType || type.itemType.itemType) {
          const propInfo = {
            name: 'k',
            fieldName: fieldName,
            type: type.itemType,
            parentType: type.lexeme
          };
          this.emitComplexFromMap(emitter, propInfo, `self.${_name(name)}`, depth + 1);
        } else {
          if (type.itemType.objectType === 'model') {
            emitter.emitln(`temp_model = ${type.itemType.lexeme}()`, this.level);
            emitter.emitln(`self.${_name(name)}.append(temp_model.from_map(k))`, this.level);
            emitter.needSave = true;
          } else {
            emitter.needSave = false;
          }
        }
        this.levelDown();
        this.levelDown();
      }
    } else if (type.objectType === 'map') {
      if (depth > 0) {
        const propInfo = {
          name: `v${depth}`,
          fieldName: fieldName,
          type: type.valType,
          parentType: type.lexeme
        };

        emitter.emitln(`d${depth} = {}`, this.level);
        emitter.emitln(`for k${depth} ,v${depth} in ${name}.items():`, this.level);
        this.levelUp();
        this.emitComplexFromMap(emitter, propInfo, `d${depth}`, depth + 1);
        this.levelDown();
        if (parentType === 'array') {
          emitter.emitln(`${carrier}.append(d${depth})`, this.level);
        } else if (parentType === 'map') {
          const num = depth - 1 > 0 ? depth - 1 : '';
          emitter.emitln(`${carrier}[k${num}] = d${depth}`, this.level);
        }
      } else {
        emitter.emitln(`self.${_name(name)} = {}`, this.level);
        emitter.emitln(`if m.get('${fieldName}') is not None:`, this.level);
        this.levelUp();
        emitter.emitln(`for k, v in m.get('${fieldName}').items():`, this.level);
        this.levelUp();
        if (type.valType.valType || type.valType.itemType) {
          const propInfo = {
            name: 'v',
            fieldName: fieldName,
            type: type.valType,
            parentType: type.lexeme
          };
          this.emitComplexFromMap(emitter, propInfo, `self.${_name(name)}`, depth + 1);
        } else {
          if (type.valType.objectType === 'model') {
            emitter.emitln(`temp_model = ${type.valType.lexeme}()`, this.level);
            emitter.emitln(`self.${_name(name)}[k] = temp_model.from_map(v)`, this.level);
            emitter.needSave = true;
          } else {
            emitter.needSave = false;
          }
        }
        this.levelDown();
        this.levelDown();
      }
    } else if (type.objectType === 'model') {
      const num = depth - 1 > 0 ? depth - 1 : '';
      if (parentType === 'array') {
        emitter.emitln(`temp_model = ${type.lexeme}()`, this.level);
        emitter.emitln(`l${num}.append(temp_model.from_map(${name}))`, this.level);
      } else if (parentType === 'map') {
        emitter.emitln(`temp_model = ${type.lexeme}()`, this.level);
        emitter.emitln(`d${num}[k${num}] = temp_model.from_map(${name})`, this.level);
      }
      emitter.needSave = true;
    } else if (!this.config.typeMap[type] && !this.thirdPackageNamespace[type]) {
      const num = depth - 1 > 0 ? depth - 1 : '';
      if (parentType === 'array') {
        emitter.emitln(`temp_model = ${type}()`, this.level);
        emitter.emitln(`l${num}.append(temp_model.from_map(${name}))`, this.level);
      } else if (parentType === 'map') {
        emitter.emitln(`temp_model = ${type}()`, this.level);
        emitter.emitln(`d${num}[k${num}] = temp_model.from_map(${name})`, this.level);
      }
      emitter.needSave = true;
    }
  }

  emitFromMap(emitter, modelName, props, notes) {
    emitter.emitln('def from_map(self, m=None):', this.level);
    this.levelUp();
    emitter.emitln('m = m or dict()', this.level);
    props.forEach(prop => {
      let noteName = prop.notes.filter(item => item.key === 'name');
      let name = noteName.length > 0 ? noteName[0].value : prop.name;

      if (prop.type.objectType === 'array' || prop.type.objectType === 'map') {
        let emt = new Emitter(emitter.config);
        const propInfo = {
          name: prop.name,
          fieldName: name,
          parentType: prop.type.objectType,
          type: prop.type,
        };
        this.emitComplexFromMap(emt, propInfo, null, 0);
        if (emt.needSave === true) {
          emitter.emit(emt.output);
        } else {
          emitter.emitln(`if m.get('${name}') is not None:`, this.level);
          this.levelUp();
          emitter.emitln(`self.${_name(prop.name)} = m.get('${name}')`, this.level);
          this.levelDown();
        }
      } else {
        emitter.emitln(`if m.get('${name}') is not None:`, this.level);
        this.levelUp();
        if (prop.type.objectType === 'model') {
          let type = _type(prop.type);
          emitter.emitln(`temp_model = ${type}()`, this.level);
          emitter.emitln(`self.${_name(prop.name)} = temp_model.from_map(m['${name}'])`, this.level);
        } else {
          emitter.emitln(`self.${_name(prop.name)} = m.get('${name}')`, this.level);
        }
        this.levelDown();
      }
    });
    emitter.emitln('return self', this.level);
    this.levelDown();
  }

  emitNotes(emitter, notes) {}

  emitConstruct(emitter, construct, props, isModule = false) {
    if (construct.params.length + props.length > 0) {
      let constructParams = [];
      construct.params.forEach(param => {
        if (param.value !== null && param.value !== 'null') {
          constructParams.push(`${_name(param.key)}=${param.value}`);
        } else {
          constructParams.push(`${_name(param.key)}`);
        }
      });
      emitter.emit('def __init__(self', this.level);

      if (constructParams.length > 0) {
        emitter.emit(', ');
        emitter.emit(constructParams.join(', '));
      }

      if (props.length > 0) {
        let constructProps = [];
        let max_length = 90;
        let curr_length = 0;
        props.forEach((prop) => {
          if (prop instanceof PropItem) {
            let str = ` ${_name(prop.name)}=None`;
            if(curr_length+str.length>=max_length){
              str =  emitter.eol + emitter.indent(this.level + 3) + str;
              curr_length = 0;
            }else{
              curr_length = curr_length + str.length;
            }
            constructProps.push(str);
          }
        });
        emitter.emit(',');
        emitter.emit(constructProps.join(','));
      }
      emitter.emitln('):');
      this.levelUp();
      this.func_self = 'self';

    } else {
      emitter.emitln('def __init__(self):', this.level);
      this.levelUp();
    }
    if (construct.annotations) {
      this.emitFuncComment(emitter, construct);
      //this.emitAnnotations(emitter, construct.annotations);
    }

    props.forEach(prop => {
      if (prop instanceof AnnotationItem) {
        this.emitAnnotation(emitter, prop);
        return;
      }
      const description = prop.notes.filter(note => {
        if (note.key === 'description') {
          return note.value;
        }
      });
      if (description.length === 1) {
        const desc = description[0].value.split(emitter.eol);
        desc.forEach(d => {
          emitter.emitln(`# ${d}`, this.level);
        });
      }

      const fieldType = this.typeHint(prop.type);
      emitter.emitln(`self.${_name(prop.name)} = ${_name(prop.name)}  # type: ${fieldType}`, this.level);
    });
    if (construct.body.length > 0) {
      construct.body.forEach(gram => {
        this.grammer(emitter, gram, true, true);
      });
    }

    if (construct.body.length + props.length <= 0) {
      emitter.emitln('pass', this.level);
    }
    this.levelDown();
  }

  typeHint(fieldType) {
    const type = _type(fieldType);

    if (fieldType.objectType) {
      if (fieldType.objectType === 'array') {
        let itemType = this.typeHint(fieldType.itemType);
        return `list[${itemType}]`;
      } else if (fieldType.objectType === 'map') {
        let keyType = this.typeHint(fieldType.keyType);
        let valueType = this.typeHint(fieldType.valType);
        return `dict[${keyType}, ${valueType}]`;
      }
    }
    return type;
  }

  emitAnnotation(emitter, annotation, level) {
    if (typeof level === 'undefined') {
      level = this.level;
    }
    if (annotation.mode === 'single') {
      emitter.emitln(`# ${annotation.content}`, level);
    } else if (annotation.mode === 'multi') {
      emitter.emitln('"""', level);
      annotation.content.forEach(c => {
        emitter.emitln(`${c}`, level);
      });
      emitter.emitln('"""', level);
    } else {
      debug.stack('Unsupported annotation.mode :' + annotation.mode, annotation);
    }
  }

  emitFunc(emitter, func) {
    emitter.emitln();
    this.func_static = func.modify.indexOf('STATIC') > -1;
    this.func_self = this.func_static ? this.getClassName(this.config.clientName) : 'self';
    if (this.func_static) {
      emitter.emitln('@staticmethod', this.level);
    }
    if (func.params.length > 0) {
      let selfVar = this.func_static ? '' : 'self, ';
      emitter.emit(`def ${_name(func.name)}(${selfVar}`, this.level);
      if (func.params.length > 0) {
        let params = [];
        func.params.forEach(p => {
          params.push(`${_toSnakeCase(p.key)}`);
        });
        emitter.emit(params.join(', '));
      }
    } else {
      let selfVar = this.func_static ? '' : 'self';
      emitter.emit(`def ${_name(func.name)}(${selfVar}`, this.level);
    }
    emitter.emitln('):');
    this.levelUp();
    this.emitFuncComment(emitter, func);
    func.body.forEach(gram => {
      this.grammer(emitter, gram);
    });
    if (func.body.filter(i => !(i instanceof AnnotationItem)).length === 0) {
      emitter.emitln('pass', this.level);
    }

    this.levelDown();
  }

  emitFuncComment(emitter, func) {
    const commentTag = ['@param', '@return'];
    if (func.annotations.length > 0) {
      emitter.emitln('"""', this.level);
      func.annotations.forEach(annotation => {
        if (annotation.mode === 'multi') {
          annotation.content.forEach(c => {
            c = c.replace('*', '').trim('', 'left');
            let tagIndex = null;
            c.split(' ').forEach((item, index) => {
              if (commentTag.indexOf(item) > -1) {
                tagIndex = index;
              }
            });
            if (tagIndex !== null) {
              let tmp = c.split(' ');
              if (tmp[tagIndex] === '@param') {
                const param = tmp[tagIndex + 1];
                tmp[tagIndex + 1] = _name(param) + ':';
                let type = func.params.filter(p => param === p.key)[0];
                if (type) {
                  type = ['base', 'complex'].indexOf(this.config.type[_type(type.type)]) !== -1 ? _type(type.type) : null;
                }
                emitter.emitln();
                if (type) {
                  let typeTmp = tmp.slice(0, 2);
                  typeTmp[tagIndex] = '@type';
                  typeTmp.push(type);
                  emitter.emitln(typeTmp.join(' '), this.level);
                }
                emitter.emitln(tmp.join(' '), this.level);
              } else if (tmp[tagIndex] === '@return') {
                tmp[tagIndex] = '@return:';
                emitter.emitln();

                const rtype = ['base', 'complex'].indexOf(this.config.type[_type(func.return[0])]) !== -1 ? _type(func.return[0]) : null;
                if (rtype && rtype !== 'None') {
                  emitter.emitln(`@rtype: ${rtype}`, this.level);
                }
                emitter.emitln(tmp.join(' '), this.level);
              }
            } else {
              emitter.emitln(`${c}`, this.level);
            }
          });
        } else {
          emitter.emitln(`${annotation.content}`, this.level);
        }
      });
      emitter.emitln('"""', this.level);
    }
  }

  emitInclude(emitter) {
    let futureList = this.includeList.filter(node => node.from === '__future__');
    let importList = this.includeList.filter(node => !node.from && node.import);
    let aliasList = this.includeList.filter(node => node.from && node.alias);
    let list = this.includeList.filter(node => node.from && !node.alias && node.from !== '__future__');

    let from = {};
    let fromList = [];

    list.forEach(item => {
      if (!from[item.from]) {
        from[item.from] = [item.import];
      } else {
        from[item.from].push(item.import);
      }
    });

    Object.keys(from).forEach(key => {
      fromList.push({
        from: key,
        import: from[key]
      });
    });

    if (futureList.length) {
      futureList.forEach(include => {
        this.emitIncludeRow(emitter, include);
      });
      emitter.emitln();
    }

    if (importList.length) {
      importList.forEach(include => {
        this.emitIncludeRow(emitter, include);
      });
      emitter.emitln();
    }

    if (fromList.length) {
      fromList.forEach(include => {
        this.emitIncludeRow(emitter, include);
      });
      emitter.emitln();
    }

    if (aliasList.length) {
      aliasList.forEach(include => {
        this.emitIncludeRow(emitter, include);
      });
      emitter.emitln();
    }

    if (importList.length || fromList.length || aliasList.length) {
      emitter.emitln();
    }
  }

  emitIncludeRow(emitter, include) {
    if (include.from) {
      emitter.emit(`from ${include.from} `, this.level);
      if (include.import instanceof Array) {
        emitter.emitln(`import ${include.import.join(', ')}`);
      } else if (include.alias) {
        emitter.emitln(`import ${include.import} as ${include.alias}`);
      } else {
        emitter.emitln(`import ${include.import}`);
      }
    } else if (include.import) {
      emitter.emitln(`import ${include.import}`, this.level);
    }
  }

  emitExec(emitter) {
    this.simpleImport('sys');
    emitter.emitln();
    emitter.emitln();
    emitter.emitln('if __name__ == \'__main__\':');
    this.levelUp();
    emitter.emitln(`${this.getClassName(this.config.clientName)}.main(sys.argv[1:])`, this.level);
    this.levelDown();
  }

  grammerCall(emitter, gram) {
    // path : 'parent', 'object', 'object_static', 'call', 'call_static', 'prop', 'prop_static', 'map', 'list'
    var pre = '';
    let params = '';
    if (gram.params.length > 0) {
      let tmp = [];
      gram.params.forEach(p => {
        let emit = new Emitter();
        if (p.value instanceof BehaviorToMap) {
          if (gram.path[1].name === 'isUnset') {
            this.grammer(emit, p.value.grammer, false, false);
          } else {
            emit.emit(`${this.addInclude('$Core')}.${this.config.tea.core.toMap}(`);
            this.grammer(emit, p.value.grammer, false, false);
            emit.emit(')');
          }
        } else {
          this.grammer(emit, p, false, false);
        }
        tmp.push(emit.output);
      });
      params = tmp.join(', ');
    }
    if (gram.type === 'super') {
      pre = `super(${this.getClassName(this.config.clientName)}, self).__init__(${params})`;
    } else {
      gram.path.forEach((path, i) => {
        let pathName = path.name;
        if (typeof pathName === 'string') {
          if (path.type === 'object') {
            pathName = path.name.replace('@', 'self._');
          } else {
            pathName = path.name.replace('@', '_');
          }
        }

        if (path.type === 'parent' || path.type === 'parent_async') {
          pre += this.func_self;
          if (path.name) {
            pre += `.${_name(path.name)}`;
          }
        } else if (path.type === 'object' || path.type === 'object_async') {
          pre += `${_name(_convertStaticParam(pathName))}`;
        } else if (path.type === 'object_static' || path.type === 'object_static_async') {
          pre += `${_convertStaticParam(pathName)}`;
        } else if (path.type === 'call' || path.type === 'call_static') {
          pre += `.${_name(pathName)}(${params})`;
        } else if (path.type === 'call_async' || path.type === 'call_static_async') {
          pre += `.${_name(pathName)}(${params})`;
        } else if (path.type === 'prop') {
          pre += `.${_name(pathName)}`;
        } else if (path.type === 'prop_static') {
          pre += `.${_name(pathName)}`;
        } else if (path.type === 'map') {
          pre += path.isVar ? `.get(${_name(pathName)})` : `.get('${pathName}')`;
        } else if (path.type === 'map_set') {
          const quote = this._adaptedQuotes(pathName, emitter);
          pre += `[${quote}${pathName}${quote}]`;
        } else if (path.type === 'list') {
          pre += `[${pathName}]`;
        } else {
          debug.stack(gram);
        }
      });
    }
    if (pre[0] === '.') {
      pre = pre.slice(1);
    }

    emitter.emit(pre);
  }

  simpleImport(imp, from = null) {
    let existResult = this.includeList.some(item => {
      if (item.import === imp && item.from === from) {
        return true;
      }
    });
    if (!existResult) {
      this.includeList.push({
        from: from,
        import: imp
      });
    } 
  }

  grammerExpr(emitter, gram) {
    if (!gram.left && !gram.right) {
      emitter.emit(` ${_symbol(gram.opt)} `);
      return;
    }
    this.grammer(emitter, gram.left, false, false);
    emitter.emit(` ${_symbol(gram.opt)} `);
    this.grammer(emitter, gram.right, false, false);
  }
  
  grammerVar(emitter, gram) {
    if (gram.varType === 'static_class') {
      const name = gram.name ? gram.name : gram.key;
      emitter.emit(`${name}()`);
    } else if (gram.varType === 'var' || gram.varType === 'const') {
      const name = gram.name ? gram.name : gram.key;
      emitter.emit(`${_convertStaticParam(_toSnakeCase(name))}`);
    } else {
      debug.stack(gram);
    }
  }

  grammerValue(emitter, gram, layer = 1, isparams = false) {
    if (gram.key) {
      if (!isparams) {
        const quote = this._adaptedQuotes(gram.key, emitter);
        emitter.emit(`${quote}${gram.key}${quote}: `);
      } else {
        emitter.emit(`${_toSnakeCase(gram.key)}=`, this.level);
      }
    }
    if (gram instanceof GrammerCall) {
      this.grammerCall(emitter, gram);
    } else if (gram.type === 'array') {
      if (gram.needCast) {
        if (gram.value.length > 0) {
          emitter.emit(`${this.addInclude('$Core')}.${this.config.tea.core.merge}(`);
          let expandParams = gram.value.filter((item) => {
            return item.isExpand !== true;
          });
          let notExpandParams = gram.value.filter((item) => {
            return item.isExpand === true;
          });
          if (expandParams.length > 0) {
            emitter.emitln('{');
            for (let i = 0; i < expandParams.length; i++) {
              emitter.emit('', this.level + layer);
              let v = expandParams[i];
              if (v instanceof AnnotationItem) {
                this.emitAnnotation(emitter, v, 0);
                continue;
              }
              this.grammerValue(emitter, v, layer + 1);
              if (i < expandParams.length - 1) {
                emitter.emitln(',');
              } else {
                emitter.emitln('');
              }
            }
            emitter.emit('}', this.level + layer - 1);
          }
          if (notExpandParams.length > 0) {
            if (expandParams.length > 0) {
              emitter.emit(', ');
            }
            for (let i = 0; i < notExpandParams.length; i++) {
              let v = notExpandParams[i];
              if (v instanceof AnnotationItem) {
                this.emitAnnotation(emitter, v, 0);
                continue;
              }
              this.grammerValue(emitter, v, layer + 1);
              if (i < notExpandParams.length - 1) {
                emitter.emitln(',');
                emitter.emit('', this.level + layer);
              }
            }
          }
          emitter.emit(')');
        } else {
          emitter.emit('{}');
        }
      } else {
        if (gram.value.length > 0) {
          const tmp = gram.value.filter(item => !(item instanceof AnnotationItem));
          const isMap = tmp[0] && tmp[0].key && tmp[0].key !== '';
          if (isMap) {
            emitter.emitln('{');
          } else {
            emitter.emitln('[');
          }
          let len = gram.value.length;
          let i = 0;
          for (i = 0; i < gram.value.length; i++) {
            let item = gram.value[i];
            emitter.emit('', this.level + layer);
            if (item instanceof AnnotationItem) {
              this.emitAnnotation(emitter, item, 0);
              continue;
            }
            this.grammerValue(emitter, item, layer + 1);
            if (i < len - 1) {
              emitter.emitln(',');
            } else {
              emitter.emitln('');
            }
          }
          if (isMap) {
            emitter.emit('}', this.level + layer - 1);
          } else {
            emitter.emit(']', this.level + layer - 1);
          }

        } else {
          emitter.emit('{}');
        }
      }
    } else if (gram.type === 'model_construct_params') {
      if (gram.value.length > 0) {
        let tmp = [];
        emitter.emitln();
        this.levelUp();
        gram.value.forEach(item => {
          let emit = new Emitter();
          if (item instanceof AnnotationItem) {
            if (item.mode === 'single') {
              emit.emit(`# ${item.content}`, this.level);
            } 
            tmp.push(emit.output);
            return true;
          }
          this.grammerValue(emit, item, 1, true);
          tmp.push(emit.output);
        });
        this.levelDown();
        emitter.emit(tmp.join(',' + emitter.eol));
        emitter.emitln();
        emitter.emit('', this.level);
      }
    } else if (gram.type === 'string') {
      this.simpleImport('unicode_literals', '__future__');
      const quote = this._adaptedQuotes(gram.value, emitter);
      emitter.emit(`${quote}${gram.value}${quote}`);
    } else if (gram.type === 'param') {
      emitter.emit(`${_convertStaticParam(_toSnakeCase(gram.value))}`);
    } else if (gram.type === 'call') {
      this.grammerCall(emitter, gram.value);
    } else if (gram.type === 'number') {
      emitter.emit(gram.value);
    } else if (gram.type === 'null') {
      emitter.emit('None');
    } else if (gram.type === 'behavior') {
      this.grammer(emitter, gram.value);
    } else if (gram.type === 'expr') {
      if (Array.isArray(gram.value)) {
        const isConcatString = gram.value.some(item => {
          return item.opt === 'CONCAT';
        });
        if (isConcatString) {
          gram.value.forEach(gramItem => {
            const needTanslate = gramItem.opt !== 'CONCAT' && gramItem.type !== 'string';
            if (needTanslate) {
              emitter.emit(`${this.addInclude('$Converter')}.${this.config.tea.converter.toUnicode}(`);
              this.grammer(emitter, gramItem, false, false);
              emitter.emit(')');
            } else {
              this.grammer(emitter, gramItem, false, false);
            }
          });
        } else {
          gram.value.forEach(gramItem => {
            this.grammer(emitter, gramItem, false, false);
          });
        }
      } else {
        this.grammer(emitter, gram.value, false, false);
      }
    } else if (gram.type === 'instance' || gram.type === 'module_instance') {
      this.grammerNewObject(emitter, gram.value);
    } else if (gram.type === 'bool' || gram.type === 'boolean') {
      emitter.emit(gram.value ? 'True' : 'False');
    } else if (gram.type === 'var') {
      this.grammerVar(emitter, gram.value);
    } else if (gram.type === 'class') {
      emitter.emit(`${gram.value.name}`);
    } else if (gram.type === 'not') {
      emitter.emit(_symbol(Symbol.reverse()));
      this.grammerValue(emitter, gram.value);
    } else if (gram.type === '') {
      if (gram.varType) {
        this.grammerVar(emitter, gram);
      } else {
        debug.stack('Unsupported GrammerValue type', gram);
      }
    } else if (Array.isArray(gram)) {
      let grammerValue = new GrammerValue();
      grammerValue.type = 'array';
      grammerValue.value = gram;
      this.grammerValue(emitter, grammerValue);
    } else {
      debug.stack('Unsupported GrammerValue type', gram);
    }
  }

  grammerLoop(emitter, gram) {
    if (gram.type === 'foreach') {
      emitter.emit('for ');
      this.grammerVar(emitter, gram.item);
      emitter.emit(' in ');
      this.grammer(emitter, gram.source, false, false);
      emitter.emitln(':');
    }
    this.levelUp();
    gram.body.forEach(node => {
      this.grammer(emitter, node);
    });
    this.levelDown();
  }

  grammerBreak(emitter, gram) {
    emitter.emit('break');
  }

  grammerCondition(emitter, gram) {
    if (gram.type === 'elseif') {
      emitter.emit('elif');
    } else {
      emitter.emit(`${gram.type}`);
    }

    if (gram.type !== 'else') {
      emitter.emit(' ');
      let emit = new Emitter();
      gram.conditionBody.forEach(condition => {
        this.grammer(emit, condition, false, false);
      });
      emitter.emit(`${emit.output}`);
    }

    emitter.emitln(':');
    this.levelUp();
    gram.body.forEach(node => {
      this.grammer(emitter, node);
    });
    if (gram.body.filter(i => !(i instanceof AnnotationItem)).length === 0) {
      emitter.emitln('pass', this.level);
    }

    this.levelDown();
    if (gram.elseItem.length && gram.elseItem.length > 0) {
      gram.elseItem.forEach(e => {
        this.grammer(emitter, e);
      });
    }
  }

  grammerReturn(emitter, gram) {
    if (gram.type === 'null') {
      emitter.emit('return');
      return;
    }
    emitter.emit('return ');

    if (gram.type === 'grammer') {
      this.grammer(emitter, gram.expr, false, false);
    } else if (gram.type === 'string') {
      emitter.emit('\'\'');
    } else {
      this.grammer(emitter, gram.expr, false, false);
    }
  }

  grammerContinue(emitter, gram) {
    emitter.emit('continue');
  }

  grammerThrows(emitter, gram) {
    if (gram.exception === null) {
      emitter.emit('raise ');
      this.grammerValue(emitter, gram.params[0]);
    } else {
      if (gram.params.length > 0) {
        emitter.emit(`raise ${_exception(gram.exception)}(`);
        if (gram.params.length === 1) {
          this.grammerValue(emitter, gram.params[0]);
        } else {
          let tmp = [];
          gram.params.forEach(p => {
            let emit = new Emitter();
            this.grammerValue(emit, p);
            tmp.push(emit.output);
          });
          emitter.emit(tmp.join(', '));
        }
        emitter.emit(')');
      } else {
        let msg = gram.message ? `'${gram.message}'` : '';
        emitter.emit(`raise ${_exception(gram.exception)}(${msg})`);
      }
    }
  }

  grammerTryCatch(emitter, gram) {
    emitter.emitln('try:');
    this.levelUp();
    gram.body.forEach(node => {
      this.grammer(emitter, node, true, true);
    });
    this.levelDown();
    gram.catchBody.forEach(node => {
      assert.equal(true, node instanceof GrammerCatch);
      this.grammerCatch(emitter, node);
    });

    if (gram.finallyBody) {
      this.grammerFinally(emitter, gram.finallyBody);
    }
  }

  grammerFinally(emitter, gram) {
    emitter.emitln('finally:', this.level);
    this.levelUp();
    gram.body.forEach(childGram => {
      this.grammer(emitter, childGram);
    });
    this.levelDown();
  }

  grammerCatch(emitter, gram) {
    emitter.emit('except', this.level);
    if (gram.exceptions.type === 'BASE') {
      emitter.emit(' Exception as ');
      this.grammerVar(emitter, gram.exceptions.exceptionVar);
    } else {
      emitter.emit(` ${_exception(gram.exceptions.type)} as `);
      this.grammerVar(emitter, gram.exceptions.exceptionVar);
    }

    emitter.emitln(':');
    this.levelUp();
    gram.body.forEach(childGram => {
      this.grammer(emitter, childGram);
    });
    this.levelDown();
  }

  grammerNewObject(emitter, gram) {
    let objectName = gram.name;

    emitter.emit(`${objectName}(`);
    if (!Array.isArray(gram.params)) {
      this.grammerValue(emitter, gram.params);
    } else {
      if (gram.params.length > 0) {
        let params = [];
        gram.params.forEach(p => {
          let emit = new Emitter();
          if (p.key) {
            emit.emit(`${_toSnakeCase(p.key)}`);
            emit.emit('=');
          }
          if (typeof (p.value) === 'string') {
            if (p.value) {
              emit.emit(`${p.value}`);
            } else if (p.key) {
              emit.emit('\'\'');
            }
          } else {
            this.grammerValue(emit, p.value);
          }
          params.push(emit.output);
        });
        emitter.emit(params.join(', '));
      }
    }
    emitter.emit(')');
  }

  behaviorTimeNow(emitter, behavior) {
    this.simpleImport('time');
    emitter.emit('time.time()');
  }

  behaviorSetMapItem(emitter, behavior) {
    let emit = new Emitter();
    this.grammerCall(emit, behavior.call);

    if (behavior.isVar) {
      emitter.emit(`${emit.output}[${_name(behavior.key)}] = `, this.level);
    } else {
      const quote = this._adaptedQuotes(behavior.key, emitter);
      emitter.emit(`${emit.output}[${quote}${behavior.key}${quote}] = `, this.level);
    }
    
    this.grammerValue(emitter, behavior.value);
    emitter.emitln('');
  }

  behaviorDoAction(emitter, behavior) {
    emitter.emit('', this.level);
    this.grammerVar(emitter, behavior.var);
    emitter.emit(` = ${this.addInclude('$Core')}.${this.config.tea.core.doAction}(`);

    let params = [];
    behavior.params.forEach(p => {
      let emit = new Emitter();
      this.grammerValue(emit, p);
      params.push(emit.output);
    });
    emitter.emit(params.join(', '));
    emitter.emitln(')');
    behavior.body.forEach(node => {
      this.grammer(emitter, node);
    });
  }

  behaviorRetry(emitter, behavior) {
    emitter.emitln(`raise TeaException(${this.config.request}, ${this.config.response})`, this.level);
  }

  behaviorToModel(emitter, behavior) {
    emitter.emitln(`${this.addInclude('$Core')}.${this.config.tea.core.fromMap}(`);
    this.levelUp();
    emitter.emitln(`${this.addModelInclude(behavior.expected)}(),`, this.level);
    this.grammer(emitter, behavior.grammer);
    this.levelDown();
    emitter.emit(')', this.level);
  }

  behaviorToMap(emitter, behavior) {
    const grammer = behavior.grammer;
    if (grammer instanceof GrammerCall) {
      grammer.path.push({
        type: 'call',
        name: 'to_map'
      });
      this.grammerCall(emitter, grammer);
    } else if (grammer instanceof GrammerVar) {
      const grammerCall = new GrammerCall('method');
      grammerCall.path.push({
        type: 'object',
        name: grammer.name
      });
      grammerCall.path.push({
        type: 'call',
        name: 'to_map'
      });
      this.grammerCall(emitter, grammerCall);
    } else {
      debug.stack(grammer);
    }
  }

  _adaptedQuotes(str, emit) {
    const line = str.split(emit.eol);
    let quote = '\'';
    if (str.indexOf('\'') !== -1 && str.indexOf('"') !== -1 || line.length > 1) {
      quote = '\'\'\'';
    } else if (str.indexOf('\'') !== -1) {
      quote = '"';
    }
    return quote;
  }

  behaviorStrFormat(emitter, behavior) {
    let tmp = behavior.tmp.replace(/%/g, '%%').replace(/\${}/g, '%s').replace(/{{/g, '{').replace(/}}/g, '}');
    const quote = this._adaptedQuotes(tmp, emitter);
    this.simpleImport('unicode_literals', '__future__');
    if (behavior.item.length > 1) {
      emitter.emit(`${quote}${tmp}${quote} % (`);
    } else if (behavior.item.length === 1) {
      emitter.emit(`${quote}${tmp}${quote} % `);
    } else {
      tmp = tmp.replace(/%%/g, '%');
      emitter.emit(`${quote}${tmp}${quote}`);
    }

    behavior.item.forEach((gram, index) => {
      emitter.emit(`${this.addInclude('$Converter')}.${this.config.tea.converter.toUnicode}(`);
      this.grammerValue(emitter, gram);
      emitter.emit(')');
      if (index + 1 < behavior.item.length) {
        emitter.emit(', ');
      }
    });

    if (behavior.item.length > 1) {
      emitter.emit(')');
    }
  }

  behaviorTypeInstance(emitter, behavior) {

  }

  grammerSymbol(emitter, gram) {
    emitter.emit(_symbol(gram));
  }
}

module.exports = Combinator;