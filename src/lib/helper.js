'use strict';

const DSL = require('@darabonba/parser');

function _upperFirst(str) {
  return str[0].toUpperCase() + str.substring(1);
}

function _lowerFirst(str) {
  return str[0].toLowerCase() + str.substring(1);
}

function _isBasicType(type) {
  return DSL.util.isBasicType(type);
}

function _getTaskConfig(option) {
  return {
    outputDir: '',
    indent: '    '
    , ...option
  };
}

function _getLangConfig(option, lang) {
  let config = require(`../langs/${lang}/config`);
  return {
    package: 'Alibabacloud.SDK',
    clientName: 'Client',
    include: [],
    parent: [],
    pkgDir: '',
    ...config,
    ...option,
    ...option[lang]
  };
}

function _getEmitConfig(option, lang) {
  const taskConfig = _getTaskConfig(option);
  const langConfig = _getLangConfig(option, lang);
  return {
    ...langConfig,
    dir: taskConfig.outputDir,
    layer: langConfig.package,
    showInfo: false
  };
}

function _getCombinator(lang, langConfig) {
  const Combinator = require(`../langs/${lang}/combinator`);
  return new Combinator(langConfig);
}

function _deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = {
  _upperFirst,
  _lowerFirst,
  _isBasicType,
  _deepClone,

  _getLangConfig,
  _getEmitConfig,
  _getCombinator,
};