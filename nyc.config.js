'use strict';

module.exports = {
  exclude: [
    'coverage',
    'self-coverage',
    'tests/*.js',
    'bin/*.js',
    'commands/*.js',
    'source/*',
    'output/*'
  ],
  branches: 100,
  functions: 100,
  lines: 100,
  statements: 100
};
