'use strict';

const defaultConfig = require('../common/config');

module.exports = {
  ...defaultConfig,
  indent: '    ',
  ext: '.py',
  keywords: [
    'async',
    'await',
    'and',
    'as',
    'assert',
    'break',
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'finally',
    'for',
    'from',
    'False',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'nonlocal',
    'not',
    'None',
    'or',
    'pass',
    'raise',
    'return',
    'try',
    'True',
    'while',
    'with',
    'yield'
  ],
  symbolMap: {
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
  },
  typeHints: {
    'READABLE': 'BinaryIO',
    'WRITABLE': 'BinaryIO',
    'any': 'Any',
    'dict': 'Dict',
    'list': 'List'
  },
  typeMap: {
    'string': 'str',
    'boolean': 'bool',
    'number': 'int',
    'integer': 'int',
    'object': 'dict',
    'map': 'dict',
    'bytes': 'bytes',
    'long': 'int',
    'array': 'list',
    'readable': 'READABLE',
    'writable': 'WRITABLE',
    'float': 'float',
    'double': 'float',
    'int64': 'int',
    'int32': 'int',
    'int16': 'int',
    'int8': 'int',
    'ulong': 'int',
    'uint8': 'int',
    'uint16': 'int',
    'uint32': 'int',
    'uint64': 'int',
    'any': 'any',
    'void': 'None',
    'null': 'None'
  },
  type: {
    // 'long': 'base',
    // 'unicode': 'base',
    // 'tuple': 'complex',
    // 'set': 'complex',
    'str': 'base',
    'bytes': 'base',
    'int': 'base',
    'float': 'base',
    'bool': 'base',
    'None': 'base',
    'dict': 'complex',
    'list': 'complex',
    'READABLE': 'custom',
    'WRITABLE': 'custom'
  },
  exceptionMap: {
    'BASE': 'Tea.exceptions.TeaException',
  },
  model: {
    dir: 'models',
    mode: 'single_file',
    include: [],
  },
  client: {
    defaultName: 'client',
    include: []
  },
  tea: {
    core: {
      name: 'Tea.core.TeaCore',
      doAction: 'do_action',
      allowRetry: 'allow_retry',
      sleep: 'sleep',
      getBackoffTime: 'get_backoff_time',
      isRetryable: 'is_retryable',
      toModel: 'toModel',
      merge: 'merge'
    },
    model: {
      name: 'Tea.model.TeaModel'
    },
    converter: {
      name: 'Converter'
    },
    response: {
      name: 'Tea.response.TeaResponse'
    },
    request: {
      name: 'Tea.request.TeaRequest'
    },
    exception: {
      name: 'Tea.exceptions.TeaException'
    },
    error: {
      name: 'Tea.exceptions.TeaException'
    },
    exceptionUnretryable: {
      name: 'Tea.exceptions.UnretryableException'
    },
  }
};