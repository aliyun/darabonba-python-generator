'use strict';

const debug = require('../../lib/debug');
const path = require('path');
const fs = require('fs');
const BasePackageInfo = require('../common/package_info');

const OPTION_LOCAL = 1;
const OPTION_SOURCE = 2;
const OPTION_RENDER = 4;

// file_name : OPTIONS
const files = {
  '.gitignore': OPTION_LOCAL,
  'setup.py': OPTION_LOCAL | OPTION_RENDER | OPTION_SOURCE,
  'LICENSE': OPTION_SOURCE,
  'README-CN.md': OPTION_SOURCE | OPTION_RENDER,
  'README.md': OPTION_SOURCE | OPTION_RENDER
};

class PackageInfo extends BasePackageInfo {
  emit(packageInfo, requirePackage) {
    let outputDir = path.join(this.config.dir, '../');
    if (packageInfo.outputDir) {
      outputDir = path.join(outputDir, packageInfo.outputDir);
    }
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, {
        recursive: true
      });
    }
    const checkParams = ['name', 'desc', 'github'];
    checkParams.forEach(key => {
      if (typeof packageInfo[key] === 'undefined') {
        debug.stack('need config packageInfo.' + key, packageInfo);
      }
    });

    let requires = [];
    requirePackage.forEach(packageItem => {
      let packages = packageItem.split(':');
      let [moduleName, version] = packages;
      const requireItem = `${moduleName}>=${version}, <${parseInt(version.split('.')[0])+1}.0.0`;
      requires.push(requireItem);
    });
    const date = new Date();
    const keywords = JSON.stringify(packageInfo.name.split(/_|-/));
    const params = {
      email: '',
      author: '',
      package: this.config.package,
      require: JSON.stringify(requires, null, 4),
      namespace: this.config.package.split('.').join('\\\\'),
      date: ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear(),
      keywords: keywords,
      ...packageInfo
    };
    Object.keys(files).forEach(filename => {
      let content = '';
      let optional = files[filename];
      if (optional & OPTION_SOURCE && packageInfo.files && packageInfo.files[filename]) {
        let filepath = path.isAbsolute(packageInfo.files[filename]) ?
          packageInfo.files[filename] : path.join(this.config.pkgDir, packageInfo.files[filename]);
        content = fs.readFileSync(filepath).toString();
      } else if (optional & OPTION_LOCAL) {
        content = fs.readFileSync(path.join(__dirname, './files/' + filename + '.tmpl')).toString();
      }
      if (content !== '') {
        if (optional & OPTION_RENDER) {
          content = this.render(content, params);
        }
        fs.writeFileSync(path.join(outputDir, filename), content);
      }
    });
  }
}

module.exports = PackageInfo;