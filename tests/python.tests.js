'use strict';

const path = require('path');
const fs = require('fs');
const assert = require('assert');

const DSL = require('@darabonba/parser');

let Generator = require('../src/generator');

const lang = 'python';

const expectedDir = path.join(__dirname, 'expected/');
const fixturesDir = path.join(__dirname, 'fixtures');
const outputDir = path.join(__dirname, '../', 'output/');

function check(moduleName, expectedFiles = []) {
  const mainFilePath = path.join(fixturesDir, moduleName, 'main.dara') ? path.join(fixturesDir, moduleName, 'main.dara') : path.join(fixturesDir, moduleName, 'main.tea');
  const moduleOutputDir = path.join(outputDir, moduleName);
  const pkgContent = fs.readFileSync(
    fs.existsSync(path.join(__dirname, `fixtures/${moduleName}/Darafile`)) ? path.join(__dirname, `fixtures/${moduleName}/Darafile`) : path.join(__dirname, `fixtures/${moduleName}/Teafile`), 'utf8');
  const pkgInfo = JSON.parse(pkgContent);
  const config = {
    outputDir: moduleOutputDir,
    pkgDir: path.join(__dirname, `fixtures/${moduleName}`),
    ...pkgInfo,
    python: {
      package: 'tea_python_tests',
      clientName: 'client'
    }
  };
  const generator = new Generator(config, lang);

  const dsl = fs.readFileSync(mainFilePath, 'utf8');
  const ast = DSL.parse(dsl, mainFilePath);
  generator.visit(ast);
  expectedFiles.forEach(element => {
    const outputFilePath = path.join(outputDir, moduleName, element);
    const expectedFilePath = path.join(expectedDir, moduleName, element);
    const expected = fs.readFileSync(expectedFilePath, 'utf8');
    assert.deepStrictEqual(fs.readFileSync(outputFilePath, 'utf8'), expected);
  });
}

describe('New Generator', function () {
  it('add annotation should ok', function () {
    check('annotation', [
      'tea_python_tests/client.py'
    ]);
  });

  it('api should ok', function () {
    check('api', [
      'tea_python_tests/client.py'
    ]);
  });

  it('add comments should ok', function () {
    check('comment', [
      'tea_python_tests/models.py',
    ]);
  });

  it('complex should ok', function () {
    check('complex', [
      'tea_python_tests/client.py',
      'tea_python_tests/models.py'
    ]);
  });

  it('const should ok', function () {
    check('const', [
      'tea_python_tests/client.py'
    ]);
  });

  it('empty should ok', function () {
    check('empty', [
      'tea_python_tests/client.py'
    ]);
  });

  it('function should ok', function () {
    check('function', [
      'tea_python_tests/client.py'
    ]);
  });

  it('import should ok', function () {
    check('import', [
      'tea_python_tests/client.py'
    ]);
  });

  it('map should ok', function () {
    check('map', [
      'tea_python_tests/client.py'
    ]);
  });

  it('model should ok', function () {
    check('model', [
      'tea_python_tests/client.py'
    ]);
  });

  it('statements should ok', function () {
    check('statements', [
      'tea_python_tests/client.py'
    ]);
  });

  it('super should ok', function () {
    check('super', [
      'tea_python_tests/client.py'
    ]);
  });
});