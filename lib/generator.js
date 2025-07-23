'use strict';

const assert = require('assert');

const path = require('path');
const fs = require('fs');

const DSL = require('@darabonba/parser');
const {
  _name, _vid, _string, _upperFirst, _type, _escape,
  _subModelName, _camelCase, _snakeCase, _getImport,
  _isBinaryOp, _adaptedQuotes, CORE, REQUEST, RESPONSE,
  _avoidKeywords, _removeFilesInDirectory, _sortImports,
  _importsToString,
} = require('./helper');
const getBuiltin = require('./builtin');
const { Tag } = require('@darabonba/parser/lib/tag');
const Annotation = require('@darabonba/annotation-parser');

class Visitor {

  static get supportGenerateTest() {
    return true;
  }

  constructor(option = {}) {
    this.config = Object.assign({
      outputDir: '',
      indent: '    ',
      clientName: option.python.clientName || 'Client',
      className: option.className || 'Client',
    }, option);
    assert.ok(this.config.outputDir, '`option.outputDir` should not empty');
    assert.ok(this.config.package, `Darafile -> python -> package should not empty, please add python option into Darafile.
      example:
        "pthon": {
          "package": "darabonba.core",
          "className": "Client"
        }`);

    this.typedef = this.config.typedef || {};
    this.imports = [];
    this.outputDir = this.config.outputDir;
    this.setupPath = path.join(this.outputDir, 'setup.py');
    this.modelPath = path.join(this.outputDir, this.config.package, 'models');
    this.modelPackage = 'models';
    this.exceptionPath = path.join(this.outputDir, this.config.package, 'exceptions');
    this.exceptionPackage = 'exceptions';
    this.config.clientPath = path.join(this.outputDir, this.config.package, `${_snakeCase(this.config.clientName)}.py`);
    this.classNamespace = new Map();
    // 新增：用于存储已使用的类型
    this.isAsyncFunction = false; // 新增：用于标记是否为异步函数
    this.isStaticFunction = true; // 新增：用于标记是否为非静态函数
    // this.moduleDir = this.config.modelDirName || 'Models'; // 新增，用于存储models文件

    this.output = '';
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, {
        recursive: true
      });
    }

    if (!this.outputDir) {
      throw new Error('`option.outputDir` should not empty');
    }

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, {
        recursive: true
      });
    }
    this.package = this.config.packageInfo || {};
    this.initSetupPy();
  }

  initSetupPy() {
    // 初始化包信息
    this.package.name = this.package.name || this.config.package;
    this.package.version = this.package.version || '1.0.0';
    this.package.description = this.package.desc || '';
    this.package.author = this.package.author || 'Alibaba';
    this.package.author_email = this.package.email || 'sdk-team@alibabacloud.com';
    this.package.url = this.package.github || 'https://github.com/';
    this.package.license = this.package.license || 'Apache License 2.0';
    this.package.requires = this.package.require || [];

    // 收集依赖信息
    if (!this.package.dependencies) {
      this.package.dependencies = {};
    }

    Object.keys(this.typedef).forEach(type => {
      if (this.typedef[type].package) {
        let [pkgName, version] = this.typedef[type].package.split(':');
        if (!this.package.dependencies[pkgName]) {
          this.package.dependencies[pkgName] = version;
        }
      }
    });
    const date = new Date();

    // 创建 setup.py 内容
    const setupPyContent = `
# -*- coding: utf-8 -*-
"""
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
"""

import os
from setuptools import setup, find_packages

"""
setup module for ${this.package.name}.

Created on ${('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()}

@author: ${this.package.author}
"""

PACKAGE = "${this.config.package}"
NAME = "${this.package.name}"
DESCRIPTION = "${this.package.description}"
AUTHOR = "${this.package.author}"
AUTHOR_EMAIL = "${this.package.author_email}"
URL = "${this.package.url}"
VERSION = __import__(PACKAGE).__version__
REQUIRES = [
    "darabonba-core>=1.0.0, <2.0.0"${this.package.requires.length > 0 || Object.keys(this.package.dependencies).length > 0 ? ',' : ''}
${Object.keys(this.package.dependencies).map(pkg => {
    if (this.package.dependencies[pkg].includes('rc')) {
      return `    "${pkg}==${this.package.dependencies[pkg]}"`;
    }
    return `    "${pkg}>=${this.package.dependencies[pkg]}, <${+this.package.dependencies[pkg].split('.')[0] + 1}.0.0"`;
  }).join(',\n')}${this.package.requires.length > 0 ? ',\n    "' + this.package.requires.join('",\n    "') + '"' : ''}
]

LONG_DESCRIPTION = ''
if os.path.exists('./README.md'):
    with open("README.md", encoding='utf-8') as fp:
        LONG_DESCRIPTION = fp.read()

setup(
    name=NAME,
    version=VERSION,
    description=DESCRIPTION,
    long_description=LONG_DESCRIPTION,
    long_description_content_type='text/markdown',
    author=AUTHOR,
    author_email=AUTHOR_EMAIL,
    license="Apache License 2.0",
    url=URL,
    keywords=${JSON.stringify(this.package.name ? this.package.name.split(/_|-/) : [])},
    packages=find_packages(exclude=["tests*"]),
    include_package_data=True,
    platforms="any",
    install_requires=REQUIRES,
    python_requires=">=3.7",
    classifiers=(
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: Apache Software License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Topic :: Software Development"
    )
)
    `.trim();

    // 将内容写入 setup.py 文件
    const setupPath = path.join(this.outputDir, 'setup.py');
    fs.writeFileSync(setupPath, setupPyContent);
  }




  saveInnerModule(ast) {
    const keys = ast.innerModule.keys();
    let data = keys.next();
    while (!data.done) {
      const aliasId = data.value;
      const moduleAst = ast.innerDep.get(aliasId);
      this.ast = ast;
      // this.modelPath = path.join(this.outputDir, this.config.package, 'models.py');
      // this.exceptionPath = path.join(this.outputDir, this.config.package, 'exceptions.py');
      const filepath = ast.innerModule.get(aliasId);
      this.className = this.getInnerClient(aliasId);
      this.modelPath = filepath.replace('.py', '_models');
      this.modelPackage = path.basename(this.modelPath);
      this.exceptionPath = filepath.replace('.py', '_exceptions');
      this.exceptionPackage = path.basename(this.exceptionPath);
      this.visitModule(moduleAst, filepath, false, 0);
      data = keys.next();
    }
  }

  save(filepath) {
    let targetPath = filepath;
    if (path.resolve(filepath).startsWith(path.resolve(this.outputDir))) {
      const baseDir = path.join(this.outputDir, path.sep);
      filepath = filepath.replace(baseDir, '');
    }
    targetPath = path.join(this.outputDir, filepath);
    fs.mkdirSync(path.dirname(targetPath), {
      recursive: true
    });
    this.emitImports();
    fs.writeFileSync(targetPath, this.output);
    this.initSetupPy();
    this.output = '';
    this.imports = [];
    this.usedClass = new Map();
  }

  emit(str, level) {
    this.output += ' '.repeat(level * 2) + str;
  }

  visit(ast, level = 0) {
    this.visitModule(ast, this.config.clientPath, level);
  }

  overwrite(ast, filepath) {
    if (!ast.moduleBody.nodes || !ast.moduleBody.nodes.length) {
      return;
    }
    const beginNotes = DSL.note.getNotes(this.notes, 0, ast.moduleBody.nodes[0].tokenRange[0]);
    const overwirte = beginNotes.find(note => note.note.lexeme === '@overwrite');
    let targetPath = filepath;
    if (path.resolve(filepath).startsWith(path.resolve(this.outputDir))) {
      const baseDir = path.join(this.outputDir, path.sep);
      filepath = filepath.replace(baseDir, '');
    }
    targetPath = path.join(this.outputDir, filepath);
    if (overwirte && overwirte.arg.value === false && fs.existsSync(targetPath)) {
      return false;
    }
    return true;
  }

  modelBefore() {
    // clear model.py
    if (fs.existsSync(this.modelPath + '.py')) {
      fs.unlinkSync(this.modelPath + '.py');
    }
    _removeFilesInDirectory(this.modelPath);
    _removeFilesInDirectory(this.exceptionPath);
  }

  visitModuleInit() {
    const initFile = path.join(this.outputDir, this.config.package, '__init__.py');
    if (!fs.existsSync(initFile)) {
      if (!fs.existsSync(path.dirname(initFile))) {
        fs.mkdirSync(path.dirname(initFile), {
          recursive: true
        });
      }
      fs.writeFileSync(initFile, '__version__ = "1.0.0"\n');
    }
  }

  visitModule(ast, filepath, level) {
    assert.equal(ast.type, 'module');
    this.ast = ast;
    this.predefined = ast.models;
    this.usedExternException = ast.usedExternException;
    this.usedExternModel = ast.usedExternModel;
    this.parentModule = ast.extends;
    this.comments = ast.comments;
    this.notes = ast.notes;
    this.builtin = getBuiltin(this);
    ast.innerModule = new Map();

    this.clientName = new Map();
    this.packageInfo = {};
    this.fileBuffer = {};
    this.usedTypes = [];
    this.imports = [];
    if (this.overwrite(ast, filepath) === false) {
      return;
    }

    if (!this.className) {
      let clientName = this.config.clientName.replace(/(?:^|_)([a-z])/g, (_, c) => (c ? c.toUpperCase() : ''));
      this.className = clientName;
    }


    this.eachImport(ast.imports, ast.usedExternModel, ast.innerModule, filepath, level);

    const subModels = Object.keys(this.predefined).filter((key) => {
      return !key.startsWith('$') && this.predefined[key].type === 'model' && key.indexOf('.') !== -1;
    }).map((key) => {
      return this.predefined[key];
    });

    for (let i = 0; i < subModels.length; i++) {
      // sub model
      // TODO: 生成model class之前需要判断属性是否为自定义类型，如果属性是自定义类型，需要先定义自定义类型
      this.eachSubModel(subModels[i], level);
    }

    const models = ast.moduleBody.nodes.filter((item) => {
      return item.type === 'model';
    });

    this.modelBefore(ast, level);
    for (let i = 0; i < models.length; i++) {
      this.eachModel(models[i], level);
    }
    if (models.length > 0 || subModels.length > 0) {
      // 存一笔 models
      this.modelInitBefore(ast, level);
      this.visitModelInit(models, subModels);
    }

    const exceptions = ast.moduleBody.nodes.filter((item) => {
      return item.type === 'exception';
    });


    if (exceptions.length > 0) {
      for (let i = 0; i < exceptions.length; i++) {
        this.eachException(exceptions[i], level);
      }
      this.visitExceptionInit(exceptions);
    }
    this.flushBuffer();


    this.visitModuleInit();
    this.moduleBefore(ast, level);

    this.visitAnnotation(ast.annotation, level);



    // models definition
    this.apiBefore(level);
    // TODO: 这个types里有type对应的类型，在这块加上一个非基础类型筛选，然后根据类型引入对应的模块
    const types = ast.moduleBody.nodes.filter((item) => {
      return item.type === 'type';
    });

    const inits = ast.moduleBody.nodes.filter((item) => {
      return item.type === 'init';
    });

    const [init] = inits;
    if (init) {
      this.visitInit(init, types, level);
    } else {
      // 没有 init 的时候，也要处理 types
      this.emit('\n');
      types.forEach((type) => {
        let comments = DSL.comment.getFrontComments(this.comments, type.tokenRange[0]);
        this.visitComments(comments, level + 2);
        this.emit(`${_snakeCase(_vid(type.vid))}: `, level + 2);
        this.visitType(type.value);
        this.emit(' = None\n');
      });
      this.emit('\n');
      this.emit(`    def __init__(self):
        pass\n`);
    }

    const apis = ast.moduleBody.nodes.filter((item) => {
      return item.type === 'api';
    });

    for (let i = 0; i < apis.length; i++) {
      // 每个API都需要 Tea.request import TeaRequest
      // from Tea.core import TeaCore
      // 但是不需要重复引入
      this.imports.push({
        className: `${CORE}Core`,
        packageName: 'darabonba.core'
      });
      this.eachAPI(apis[i], level + 2);
    }

    // this.functionBefore();
    const functions = ast.moduleBody.nodes.filter((item) => {
      return item.type === 'function';
    });

    for (let i = 0; i < functions.length; i++) {
      this.eachFunction(functions[i], level + 2);
    }

    if (this.config.exec) {
      this.emitExec();
    }
    // 最后处理import
    this.save(filepath);
    this.saveInnerModule(ast, filepath);
  }

  emitExec() {
    this.pushImports('sys');
    this.emit(`\n\nif __name__ == '__main__':
    ${this.config.clientName.replace(/(?:^|_)([a-z])/g, (_, c) => (c ? c.toUpperCase() : ''))}.main(sys.argv[1:])\n`);
  }

  visitComments(comments, level) {
    comments.forEach(comment => {
      // 移除注释标记“// ”
      const uncommented = comment.value.slice(3).trim();
      // TODO: 这个地方需要判断什么场景用三引号 什么时候用#
      // 使用三引号包裹并缩进
      // this.emit(`"""\n`,level);
      // this.emit(`${uncommented}\n`, level);
      // this.emit(`"""\n`, level);
      this.emit(`# ${uncommented}\n`, level);
    });
  }


  visitAnnotation(annotation, level) {
    if (!annotation || !annotation.value) {
      return;
    }
    let comments = DSL.comment.getFrontComments(this.comments, annotation.index);
    this.visitComments(comments, level);
    var ast = Annotation.parse(annotation.value);
    var description = ast.items.find((item) => {
      return item.type === 'description';
    });
    var summary = ast.items.find((item) => {
      return item.type === 'summary';
    });
    var _return = ast.items.find((item) => {
      return item.type === 'return';
    });
    var deprecated = ast.items.find((item) => {
      return item.type === 'deprecated';
    });
    var params = ast.items.filter((item) => {
      return item.type === 'param';
    }).map((item) => {
      return {
        name: item.name.id,
        text: item.text.text.trimEnd()
      };
    });
    var throws = ast.items.filter((item) => {
      return item.type === 'throws';
    }).map((item) => {
      return item.text.text.trimEnd();
    });

    const descriptionText = description ? description.text.text.trimEnd() : '';
    const summaryText = summary ? summary.text.text.trimEnd() : '';
    const returnText = _return ? _return.text.text.trimEnd() : '';
    let hasNextSection = false;

    this.emit('"""\n', level);
    if (summaryText !== '') {
      summaryText.split('\n').forEach((line) => {
        this.emit(` * ${line}\n`, level);
      });
      hasNextSection = true;
    }
    if (descriptionText !== '') {
      if (hasNextSection) {
        this.emit(' * \n', level);
      }
      this.emit(' * @remarks\n', level);
      descriptionText.split('\n').forEach((line) => {
        this.emit(` * ${line}\n`, level);
      });
      hasNextSection = true;
    }
    if (deprecated) {
      if (hasNextSection) {
        this.emit(' * \n', level);
      }
      const deprecatedText = deprecated.text.text.trimEnd();
      this.emit(' * @deprecated', level);
      deprecatedText.split('\n').forEach((line, index) => {
        if (index === 0) {
          this.emit(` ${line}\n`);
        } else {
          this.emit(` * ${line}\n`, level);
        }
      });
      hasNextSection = true;
    }
    if (params.length > 0) {
      if (hasNextSection) {
        this.emit(' * \n', level);
      }
      params.forEach((item) => {
        this.emit(` * @param ${item.name} - `, level);
        const items = item.text.trimEnd().split('\n');
        items.forEach((line, index) => {
          if (index === 0) {
            this.emit(`${line}\n`);
          } else {
            this.emit(` * ${line}\n`, level);
          }
        });
      });
    }
    if (returnText !== '') {
      this.emit(' * @returns', level);
      const returns = returnText.split('\n');
      returns.forEach((line, index) => {
        if (index === 0) {
          this.emit(` ${line}\n`);
        } else {
          this.emit(` * ${line}\n`, level);
        }
      });
    }
    if (throws.length > 0) {
      this.emit(' * \n', level);
      throws.forEach((item) => {
        this.emit(' * @throws', level);
        const items = item.trimEnd().split('\n');
        items.forEach((line, index) => {
          if (index === 0) {
            this.emit(` ${line}\n`);
          } else {
            this.emit(` * ${line}\n`, level);
          }
        });
      });
    }
    this.emit('"""', level);
    this.emit('\n');
  }

  visitInit(ast, types, level) {
    assert.equal(ast.type, 'init');
    this.emit('\n');
    types.forEach((item) => {
      let comments = DSL.comment.getFrontComments(this.comments, item.tokenRange[0]);
      this.visitComments(comments, level + 2);
      this.emit(`${_snakeCase(_vid(item.vid))}: `, level + 2);
      this.visitType(item.value);
      this.emit(' = None\n', level);
    });
    if (ast.params.params.length !== 0) {
      this.emit('\n');
      this.emit('def __init__(\n', level + 2);
      this.emit('self,\n', level + 4);
      for (var i = 0; i < ast.params.params.length; i++) {
        const node = ast.params.params[i];
        assert.equal(node.type, 'param');
        const name = _avoidKeywords(_snakeCase(_name(node.paramName)));
        this.emit(`${name}: `, level + 4);
        this.visitType(node.paramType, level);
        this.emit(',');
        if (i !== ast.params.length - 1) {
          this.emit('\n');
        }
      }
      this.emit('):\n', level + 2);
    } else {
      this.emit('def __init__(self):\n', level + 2);
    }
    if (ast.initBody && ast.initBody.stmts.length !== 0) {
      this.isStaticFunction = false;
      this.visitStmts(ast.initBody, level + 4);
      this.isStaticFunction = true;
    } else {
      this.emit('pass\n', level + 4);
    }
  }

  eachImport(imports, usedModels, innerModule, filepath, level) {
    this.moduleTypedef = {};
    if (imports.length > 0) {
      const lockPath = path.join(this.config.pkgDir, '.libraries.json');
      const lock = fs.existsSync(lockPath) ? JSON.parse(fs.readFileSync(lockPath, 'utf8')) : {};
      for (let i = 0; i < imports.length; i++) {
        const item = imports[i];
        let comments = DSL.comment.getFrontComments(this.comments, item.tokenRange[0]);
        this.visitComments(comments, level);
        const aliasId = item.lexeme;
        const main = item.mainModule;
        const inner = item.module;
        const moduleDir = main ? this.config.libraries[main] : this.config.libraries[aliasId];
        const innerPath = item.innerPath;
        if (!moduleDir && innerPath) {
          let pyPath = innerPath.replace(/(\.tea)$|(\.spec)$|(\.dara)$/gi, '') + '.py';
          if (pyPath.startsWith('./') || pyPath.startsWith('../')) {
            pyPath = pyPath.split('/').map(dir => _snakeCase(dir)).join(path.sep);
            pyPath = path.join(path.dirname(filepath), `${pyPath}`);
          } else if (pyPath.startsWith('/')) {
            pyPath = pyPath.split('/').map(dir => _snakeCase(dir)).join(path.sep);
            pyPath = `${pyPath}`;
          }

          const classNamespace = this.getClassNamespace(pyPath);
          const className = this.getInnerClient(aliasId, pyPath);
          const aliasName = this.getAliasName(className, aliasId);
          const filename = _snakeCase(path.basename(pyPath, '.py'));
          this.packageInfo[aliasId] = {
            aliasName: aliasName || className,
            clientName: className,
            namemespace: classNamespace,
            fileName: filename,
            models: `${filename}_models`,
            exceptions: `${filename}_exceptions`,
          };

          innerModule.set(aliasId, pyPath);
          continue;
        }
        let targetPath = '';
        if (moduleDir.startsWith('./') || moduleDir.startsWith('../')) {
          targetPath = path.join(this.config.pkgDir, moduleDir);
        } else if (moduleDir.startsWith('/')) {
          targetPath = moduleDir;
        } else {
          targetPath = path.join(this.config.pkgDir, lock[moduleDir]);
        }
        const pkgPath = fs.existsSync(path.join(targetPath, 'Teafile')) ? path.join(targetPath, 'Teafile') : path.join(targetPath, 'Darafile');
        const pkg = JSON.parse(fs.readFileSync(pkgPath));
        // 这部分是import
        const pyPkg = pkg.python;
        if (!pyPkg) {
          throw new Error(`The '${aliasId}' has no Python supported.`);
        }
        let className = _camelCase(pyPkg.clientName || 'client');
        let filename = _snakeCase(className);
        let classNamespace = pyPkg.package;
        let models = 'models';
        let exceptions = 'exceptions';
        if (inner && pkg.exports[inner]) {
          let pyPath = pkg.exports[inner];
          filename = pyPath.split(path.sep).slice(-1)[0].replace(/(\.tea)$|(\.spec)$|(\.dara)$/gi, '');
          models = filename + '_models';
          exceptions = filename + '_exceptions';
          const arr = pyPath.split(path.sep).slice(1, -1);
          arr.map(key => {
            classNamespace += '.' + _snakeCase(key);
          });
          const exportClientName = pyPkg.exports && pyPkg.exports[inner];
          className = _camelCase(exportClientName || 'Client');
        }
        const aliasName = this.getAliasName(className, aliasId);
        this.packageInfo[aliasId] = {
          aliasName: aliasName || className,
          fileName: filename,
          clientName: className,
          namemespace: classNamespace,
          models: models,
          exceptions: exceptions,
        };
        // 这部分处理setup.py
        if (pkg.releases && pkg.releases.python) {
          const REQUIRE = pkg.releases.python;
          const [pkgName, version] = REQUIRE.split(':');
          this.package.dependencies[pkgName] = `${version}`;
        }
        const typedef = pkg.python && pkg.python.typedef || {};
        this.moduleTypedef[aliasId] = typedef;
        Object.keys(typedef).forEach(type => {
          if (typedef[type].package) {
            let [pack, ver] = typedef[type].package.split(':');
            if (!this.package.dependencies[pack]) {
              this.package.dependencies[pack] = ver;
            }
          }
        });
      }
      this.emit('\n\n');
      this.__externModule = usedModels;
    }
  }

  visitTypedef(type, module) {
    if (module && module.idType === 'module') {
      const aliasId = _name(module);
      if (this.moduleTypedef[aliasId] && this.moduleTypedef[aliasId][type]) {
        if (this.moduleTypedef[aliasId][type].import) {
          this.imports.push({
            packageName: this.moduleTypedef[aliasId][type].import,
            className: this.moduleTypedef[aliasId][type].type,
          });
        }

        return this.getTypedefType(this.moduleTypedef[aliasId][type].type);
      }
    }

    if (type.idType === 'typedef' && this.typedef[type.lexeme]) {
      if (this.typedef[type.lexeme]) {
        if (this.typedef[type.lexeme].import) {
          this.imports.push({
            packageName: this.typedef[type.lexeme].import,
            className: this.typedef[type.lexeme].type,
          });
        }

        return this.getTypedefType(this.typedef[type.lexeme].type);
      }
    }
  }

  getTypedefType(type) {
    if (/\bDict\b/.test(type)) {
      this.usedTypes.push('Dict');
    }

    if (/\bList\b/.test(type)) {
      this.usedTypes.push('List');
    }

    if (/\bAny\b/.test(type)) {
      this.usedTypes.push('Any');
    }

    if (/\bBinaryIO\b/.test(type)) {
      this.usedTypes.push('BinaryIO');
    }

    return type;
  }

  visitParams(ast, level, instanceFunc) {
    level += 2;
    assert.equal(ast.type, 'params');
    if (ast.params.length === 0) {
      this.emit(`(${instanceFunc ? 'self' : ''})`);
      return;
    }
    this.emit('(\n');
    if (instanceFunc) {
      this.emit('self,\n', level);
    }
    for (var i = 0; i < ast.params.length; i++) {
      const node = ast.params[i];
      assert.equal(node.type, 'param');
      const name = _avoidKeywords(_snakeCase(_name(node.paramName)));
      this.emit(`${name}: `, level);
      this.visitType(node.paramType, level);
      this.emit(',');
      if (i !== ast.params.length - 1) {
        this.emit('\n');
      }
    }
    this.emit('\n');
    this.emit(')', level - 2);
  }

  visitType(ast, level) {
    if (ast.type === 'array') {
      this.pushImports('array');
      this.emit('List[');
      this.visitType(ast.subType, level);
      this.emit(']');
    } else if (ast.type === 'moduleModel') {
      const [moduleId, ...rest] = ast.path;
      const modelName = _subModelName(rest.map((item) => item.lexeme).join('.'));
      let type = 'model';
      const externEx = this.usedExternException.get(_name(moduleId));
      if (externEx && externEx.has(modelName)) {
        type = 'exception';
      }
      this.emit(this.getModelName(modelName, _name(moduleId), type));
    } else if (ast.type === 'subModel') {
      const [moduleId, ...rest] = ast.path;
      const modelName = _subModelName([moduleId.lexeme, ...rest.map((item) => {
        return item.lexeme;
      })].join('.'));
      this.emit(this.getModelName(modelName));
    } else if (ast.type === 'moduleTypedef') {
      const [moduleId, ...rest] = ast.path;
      const type = rest.map((item) => { return item.lexeme; }).join('.');
      this.emit(this.visitTypedef(type, moduleId));
    } else if (ast.type === 'typedef' || ast.idType === 'typedef') {
      this.emit(this.visitTypedef(ast));
    } else if (ast.type === 'map') {
      // 记录使用了Dict
      this.pushImports('map');
      this.emit('Dict[');
      this.visitType(ast.keyType, level);
      this.emit(', ');
      this.visitType(ast.valueType, level);
      this.emit(']');
    } else if (ast.type === 'model') {
      const predefined = ast.moduleName ? this.usedExternException.get(ast.moduleName) : this.predefined;
      let type = 'model';
      if (predefined[_name(ast)] && predefined[_name(ast)].isException) {
        type = 'exception';
      }
      this.emit(this.getModelName(_upperFirst(_name(ast)), ast.moduleName, type));
    } else if (ast.idType === 'model') {
      const predefined = ast.moduleName ? this.usedExternException.get(ast.moduleName) : this.predefined;
      let type = 'model';
      if (predefined[_name(ast)] && predefined[_name(ast)].isException) {
        type = 'exception';
      }
      this.emit(this.getModelName(_upperFirst(_name(ast)), ast.moduleName, type));
    } else if (ast.type === 'module') {
      this.emit(this.getModelName('', _name(ast), 'module'));
    } else if (ast.idType === 'module') {
      this.emit(this.getModelName('', _name(ast), 'module'));
    } else if (this.isIterator(ast)) {
      this.visitType(ast.valueType);
    } else if (ast.type === 'entry') {
      this.emit('[str, ');
      this.visitType(ast.valueType);
      this.emit(']');
    } else {
      const typeName = _type(_name(ast));
      this.pushImports(typeName);
      this.emit(typeName);
    }
  }

  visitTypeWithNone(ast, level) {
    this.visitType(ast, level);
    this.emit(' = None');
  }


  visitReturnType(ast, level) {
    this.emit(' -> ');
    if (this.isIterator(ast.returnType)) {
      if (this.isAsyncFunction) {
        this.usedTypes.push('AsyncGenerator');
        this.emit('AsyncGenerator[');
      } else {
        this.usedTypes.push('Generator');
        this.emit('Generator[');
      }
    }

    this.visitType(ast.returnType, level);
    if (this.isIterator(ast.returnType)) {
      this.emit(', None, None]');
    }
  }

  visitAPIBody(ast, level) {
    assert.equal(ast.type, 'apiBody');
    this.pushImports(`${CORE}Request`);
    this.emit(`${REQUEST} = ${CORE}Request()\n`, level);
    this.visitStmts(ast.stmts, level);
  }

  visitRuntimeBefore(ast, level) {
    assert.equal(ast.type, 'object');
    this.emit('_runtime = {\n', level + 2);
    if (ast.fields.length !== 0) {
      ast.fields.forEach((field) => {
        this.emit(`'${field.fieldName.lexeme}': `, level + 4);
        this.visitExpr(field.expr);
        this.emit(',\n');
      });
    }
    this.emit('}\n', level + 2);
    this.emit('_last_request = None\n', level + 2);
    this.emit('_last_response = None\n', level + 2);
    this.emit('_retries_attempted = 0\n', level + 2);
    this.emit(`_context = RetryPolicyContext(
            retries_attempted= _retries_attempted
        )\n`, level + 2);
    this.emit(`while ${CORE}Core.should_retry(_runtime.get('retryOptions'), _context):\n`, level + 2);
    this.emit('if _retries_attempted > 0:\n', level + 4);
    this.emit(`_backoff_time = ${CORE}Core.get_backoff_time(_runtime.get('retryOptions'), _context)\n`, level + 6);
    this.emit('if _backoff_time > 0:\n', level + 6);
    this.emit(`${CORE}Core.sleep(_backoff_time)\n`, level + 8);
    this.emit('_retries_attempted = _retries_attempted + 1\n', level + 4);
    this.emit('try:\n', level + 4);
  }

  visitStmt(ast, level) {
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level);
    if (ast.type === 'return') {
      this.visitReturn(ast, level);
    } else if (ast.type === 'yield') {
      this.visitYield(ast, level);
    } else if (ast.type === 'if') {
      this.visitIf(ast, level);
    } else if (ast.type === 'throw') {
      this.visitThrow(ast, level);
    } else if (ast.type === 'assign') {
      this.visitAssign(ast, level);
    } else if (ast.type === 'retry') {
      this.visitRetry(ast, level);
    } else if (ast.type === 'break') {
      this.emit('break\n', level);
    } else if (ast.type === 'declare') {
      this.visitDeclare(ast, level);
    } else if (ast.type === 'while') {
      this.visitWhile(ast, level);
    } else if (ast.type === 'for') {
      this.visitFor(ast, level);
    } else if (ast.type === 'try') {
      this.visitTry(ast, level);
    } else {
      this.emit('', level);
      this.visitExpr(ast, level);
      this.emit('\n');
    }
  }

  visitFieldType(value, level, modelName, fieldName) {
    if (value.type === 'modelBody') {
      const subModelName = _subModelName([modelName, fieldName].join('.'));
      this.emit(this.getModelName(subModelName));
    } else if (value.type === 'array') {
      this.visitType(value);
    } else if (value.fieldType === 'array') {
      this.pushImports('array');
      this.emit('List[');
      this.visitFieldType(value.fieldItemType, level, modelName, fieldName);
      this.emit(']');
    } else if (value.fieldType === 'map') {
      this.pushImports('map');
      this.emit('Dict[');
      this.emit(`${_type(_name(value.keyType))}, `);
      this.visitFieldType(value.valueType);
      this.emit(']');
    } else if (value.type === 'map') {
      this.pushImports('map');
      this.emit('Dict[');
      this.emit(`${_type(_name(value.keyType))}, `);
      this.visitFieldType(value.valueType);
      this.emit(']');
    } else if (value.tag === Tag.TYPE) {
      const type = _type(value.lexeme);
      this.pushImports(type);
      this.emit(`${type}`);
    } else if (value.tag === Tag.ID) {
      this.visitType(value);
    } else if (value.type === 'moduleModel') {
      let type = 'model';
      const [moduleId, ...models] = value.path;
      const modelName = _subModelName(models.map((item) => item.lexeme).join('.'));
      const externEx = this.usedExternException.get(_name(moduleId.lexeme));
      if (externEx && externEx.has(modelName)) {
        type = 'exception';
      }

      this.emit(this.getModelName(modelName, _name(moduleId)), type);

    } else if (value.type === 'subModel') {
      const [moduleId, ...rest] = value.path;
      const modelName = _subModelName([moduleId.lexeme, ...rest.map((item) => {
        return item.lexeme;
      })].join('.'));
      this.emit(this.getModelName(modelName));
    } else if (typeof value.fieldType === 'string') {
      const type = _type(value.fieldType);
      this.pushImports(type);
      this.emit(type);
    } else if (value.fieldType.type === 'moduleModel') {
      let type = 'model';
      const [moduleId, ...models] = value.fieldType.path;
      const modelName = _subModelName(models.map((item) => item.lexeme).join('.'));
      const externEx = this.usedExternException.get(_name(moduleId.lexeme));
      if (externEx && externEx.has(modelName)) {
        type = 'exception';
      }
      this.emit(this.getModelName(modelName, _name(moduleId), type));

    } else if (value.fieldType.type === 'moduleTypedef') {
      const [moduleId, ...rest] = value.fieldType.path;
      const type = rest.map((item) => { return item.lexeme; }).join('.');
      this.emit(this.visitTypedef(type, moduleId));
    } else if (value.fieldType.type === 'typedef' || value.fieldType.idType === 'typedef') {
      this.emit(this.visitTypedef(value.fieldType));
    } else if (value.fieldType.type === 'subModel') {
      const [moduleId, ...rest] = value.fieldType.path;
      const modelName = _subModelName([moduleId.lexeme, ...rest.map((item) => {
        return item.lexeme;
      })].join('.'));
      this.emit(this.getModelName(modelName));
    } else if (value.fieldType.type) {
      const type = _type(value.fieldType.lexeme);
      this.pushImports(type);
      this.emit(`${type}`);
    } else if (value.fieldType.idType === 'model') {
      const predefined = value.fieldType.moduleName ? this.usedExternException.get(value.fieldType.moduleName) : this.predefined;
      let type = 'model';
      if (predefined[_name(value.fieldType)] && predefined[_name(value.fieldType)].isException) {
        type = 'exception';
      }
      this.emit(this.getModelName(_name(value.fieldType), value.fieldType.moduleName, type));
    } else if (value.fieldType.idType === 'module') {
      this.emit(this.getModelName('', _type(_name(value.fieldType)), 'module'));
    } else if (value.fieldType.idType === 'builtin_model') {
      const type = _type(value.fieldType.lexeme);
      this.pushImports(type);
      this.emit(`${type}`);
    }
  }

  visitModelBody(ast, level, modelName) {
    assert.equal(ast.type, 'modelBody');
    this.visitFieldsInit(ast, level, modelName);
    let node;

    for (let i = 0; i < ast.nodes.length; i++) {
      node = ast.nodes[i];
      let comments = DSL.comment.getFrontComments(this.comments, node.tokenRange[0]);
      this.visitComments(comments, level);
      let param = _avoidKeywords(_snakeCase(_escape(_name(node.fieldName))));
      const description = this.getAttributes(node, 'description');
      if (description) {
        const descriptions = description.trimEnd().split('\n');
        for (let j = 0; j < descriptions.length; j++) {
          this.emit(`# ${descriptions[j]}\n`, level + 2);
        }
      }
      this.emit(`self.${param} = ${param}\n`, level + 2);
    }
    this.emit('\n');
    // validate
    this.emit('def validate(self):\n', level);
    if (ast.nodes.length > 0) {
      this.visitModelValidate(ast, level);
    } else {
      this.emit('pass\n', level + 2);
    }

    this.emit('\n');

    // to_map
    this.visitToMap(ast, level);


    // from_map
    this.visitFromMap(ast, modelName, level);

    if (node) {
      //find the last node's back comment
      let comments = DSL.comment.getBetweenComments(this.comments, node.tokenRange[0], ast.tokenRange[1]);
      this.visitComments(comments, level);
    }

    if (ast.nodes.length === 0) {
      //empty block's comment
      let comments = DSL.comment.getBetweenComments(this.comments, ast.tokenRange[0], ast.tokenRange[1]);
      this.visitComments(comments, level);
    }

  }

  visitFieldValidate(fieldValue, fieldName, value, level) {
    const deep = Math.floor(level / 4);
    if (fieldValue.type === 'modelBody' || fieldValue.type === 'moduleModel' ||
      fieldValue.type === 'subModel' || fieldValue.idType === 'model' ||
      (fieldValue.fieldType && (fieldValue.fieldType.type === 'moduleModel' ||
        fieldValue.fieldType.idType === 'model' || fieldValue.fieldType.idType === 'builtin_model'))) {
      if (deep > 1) {
        this.emit(` if ${value}:\n`, level);
      }
      this.emit(`${value}.validate()\n`, level + 2);
    } else if (fieldValue.type === 'array' || fieldValue.fieldType === 'array') {
      this.emit(`for v${deep} in ${value}:\n`, level);
      this.visitFieldValidate(fieldValue.fieldItemType || fieldValue.subType, fieldName, `v${deep}`, level + 2);
    } else if (fieldValue.fieldType === 'map' || fieldValue.type === 'map') {
      this.emit(`for v${deep} in self.${fieldName}.values():\n`, level);
      this.visitFieldValidate(fieldValue.valueType, fieldName, `v${deep}`, level + 2);
    } else {
      if (deep > 1) {
        this.emit(` if ${value}:\n`, level);
      }
      this.emit(`${value}.validate()\n`, level + 2);
    }
  }

  visitModelValidate(ast, level) {
    let notPass = false;
    for (let i = 0; i < ast.nodes.length; i++) {
      const node = ast.nodes[i];
      const pattern = this.getAttributes(node, 'pattern') || '';
      const maxLength = this.getAttributes(node, 'maxLength') || 0;
      const minLength = this.getAttributes(node, 'minLength') || 0;
      const maximum = this.getAttributes(node, 'maximum') || 0;
      const minimum = this.getAttributes(node, 'minimum') || 0;
      let comments = DSL.comment.getFrontComments(this.comments, node.tokenRange[0]);
      this.visitComments(comments, level);
      let param = _avoidKeywords(_snakeCase(_escape(_name(node.fieldName))));
      // 这里判断类中属性是否是必填
      if (node.required) {
        notPass = true;
        this.emit(`self.validate_required(self.${param}, '${param}')\n`, level + 2);
      }
      // 这里判断类中属性的结构
      if (node.fieldValue.fieldType === 'array' || node.fieldValue.fieldType === 'map' ||
        node.fieldValue.type === 'array' || node.fieldValue.type === 'map'
      ) {
        // 下面不包含model的就不需要validate
        if (!this.checkFieldHasModel(node.fieldValue)) {
          continue;
        }
        notPass = true;
        this.emit(`if self.${param}:\n`, level + 2);
        this.visitFieldValidate(node.fieldValue, param, `self.${param}`, level + 4);
      } else if (node.fieldValue.fieldType && node.fieldValue.fieldType.idType === 'model' || node.fieldValue.type === 'modelBody') {
        notPass = true;
        this.emit(`if self.${param}:\n`, level + 2);
        this.emit(`self.${param}.validate()\n`, level + 4);
      } else if (pattern !== '') {
        notPass = true;
        this.emit(`if self.${param} is not None:\n`, level + 2);
        this.emit(`self.validate_pattern(self.${param}, '${param}', '${pattern}')\n`, level + 4);
      } else if (maxLength > 0 && maxLength <= 2147483647) {
        notPass = true;
        this.emit(`if self.${param} is not None:\n`, level + 2);
        this.emit(`self.validate_max_length(self.${param}, '${param}', ${maxLength})\n`, level + 4);
      } else if (minLength > 0 && minLength <= 2147483647) {
        notPass = true;
        this.emit(`if self.${param} is not None:\n`, level + 2);
        this.emit(`self.validate_min_length(self.${param}, '${param}', ${minLength})\n`, level + 4);
      } else if (maximum > 0 && maximum <= Number.MAX_SAFE_INTEGER) {
        notPass = true;
        this.emit(`if self.${param} is not None:\n`, level + 2);
        this.emit(`self.validate_maximum(self.${param}, '${param}', ${maximum})\n`, level + 4);
      } else if (minimum > 0 && minimum <= Number.MAX_SAFE_INTEGER) {
        notPass = true;
        this.emit(`if self.${param} is not None:\n`, level + 2);
        this.emit(`self.validate_minimum(self.${param}, '${param}', ${minimum})\n`, level + 4);
      }
    }

    if (!notPass) {
      this.emit('pass\n', level + 2);
    }
  }

  visitToMapField(fieldValue, fieldName, key, value, level, arr = false) {
    const deep = Math.floor((level - 4) / 2);
    if (fieldValue.type === 'modelBody' || fieldValue.type === 'moduleModel' ||
      fieldValue.type === 'subModel' || fieldValue.idType === 'model' ||
      (fieldValue.fieldType && (fieldValue.fieldType.type === 'moduleModel' ||
        fieldValue.fieldType.idType === 'model' || fieldValue.fieldType.idType === 'builtin_model'))) {
      let realVal = `${value}.to_map()`;
      if (deep > 1) {
        realVal += ` if ${value} else None`;
      }
      this.emitFieldConvert(key, realVal, level, arr);
    } else if (fieldValue.type === 'array' || fieldValue.fieldType === 'array') {
      let subKey = key;
      if (deep > 1) {
        subKey = `l${deep - 1}`;
        this.emit(`${subKey} = []\n`, level);
      }
      this.emit(`for k${deep} in ${value}:\n`, level);
      this.visitToMapField(fieldValue.fieldItemType || fieldValue.subType, fieldName, `${subKey}`, `k${deep}`, level + 2, true);
      if (deep > 1) {
        this.emitFieldConvert(key, subKey, level, arr);
      }
    } else if (fieldValue.fieldType === 'map' || fieldValue.type === 'map') {
      let subKey = key;
      if (deep > 1) {
        subKey = `d${deep - 1}`;
        this.emit(`${subKey} = {}\n`, level);
      }
      this.emit(`for k${deep}, v${deep} in self.${fieldName}.items():\n`, level);
      this.visitToMapField(fieldValue.valueType, fieldName, `${subKey}[k${deep}]`, `v${deep}`, level + 2);
      if (deep > 1) {
        this.emitFieldConvert(key, subKey, level, arr);
      }
    } else {
      this.emitFieldConvert(key, value, level, arr);
    }

  }

  visitToMap(ast, level) {
    this.emit('def to_map(self):\n', level);
    this.emit('result = dict()\n', level + 2);
    this.emit('_map = super().to_map()\n', level + 2);
    this.emit('if _map is not None:\n', level + 2);
    this.emit('result = _map\n', level + 4);
    for (let i = 0; i < ast.nodes.length; i++) {
      const node = ast.nodes[i];
      let realName = this.getRealName(node);
      let comments = DSL.comment.getFrontComments(this.comments, node.tokenRange[0]);
      this.visitComments(comments, level);
      let param = _avoidKeywords(_snakeCase(_escape(_name(node.fieldName))));
      const hasModel = this.checkFieldHasModel(node.fieldValue);
      let arr = false;
      if (hasModel && !this.config.noneEmpty) {
        if (node.fieldValue.type === 'array' || node.fieldValue.fieldType === 'array') {
          this.emit(`result['${realName}'] = []\n`, level + 2);
          arr = true;
        } else if (node.fieldValue.fieldType === 'map' || node.fieldValue.type === 'map') {
          this.emit(`result['${realName}'] = {}\n`, level + 2);
        }
      }
      this.emit(`if self.${param} is not None:\n`, level + 2);
      if (!hasModel) {
        this.emit(`result['${realName}'] = self.${param}\n`, level + 4);
      } else {
        if (this.config.noneEmpty) {
          if (node.fieldValue.type === 'array' || node.fieldValue.fieldType === 'array') {
            this.emit(`result['${realName}'] = []\n`, level + 4);
            arr = true;
          } else if (node.fieldValue.fieldType === 'map' || node.fieldValue.type === 'map') {
            this.emit(`result['${realName}'] = {}\n`, level + 4);
          }
        }
        this.visitToMapField(node.fieldValue, param, `result['${realName}']`, `self.${param}`, level + 4, arr);
      }
      this.emit('\n');
    }
    this.emit('return result\n', level + 2);
    this.emit('\n');
  }

  emitFieldConvert(key, value, level, arr) {
    if (arr) {
      this.emit(`${key}.append(${value})\n`, level);
      return;
    }
    this.emit(`${key} = ${value}\n`, level);
  }

  visitFromField(fieldValue, fieldName, key, value, level, arr = false) {
    const deep = Math.floor((level - 4) / 2);
    if (fieldValue.type === 'modelBody') {
      const subModelName = _subModelName(fieldName);
      this.emit(`temp_model = ${this.getModelName(subModelName)}()\n`, level);
      this.emitFieldConvert(key, `temp_model.from_map(${value})`, level, arr);
    } else if (fieldValue.type === 'array' || fieldValue.fieldType === 'array') {
      let subKey = key;
      if (deep > 1) {
        subKey = `l${deep - 1}`;
        this.emit(`${subKey} = []\n`, level);
      }
      this.emit(`for k${deep} in ${value}:\n`, level);
      this.visitFromField(fieldValue.fieldItemType || fieldValue.subType, fieldName, `${subKey}`, `k${deep}`, level + 2, true);
      if (deep > 1) {
        this.emitFieldConvert(key, subKey, level, arr);
      }
    } else if (fieldValue.fieldType === 'map' || fieldValue.type === 'map') {
      let subKey = key;
      if (deep > 1) {
        subKey = `d${deep - 1}`;
        this.emit(`${subKey} = {}\n`, level);
      }
      this.emit(`for k${deep}, v${deep} in ${value}.items():\n`, level);
      this.visitFromField(fieldValue.valueType, fieldName, `${subKey}[k${deep}]`, `v${deep}`, level + 2);
      if (deep > 1) {
        this.emitFieldConvert(key, subKey, level, arr);
      }
    } else if (fieldValue.type === 'moduleModel' ||
      (fieldValue.fieldType && fieldValue.fieldType.type === 'moduleModel')) {
      const [moduleId, ...rest] = fieldValue.path || fieldValue.fieldType.path;
      const modelName = _subModelName(rest.map((item) => {
        return item.lexeme;
      }).join('.'));
      this.emit(`temp_model = ${this.getModelName(modelName, _name(moduleId))}()\n`, level);
      this.emitFieldConvert(key, `temp_model.from_map(${value})`, level, arr);
    } else if (fieldValue.type === 'subModel') {
      const [moduleId, ...rest] = fieldValue.path;
      const subModelName = _subModelName([moduleId.lexeme, ...rest.map((item) => {
        return item.lexeme;
      })].join('.'));
      this.emit(`temp_model = ${this.getModelName(subModelName)}()\n`, level);
      this.emitFieldConvert(key, `temp_model.from_map(${value})`, level, arr);
    } else if (fieldValue.idType === 'model') {
      const modelName = _type(_name(fieldValue));
      this.emit(`temp_model = ${this.getModelName(modelName)}()\n`, level);
      this.emitFieldConvert(key, `temp_model.from_map(${value})`, level, arr);
    } else if (fieldValue.fieldType && fieldValue.fieldType.idType === 'model') {
      const modelName = _type(_name(fieldValue.fieldType));
      this.emit(`temp_model = ${this.getModelName(modelName)}()\n`, level);
      this.emitFieldConvert(key, `temp_model.from_map(${value})`, level, arr);
    } else if (fieldValue.fieldType && fieldValue.fieldType.idType === 'builtin_model') {
      const typeName = _type(_name(fieldValue.fieldType));
      this.pushImports(typeName);
      this.emit(`temp_model = ${typeName}()\n`, level);
      this.emitFieldConvert(key, `temp_model.from_map(${value})`, level, arr);
    } else {
      this.emitFieldConvert(key, value, level, arr);
    }

  }

  visitFromMap(ast, modelName, level) {
    // 
    this.emit('def from_map(self, m: dict = None):\n', level);
    this.emit('m = m or dict()\n', level + 2);
    for (let i = 0; i < ast.nodes.length; i++) {
      const node = ast.nodes[i];
      let realName = this.getRealName(node);
      let comments = DSL.comment.getFrontComments(this.comments, node.tokenRange[0]);
      this.visitComments(comments, level);
      let param = _avoidKeywords(_snakeCase(_escape(_name(node.fieldName))));
      const hasModel = this.checkFieldHasModel(node.fieldValue);
      let arr = false;
      if (hasModel && !this.config.noneEmpty) {
        if (node.fieldValue.type === 'array' || node.fieldValue.fieldType === 'array') {
          this.emit(`self.${param} = []\n`, level + 2);
          arr = true;
        } else if (node.fieldValue.fieldType === 'map' || node.fieldValue.type === 'map') {
          this.emit(`self.${param} = {}\n`, level + 2);
          arr = false;
        }
      }
      this.emit(`if m.get('${realName}') is not None:\n`, level + 2);
      if (!hasModel) {
        this.emit(`self.${param} = m.get('${realName}')\n`, level + 4);
      } else {
        if (this.config.noneEmpty) {
          if (node.fieldValue.type === 'array' || node.fieldValue.fieldType === 'array') {
            this.emit(`self.${param} = []\n`, level + 4);
            arr = true;
          } else if (node.fieldValue.fieldType === 'map' || node.fieldValue.type === 'map') {
            this.emit(`self.${param} = {}\n`, level + 4);
            arr = false;
          }
        }
        this.visitFromField(node.fieldValue, [modelName, _name(node.fieldName)].join('.'), `self.${param}`, `m.get('${realName}')`, level + 4, arr);
      }
      this.emit('\n');
    }
    this.emit('return self\n', level + 2);
    this.emit('\n');
  }

  getAttributes(ast, name) {
    const attr = ast.attrs.find((item) => {
      return item.attrName.lexeme === name;
    });
    if (!attr) {
      return;
    }
    return attr.attrValue.string || attr.attrValue.lexeme || attr.attrValue.value;
  }

  extendBaseErr(extendOn) {
    if (!extendOn) {
      return true;
    }
    if (_name(extendOn) === '$Error') {
      return true;
    }

    return false;
  }

  visitExtendOn(extendOn, type = 'model') {
    if (!extendOn) {
      type === 'model' ? this.pushImports(`${CORE}Model`) : this.pushImports(`${CORE}Exception`);
      return type === 'model' ? this.emit(`(${CORE}Model)`) : this.emit(`(${CORE}Exception)`);
    }

    switch (_name(extendOn)) {
    case '$Error':
      this.pushImports(`${CORE}Exception`);
      this.emit(`(${CORE}Exception)`);
      return;
    case '$ResponseError':
      this.pushImports('ResponseException');
      this.emit('(ResponseException)');
      return;
    case '$Model':
      this.pushImports(`${CORE}Model`);
      this.emit(`(${CORE}Model)`);
      return;
    }

    let needBaseException = false;

    if (extendOn.type === 'moduleModel') {
      const [moduleId, ...rest] = extendOn.path;
      const moduleName = _name(moduleId);
      const modelName = _subModelName(rest.map((item) => {
        return item.lexeme;
      }).join('.'));

      const externModel = this.usedExternModel.get(moduleName);
      if (externModel && externModel.has(modelName) && type === 'exception') {
        needBaseException = true;
      }

      this.emit(`(${this.getModelName(modelName, moduleName, type)}`);
    } else if (extendOn.type === 'subModel') {
      const [moduleId, ...rest] = extendOn.path;
      const subModelName = _subModelName([moduleId.lexeme, ...rest.map((item) => {
        return item.lexeme;
      })].join('.'));
      this.emit(`(${this.emit(this.getModelName(subModelName, '', type))}`);
    } else {
      this.emit('(');
      this.emit(this.getModelName(_upperFirst(_name(extendOn)), extendOn.moduleName, type));
    }
    if (needBaseException) {
      this.emit(`, ${CORE}Exception`);
    }
    this.emit(')');
  }

  dealExtendFileds(ast) {
    const fileds = [];
    for (let i = 0; i < ast.nodes.length; i++) {
      const node = ast.nodes[i];
      const fieldName = _name(node.fieldName);
      fileds.push(fieldName);
    }
    const extendFileds = [];
    for (let i = 0; i < ast.extendFileds.length; i++) {
      const node = ast.extendFileds[i];
      node.extend = true;
      const fieldName = _name(node.fieldName);
      if (fileds.includes(fieldName)) {
        continue;
      }
      extendFileds.push(node);

    }
    return extendFileds.concat(ast.nodes);
  }

  visitModel(modelBody, modelName, extendOn, level, filename) {
    // const modelDir = path.join(path.dirname(filepath), this.modelDir);
    this.emit(`class ${modelName}`, level);
    this.visitExtendOn(extendOn);
    this.emit(':\n');
    this.visitModelBody(modelBody, level + 2, modelName);
    this.saveBuffer(path.join(this.modelPath, filename || `_${_snakeCase(modelName)}.py`));
    this.usedTypes = [];
    this.imports = [];
    this.output = '';
  }

  saveBuffer(filepath) {
    if (this.fileBuffer[filepath]) {
      this.fileBuffer[filepath].imports = this.imports.concat(this.fileBuffer[filepath].imports);
      this.fileBuffer[filepath].usedTypes = this.usedTypes.concat(this.fileBuffer[filepath].usedTypes);
      this.fileBuffer[filepath].output = this.output + this.fileBuffer[filepath].output;
      return;
    }

    this.fileBuffer[filepath] = {
      imports: this.imports,
      usedTypes: this.usedTypes,
      output: this.output,
    };
  }

  flushBuffer() {
    Object.keys(this.fileBuffer).map(filepath => {
      this.output = this.fileBuffer[filepath].output;
      this.imports = this.fileBuffer[filepath].imports;
      this.usedTypes = this.fileBuffer[filepath].usedTypes;
      this.save(filepath);
      this.output = '';
      this.imports = [];
      this.usedTypes = [];
    });
  }

  eachModel(ast, level) {
    assert.equal(ast.type, 'model');
    const modelName = _upperFirst(_name(ast.modelName));
    this.visitAnnotation(ast.annotation, level);
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level);
    this.visitModel(ast.modelBody, modelName, ast.extendOn, level);
  }

  visitModelInit(models, subModels) {
    const modelNames = [];
    const moreExports = this.moreExports || [];
    for (let i = 0; i < models.length; i++) {
      const ast = models[i];
      const modelName = _subModelName(_name(ast.modelName));
      modelNames.push(modelName);
      this.emit(`from ._${_snakeCase(modelName)} import ${modelName}\n`);
    }

    for (let i = 0; i < subModels.length; i++) {
      const ast = subModels[i];
      const modelName = _subModelName(_name(ast.modelName));
      const mainModelName = _name(ast.modelName).split('.')[0];
      modelNames.push(modelName);
      this.emit(`from ._${_snakeCase(mainModelName)} import ${modelName}\n`);
    }

    this.emit('\n__all__ = [\n');
    this.emit(modelNames.join(',\n    '), 2);
    if (moreExports && moreExports.length > 0) {
      this.emit((',\n'));
      this.emit(moreExports.join(',\n    '), 2);
    }

    this.emit('\n]\n');

    this.save(path.join(this.modelPath, '__init__.py'));
    this.moreExports = [];
  }

  visitFieldsInit(ast, level, modelName, type = 'model', baseErr = false) {
    let node;
    this.emit('    def __init__(');
    const paramNodes = this.dealExtendFileds(ast);
    if (!paramNodes.length) {
      this.emit('self):\n');
      this.emit('pass', level + 2);
      return;
    }
    this.emit('\n');
    this.emit(`self,${this.config.strictModel ? ' *,' : ''}\n`, level + 2);
    for (let i = 0; i < paramNodes.length; i++) {
      node = paramNodes[i];
      if (!node.extend) {
        let comments = DSL.comment.getFrontComments(this.comments, node.tokenRange[0]);
        this.visitComments(comments, level);
      }
      let param = _avoidKeywords(_snakeCase(_escape(_name(node.fieldName))));
      if (param === 'name' && type === 'exception') {
        continue;
      }
      this.emit(`${param}: `, level + 2);
      this.visitFieldType(node.fieldValue, level, modelName, _name(node.fieldName));
      this.emit(' = None,\n');
    }
    this.emit('):\n', level);

    if (ast.extendFileds && ast.extendFileds.length > 0) {
      this.emit('super().__init__(', level + 2);
      if (baseErr) {
        this.emit('{\n');
        for (let i = 0; i < ast.extendFileds.length; i++) {
          node = ast.extendFileds[i];
          let value = _snakeCase(_escape(_name(node.fieldName)));
          let key = _avoidKeywords(_escape(_name(node.fieldName)));
          if (key === 'name' && type === 'exception') {
            continue;
          }
          this.emit(`'${key}': ${value},\n`, level + 4);
        }
        this.emit('})\n', level + 2);
      } else {
        this.emit('\n');
        for (let i = 0; i < ast.extendFileds.length; i++) {
          node = ast.extendFileds[i];
          let param = _avoidKeywords(_snakeCase(_escape(_name(node.fieldName))));
          if (param === 'name' && type === 'exception') {
            continue;
          }
          this.emit(`${param} = ${param},\n`, level + 4);
        }
        this.emit(')\n', level + 2);
      }
    }
  }

  visitEcxceptionBody(ast, extendOn, exceptionName, level) {
    assert.equal(ast.type, 'exceptionBody');
    this.visitFieldsInit(ast, level, exceptionName, 'exception', this.extendBaseErr(extendOn));
    let node;

    this.emit(`self.name = '${exceptionName}Exception'\n`, level + 2);
    for (let i = 0; i < ast.nodes.length; i++) {
      node = ast.nodes[i];
      let comments = DSL.comment.getFrontComments(this.comments, node.tokenRange[0]);
      this.visitComments(comments, level);
      let param = _avoidKeywords(_snakeCase(_escape(_name(node.fieldName))));
      if (param === 'name') {
        continue;
      }
      this.emit(`self.${param} = ${param}\n`, level + 2);
    }
    this.emit('\n');
    if (node) {
      //find the last node's back comment
      let comments = DSL.comment.getBetweenComments(this.comments, node.tokenRange[0], ast.tokenRange[1]);
      this.visitComments(comments, level);
    }

    if (ast.nodes.length === 0) {
      //empty block's comment
      let comments = DSL.comment.getBetweenComments(this.comments, ast.tokenRange[0], ast.tokenRange[1]);
      this.visitComments(comments, level);
    }
  }

  visitException(exceptionBody, exceptionName, extendOn, level) {
    this.emit(`class ${exceptionName}Exception`, level);
    this.visitExtendOn(extendOn, 'exception');
    this.emit(':\n');
    this.visitEcxceptionBody(exceptionBody, extendOn, exceptionName, level + 2);
    this.saveBuffer(path.join(this.exceptionPath, `_${_snakeCase(exceptionName)}.py`));
    this.usedTypes = [];
    this.imports = [];
    this.output = '';
  }

  eachException(ast, level) {
    assert.equal(ast.type, 'exception');
    const exceptionName = _upperFirst(_name(ast.exceptionName));
    this.visitAnnotation(ast.annotation, level);
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level);
    this.visitException(ast.exceptionBody, exceptionName, ast.extendOn, level);
  }

  visitExceptionInit(excpetions) {
    const exceptionNames = [];
    for (let i = 0; i < excpetions.length; i++) {
      const ast = excpetions[i];
      const exceptionName = _subModelName(_name(ast.exceptionName));
      exceptionNames.push(exceptionName);
      this.emit(`from ._${_snakeCase(exceptionName)} import ${exceptionName}Exception\n`);
    }

    this.emit('\n__all__ = [\n');
    this.emit(exceptionNames.join('Exception,\n    '), 2);
    this.emit('Exception\n]\n');

    this.save(path.join(this.exceptionPath, '__init__.py'));
  }

  eachSubModel(ast, level) {
    assert.equal(ast.type, 'model');
    const modelName = _subModelName(_name(ast.modelName));
    const mainModelName = _name(ast.modelName).split('.')[0];
    this.visitModel(ast.modelBody, modelName, ast.extendOn, level, `_${_snakeCase(mainModelName)}.py`);
  }

  visitObjectFieldValue(ast, level) {
    this.visitExpr(ast, level);
  }

  visitObjectField(ast, level, end) {
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level);
    if (ast.type === 'objectField') {
      // TODO 这里粗暴处理的双引号，可以考虑优化
      var key = _escape(_name(ast.fieldName) || _string(ast.fieldName)).replace(/['"]/g, '');
      this.emit(`'${key}': `, level + 2);
      this.visitObjectFieldValue(ast.expr, level + 2);
      if (!end) {
        this.emit(',\n');
      } else {
        this.emit('\n');
      }
    } else if (ast.type !== 'expandField') {
      throw new Error('unimpelemented');
    }
  }

  visitModelField(ast, level, end) {
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level);
    if (ast.type === 'objectField') {
      // TODO 这里粗暴处理的双引号，可以考虑优化
      var key = _escape(_name(ast.fieldName) || _string(ast.fieldName)).replace(/['"]/g, '');
      this.emit(`${_avoidKeywords(_snakeCase(key))} = `, level + 2);
      this.visitObjectFieldValue(ast.expr, level + 2);
      if (!end) {
        this.emit(',\n');
      } else {
        this.emit('\n');
      }
    } else if (ast.type !== 'expandField') {
      throw new Error('unimpelemented');
    }
  }

  visitObject(ast, level) {
    assert.equal(ast.type, 'object');
    if (ast.fields.length === 0) {
      this.emit('{');
      let comments = DSL.comment.getBetweenComments(this.comments, ast.tokenRange[0], ast.tokenRange[1]);
      if (comments.length > 0) {
        this.emit('\n');
        this.visitComments(comments, level + 2);
        this.emit('', level);
      }
      this.emit('}');
    } else {
      var expandFields = [];
      for (var i = 0; i < ast.fields.length; i++) {
        if (ast.fields[i].type !== 'expandField') {
          continue;
        }
        expandFields.push(ast.fields[i]);
      }
      if (expandFields.length !== 0) {
        this.pushImports(`${CORE}Core`);
        this.emit(`${CORE}Core.merge({`);
        if (ast.fields.length !== expandFields.length) {
          this.emit('\n');
        }
      } else {
        this.emit('{\n');
      }
      for (i = 0; i < ast.fields.length; i++) {
        this.visitObjectField(ast.fields[i], level, i === ast.fields.length - 1);
      }

      if (expandFields.length !== 0) {
        if (ast.fields.length !== expandFields.length) {
          this.emit('', level);
        }
        this.emit('}, ');
        this.visitExpr(expandFields[0].expr);
        expandFields.slice(1).forEach((item) => {
          this.emit(', ');
          this.visitExpr(item.expr);
        });
        this.emit(')');
      } else {
        this.emit('}', level);
      }

      let comments = DSL.comment.getBetweenComments(this.comments, ast.fields[i - 1].tokenRange[0], ast.tokenRange[1]);
      this.visitComments(comments, level + 1);
    }
  }

  visitMethodCall(ast, level) {
    assert.equal(ast.left.type, 'method_call');
    const name = _name(ast.left.id);
    const functionName = _avoidKeywords(_snakeCase(name));
    if (name.startsWith('$') && this.builtin[name]) {
      const method = name.replace('$', '');
      this.builtin[name][method](ast, level, ast.isAsync && this.isAsyncFunction);
      return;
    } else if (this.isStaticFunction === false && this.isAsyncFunction && ast.isAsync) {
      this.emit(`await self.${functionName}_async`);
    } else if (this.isStaticFunction === false) {
      this.emit(`self.${functionName}`);
    } else if (ast.isAsync && this.isAsyncFunction) {
      this.emit(`await ${this.className}.${functionName}_async`);
    } else {
      const functionName = _snakeCase(name);
      this.emit(`${this.className}.${functionName}`);
    }
    this.visitArgs(ast.args, level);
  }


  visitInstanceCall(ast, level) {
    assert.equal(ast.left.type, 'instance_call');
    const method = _name(ast.left.propertyPath[0]);
    const async = ast.isAsync && this.isAsyncFunction;
    if (async) {
      this.emit('await ');
    }
    if (ast.builtinModule && this.builtin[ast.builtinModule] && this.builtin[ast.builtinModule][method]) {
      this.builtin[ast.builtinModule][method](ast, level, async);
    } else {
      if (ast.left.id.tag === DSL.Tag.Tag.VID) {
        this.emit(`self.${_snakeCase(_vid(ast.left.id))}`);
      } else {
        const aliasId = _snakeCase(_name(ast.left.id));
        this.emit(aliasId);
      }
      this.emit(`.${(_avoidKeywords(_snakeCase(method)))}`);
      if (async) {
        this.emit('_async');
      }
      this.visitArgs(ast.args, level);
    }
  }

  visitStaticCall(ast, level) {
    assert.equal(ast.left.type, 'static_call');
    if (ast.left.id.type === 'builtin_module') {
      this.visitBuiltinStaticCall(ast, level);
      return;
    }


    const aliasId = _name(ast.left.id);
    let clientName = this.getModelName('', aliasId, 'module');

    const functionName = _avoidKeywords(_snakeCase(_name(ast.left.propertyPath[0])));

    if (ast.isAsync && this.isAsyncFunction) {
      this.emit(`await ${clientName}.${functionName}_async`);
    } else {
      this.emit(`${clientName}.${functionName}`);
    }
    this.visitArgs(ast.args, level);
  }

  visitBuiltinStaticCall(ast, level) {
    const moduleName = _name(ast.left.id);

    const builtiner = this.builtin[moduleName];
    if (!builtiner) {
      throw new Error('un-implemented');
    }
    const func = _name(ast.left.propertyPath[0]);
    builtiner[func](ast, level, ast.isAsync && this.isAsyncFunction);
  }

  visitCall(ast, level) {
    // TODO 这块目前都进了method_call 下面两个分支不知道有没有用
    assert.equal(ast.type, 'call');
    if (ast.left.type === 'method_call') {
      this.visitMethodCall(ast, level);
    } else if (ast.left.type === 'instance_call') {
      this.visitInstanceCall(ast, level);
    } else if (ast.left.type === 'static_call') {
      this.visitStaticCall(ast, level);
    } else {
      throw new Error('un-implemented');
    }
  }

  visitConstruct(ast, level) {
    assert.equal(ast.type, 'construct');
    const aliasId = _name(ast.aliasId);

    if (this.builtin[aliasId]) {
      const type = _type(aliasId);
      this.pushImports(type);
      this.emit(type);
    } else {
      this.emit(this.getModelName('', aliasId, 'module'));
    }

    this.visitArgs(ast.args, level);
  }


  visitSuper(ast, level) {
    assert.equal(ast.type, 'super');
    this.emit('super().__init__');
    this.visitArgs(ast.args, level);
  }

  visitArgs(args, level) {
    this.emit('(');
    for (let i = 0; i < args.length; i++) {
      const expr = args[i];
      if (expr.needCast) {
        this.emit(`${CORE}Core.to_map(`);
        this.visitExpr(expr, level);
        this.emit(')');
      } else {
        this.visitExpr(expr, level);
      }
      if (i !== args.length - 1) {
        this.emit(', ');
      }
    }
    this.emit(')');
  }

  visitPropertyAccess(ast, env = {}) {
    assert.ok(ast.type === 'property_access' || ast.type === 'property');
    var id = _snakeCase(_name(ast.id));
    if (ast.id.tag === Tag.VID) {
      id = `self.${_snakeCase(_vid(ast.id))}`;
    }
    var expr = _avoidKeywords(id);
    const prefix = env.left ? '[' : '.get(';
    const suffix = env.left ? ']' : ')';
    var current = ast.id.inferred;

    for (var i = 0; i < ast.propertyPath.length; i++) {
      var name = _name(ast.propertyPath[i]);
      if (current.type === 'model') {
        expr += `.${_avoidKeywords(_snakeCase(name))}`;
      } else {
        expr += `${prefix}"${name}"${suffix}`;
      }
      current = ast.propertyPathTypes[i];
    }
    this.emit(expr);
  }

  visitExpr(ast, level, env) {
    if (ast.type === 'boolean') {
      this.emit(_upperFirst(`${ast.value}`));
    } else if (ast.type === 'null') {
      this.emit('None');
    } else if (ast.type === 'property_access') {
      this.visitPropertyAccess(ast, env);
    } else if (ast.type === 'string') {
      this.emit(`'${(_string(ast.value))}'`);
    } else if (ast.type === 'number') {
      this.emit(ast.value.value);
    } else if (ast.type === 'object') {
      this.visitObject(ast, level);
    } else if (ast.type === 'variable') {
      if (ast.inferred && ast.inferred.type === 'basic' && ast.inferred.name === 'class') {
        this.emit(this.getModelName('', _name(ast.id), 'module'));
      } else {
        this.emit(_avoidKeywords(_snakeCase(_name(ast.id))));
      }
    } else if (ast.type === 'virtualVariable') {
      this.emit(`self.${_snakeCase(_vid(ast.vid))}`);
    } else if (ast.type === 'decrement') {
      this.visitExpr(ast.expr, level, { left: true });
      this.emit('-= 1');
    } else if (ast.type === 'increment') {
      this.visitExpr(ast.expr, level, { left: true });
      this.emit('+= 1');
    } else if (ast.type === 'template_string') {
      const tmp = this.output;
      this.output = '';
      for (var i = 0; i < ast.elements.length; i++) {
        var item = ast.elements[i];
        if (item.type === 'element') {
          this.emit((item.value.string).replace(/{/g, '{{').replace(/}/g, '}}'));
        } else if (item.type === 'expr') {
          this.emit('{');
          this.visitExpr(item.expr, level);
          this.emit('}');
        } else {
          throw new Error('unimpelemented');
        }
      }
      const quote = _adaptedQuotes(this.output);
      this.output = tmp + `f${quote}${this.output}${quote}`;
    } else if (ast.type === 'call') {
      // 调用函数
      this.visitCall(ast, level);
    } else if (ast.type === 'construct') {
      this.visitConstruct(ast, level);
    } else if (ast.type === 'array') {
      this.visitArray(ast, level);
    } else if (ast.type === 'group') {
      this.emit('(');
      this.visitExpr(ast.expr, level, env);
      this.emit(')');
    } else if (_isBinaryOp(ast.type)) {
      this.visitExpr(ast.left, level, env);
      if (ast.type === 'or') {
        this.emit(' or ');
      } else if (ast.type === 'add') {
        this.emit(' + ');
      } else if (ast.type === 'subtract') {
        this.emit(' - ');
      } else if (ast.type === 'div') {
        this.emit(' / ');
      } else if (ast.type === 'multi') {
        this.emit(' * ');
      } else if (ast.type === 'and') {
        this.emit(' and ');
        // eslint-disable-next-line no-dupe-else-if
      } else if (ast.type === 'or') {
        this.emit(' or ');
      } else if (ast.type === 'lte') {
        this.emit(' <= ');
      } else if (ast.type === 'lt') {
        this.emit(' < ');
      } else if (ast.type === 'gte') {
        this.emit(' >= ');
      } else if (ast.type === 'gt') {
        this.emit(' > ');
      } else if (ast.type === 'neq') {
        this.emit(' != ');
      } else if (ast.type === 'eq') {
        this.emit(' == ');
      }
      this.visitExpr(ast.right, level, env);
    } else if (ast.type === 'not') {
      this.emit('not ', level);
      this.visitExpr(ast.expr, level, env);
    } else if (ast.type === 'construct_model') {
      // 生成实例的初始化赋值
      this.visitConstructModel(ast, level);
    } else if (ast.type === 'map_access') {
      this.visitMapAccess(ast, level, env);
    } else if (ast.type === 'array_access') {
      this.visitArrayAccess(ast);
    } else if (ast.type === 'super') {
      this.visitSuper(ast, level);
    } else {
      throw new Error('unimpelemented');
    }
  }

  visitConstructModel(ast, level) {
    assert.equal(ast.type, 'construct_model');
    if (ast.aliasId.isModule) {
      // 这里做了粗糙改动 直接生成aliasId对应的models
      let type = 'model';
      let moduleName = _name(ast.aliasId);
      let modelName = _subModelName(ast.propertyPath.map((item) => {
        return item.lexeme;
      }).join('.'));
      const externEx = this.usedExternException.get(moduleName);
      if (externEx && externEx.has(modelName)) {
        type = 'exception';
      }
      this.emit(this.getModelName(modelName, moduleName, type));
    }

    if (ast.aliasId.isModel) {
      let type = 'model';
      let mainModelName = _name(ast.aliasId);
      mainModelName = _subModelName([mainModelName, ...ast.propertyPath.map((item) => {
        return item.lexeme;
      })].join('.'));

      if (mainModelName.startsWith('$') && _type(mainModelName)) {
        mainModelName = _type(mainModelName);
        this.pushImports(mainModelName);
        this.emit(mainModelName);
      } else {
        if (this.predefined[mainModelName] && this.predefined[mainModelName].isException) {
          type = 'exception';
        }
        this.emit(this.getModelName(mainModelName, '', type));
      }
    }

    this.emit('(');
    if (ast.object && ast.object.fields.length !== 0) {
      // 判断是否有初始化赋值
      // this.visitObject(ast.object, level);
      this.emit('\n');
      for (var i = 0; i < ast.object.fields.length; i++) {
        this.visitModelField(ast.object.fields[i], level, i === ast.object.fields.length - 1);
      }
      this.emit(')', level);
    } else {
      this.emit(')');
    }

  }

  visitMapAccess(ast, level, env = {}) {
    assert.equal(ast.type, 'map_access');
    let expr;
    if (ast.id.tag === DSL.Tag.Tag.VID) {
      expr = `self.${_snakeCase(_vid(ast.id))}`;
    } else {
      expr = `${_avoidKeywords(_snakeCase(_name(ast.id)))}`;
    }
    const prefix = env.left ? '[' : '.get(';
    const suffix = env.left ? ']' : ')';
    if (ast.propertyPath && ast.propertyPath.length) {
      var current = ast.id.inferred;
      for (var i = 0; i < ast.propertyPath.length; i++) {
        var name = _name(ast.propertyPath[i]);
        if (current.type === 'model') {
          expr += `.${_avoidKeywords(_snakeCase(name))}`;
        } else {
          expr += `${prefix}"${name}"${suffix}`;
        }
        current = ast.propertyPathTypes[i];
      }
    }
    this.emit(`${expr}${prefix}`);
    this.visitExpr(ast.accessKey, level);
    this.emit(suffix);
  }

  visitArrayAccess(ast, level) {
    assert.equal(ast.type, 'array_access');
    let expr;
    if (ast.id.tag === DSL.Tag.Tag.VID) {
      // 这个判断很奇怪诶
      expr = `self.${_snakeCase(_vid(ast.id))}`;
    } else {
      expr = `${_avoidKeywords(_snakeCase(_name(ast.id)))}`;
    }
    if (ast.propertyPath && ast.propertyPath.length) {
      var current = ast.id.inferred;
      for (var i = 0; i < ast.propertyPath.length; i++) {
        var name = _name(ast.propertyPath[i]);
        if (current.type === 'model') {
          expr += `.${_avoidKeywords(_snakeCase(name))}`;
        } else {
          expr += `["${name}"]`;
        }
        current = ast.propertyPathTypes[i];
      }
    }
    this.emit(`${expr}[`);
    this.visitExpr(ast.accessKey, level);
    this.emit(']');
  }

  visitArray(ast, level) {
    assert.equal(ast.type, 'array');
    let arrayComments = DSL.comment.getBetweenComments(this.comments, ast.tokenRange[0], ast.tokenRange[1]);
    if (ast.items.length === 0) {
      this.emit('[ ');
      if (arrayComments.length > 0) {
        this.emit('\n');
        this.visitComments(arrayComments, level);
        this.emit('', level);
      }
      this.emit(']');
      return;
    }

    this.emit('[\n');
    let item;
    for (let i = 0; i < ast.items.length; i++) {
      item = ast.items[i];
      let comments = DSL.comment.getFrontComments(this.comments, item.tokenRange[0]);
      this.visitComments(comments, level);
      this.emit('', level + 2);
      this.visitExpr(item, level + 2);
      if (i < ast.items.length - 1) {
        this.emit(',');
      }
      this.emit('\n');
    }
    if (item) {
      //find the last item's back comment
      let comments = DSL.comment.getBetweenComments(this.comments, item.tokenRange[0], ast.tokenRange[1]);
      this.visitComments(comments, level);
    }
    this.emit(']', level);
  }

  visitYield(ast, level) {
    assert.equal(ast.type, 'yield');
    this.emit('yield ', level);
    if (!ast.expr || ast.expr.type === 'null') {
      this.emit('\n');
      return;
    }
    this.emit(' ');

    if (ast.needCast) {
      this.emit(`${CORE}Core.from_map(\n`);
      this.emit('', level + 2);
      this.visitType(ast.expectedType);
      this.emit('(),\n');
      this.emit('', level + 2);
    }

    this.visitExpr(ast.expr, level);

    if (ast.needCast) {
      this.emit(')');
    }

    this.emit('\n');
  }

  visitReturn(ast, level) {
    assert.equal(ast.type, 'return');
    this.emit('return', level);
    if (!ast.expr || ast.expr.type === 'null') {
      this.emit('\n');
      return;
    }

    this.emit(' ');

    if (ast.needCast) {
      this.emit(`${CORE}Core.from_map(\n`);
      this.emit('', level + 2);
      this.visitType(ast.expectedType);
      this.emit('(),\n');
      this.emit('', level + 2);
    }

    this.visitExpr(ast.expr, level);

    if (ast.needCast) {
      this.emit('\n');
      this.emit(')', level);
    }

    this.emit('\n');
  }

  visitRetry(ast, level) {
    assert.equal(ast.type, 'retry');
    this.pushImports(`${CORE}Exception`);
    this.emit(`raise ${CORE}Exception(${REQUEST}, ${RESPONSE})\n`, level);
  }

  visitTry(ast, level) {
    assert.equal(ast.type, 'try');
    this.emit('try :\n', level);
    this.visitStmts(ast.tryBlock, level + 2);
    if (ast.catchBlocks && ast.catchBlocks.length > 0) {
      ast.catchBlocks.forEach(catchBlock => {
        if (!catchBlock.id) {
          return;
        }
        if (!catchBlock.id.type) {
          this.emit(`except Exception as ${_avoidKeywords(_name(ast.catchId))} :\n`, level);
        } else {
          this.emit('except ', level);
          this.visitType(catchBlock.id.type);
          this.emit(` as ${_avoidKeywords(_name(ast.catchId))} :\n`);
        }
        this.visitStmts(catchBlock.catchStmts, level + 2);
      });
    } else if (ast.catchBlock && ast.catchBlock.stmts.length > 0) {
      this.emit(`except Exception as ${_avoidKeywords(_name(ast.catchId))} :\n`, level);
      this.visitStmts(ast.catchBlock, level + 2);
    }
    if (ast.finallyBlock && ast.finallyBlock.stmts.length > 0) {
      this.emit('finally:\n', level);
      this.visitStmts(ast.finallyBlock, level + 2);
    }
    this.emit('\n', level);
  }

  visitWhile(ast, level) {
    assert.equal(ast.type, 'while');
    this.emit('while ', level);
    this.visitExpr(ast.condition);
    this.emit(':\n');
    this.visitStmts(ast.stmts, level + 2);
  }

  visitFor(ast, level) {
    assert.equal(ast.type, 'for');
    // this.emit('\n');
    if (ast.list.inferred.type === 'asyncIterator' && this.isAsyncFunction) {
      this.emit('async for ', level);
    } else {
      this.emit('for ', level);
    }

    if (ast.list.inferred && ast.list.inferred.itemType
      && ast.list.inferred.itemType.type === 'entry') {
      this.emit('k, v in ');
      this.visitExpr(ast.list, level);
    } else {
      this.emit(`${_avoidKeywords(_snakeCase(_name(ast.id)))} in `);
      this.visitExpr(ast.list, level);
    }
    this.emit(':\n');
    this.visitStmts(ast.stmts, level + 2);
  }

  visitIf(ast, level) {
    assert.equal(ast.type, 'if');
    this.emit('if ', level);
    this.visitExpr(ast.condition);
    this.emit(':\n');
    this.visitStmts(ast.stmts, level + 2);

    if (ast.elseIfs) {
      for (let i = 0; i < ast.elseIfs.length; i++) {
        const branch = ast.elseIfs[i];
        this.emit('elif ', level);
        this.visitExpr(branch.condition);
        this.emit(':\n');
        this.visitStmts(branch.stmts, level + 2);
      }
    }

    if (ast.elseStmts) {
      this.emit('else:\n', level);
      for (let i = 0; i < ast.elseStmts.stmts.length; i++) {
        this.visitStmt(ast.elseStmts.stmts[i], level + 2);
      }
      if (ast.elseStmts.stmts.length === 0) {
        const comments = DSL.comment.getBetweenComments(this.comments, ast.elseStmts.tokenRange[0], ast.elseStmts.tokenRange[1]);
        this.visitComments(comments, level + 1);
        this.emit('pass', level + 2);
      }
      this.emit('\n');
    }
  }

  visitThrow(ast, level) {
    this.emit('raise ', level);
    if (ast.expr.type === 'construct_model') {
      this.visitConstructModel(ast.expr, level);
      this.emit('\n');
    } else {
      this.pushImports(`${CORE}Exception`);
      this.emit(`${CORE}Exception(`);
      this.visitObject(ast.expr, level);
      this.emit(')\n');
    }
  }

  visitAssign(ast, level) {
    if (ast.left.type === 'property_assign' || ast.left.type === 'property') {
      this.emit('', level);
      this.visitPropertyAccess(ast.left, { left: true });
    } else if (ast.left.type === 'virtualVariable') { // vid
      this.emit(`self.${_snakeCase(_vid((ast.left.vid)))}`, level);
    } else if (ast.left.type === 'variable') {
      this.emit(`${_avoidKeywords(_snakeCase(_name(ast.left.id)))}`, level);
    } else if (ast.left.type === 'map_access') {
      // 声明时不能用get去赋值
      this.emit('', level);
      this.visitMapAccess(ast.left, level, { left: true });
    } else if (ast.left.type === 'array_access') {
      this.emit('', level);
      this.visitArrayAccess(ast.left, level);
    } else {
      throw new Error('unimpelemented');
    }

    this.emit(' = ');
    // if (ast.expr.needToReadable) {
    //   this.emit(`${CORE}Core.to_readable_stream(`);
    // }
    this.visitExpr(ast.expr, level);
    // if (ast.expr.needToReadable) {
    //   this.emit(')');
    // }
    this.emit('\n');
  }

  // 实例初始化 new的地方
  visitDeclare(ast, level) {
    var id = _avoidKeywords(_snakeCase(_name(ast.id)));
    this.emit(`${id}`, level);
    if (id === 'new_full_str') {
      this.emit('');
    }

    if (ast.expr.type === 'null') {
      this.emit(' = None\n');
      return;
    }

    this.emit(' = ');
    this.visitExpr(ast.expr, level);
    this.emit('\n');
  }

  visitStmts(ast, level) {
    assert.equal(ast.type, 'stmts');
    let node;
    for (var i = 0; i < ast.stmts.length; i++) {
      node = ast.stmts[i];
      this.visitStmt(node, level);
    }
    if (node) {
      //find the last node's back comment
      let comments = DSL.comment.getBackComments(this.comments, node.tokenRange[1]);
      this.visitComments(comments, level);
    }

    if (ast.stmts.length === 0) {
      //empty block's comment
      let comments = DSL.comment.getBetweenComments(this.comments, ast.tokenRange[0], ast.tokenRange[1]);
      this.visitComments(comments, level);
      this.emit('pass\n', level);
    }
  }

  visitReturnBody(ast, level) {
    assert.equal(ast.type, 'returnBody');
    this.visitStmts(ast.stmts, level);
  }

  visitDefaultReturnBody(level) {
    this.emit('\n');
    this.emit('return {}\n', level);
  }

  visitFunctionBody(ast, level) {
    assert.equal(ast.type, 'functionBody');
    this.visitStmts(ast.stmts, level);
  }

  isIterator(returnType) {
    if (returnType.type === 'iterator' || returnType.type === 'asyncIterator') {
      return true;
    }
    return false;
  }

  eachFunction(ast, level) {
    this.emit('\n');
    // level += 1;
    // TODO: 注释部分，暂时移除
    // this.visitAnnotation(ast.annotation, level);
    // let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    // this.visitComments(comments, level);
    const functionName = _avoidKeywords(_snakeCase(_name(ast.functionName)));

    if (ast.isStatic) {
      this.emit('@staticmethod\n', level);
    } else {
      this.isStaticFunction = false;
    }

    this.emit('', level);

    this.emit('def ');

    this.emit(`${functionName}`);

    // 入参
    if (ast.isStatic) {
      this.visitParams(ast.params, level);
    } else {
      this.visitParams(ast.params, level, true);
    }

    // 返回值类型
    this.visitReturnType(ast);
    this.emit(':\n');
    let secondLevel = level + 2;
    if (ast.functionBody) {
      // 这里是函数体
      this.visitFunctionBody(ast.functionBody, secondLevel);
    } else {
      let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
      this.visitComments(comments, secondLevel);
      this.emit('raise Exception(\'Un-implemented\')\n', secondLevel);
    }
    // generate async function
    if (ast.isAsync) {
      this.isAsyncFunction = true;
      this.emit('\n');
      if (ast.isStatic) {
        this.emit('@staticmethod\n', level);
      } else {
        this.isStaticFunction = false;
      }
      this.emit('', level);
      this.emit('async def ');
      this.emit(`${functionName}_async`);
      // 入参
      if (ast.isStatic) {
        this.visitParams(ast.params, level);
      } else {
        this.visitParams(ast.params, level, true);
      }
      // 返回值类型
      this.visitReturnType(ast);
      this.emit(':\n');
      if (ast.functionBody) {
        // 这里是函数体
        this.visitFunctionBody(ast.functionBody, secondLevel);
      } else {
        let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
        this.visitComments(comments, level + 2);
        this.emit('raise Exception(\'Un-implemented\')\n', level + 2);
      }
    }
    this.isAsyncFunction = false;
    this.isStaticFunction = true;
  }

  eachAPI(ast, level) {
    this.emit('\n');
    // if (ast.annotation) {
    //   this.emit(`${_anno(ast.annotation.value)}\n`, level);
    // }

    this.visitAnnotation(ast.annotation, level);
    let comments = DSL.comment.getFrontComments(this.comments, ast.tokenRange[0]);
    this.visitComments(comments, level);
    // set api name to _snakeCase
    const apiName = _avoidKeywords(_snakeCase(_name(ast.apiName)));
    this.isStaticFunction = false;
    this.emit(`def ${apiName}`, level);
    this.visitParams(ast.params, level, true);
    this.visitReturnType(ast);
    this.emit(':\n');
    let secondLevel = level + 2;
    this.pushImports(`${CORE}Core`);
    if (ast.runtimeBody) {
      this.pushImports('UnretryableException');
      this.pushImports('RetryPolicyContext');
      this.visitRuntimeBefore(ast.runtimeBody, level);
      secondLevel += 4;
    }
    if (ast.apiBody) {
      this.visitAPIBody(ast.apiBody, secondLevel);
    }
    this.emit(`_last_request = ${REQUEST}\n`, secondLevel);
    this.emit(`${RESPONSE} = ${CORE}Core.do_action(${REQUEST}`, secondLevel);
    if (ast.runtimeBody) {
      this.emit(', _runtime');
    }
    this.emit(')\n');
    if (ast.runtimeBody) {
      this.emit(`_last_response = ${RESPONSE}\n`, secondLevel);
    }


    if (ast.returns) {
      this.visitReturnBody(ast.returns, secondLevel);
    } else {
      this.visitDefaultReturnBody(secondLevel);
    }

    if (ast.runtimeBody) {
      this.visitRuntimeAfter(ast.runtimeBody, level + 1);
    }
    // generate async function
    this.emit('\n');
    this.isAsyncFunction = true;
    this.emit(`async def ${apiName}_async`, level);
    this.visitParams(ast.params, level, true);
    this.visitReturnType(ast);
    this.emit(':\n');
    // api level
    if (ast.runtimeBody) {
      this.visitRuntimeBefore(ast.runtimeBody, level);
    }
    // temp level
    this.visitAPIBody(ast.apiBody, secondLevel);
    this.emit(`_last_request = ${REQUEST}\n`, secondLevel);
    this.emit(`${RESPONSE} = await ${CORE}Core.async_do_action(${REQUEST}`, secondLevel);
    if (ast.runtimeBody) {
      this.emit(', _runtime');
    }
    this.emit(')\n');
    if (ast.runtimeBody) {
      this.emit(`_last_response = ${RESPONSE}\n`, secondLevel);
    }

    if (ast.returns) {
      this.visitReturnBody(ast.returns, secondLevel);
    } else {
      this.visitDefaultReturnBody(secondLevel);
    }

    if (ast.runtimeBody) {
      this.visitRuntimeAfter(ast.runtimeBody, level + 1);
    }
    this.isStaticFunction = true;
    this.isAsyncFunction = false;
  }

  visitRuntimeAfter(ast, level) {
    this.emit(`            except Exception as e:
                _context = RetryPolicyContext(
                    retries_attempted= _retries_attempted,
                    http_request = _last_request,
                    http_response = _last_response,
                    exception = e
                )
                continue
        raise UnretryableException(_context)\n`);
  }

  emitImports() {
    let tempOutput = ''; // 定义一个临时变量来存放输出内容

    if (this.config.editable !== true) {
      tempOutput += '# -*- coding: utf-8 -*-\n';
      tempOutput += '# This file is auto-generated, don\'t edit it. Thanks.\n';
    }

    this.imports.push({
      packageName: '__future__',
      className: 'annotations',
    });

    if (this.usedTypes.length > 0) {
      this.imports.push({
        packageName: 'typing',
        className: [...new Set(this.usedTypes)].join(', '),
      });
    }

    const imports = _sortImports(this.imports);

    tempOutput += _importsToString(imports);

    // 将临时输出插入到 this.output 的开头
    this.output = tempOutput + '\n\n' + this.output;
  }

  modelInitBefore(ast, level) {
    let beginToken = 0;
    if (ast.imports.length > 0) {
      const lastIndex = ast.imports.length - 1;
      beginToken = ast.imports[lastIndex].tokenRange[0];
    }
    let endToken = 0;
    if (ast.moduleBody.nodes.length > 0) {
      endToken = ast.moduleBody.nodes[0].tokenRange[0];
    }
    const beginNotes = DSL.note.getNotes(this.notes, beginToken, endToken);
    const part = beginNotes.find(note => note.note.lexeme === '@pythonModel');
    if (part && part.arg.value) {
      this.emit(_string(part.arg.value));
    }

    if (part && part.arg.type === 'object') {
      part.arg.fields.map(field => {
        if (_name(field.fieldName) === 'header') {
          this.emit(_string(field.expr.value));
        }

        if (_name(field.fieldName) === 'exports') {
          this.moreExports = field.expr.items.map(item => {
            return _string(item.value);
          });
        }
      });
    }
  }

  moduleBefore(ast, level) {
    let beginToken = 0;
    if (ast.imports.length > 0) {
      const lastIndex = ast.imports.length - 1;
      beginToken = ast.imports[lastIndex].tokenRange[0];
    }
    let endToken = 0;
    if (ast.moduleBody.nodes.length > 0) {
      endToken = ast.moduleBody.nodes[0].tokenRange[0];
    }
    const beginNotes = DSL.note.getNotes(this.notes, beginToken, endToken);
    const part = beginNotes.find(note => note.note.lexeme === '@python');
    if (part && part.arg.value) {
      this.emit(_string(part.arg.value));
    }
  }

  apiBefore(level) {

    this.emit(`class ${this.className}`, level);
    if (this.parentModule) {
      const aliasId = _name(this.parentModule);
      let clientName = this.getModelName('', aliasId, 'module');
      this.emit(`(${clientName})`);
    }
    this.emit(':');
  }

  checkFieldHasModel(fieldValue) {
    if (fieldValue.type === 'modelBody') {
      return true;
    } else if (fieldValue.type === 'array' || fieldValue.fieldType === 'array') {
      return this.checkFieldHasModel(fieldValue.fieldItemType || fieldValue.subType);
    } else if (fieldValue.fieldType === 'map' || fieldValue.type === 'map') {
      return this.checkFieldHasModel(fieldValue.valueType);
    } else if (fieldValue.type === 'moduleModel' ||
      (fieldValue.fieldType && fieldValue.fieldType.type === 'moduleModel')) {
      return true;
    } else if (fieldValue.type === 'subModel') {
      return true;
    } else if (fieldValue.idType === 'model') {
      return true;
    } else if (fieldValue.fieldType && fieldValue.fieldType.idType === 'model') {
      return true;
    } else if (fieldValue.fieldType && fieldValue.fieldType.idType === 'builtin_model') {
      return true;
    }
    return false;
  }

  checkFieldItemTypeAllString(obj) {
    // 基本检查，确保传入的是对象且存在 fieldItemType 属性
    if (obj && obj.fieldItemType) {
      // 如果 fieldItemType 是字符串且等于 'string'
      if (obj.fieldItemType.lexeme === 'string') {
        return true;
      } else if (obj.fieldItemType.fieldType === 'array') {
        // 如果 fieldItemType 仍然是数组
        return this.checkFieldItemTypeAllString(obj.fieldItemType);
      } else if (obj.fieldItemType.valueType && obj.fieldItemType.valueType.lexeme === 'any') {
        return true;
      }
    }
    if (obj && obj.fieldType === 'map') {
      return this.checkFieldItemTypeAllString(obj.valueType);
    }
    if (obj && obj.subType) {
      if (obj.subType.type === 'map') {
        return this.checkFieldItemTypeAllString(obj.subType);
      }
    }
    if (obj && obj.valueType) {
      if (obj.valueType.lexeme === 'string') {
        return true;
      }
    }
    return false;
  }

  getClassNamespace(pyPath) {
    if (path.resolve(pyPath).startsWith(path.resolve(this.outputDir))) {
      const baseDir = path.join(this.outputDir, path.sep, this.config.package);
      pyPath = pyPath.replace(baseDir, '');
    }

    const arr = pyPath.replace('.py', '').split(path.sep).slice(0, -1);


    let className = this.config.package;
    arr.map(key => {
      if (!key) {
        return;
      }
      className += '.' + key;
    });

    return className;
  }

  getAliasName(name, aliasId) {
    let aliasName = '';
    if (!this.clientName.has(name) && name !== this.className) {
      this.clientName.set(name, aliasId);
      return aliasName;
    }
    if (aliasId) {
      aliasName = aliasId + name;
    }
    if (aliasName && !this.clientName.has(aliasName)) {
      this.clientName.set(aliasName, aliasId);
      return aliasName.replace(/-/g, '');
    }
  }

  getRealName(node) {
    const nameAttr = node.attrs.find((item) => {
      return item.attrName.lexeme === 'name';
    });
    return nameAttr ? _string(nameAttr.attrValue) : _name(node.fieldName);
  }

  getModelName(name, moduleName, type = 'model') {
    if (type === 'model' && !moduleName) {
      const aliasName = 'main_models';
      this.imports.push({
        aliasName,
        packageName: this.config.package,
        className: this.modelPackage,
      });
      return `${aliasName}.${name}`;
    }

    if (type === 'model' && moduleName) {
      const { namemespace, models } = this.packageInfo[moduleName];
      const aliasName = `${_snakeCase(moduleName.replace(/-/g, ''))}_models`;
      this.imports.push({
        aliasName,
        packageName: namemespace,
        className: models || 'models',
      });
      return `${aliasName}.${name}`;
    }

    if (type === 'exception' && !moduleName) {
      const aliasName = 'main_exceptions';
      this.imports.push({
        aliasName,
        packageName: this.config.package,
        className: this.exceptionPackage,
      });
      return `${aliasName}.${name}Exception`;
    }

    if (type === 'exception' && moduleName) {
      const { namemespace, exceptions } = this.packageInfo[moduleName];
      const aliasName = `${_snakeCase(moduleName.replace(/-/g, ''))}_exceptions`;
      this.imports.push({
        aliasName,
        packageName: namemespace,
        className: exceptions || 'exceptions',
      });
      return `${aliasName}.${name}Exception`;
    }

    if (type === 'module') {
      const {
        aliasName,
        clientName,
        fileName,
        namemespace,
      } = this.packageInfo[moduleName];

      this.imports.push({
        aliasName: clientName === aliasName ? '' : aliasName,
        packageName: `${namemespace}.${fileName}`,
        className: clientName,
      });
      return aliasName;
    }

    name = _type(name);
    this.pushImports(name);
    return name;
  }

  getInnerClient(aliasId) {
    const moduleAst = this.ast.innerDep.get(aliasId);
    const beginNotes = DSL.note.getNotes(moduleAst.notes, 0, moduleAst.moduleBody.nodes[0].tokenRange[0]);
    const clientNote = beginNotes.find(note => note.note.lexeme === '@clientName');
    if (clientNote) {
      return _string(clientNote.arg.value);
    }
    return 'Client';
  }

  pushImports(type) {
    const pkg = _getImport(type);
    if (pkg) {
      this.imports.push(pkg);
      return;
    }

    if (type === 'sys') {
      this.imports.push({
        className: 'sys',
      });
    }

    if (type === 'Any') {
      this.usedTypes.push('Any');
    }

    if (type === 'array') {
      this.usedTypes.push('List');
    }

    if (type === 'map') {
      this.usedTypes.push('Dict');
    }

    if (type === 'BinaryIO') {
      this.usedTypes.push('BinaryIO');
    }

  }

}

module.exports = Visitor;
