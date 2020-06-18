'use strict';

const Emitter = require('../../lib/emitter');

let includeList = [];

let includeSet = [];

const modelContentSet = [];

function emitIncludeRow(emitter, include) {
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

function emitInclude(emitter) {
  let importList = includeList.filter(node => !node.from);
  let fromList = includeList.filter(node => node.from);
  importList.forEach(include => {
    emitIncludeRow(emitter, include);
  });

  fromList.forEach(include => {
    emitIncludeRow(emitter, include);
  });

}

module.exports = {
  pushInclude(modelIncludeList) {
    modelIncludeList.forEach(include => {
      const key = `from:${include.from}-import:${include.import}`;
      if (includeSet.indexOf(key) < 0) {
        includeSet.push(key);
        includeList.push(include);
      }
    });
  },
  addModel(config, content) {
    content = content.split('# This file is auto-generated, don\'t edit it. Thanks.').join('');
    modelContentSet.push(content);
    config.filename = 'models';
    const emitter = new Emitter(config);
    emitter.emitln('# This file is auto-generated, don\'t edit it. Thanks.');
    emitInclude(emitter);
    emitter.emit(modelContentSet.join(''));
    emitter.save();
  }
};