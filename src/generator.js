'use strict';

const path = require('path');
const fs = require('fs');
const debug = require('./lib/debug');

const { _deepClone } = require('./lib/helper');
const ClientResolver = require('./resolver/client');
const ModelResolver = require('./resolver/model');

class Generator {
  constructor(meta = {}, lang = 'python') {
    if (!meta.outputDir) {
      throw new Error('`option.outputDir` should not empty');
    }
    this.lang = lang;
    this.typedef = meta[lang] && meta[lang].typedef ? meta[lang].typedef : {};
    this.initConfig(meta);
  }

  visit(ast) {
    this.imports = this.resolveImports(ast);
    this.imports.typedef = this.typedef;
    Object.keys(this.typedef).forEach((def) => {
      if (this.typedef[def].package && !this.imports.requirePackage.includes(this.typedef[def].package)) {
        this.imports.requirePackage.push(this.typedef[def].package);
      }
    });
    const objects = [];

    // combine client code
    const clientObjectItem = this.resolve('client', ast, ast);
    objects.push(clientObjectItem);

    // combine model code
    ast.moduleBody.nodes.filter((item) => {
      return item.type === 'model';
    }).forEach((model) => {
      const modelName = model.modelName.lexeme;
      const modelObjectItem = this.resolve('model', model, ast);
      if (ast.models) {
        Object.keys(ast.models).filter((key) => {
          return key.startsWith(modelName + '.');
        }).forEach((key) => {
          const subModel = ast.models[key];
          const subModelObjectItem = this.resolve('model', subModel, ast);
          modelObjectItem.subObject.push(subModelObjectItem);
        });
      }
      objects.push(modelObjectItem);
    });

    const combinator = this.getCombinator(this.config);
    combinator.combine(objects);
  }

  resolve(type, ast, globalAST) {
    const combinator = this.getCombinator(this.config);
    let resolver;
    switch (type) {
    case 'client':
      resolver = new ClientResolver(ast, combinator, ast);
      break;
    case 'model':
      resolver = new ModelResolver(ast, combinator, globalAST);
      break;
    }
    const objectItem = resolver.resolve();
    objectItem.includeList = combinator.includeList;
    objectItem.includeModelList = combinator.includeModelList;
    return objectItem;
  }

  getCombinator(configOriginal) {
    const config = _deepClone(configOriginal);

    // init combinator
    const Combinator = require(`./langs/${this.lang}/combinator`);
    return new Combinator(config, this.imports);
  }

  initConfig(meta) {
    const langDir = path.join(__dirname, `./langs/${this.lang}/`);
    if (!fs.existsSync(langDir)) {
      throw new Error(`Not supported language : ${this.lang}`);
    }
    const langConfig = require(`./langs/${this.lang}/config`);

    const config = {
      package: 'darabonba_sdk',
      clientName: langConfig.client.defaultName,
      include: [],
      parent: [],
      pkgDir: '',
      output: true,
      dir: meta.outputDir,
      layer: '',
    };
    Object.assign(config,
      langConfig,
      meta,
    );
    if (meta[this.lang]) {
      if (!meta[this.lang].package) {
        debug.warning('Not found package in Darafile, default package name is "darabonba_sdk".');
      }

      if (!meta[this.lang].clientName) {
        debug.warning('Not found clientName in Darafile, default clientName is "client".');
      }

      Object.assign(config,
        meta[this.lang],
      );
    } else {
      debug.warning('Not found python config in Darafile, default config will be used.');
    }

    this.config = config;
  }

  resolveImports(ast) {
    const imports = ast.imports;

    let requirePackage = [];
    let thirdPackageNamespace = {};
    let thirdPackageModel = {};
    let thirdPackageClient = {};
    let thirdPackageClientAlias = {};
    let importsTypedef = {};

    if (imports.length > 0) {
      const lockPath = path.join(this.config.pkgDir, '.libraries.json');
      const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
      let packageNameSet = [];
      let clientNameSet = [];
      ast.imports.forEach((item) => {
        const aliasId = item.lexeme;
        const moduleDir = this.config.libraries[aliasId];
        let targetPath;
        if (moduleDir.startsWith('/')) {
          targetPath = moduleDir;
        } else {
          targetPath = path.join(this.config.pkgDir, lock[moduleDir]);
        }
        // get dara meta
        const daraFilePath = fs.existsSync(path.join(targetPath, 'Teafile'))
          ? path.join(targetPath, 'Teafile')
          : path.join(targetPath, 'Darafile');
        const daraMeta = JSON.parse(fs.readFileSync(daraFilePath));

        // init package name,client name,modelDir name
        let packageName, clientName, modelDir;
        if (daraMeta[this.lang]) {
          if (daraMeta[this.lang].package) {
            packageName = daraMeta[this.lang].package;
          } else {
            debug.warning(`Not found package in ${daraMeta.name} Darafile, default package name is "${daraMeta.name}".`);
            packageName = daraMeta.name;
          }

          clientName = daraMeta[this.lang].clientName
            ? daraMeta[this.lang].clientName
            : this.config.clientName;

          modelDir = daraMeta[this.lang].modelDirName
            ? daraMeta[this.lang].modelDirName
            : this.config.model.dir;
          if (daraMeta[this.lang].typedef) {
            importsTypedef[aliasId] = {};
            const moduleTypedef = daraMeta[this.lang].typedef;
            Object.keys(moduleTypedef || {}).forEach((types) => {
              if (!importsTypedef[aliasId][types]) {
                importsTypedef[aliasId][types] = {};
              }
              importsTypedef[aliasId][types].import = moduleTypedef[types].import;
              importsTypedef[aliasId][types].type = moduleTypedef[types].type;
              if (!requirePackage.includes(moduleTypedef[types].package)) {
                requirePackage.push(moduleTypedef[types].package);
              }
            });
          }
        } else {
          packageName = daraMeta.name;
          clientName = this.config.clientName;
          modelDir = this.config.model.dir;
        }

        // resolve third package namespace
        if (packageNameSet.indexOf(packageName.toLowerCase()) < 0) {
          thirdPackageNamespace[aliasId] = packageName;
          packageNameSet.push(packageName.toLowerCase());
        } else {
          debug.stack('Duplication namespace');
        }

        // resolve third package model client name
        if (
          clientNameSet.indexOf(clientName.toLowerCase()) > -1 ||
          clientName.toLowerCase() === this.config.clientName.toLowerCase()
        ) {
          const alias = packageName.split('.').join('') + '->' + clientName.split('.').join('');
          thirdPackageClientAlias[aliasId] = alias;
          thirdPackageClient[aliasId] = clientName;
        } else {
          thirdPackageClient[aliasId] = clientName;
          clientNameSet.push(clientName.toLowerCase());
        }
        if (daraMeta.releases && daraMeta.releases[this.lang]) {
          requirePackage.push(daraMeta.releases[this.lang]);
        }
        // third package model dir name
        thirdPackageModel[aliasId] = modelDir;
      });
    }
    return {
      requirePackage,
      thirdPackageNamespace,
      thirdPackageClient,
      thirdPackageClientAlias,
      thirdPackageModel,
      importsTypedef,
    };
  }
}

module.exports = Generator;
