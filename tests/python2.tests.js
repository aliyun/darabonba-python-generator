'use strict';

const path = require('path');
const fs = require('fs');
const assert = require('assert');

const DSL = require('@darabonba/parser');

let Generator = require('../src/generator');

const lang = 'python2';

const expectedDir = path.join(__dirname, 'expected/python2/');
const fixturesDir = path.join(__dirname, 'fixtures/');
const outputDir = path.join(__dirname, '../', 'output/tests/python2/');

function check(moduleName, expectedFiles = [], option = {}) {
  const mainFilePath = path.join(fixturesDir, moduleName, 'main.dara') ? path.join(fixturesDir, moduleName, 'main.dara') : path.join(fixturesDir, moduleName, 'main.tea');
  const moduleOutputDir = path.join(outputDir, moduleName);
  const prefixDir = path.join(fixturesDir, moduleName);
  const pkgContent = fs.readFileSync(
    fs.existsSync(path.join(prefixDir, 'Darafile')) ? path.join(prefixDir, 'Darafile') : path.join(prefixDir, 'Teafile'), 'utf8');
  const pkgInfo = JSON.parse(pkgContent);
  const config = {
    outputDir: moduleOutputDir,
    pkgDir: path.join(fixturesDir, moduleName),
    ...pkgInfo,
    ...option
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

describe('Python Generator', function () {
  it('alias should ok', function () {
    check('alias', [
      'tea_python_tests/client.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client',
        packageInfo: {
          name: 'tea_python_tests',
          desc: 'Generate setup.py',
          github: 'https://github.com/',
          author: 'Alibaba',
          email: 'sdk-team@alibabacloud.com'
        }
      }
    });
  });

  it('add annotation should ok', function () {
    check('annotation', [
      'tea_python_tests/client.py',
      'tea_python_tests/models.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client'
      }
    });
  });

  it('api should ok', function () {
    check('api', [
      'tea_python_tests/client.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client'
      }
    });
  });

  it('add comments should ok', function () {
    check('comment', [
      'tea_python_tests/client.py',
      'tea_python_tests/models.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client'
      }
    });
  });

  it('complex should ok', function () {
    check('complex', [
      'tea_python_tests/client.py',
      'tea_python_tests/models.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client'
      }
    });
  });

  it('const should ok', function () {
    check('const', [
      'tea_python_tests/client.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client'
      }
    });
  });

  it('empty should ok', function () {
    check('empty', [
      'tea_python_tests/client.py',
      '.gitignore'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client',
        packageInfo: {
          name: 'tea_python_tests',
          desc: 'Generate setup.py',
          github: 'https://github.com/',
          author: 'Alibaba',
          email: 'sdk-team@alibabacloud.com'
        }
      }
    });
  });

  it('function should ok', function () {
    check('function', [
      'tea_python_tests/client.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client'
      }
    });
  });

  it('import should ok', function () {
    check('import', [
      'tea_python_tests/client.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client'
      }
    });
  });

  it('map should ok', function () {
    check('map', [
      'tea_python_tests/client.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client'
      }
    });
  });

  it('model should ok', function () {
    check('model', [
      'tea_python_tests/client.py',
      'tea_python_tests/models.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client'
      }
    });
  });

  it('statements should ok', function () {
    check('statements', [
      'tea_python_tests/client.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client'
      }
    });
  });

  it('super should ok', function () {
    check('super', [
      'tea_python_tests/client.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client'
      }
    });
  });

  it('exec should ok', function () {
    check('exec', [
      'tea_python_tests/exec_client.py'
    ],
    {
      exec: true,
      python2: {
        package: 'tea_python_tests',
        clientName: 'exec_client'
      }
    });
  });
  it('typedef should ok', function () {
    check('typedef', [
      'tea_python_tests/client.py',
      'tea_python_tests/models.py'
    ],
    {
      python2: {
        package: 'tea_python_tests',
        clientName: 'client',
        packageInfo: {
          name: 'tea_python_tests',
          desc: 'Generate setup.py',
          github: 'https://github.com/',
          author: 'Alibaba',
          email: 'sdk-team@alibabacloud.com'
        },
        typedef: {
          HttpResponse: {
            import: 'requests',
            type: 'Response',
            package: 'requests:2.21.0'
          },
          HttpHeader: {
            import: null,
            type: 'Dict[str, Any]',
            package: null
          },
          TeaModel: {
            import: 'Tea.model',
            type: 'TeaModel',
            package: 'alibabacloud-tea-py2:0.0.4'
          },
          TeaException: {
            import: 'Tea.exceptions',
            type: 'TeaException',
            package: 'alibabacloud-tea-py2:0.0.4'
          }
        }
      }

    });
  });
});