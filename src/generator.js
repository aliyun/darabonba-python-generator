'use strict';

class Generator {
  constructor(option = {}, lang = '') {
    if (!option.outputDir) {
      throw new Error('`option.outputDir` should not empty');
    }
    this.option = {
      output: true,
      ...option
    };
    this.lang = lang;
  }
  visit(ast) {
    const ModuleVisitor = require('./visitor/module');
    const moduleVisitor = new ModuleVisitor(this.option, 'python');
    moduleVisitor.visit(ast);
  }
  generateBaseClient(ast) {
    const ClientVisitor = require('./visitor/client');
    const clientVisitor = new ClientVisitor(this.option, 'python');
    clientVisitor.visit(ast);
    const emittter = clientVisitor.done();
    return emittter;
  }
}

module.exports = Generator;
