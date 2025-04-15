'use strict';

const path = require('path');
const fs = require('fs');
const assert = require('assert');

const DSL = require('@darabonba/parser');

let Generator = require('../lib/generator');

const lang = 'python';

const expectedDir = path.join(__dirname, 'expected/');
const fixturesDir = path.join(__dirname, 'fixtures/');
const outputDir = path.join(__dirname, 'output/');

function compareDirectories(expectedDir, outputDir) {
  const expectedFiles = fs.readdirSync(expectedDir);
  const outputFiles = fs.readdirSync(outputDir);
  for (let fileName of expectedFiles) {
    if (!outputFiles.includes(fileName)) {
      assert.ok(false);
    }
    const expectedPath = path.join(outputDir, fileName);
    const actualPath = path.join(expectedDir, fileName);
    const expectedStat = fs.statSync(expectedPath);
    const actualStat = fs.statSync(actualPath);

    // 如果两个文件都是文件夹，则递归进行比较
    if (expectedStat.isDirectory() && actualStat.isDirectory()) {
      compareDirectories(expectedPath, actualPath);
    }
    // 如果是文件，则比较文件内容
    else if (expectedStat.isFile() && actualStat.isFile()) {
      const expectedContent = fs.readFileSync(expectedPath, 'utf8');
      const acutalContent = fs.readFileSync(actualPath, 'utf8');

      assert.deepStrictEqual(expectedContent, acutalContent);
    }
  }
}

function check(moduleName, expectedDir, option = {}) {
  const mainFilePath = path.join(fixturesDir, moduleName, 'main.dara') ? path.join(fixturesDir, moduleName, 'main.dara') : path.join(fixturesDir, moduleName, 'main.tea');
  const moduleOutputDir = path.join(outputDir, moduleName);
  const prefixDir = path.join(fixturesDir, moduleName);
  const pkgContent = fs.readFileSync(
    fs.existsSync(path.join(prefixDir, 'Darafile')) ? path.join(prefixDir, 'Darafile') : path.join(prefixDir, 'Teafile'), 'utf8');
  const pkgInfo = JSON.parse(pkgContent);
  const config = {
    package: 'tea_python_tests',
    outputDir: moduleOutputDir,
    pkgDir: path.join(fixturesDir, moduleName),
    ...pkgInfo,
    ...pkgInfo[lang],
    ...option
  };
  const generator = new Generator(config, lang);

  const dsl = fs.readFileSync(mainFilePath, 'utf8');
  const ast = DSL.parse(dsl, mainFilePath);
  generator.visit(ast);
  compareDirectories(path.join(__dirname, 'expected', moduleName, expectedDir), path.join(moduleOutputDir, expectedDir));
}

describe('Python Generator', function () {

  it('multi should ok', function () {
    check('multi', 'tea_python_tests',
      {
        python: {
          package: 'tea_python_tests',
          clientName: 'client'
        }
      });
  });

  
  it('complex should ok', function () {
    check('complex', 'tea_python_tests',
      {
        python: {
          package: 'tea_python_tests',
          clientName: 'client'
        }
      });
  });
  
  it('model should ok', function () {
    check('model', 'tea_python_tests',
      {
        python: {
          package: 'tea_python_tests',
          clientName: 'client',
          additionalPackage: [
            {
              from: '__future__',
              import: 'annotations'
            }
          ]
        }
      });
  });

  it('map should ok', function () {
    check('map', 'tea_python_tests',
      {
        python: {
          package: 'tea_python_tests',
          clientName: 'client'
        }
      });
  });

  it('builtin should ok', function () {
    check('builtin', 'tea_python_tests',
      {
        exec: true,
        python: {
          package: 'tea_python_tests',
          clientName: 'client'
        }
      });
  });

  it('exec should ok', function () {
    check('exec', 'tea_python_tests',
      {
        exec: true,
        python: {
          package: 'tea_python_tests',
          clientName: 'exec_client'
        }
      });
  });

  it('alias should ok', function () {
    check('alias', 'tea_python_tests',
      {
        python: {
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

  it('const should ok', function () {
    check('const', 'tea_python_tests',
      {
        python: {
          package: 'tea_python_tests',
          clientName: 'client'
        }
      });
  });

  it('statements should ok', function () {
    check('statements', 'tea_python_tests',
      {
        python: {
          package: 'tea_python_tests',
          clientName: 'client'
        }
      });
  });
  
  it('function should ok', function () {
    check('function', 'tea_python_tests',
      {
        python: {
          package: 'tea_python_tests',
          clientName: 'client'
        }
      });
  }); 
   
  it('api should ok', function () {
    check('api', 'tea_python_tests',
      {
        python: {
          package: 'tea_python_tests',
          clientName: 'client'
        }
      });
  });

  it('import should ok', function () {
    check('import', 'tea_python_tests',
      {
        python: {
          package: 'tea_python_tests',
          clientName: 'client',
          packageInfo: {
            name: 'tea_python_tests',
            desc: 'Generate setup.py',
            github: 'https://github.com/',
            author: 'Alibaba',
            email: 'sdk-team@alibabacloud.com'
          },
          additionalPackage: [
            {
              from: '__future__',
              import: 'annotations'
            }
          ]
        }
      });
    const expected = fs.readFileSync(path.join(expectedDir, 'import', 'setup.py'), 'utf8');
    const output = fs.readFileSync(path.join(outputDir, 'import', 'setup.py'), 'utf8');
    assert.deepStrictEqual(output.replace(new RegExp('\\d{2}\\/\\d{2}\\/\\d{4}'), '*'), expected);
  });



  it('add annotation should ok', function () {
    check('annotation', 'tea_python_tests',
      {
        python: {
          package: 'tea_python_tests',
          clientName: 'client'
        }
      });
  });

  it('add comments should ok', function () {
    check('comment', 'tea_python_tests',
      {
        python: {
          package: 'tea_python_tests',
          clientName: 'client'
        }
      });
  });



  it('empty should ok', function () {
    check('empty', 'tea_python_tests',
    {
      python: {
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



  it('super should ok', function () {
    check('super', 'tea_python_tests',
      {
        python: {
          package: 'tea_python_tests',
          clientName: 'client'
        }
      });
  });


  it('typedef should ok', function () {
    check('typedef', 'tea_python_tests',
      {
        python: {
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
              package: 'alibabacloud-tea:0.2.9'
            },
            TeaException: {
              import: 'Tea.exceptions',
              type: 'TeaException',
              package: 'alibabacloud-tea:0.2.9'
            }
          }
        }
      });
  });
});