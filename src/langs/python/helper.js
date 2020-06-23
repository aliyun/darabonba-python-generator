'use strict';

const debug = require('../../lib/debug');
const config = require('./config');

const {
  _isBasicType
} = require('../../lib/helper');

const symbolMap = {
  'ASSIGN': '=',
  'EQ': '==',
  'NOT': 'NOT',
  'AND': 'and',
  'OR': 'or',
  'PLUS': '+',
  'SUB': '-',
  'MULTI': '*',
  'DIV': '/',
  'POWER': '^',
  'GREATER': '>',
  'GREATER_EQ': '>=',
  'LESS': '<',
  'LESS_EQ': '<=',
  'REVERSE': 'not ',
  'CONCAT': '+'
};

function _symbol(str) {
  if (symbolMap[str]) {
    return symbolMap[str];
  }
  debug.stack(str);
}

const exceptionMap = {
  'BASE': config.tea.exception.name,
};

function _exception(str) {
  if (exceptionMap[str]) {
    return exceptionMap[str];
  }
  return str;
}

function _underScoreCase(str) {
  let res = '';
  let tmp = '';
  for (const c of str) {
    if (/[A-Z|0-9]/.test(c)) {
      tmp += c;
    } else {
      if (tmp.length > 0) {
        res += res === '' ? tmp.toLowerCase() : '_' + tmp.toLowerCase();
        tmp = '';
      }
      res += c;
    }
  }
  if (tmp.length > 0) {
    res += '_' + tmp.toLowerCase();
  }
  return res;
}

function _isKeywords(str) {
  return config.keywords.indexOf(str.toLowerCase()) > -1;
}

function _avoidKeywords(str) {
  if (config.keywords.indexOf(str.toLowerCase()) > -1) {
    return str + '_';
  }
  return str;
}

function _type(type) {
  let t = type instanceof Object ? type.lexeme : type;
  if (config.typeMap[t]) {
    return config.typeMap[t];
  }
  if (!_isBasicType(t)) {
    return t;
  }
  if (t[0] === '$') {
    t = t.replace('$', 'Tea');
  }
  return t;
}

function _convertStaticParam(param) {
  if (param === '__response') {
    param = config.response;
  } else if (param === '__request') {
    param = config.request;
  }
  return param;
}

module.exports = {
  _type,
  _symbol,
  _exception,
  _isKeywords,
  _avoidKeywords,
  _underScoreCase,
  _convertStaticParam,
};
