'use strict';

class BasePackageInfo {
  constructor(config) {
    this.config = config;
    this.outputDir = '';
  }

  render(tamplate, params = {}) {
    Object.keys(params).forEach((key) => {
      tamplate = tamplate.split('${' + key + '}').join(params[key]);
    });
    return tamplate;
  }
}

module.exports = BasePackageInfo;