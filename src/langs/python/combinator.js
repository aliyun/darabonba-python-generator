'use strict';

const assert = require('assert');
const debug = require('../../lib/debug');
const CombinatorBase = require('../common/combinator');
const Emitter = require('../../lib/emitter');
const PackageInfo = require('./package_info');
const path = require('path');
const fs = require('fs');
const modelConbinator = require('./models.js');

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
} = require('../common/items');

const {
  _type,
  _symbol,
  _exception,
  _isKeywords,
  _avoidKeywords,
  _underScoreCase,
  _convertStaticParam
} = require('./helper');

const {
  _isBasicType,
  _upperFirst
} = require('../../lib/helper');

class Combinator extends CombinatorBase {
  constructor(config) {
    super(config);
    this.eol = '';

    this.thirdPackageNamespace = {};
    this.thirdPackageClient = {};
    this.clientMap = {};

    // Darafile: name (Tea Package name)
    this.config.package = this.config.package.split('.').map(item => item.toLowerCase()).join('_');
    if (this.config.emitType === 'model' && this.config.modelDirName) {
      if (this.config.layer.indexOf('.') > -1) {
        this.config.layer = this.config.modelDirName + this.config.layer.split('.').slice(1).join('.');
      } else {
        this.config.layer = this.config.modelDirName;
      }
    }
    this.model_dir = this.config.modelDirName ? this.config.modelDirName : 'models';
    this.config.layer = this.config.layer.split('.').map(m => {
      return _avoidKeywords(m);
    }).join('.');
    this.config.dir = this.config.outputDir ? path.join(this.config.outputDir, this.config.package) : '';
    this.config.filename = _underScoreCase(this.config.filename);
  }

  init(ast) {
    const imports = ast.imports;
    this.requirePackage = [];
    if (imports.length > 0) {
      const lockPath = path.join(this.config.pkgDir, '.libraries.json');
      const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
      ast.imports.forEach(item => {
        const aliasId = item.lexeme;
        const moduleDir = this.config.libraries[aliasId];
        let targetPath = '';
        if (moduleDir.startsWith('./') || moduleDir.startsWith('../')) {
          targetPath = path.join(this.config.pkgDir, moduleDir);
        } else if (moduleDir.startsWith('/')) {
          targetPath = moduleDir;
        } else {
          targetPath = path.join(this.config.pkgDir, lock[moduleDir]);
        }
        const daraFilePath = path.join(targetPath, 'Darafile');
        const cfgFilePath = fs.existsSync(daraFilePath) ? daraFilePath : path.join(targetPath, 'Teafile');
        const daraFile = JSON.parse(fs.readFileSync(cfgFilePath));
        if (!daraFile.python) {
          debug.stack(`The '${aliasId}' has no python supported.`);
        }
        this.thirdPackageNamespace[aliasId] = daraFile.python.package;
        this.thirdPackageClient[aliasId] = daraFile.python.clientName || 'client';
        if (daraFile.releases && daraFile.releases.python) {
          this.requirePackage.push(daraFile.releases.python);
        }
      });
    }
  }

  addInclude(className) {
    let importName = '';
    let fromName = '';
    let needAlias = true;
    let alias = '';

    if (className.indexOf('$') > -1) {
      let coreClassName = this.coreClass(className);
      let coreNamespl = coreClassName.split('.');
      importName = coreNamespl[coreNamespl.length - 1];
      coreNamespl.splice(coreNamespl.length - 1, 1);
      fromName = coreNamespl.join('.');
      needAlias = false;
    }

    if (this.thirdPackageNamespace[className]) {
      // is third package
      importName = _upperFirst(this.thirdPackageClient[className]);
      fromName = this.thirdPackageNamespace[className] + '.' + this.thirdPackageClient[className];

      // import classname as classname
      if (/^[A-Z]+$/.test(importName[0])) {
        alias = className + importName;
      } else {
        alias = _underScoreCase(className) + '_' + importName;
      }
    }

    let existResult = this.includeList.some(item => item.import === importName && item.from === fromName);

    if (!existResult) {
      const UseFullName = this.includeList.some(item => {
        return (item.import !== importName || item.from !== fromName) &&
          item.alias === alias &&
          (!item.needAlias && item.import === importName || item.needAlias);
      });
      if (UseFullName === true) {
        alias = '';
        needAlias = true;
      }
      this.includeList.push({
        'from': fromName,
        'import': importName,
        'alias': alias,
        'needAlias': needAlias
      });
    }

    let packageName = '';
    if (alias) {
      packageName = alias;
    } else if (needAlias === false) {
      packageName = importName;
    } else {
      packageName = fromName.split('.').join('_') + '_' + importName;
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
    let needAlias = true;

    if (modelName.indexOf('$') > -1) {
      let coreModelName = this.coreClass(modelName);
      let coreNamespl = coreModelName.split('.');
      importName = coreNamespl[coreNamespl.length - 1];
      coreNamespl.splice(coreNamespl.length - 1, 1);
      fromName = coreNamespl.join('.');
      resultName = fromName.split('.').join('_') + '_' + importName + '.' + modelName.split('.').join('');
      needAlias = false;
    } else if (accessPath.length > 1 && this.thirdPackageNamespace[accessPath[0]]) {
      // is third package
      importName = 'models';
      fromName = this.thirdPackageNamespace[accessPath[0]];
      alias = _underScoreCase(accessPath[0]) + '_models';
      if (alias) {
        resultName = alias + '.' + accessPath.slice(1).map(item => _upperFirst(item)).join('');
      } else {
        resultName = fromName.split('.').join('_') + '_models' + '.' + accessPath.slice(1).map(item => _upperFirst(item)).join('');
      }
    } else if (this.thirdPackageNamespace[modelName]) {
      // is third package
      importName = _upperFirst(this.thirdPackageClient[modelName]);
      fromName = this.thirdPackageNamespace[modelName] + '.' + this.thirdPackageClient[modelName];
      resultName = fromName.split('.').join('_') + '_' + importName;
    } else {
      // self model
      fromName = this.config.package;
      importName = 'models';
      if (this.config.emitType === 'model') {
        resultName = modelName.split('.').map(m => _upperFirst(m)).join('');
        return resultName;
      }
      alias = _underScoreCase(this.config.name) + '_' + importName;
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
        'needAlias': needAlias
      });
    }

    return resultName;
  }

  combine(emitter, object) {
    if (this.config.emitType === 'code' && this.config.packageInfo) {
      const packageInfo = new PackageInfo(this.config);
      packageInfo.emit(this.config.packageInfo, this.requirePackage);
    }
    let classPrefix = '';
    if (this.config.emitType === 'model') {
      if (object.name.indexOf('.') > -1) {
        object.name = object.name.split('.').map(item => _upperFirst(item)).join('');
      }
      emitter.config.layer = '';
    }
    emitter.config.layer = emitter.config.layer.split('.').map(m => {
      return _avoidKeywords(m);
    }).join('.');

    var parent = '';
    if (object.extends.length > 0) {
      let tmp = [];
      if (!(object.extends instanceof Array)) {
        object.extends = [object.extends];
      }
      object.extends.forEach(baseClass => {
        tmp.push(baseClass);
      });
      parent = '(' + tmp.join(', ') + ')';
    }

    if (object.topAnnotation.length > 0) {
      this.emitAnnotations(emitter, object.topAnnotation);
    }

    const emitGlobal = new Emitter(emitter.config);
    emitGlobal.emit(emitter.output);
    emitter = new Emitter();

    // emit class
    let className = object.name;
    if (this.config.emitType === 'code') {
      if (this.config.clientName === undefined || this.config.clientName === '') {
        this.config.clientName = 'client';
      }
      className = this.config.clientName;
      emitter.config.filename = className;
    }
    if (object.annotations.length > 0) {
      this.emitAnnotations(emitter, object.annotations);
      emitter.emitln();
    }
    if (_isKeywords(className)) {
      className = _avoidKeywords(className);
      emitter.config.filename = className;
    }
    emitter.emitln();
    emitter.emitln(`class ${classPrefix}${_upperFirst(className)}${parent}:`, this.level);

    this.levelUp();
    const notes = this.resolveNotes(object.body);
    if (Object.keys(notes).length > 0) {
      this.emitNotes(emitter, notes);
    }
    let props = object.body.filter(node => node instanceof PropItem);


    if (object.body.filter(node => node instanceof ConstructItem).length === 0) {
      object.body.push(new ConstructItem());
    }

    // emit body nodes : PropItem | FuncItem | ConstructItem | AnnotationItem
    object.body.forEach(node => {
      if (node instanceof FuncItem) {
        this.emitFunc(emitter, node);
      } else if (node instanceof ConstructItem) {
        this.emitConstruct(emitter, node, parent, props);
      } else if (node instanceof AnnotationItem) {
        this.emitAnnotation(emitter, node);
      }
    });
    if (this.config.emitType === 'model') {
      this.emitValidate(emitter, props, notes);
      this.emitToMap(emitter, props, notes);
      this.emitFromMap(emitter, object.name, props, notes);
    }

    this.levelDown();
    if (this.config.emitType === 'model') {
      modelConbinator.pushInclude(this.includeList);
    } else {
      this.emitInclude(emitGlobal);
    }
    emitGlobal.emit(emitter.output);
    if (this.config.output === undefined || this.config.output === true) {
      if (this.config.emitType === 'model') {
        modelConbinator.addModel(emitGlobal.config, emitGlobal.output);
      } else {
        emitGlobal.save();
      }
    }
  }

  emitValidate(emitter, props, notes) {
    //print validate
    emitter.emitln('');
    emitter.emitln('def validate(self):', this.level);
    this.levelUp();
    let haveValidate = false;
    props.forEach(prop => {
      let required = prop.notes.filter(item => item.key === 'required');
      let maxLength = prop.notes.filter(item => item.key === 'maxLength');
      let pattern = prop.notes.filter(item => item.key === 'pattern');
      if (required.length > 0) {
        emitter.emitln(`self.validate_required(self.${_avoidKeywords(_underScoreCase(prop.name))}, '${_avoidKeywords(_underScoreCase(prop.name))}')`, this.level);
        haveValidate = true;
      }
      if (_type(prop.type) === 'array' && prop.itemType !== '') {
        if (maxLength > 0) {
          emitter.emitln(`self.validate_max_length(self.${_avoidKeywords(_underScoreCase(prop.name))}, '${_avoidKeywords(_underScoreCase(prop.name))}', ${maxLength[0].value})`, this.level);
          haveValidate = true;
        }
        if (!_isBasicType(prop.itemType)) {
          emitter.emitln(`if self.${_avoidKeywords(_underScoreCase(prop.name))}:`, this.level);
          this.levelUp();
          emitter.emitln(`for k in self.${_avoidKeywords(_underScoreCase(prop.name))}:`, this.level);
          this.levelUp();
          emitter.emitln('if k :', this.level);
          this.levelUp();
          emitter.emitln('k.validate()', this.level);
          this.levelDown();
          this.levelDown();
          this.levelDown();
          haveValidate = true;
        } else {
          if (pattern.length > 0) {
            emitter.emitln(`if self.${_avoidKeywords(_underScoreCase(prop.name))}:`, this.level);
            this.levelUp();
            emitter.emitln(`for k in self.${_avoidKeywords(_underScoreCase(prop.name))}:`, this.level);
            this.levelUp();
            emitter.emitln('if k:', this.level);
            this.levelUp();
            emitter.emitln(`self.validate_pattern(k, '${_avoidKeywords(_underScoreCase(prop.name))}', '${pattern[0].value}')`, this.level);
            this.levelDown();
            this.levelDown();
            this.levelDown();
            haveValidate = true;
          }
        }
      } else if (!_isBasicType(prop.type)) {
        emitter.emitln(`if self.${_avoidKeywords(_underScoreCase(prop.name))}:`, this.level);
        this.levelUp();
        emitter.emitln(`self.${_avoidKeywords(_underScoreCase(prop.name))}.validate()`, this.level);
        this.levelDown();
        haveValidate = true;
      } else {
        if (pattern.length + maxLength.length > 0) {
          emitter.emitln(`if self.${_avoidKeywords(_underScoreCase(prop.name))}:`, this.level);
          this.levelUp();
          if (pattern.length > 0) {
            emitter.emitln(`self.validate_pattern(${_avoidKeywords(_underScoreCase(prop.name))}, '${_avoidKeywords(_underScoreCase(prop.name))}', '${pattern[0].value}')`, this.level);
          } else if (maxLength.length > 0) {
            emitter.emitln(`self.validate_max_length(${_avoidKeywords(_underScoreCase(prop.name))}, '${_avoidKeywords(_underScoreCase(prop.name))}', ${maxLength[0].value})`, this.level);
          }
          haveValidate = true;
          this.levelDown();
        }
      }
    });

    if (props.length === 0 || !haveValidate) {
      emitter.emitln('pass', this.level);
    }
    this.levelDown();
    emitter.emitln();
  }

  emitToMap(emitter, props, notes) {
    emitter.emitln('def to_map(self):', this.level);
    this.levelUp();
    emitter.emitln('result = {}', this.level);
    props.forEach(prop => {
      let noteName = prop.notes.filter(item => item.key === 'name');
      let name = noteName.length > 0 ? noteName[0].value : prop.name;
      if (_type(prop.type) === 'array' && prop.itemType !== '') {
        emitter.emitln(`result['${name}'] = []`, this.level);
        emitter.emitln(`if self.${_avoidKeywords(_underScoreCase(prop.name))} is not None:`, this.level);
        this.levelUp();
        emitter.emitln(`for k in self.${_avoidKeywords(_underScoreCase(prop.name))}:`, this.level);
        this.levelUp();
        if (!_isBasicType(prop.itemType) && !this.thirdPackageNamespace[_type(prop.itemType)]) {
          emitter.emitln(`result['${name}'].append(k.to_map() if k else None)`, this.level);
        } else {
          emitter.emitln(`result['${name}'].append(k)`, this.level);
        }
        this.levelDown();
        this.levelDown();
        emitter.emitln('else:', this.level);
        this.levelUp();
        emitter.emitln(`result['${name}'] = None`, this.level);
        this.levelDown();
      } else {
        if (!_isBasicType(prop.type) && !this.thirdPackageNamespace[_type(prop.type)]) {
          emitter.emitln(`if self.${_avoidKeywords(_underScoreCase(prop.name))} is not None:`, this.level);
          this.levelUp();
          emitter.emitln(`result['${name}'] = self.${_avoidKeywords(_underScoreCase(prop.name))}.to_map()`, this.level);
          this.levelDown();
          emitter.emitln('else:', this.level);
          this.levelUp();
          emitter.emitln(`result['${name}'] = None`, this.level);
          this.levelDown();
        } else {
          emitter.emitln(`result['${name}'] = self.${_avoidKeywords(_underScoreCase(prop.name))}`, this.level);
        }
      }
    });
    emitter.emitln('return result', this.level);
    this.levelDown();
    emitter.emitln();
  }

  emitFromMap(emitter, modelName, props, notes) {
    emitter.emitln('def from_map(self, map={}):', this.level);
    this.levelUp();
    props.forEach(prop => {
      let noteName = prop.notes.filter(item => item.key === 'name');
      let name = noteName.length > 0 ? noteName[0].value : prop.name;
      if (_type(prop.type) === 'array' && prop.itemType !== '') {
        emitter.emitln(`self.${_avoidKeywords(_underScoreCase(prop.name))} = []`, this.level);
        emitter.emitln(`if map.get('${name}') is not None:`, this.level);
        this.levelUp();
        emitter.emitln(`for k in map.get('${name}'):`, this.level);
        this.levelUp();
        if (!_isBasicType(prop.itemType) && !this.thirdPackageNamespace[_type(prop.itemType)]) {
          let type = _type(prop.itemType);
          emitter.emitln(`temp_model = ${type}()`, this.level);
          emitter.emitln('temp_model = temp_model.from_map(k)', this.level);
          emitter.emitln(`self.${_avoidKeywords(_underScoreCase(prop.name))}.append(temp_model)`, this.level);
        } else {
          emitter.emitln(`self.${_avoidKeywords(_underScoreCase(prop.name))}.append(k)`, this.level);
        }
        this.levelDown();
        this.levelDown();
        emitter.emitln('else:', this.level);
        this.levelUp();
        emitter.emitln(`self.${_avoidKeywords(_underScoreCase(prop.name))} = None`, this.level);
        this.levelDown();
      } else {
        if (!_isBasicType(prop.type) && !this.thirdPackageNamespace[_type(prop.type)]) {
          let type = _type(prop.type);
          emitter.emitln(`if map.get('${name}') is not None:`, this.level);
          this.levelUp();
          emitter.emitln(`temp_model = ${type}()`, this.level);
          emitter.emitln(`self.${_avoidKeywords(_underScoreCase(prop.name))} = temp_model.from_map(map['${name}'])`, this.level);
          this.levelDown();
          emitter.emitln('else:', this.level);
          this.levelUp();
          emitter.emitln(`self.${_avoidKeywords(_underScoreCase(prop.name))} = None`, this.level);
          this.levelDown();
        } else {
          emitter.emitln(`self.${_avoidKeywords(_underScoreCase(prop.name))} = map.get('${name}')`, this.level);
        }
      }
    });
    emitter.emitln('return self', this.level);
    this.levelDown();
  }

  emitNotes(emitter, notes) {

  }

  emitConstruct(emitter, construct, parent, props) {
    if (construct.params.length + props.length > 0) {
      let constructParams = [];
      construct.params.forEach(param => {
        if (param.value !== null && param.value !== 'null') {
          constructParams.push(`${_avoidKeywords(_underScoreCase(param.key))}=${param.value}`);
        } else {
          constructParams.push(`${_avoidKeywords(_underScoreCase(param.key))}`);
        }
      });
      emitter.emit('def __init__(self', this.level);

      if (constructParams.length > 0) {
        emitter.emit(', ');
        emitter.emit(constructParams.join(', '));
      }

      if (props.length > 0) {
        let constructProps = [];
        props.forEach((prop) => {
          constructProps.push(`${_avoidKeywords(_underScoreCase(prop.name))}=None`);
        });
        emitter.emit(', ');
        emitter.emit(constructProps.join(', '));
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
      if (prop.type === 'map') {
        emitter.emitln(`self.${_avoidKeywords(_underScoreCase(prop.name))} = {}`, this.level);
      } else if (prop.type === 'array') {
        emitter.emitln(`self.${_avoidKeywords(_underScoreCase(prop.name))} = []`, this.level);
      } else {
        emitter.emitln(`self.${_avoidKeywords(_underScoreCase(prop.name))} = ${_avoidKeywords(_underScoreCase(prop.name))}`, this.level);
      }
    });

    if (construct.body.length > 0) {
      construct.body.forEach(gram => {
        this.grammer(emitter, gram);
      });
    }

    if (construct.body.length + props.length <= 0) {
      emitter.emitln('pass', this.level);
    }
    this.levelDown();
    //emitter.emitln();
  }

  emitAnnotation(emitter, annotation, level) {
    if (level === undefined) {
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
    this.func_self = this.func_static ? '' : 'self';
    if (this.func_static) {
      emitter.emitln('@staticmethod', this.level);
    }
    if (func.params.length > 0) {
      let selfVar = this.func_static ? '' : 'self, ';
      emitter.emit(`def ${_avoidKeywords(_underScoreCase(func.name))}(${selfVar}`, this.level);
      if (func.params.length > 0) {
        let params = [];
        func.params.forEach(p => {
          params.push(`${_underScoreCase(p.key)}`);
        });
        emitter.emit(params.join(', '));
      }
    } else {
      let selfVar = this.func_static ? '' : 'self';
      emitter.emit(`def ${_avoidKeywords(_underScoreCase(func.name))}(${selfVar}`, this.level);
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
    const commentTag = ['@param'];
    if (func.annotations.length > 0) {
      emitter.emitln('"""', this.level);
      func.annotations.forEach(annotation => {
        if (annotation.mode === 'multi') {
          annotation.content.forEach(c => {
            let tagIndex = null;
            c.split(' ').forEach((item, index) => {
              if (commentTag.indexOf(item) > -1) {
                tagIndex = index;
              }
            });
            if (tagIndex !== null) {
              let tmp = c.split(' ');
              if (tmp[tagIndex] === '@param') {
                tmp[tagIndex + 1] = _underScoreCase(_avoidKeywords(tmp[tagIndex + 1])) + ':';
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
    let importList = this.includeList.filter(node => !node.from && node.import);
    let fromList = this.includeList.filter(node => node.from);
    importList.forEach(include => {
      this.emitIncludeRow(emitter, include);
    });
    if (importList.length) {
      emitter.emitln();
    }
    fromList.forEach(include => {
      this.emitIncludeRow(emitter, include);
    });
    emitter.emitln();
  }

  emitIncludeRow(emitter, include) {
    if (include.from) {
      emitter.emit(`from ${include.from} `);
      if (include.alias) {
        emitter.emitln(`import ${include.import} as ${include.alias}`);
      } else if (include.needAlias === false) {
        emitter.emitln(`import ${include.import}`);
      } else {
        emitter.emitln(`import ${include.import} as ${include.from.split('.').join('_')}_${include.import}`);
      }
    } else if (include.import) {
      emitter.emitln(`import ${include.import}`);
    }

  }

  grammerCall(emitter, gram) {
    // path : 'parent', 'object', 'object_static', 'call', 'call_static', 'prop', 'prop_static', 'map', 'list'
    var pre = '';
    let params = '';
    if (gram.params.length > 0) {
      let tmp = [];
      gram.params.forEach(p => {
        let emit = new Emitter();
        this.grammer(emit, p, false, false);
        tmp.push(emit.output);
      });
      params = tmp.join(', ');
    }
    if (gram.type === 'super') {
      pre = `super().__init__(${params})`;
    } else {
      gram.path.forEach((path, i) => {
        let pathName = path.name.replace('@', '_');
        if (path.type === 'parent') {
          pre += this.func_self;
          if (path.name) {
            pre += `.${_avoidKeywords(_underScoreCase(path.name))}`;
          }
        } else if (path.type === 'object') {
          pre += `${_avoidKeywords(_underScoreCase(_convertStaticParam(pathName)))}`;
        } else if (path.type === 'object_static') {
          pre += `${_convertStaticParam(pathName)}`;
        } else if (path.type === 'call') {
          pre += `.${_avoidKeywords(_underScoreCase(pathName))}(${params})`;
        } else if (path.type === 'call_static') {
          pre += `.${_avoidKeywords(_underScoreCase(pathName))}(${params})`;
        } else if (path.type === 'prop') {
          pre += `.${_avoidKeywords(_underScoreCase(pathName))}`;
        } else if (path.type === 'prop_static') {
          pre += `.${_avoidKeywords(_underScoreCase(pathName))}`;
        } else if (path.type === 'map') {
          pre += `.get('${pathName}')`;
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

  grammerExpr(emitter, gram) {
    if (gram.left && gram.left.name === 'createClusterRequestBody') {
      //debug.stack(gram.right.value.params.value[13]);
    }
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
      emitter.emit(`${_convertStaticParam(_underScoreCase(name))}`);
    } else {
      debug.stack(gram);
    }
  }

  grammerValue(emitter, gram, layer = 1, isparams = false) {

    if (gram.key) {
      if (!isparams) {
        emitter.emit(`"${gram.key}": `);
      } else {
        emitter.emit(`${_underScoreCase(gram.key)}=`, this.level);
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
          if (gram.value[0].key && gram.value[0].key !== '') {
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
          if (gram.value[0].key && gram.value[0].key !== '') {
            emitter.emit('}', this.level + layer - 1);
          } else {
            emitter.emit(']', this.level + layer - 1);
          }

        } else {
          emitter.emit('{}');
        }
      }
    } else if (gram.type === 'model_construct_params') {
      let tmp = [];
      emitter.emitln();
      this.levelUp();
      gram.value.forEach(item => {
        let emit = new Emitter();
        if (item instanceof AnnotationItem) {
          this.emitAnnotation(emit, item);
          return true;
        }
        this.grammerValue(emit, item, 1, true);
        tmp.push(emit.output);
      });
      this.levelDown();
      emitter.emit(tmp.join(',' + emitter.eol));
      emitter.emitln();
      emitter.emit('', this.level);
    } else if (gram.type === 'string') {
      emitter.emit(`"${gram.value}"`);
    } else if (gram.type === 'param') {
      emitter.emit(`${_convertStaticParam(_underScoreCase(gram.value))}`);
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
              emitter.emit('str(');
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
    } else if (gram.type === 'instance') {
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
      this.grammerVar(emitter, gram.item, false, false);
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
      this.grammer(emitter, node);
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
            emit.emit(`${_underScoreCase(p.key)}`);
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
    let existResult = this.includeList.some(item => {
      if (item.import === 'time' && !item.from) {
        return true;
      }
    });
    if (!existResult) {
      this.includeList.push({
        'import': 'time'
      });
    }
    emitter.emit('time.time()');
  }

  behaviorSetMapItem(emitter, behavior) {
    let emit = new Emitter();
    this.grammerCall(emit, behavior.call);
    emitter.emit(`${emit.output}["${behavior.key}"] = `, this.level);
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
    emitter.emit(`${this.addModelInclude(behavior.expected)}().from_map(`);
    this.grammer(emitter, behavior.grammer, false, false);
    emitter.emitln(')');
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

  behaviorTypeInstance(emitter, behavior) {

  }

  grammerSymbol(emitter, gram) {
    emitter.emit(_symbol(gram));
  }
}

module.exports = Combinator;