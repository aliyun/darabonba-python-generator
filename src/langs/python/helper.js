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

function _name(str) {
  if (str.indexOf('-') > -1) {
    let tmp = str.split('-');
    tmp.map((s, i) => {
      if (i !== 0) {
        return s;
      }
      return s;
    });
    str = tmp.join('');
  }
  return str;
}

const defaultValueMap = {
  'boolean': 'False',
  'number': '0',
  'integer': '0',
  'any': 'None',
  'int32': '0',
  'int16': '0',
  'object': 'None',
  'string': '""',
  'long': '0',
  'array': 'None',
  'map': 'None',
  'readable': 'None',
  'float': '0',
  'int64': '0',
  'bytes': 'None'
};

function _default(type) {
  if (type.lexeme) {
    type = type.lexeme;
  }
  if (defaultValueMap[type]) {
    return defaultValueMap[type];
  }
  if (_isBasicType(type)) {
    debug.stack(type);
  }
  return 'None';
}

const modifyOrder = [
  'PRIVATE',
  'PROTECTED',
  'PUBLIC',
  'FINAL',
  'ABSTRACT',
  'STATIC'
];

function _modify(modify) {
  if (Array.isArray(modify)) {
    return modify.filter((m) => modifyOrder.indexOf(m) > -1)
      .map((m) => _modify(m)).sort(function (a, b) {
        return modifyOrder.indexOf(a.toUpperCase()) - modifyOrder.indexOf(b.toUpperCase());
      }).join(' ');
  }
  return modify.toLowerCase();
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
  _name,
  _type,
  _symbol,
  _modify,
  _exception,
  _isKeywords,
  _avoidKeywords,
  _underScoreCase,
  _convertStaticParam,
  _default
};
