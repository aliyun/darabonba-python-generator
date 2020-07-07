'use strict';

const defaultConfig = require('../common/config');

module.exports = {
  ...defaultConfig,
  indent: '    ',
  clientName: 'client',
  ext: '.py',
  keywords: [
    'default',
    'list',
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
  typeMap: {
    'boolean': 'bool',
    'number': 'integer',
    'integer': 'integer',
    'object': 'object',
    'map': 'array',
    'readable': 'Stream',
    'bytes': 'array',
    'long': 'integer'
  },
  exceptionMap: {
    'BASE': 'Tea.exceptions.TeaException',
  },
  model: {
    dir: 'models',
    include: [
    ],
  },
  client: {
    filename: 'Client',
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
    model: { name: 'Tea.model.TeaModel' },
    converter: { name: 'Converter' },
    response: { name: 'Tea.response.TeaResponse' },
    request: { name: 'Tea.request.TeaRequest' },
    exception: { name: 'Tea.exceptions.TeaException' },
    error: { name: 'Tea.exceptions.TeaException' },
    exceptionUnretryable: { name: 'Tea.exceptions.UnretryableException' },
  }
};