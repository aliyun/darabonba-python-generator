'use strict';

const defaultConfig = require('../common/config');

module.exports = {
  ...defaultConfig,
  indent: '    ',
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
  model: {
    dir: 'models',
    include: [
      //{ 'from': '', 'import': 're' }
    ],
  },
  client: {
    filename: 'Client',
    include: [
      //{ 'from': '', 'import': 'time' }
    ]
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
    exceptionUnretryable: { name: 'Tea.exceptions.UnretryableException' },
  }
};