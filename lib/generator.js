'use strict';

const path = require('path');
const fs = require('fs');
const debug = require('./lib/debug');

class Generator {
  constructor(option = {}) {
    const config = {
      package: 'darabonba_sdk',
      clientName: 'client',
      include: [],
      parent: [],
      pkgDir: '',
      output: true,
      dir: option.outputDir,
      layer: '',
    };
    if (option.python) {
      if (!option.python.package) {
        debug.warning('Not found package in Darafile, default package name is "darabonba_sdk".');
      }

      if (!option.python.clientName) {
        debug.warning('Not found clientName in Darafile, default clientName is "client".');
      }

      Object.assign(config,
        option.python,
      );
    } else {
      debug.warning('Not found python config in Darafile, default config will be used.');
    }

    this.config = config;
  }

  visit(ast) {

  }

}

module.exports = Generator;
