'use strict';

const keywords = [
  'False', 'None', 'True', '__peg_parser__', 'and',
  'as', 'assert', 'async', 'await', 'break',
  'class', 'continue', 'def', 'del', 'elif',
  'else', 'except', 'finally', 'for', 'from',
  'global', 'if', 'import', 'in', 'is',
  'lambda', 'nonlocal', 'not', 'or', 'pass',
  'raise', 'return', 'try', 'while', 'with', 'yield'
];

const CORE = 'darabonba.core';
const REQUEST = "darabonba.core.Request";
const RESPONSE = "darabonba.core.Response";
const EXCEPTION = "darabonba.exceptions.DaraException";
const RESP_EXCEPTION = 'darabonba.exceptions.ResponseException';
const MODEL = 'darabonba.core.Model';

function _name(str) {
  if (str.lexeme === '__request') {
    return REQUEST;
  }

  if (str.lexeme === '__response') {
    return RESPONSE;
  }

  return str.lexeme || str.name;
}

function _vid(vid) {
  return `_${_name(vid).substr(1)}`;
}

function _string(str) {
  if (str.string === '\'\'') {
    return '\\\'\\\'';
  }
  return str.string.replace(/([^\\])'+|^'/g, function (str) {
    return str.replace(/'/g, '\\\'');
  });
}

function _upperFirst(str) {
  if (!str) {
    return '';
  }
  return str[0].toUpperCase() + str.substring(1);
}

function _lowerFirst(str) {
  return str[0].toLowerCase() + str.substring(1);
}

function _subModelName(name) {
  return name.split('.').map((name) => _upperFirst(name)).join('');
}

function _avoidKeywords(str) {
  // 区分大小写
  if (keywords.indexOf(str) > -1) {
    return str + '_';
  }
  return str;
}

function _camelCase(str, split = '_') {
  if (str.indexOf(split) > -1) {
    let tmp = str.split(split);
    tmp = tmp.map((s, i) => {
      if (s.length > 0 && i !== 0) {
        return _upperFirst(s);
      }
      return s;
    });
    str = tmp.join('');
  }
  return str;
}

function _snakeCase(str) {
  if (!str) {
    return '';
  }
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
  res = res.replace(/-/g, '_');
  if (res[0] === '_' && str[0] !== '_') {
    res = res.substring(1);
  }
  return res;
}

function _deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function _isSnakeCase(str) {
  if (/[^\da-z_]/.test(str)) {
    return false;
  }

  if (/\d/.test(str[0])) {
    return false;
  }

  return true;
}

function _isBasicType(type) {
  return DSL.util.isBasicType(type);
}

function _isBinaryOp(type) {
  const op = [
    'or', 'eq', 'neq',
    'gt', 'gte', 'lt',
    'lte', 'add', 'subtract',
    'div', 'multi', 'and'
  ];
  return op.includes(type);
}

function _isBuiltinModel(name) {
  return builtinModels.includes(name);
}

module.exports = {
  _name,
  _vid,
  _string,
  _upperFirst,
  _lowerFirst,
  _subModelName,
  _avoidKeywords,
  _camelCase,
  _snakeCase,
  _deepClone,
  _isSnakeCase,
  _isBasicType,
  _isBinaryOp,
  _isBuiltinModel,
  CORE,
  REQUEST,
  RESPONSE,
  EXCEPTION,
  RESP_EXCEPTION,
  MODEL,
};