'use strict';

const assert = require('assert');
const {
  _snakeCase,
  _daraPathSegments,
  _daraModuleStem,
  _assertPythonModule,
  _isSnakeCase,
} = require('../lib/helper');

describe('Python module path helpers', function () {
  it('_snakeCase maps websocketUtils to websocket_utils', function () {
    assert.strictEqual(_snakeCase('websocketUtils'), 'websocket_utils');
    assert.strictEqual(_snakeCase('WebSocketUtils'), 'web_socket_utils');
  });

  it('_daraPathSegments splits POSIX and Windows separators', function () {
    assert.deepStrictEqual(_daraPathSegments(), []);
    assert.deepStrictEqual(_daraPathSegments(''), []);
    assert.deepStrictEqual(
      _daraPathSegments('./websocketUtils.dara'),
      ['.', 'websocketUtils.dara']
    );
    assert.deepStrictEqual(
      _daraPathSegments('.\\websocketUtils.dara'),
      ['.', 'websocketUtils.dara']
    );
    assert.deepStrictEqual(
      _daraPathSegments('foo/bar/websocketUtils.dara'),
      ['foo', 'bar', 'websocketUtils.dara']
    );
  });

  it('_daraModuleStem strips dara/tea/spec suffix from any separator', function () {
    assert.strictEqual(_daraModuleStem(), '');
    assert.strictEqual(_daraModuleStem('/'), '');
    assert.strictEqual(_daraModuleStem('./websocketUtils.dara'), 'websocketUtils');
    assert.strictEqual(_daraModuleStem('.\\websocketUtils.dara'), 'websocketUtils');
    assert.strictEqual(_daraModuleStem('websocketUtils.tea'), 'websocketUtils');
    assert.strictEqual(_daraModuleStem('websocketUtils.spec'), 'websocketUtils');
    assert.strictEqual(_daraModuleStem('dir/websocketUtils.DARA'), 'websocketUtils');
    assert.strictEqual(_daraModuleStem('plain'), 'plain');
  });

  it('exported dara filename becomes a snake_case Python module', function () {
    const filename = _snakeCase(_daraModuleStem('./websocketUtils.dara'));
    assert.strictEqual(filename, 'websocket_utils');
    assert.strictEqual(`${filename}_models`, 'websocket_utils_models');
    assert.ok(_isSnakeCase(filename));
  });

  it('_assertPythonModule accepts snake_case and rejects camelCase', function () {
    assert.strictEqual(_assertPythonModule('', 'empty'), '');
    assert.strictEqual(
      _assertPythonModule('websocket_utils', 'export WebSocketUtils'),
      'websocket_utils'
    );
    assert.throws(() => {
      _assertPythonModule('websocketUtils', 'export WebSocketUtils');
    }, /snake_case/);
    assert.throws(() => {
      _assertPythonModule('1abc', 'export');
    }, /snake_case/);
  });
});
