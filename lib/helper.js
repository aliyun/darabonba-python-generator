'use strict';
const DSL = require('@darabonba/parser');
const fs = require('fs');
const path = require('path');
const keywords = [
  'False', 'None', 'True', '__peg_parser__', 'and',
  'as', 'assert', 'async', 'await', 'break',
  'class', 'continue', 'def', 'del', 'elif',
  'else', 'except', 'finally', 'for', 'from',
  'global', 'if', 'import', 'in', 'is',
  'lambda', 'nonlocal', 'not', 'or', 'pass',
  'raise', 'return', 'try', 'while', 'with', 'yield'
];
// 定义标准库模块列表（Python 3.x常用标准库）
const standardLibraries = new Set([
  '__future__', 'abc', 'argparse', 'ast', 'asyncio', 'base64', 'bisect',
  'builtins', 'calendar', 'collections', 'concurrent', 'configparser',
  'contextlib', 'copy', 'csv', 'datetime', 'decimal', 'difflib',
  'email', 'enum', 'errno', 'faulthandler', 'fileinput', 'fnmatch',
  'fractions', 'functools', 'gc', 'glob', 'gzip', 'hashlib', 'heapq',
  'hmac', 'html', 'http', 'importlib', 'inspect', 'io', 'ipaddress',
  'itertools', 'json', 'keyword', 'linecache', 'locale', 'logging',
  'lzma', 'math', 'mimetypes', 'multiprocessing', 'numbers', 'operator',
  'os', 'pathlib', 'pickle', 'platform', 'pprint', 'queue', 'random',
  're', 'reprlib', 'secrets', 'shlex', 'shutil', 'signal', 'socket',
  'sqlite3', 'ssl', 'statistics', 'string', 'subprocess', 'sys',
  'tarfile', 'tempfile', 'textwrap', 'threading', 'time', 'timeit',
  'traceback', 'types', 'typing', 'unittest', 'urllib', 'uuid',
  'warnings', 'weakref', 'xml', 'zipfile', 'zlib'
]);

const builtinModels = [
  '$Request', '$Response', '$Error', '$SSEEvent', '$Model',
  '$RuntimeOptions', '$ExtendsParameters', '$RetryOptions',
  '$ResponseError', '$FileField'
];

const CORE = 'Dara';
const REQUEST = '_request';
const RESPONSE = '_response';
const EXCEPTION = 'darabonba.exceptions.DaraException';
const RESP_EXCEPTION = 'darabonba.exceptions.ResponseException';
const MODEL = 'darabonba.model';

const builtinImports = {
  DaraStream: {
    packageName: 'darabonba.utils.stream',
    className: 'Stream',
    aliasName: 'DaraStream'
  },
  DaraConsole: {
    packageName: 'darabonba.utils.console',
    className: 'Logger',
    aliasName: 'DaraConsole'
  },
  DaraXML: {
    packageName: 'darabonba.utils.xml',
    className: 'XML',
    aliasName: 'DaraXML'
  },
  DaraURL: {
    packageName: 'darabonba.url',
    className: 'Url',
    aliasName: 'DaraURL'
  },
  DaraForm: {
    packageName: 'darabonba.utils.form',
    className: 'Form',
    aliasName: 'DaraForm'
  },
  DaraFile: {
    packageName: 'darabonba.file',
    className: 'File',
    aliasName: 'DaraFile'
  },
  DaraBytes: {
    packageName: 'darabonba.utils.bytes',
    className: 'Bytes',
    aliasName: 'DaraBytes'
  },
  DaraDate: {
    packageName: 'darabonba.date',
    className: 'Date',
    aliasName: 'DaraDate'
  },
  DaraCore: {
    packageName: 'darabonba.core',
    className: 'DaraCore',
  },
  DaraRequest: {
    packageName: 'darabonba.request',
    className: 'DaraRequest',
  },
  DaraResponse: {
    packageName: 'darabonba.response',
    className: 'DaraResponse',
  },
  DaraModel: {
    packageName: 'darabonba.model',
    className: 'DaraModel',
  },
  RuntimeOptions: {
    packageName: 'darabonba.runtime',
    className: 'RuntimeOptions',
  },
  DaraException: {
    packageName: 'darabonba.exceptions',
    className: 'DaraException',
  },
  UnretryableException: {
    packageName: 'darabonba.exceptions',
    className: 'UnretryableException',
  },
  ResponseException: {
    packageName: 'darabonba.exceptions',
    className: 'ResponseException',
  },
  RetryPolicyContext: {
    packageName: 'darabonba.policy.retry',
    className: 'RetryPolicyContext',
  },
  RetryOptions: {
    packageName: 'darabonba.policy.retry',
    className: 'RetryOptions',
  },
  SSEEvent: {
    packageName: 'darabonba.event',
    className: 'Event',
    aliasName: 'SSEEvent'
  },
  FileField: {
    packageName: 'darabonba.utils.form',
    className: 'FileField',
  },
  ExtendsParameters: {
    packageName: 'darabonba.runtime',
    className: 'ExtendsParameters',
  },
  DaraEnv: {
    className: 'os',
  },
  DaraLogger: {
    className: 'logging',
  }
};

function _name(str) {
  if (str.lexeme === '__request') {
    return REQUEST;
  }

  if (str.lexeme === '__response') {
    return RESPONSE;
  }

  if (str.lexeme === 'from') {
    return 'from_';
  }

  if (str.lexeme === 'self') {
    return 'self_';
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
  return str.charAt(0).toUpperCase() + str.slice(1);
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
  // 先将字符串中的下划线拆分
  if (str.indexOf(split) > -1) {
    let tmp = str.split(split);
    tmp = tmp.map((s, i) => {
      // 如果是第一个单词则不处理，其他单词首字母大写
      return _upperFirst(s);
    });
    str = tmp.join('');
  } else {
    // 如果没有下划线，对整个字符串首字母大写
    str = _upperFirst(str);
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

function _isDefault(expr) {
  if (expr.type !== 'call' || expr.left.type !== 'method_call') {
    return false;
  }
  const name = _name(expr.left.id);

  if (name !== '$default') {
    return false;
  }

  return true;
}

function _type(name) {
  if (name === 'string') {
    return 'str';
  }

  if (name === 'boolean') {
    return 'bool';
  }

  if (name === 'any') {
    return 'Any';
  }

  if (name === 'void') {
    return 'None';
  }

  if (name === 'integer' || name === 'number' ||
    name === 'int8' || name === 'uint8' ||
    name === 'int16' || name === 'uint16' ||
    name === 'int32' || name === 'uint32' ||
    name === 'int64' || name === 'uint64' ||
    name === 'long' || name === 'ulong') {
    return 'int';
  }

  if (name === 'float' || name === 'double') {
    return 'float';
  }

  if (name === 'readable') {
    return 'BinaryIO';
  }

  if (name === 'writable') {
    return 'BinaryIO';
  }

  if (name === '$Request') {
    return `${CORE}Request`;
  }

  if (name === '$Response') {
    return `${CORE}Response`;
  }

  if (name === '$Model') {
    return `${CORE}Model`;
  }

  if (name === '$Error') {
    return `${CORE}Exception`;
  }

  if (name === '$SSEEvent') {
    return 'SSEEvent';
  }

  if (name === '$RetryOptions') {
    return 'RetryOptions';
  }

  if (name === '$RuntimeOptions') {
    return 'RuntimeOptions';
  }

  if (name === '$ResponseError') {
    return 'ResponseError';
  }

  if (name === '$FileField') {
    return 'FileField';
  }

  if (name === '$ExtendsParameters') {
    return 'ExtendsParameters';
  }

  if (name === '$Date') {
    return `${CORE}Date`;
  }

  if (name === '$File') {
    return `${CORE}File`;
  }

  if (name === '$URL') {
    return `${CORE}URL`;
  }

  if (name === '$Stream') {
    return `${CORE}Stream`;
  }

  if (name === 'object') {
    return 'dict';
  }

  if (name === 'bytes') {
    return 'bytes';
  }

  return name;
}

function _adaptedQuotes(str) {
  const line = str.split('\n');
  let quote = '\'';
  if (str.indexOf('\'') !== -1 && str.indexOf('"') !== -1 || line.length > 1) {
    quote = '\'\'\'';
  } else if (str.indexOf('\'') !== -1) {
    quote = '"';
  }
  return quote;
}

function _getImport(type) {
  return builtinImports[type];
}

function _escape(str) {
  return str.includes('-') ? `'${str}'` : str;
}

function _removeFilesInDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return;
  }
  const files = fs.readdirSync(directoryPath);
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      _removeFilesInDirectory(filePath);
      fs.rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }
}

/**
 * 按照Python PEP 8标准对imports进行排序
 * @param {Array} imports - import对象数组
 * @returns {Array} 排序后的imports数组
 */
function _sortImports(imports) {
  function isStandardLibrary(packageName) {
    if (!packageName) { return false; }

    // 处理子模块，如 os.path -> os
    const rootModule = packageName.split('.')[0];
    return standardLibraries.has(rootModule);
  }

  function isThirdPartyLibrary(packageName) {
    if (!packageName) { return false; }

    // 不是标准库且不是相对导入（不以.开头）
    return !isStandardLibrary(packageName) && !packageName.startsWith('.');
  }

  function isLocalImport(packageName) {
    if (!packageName) { return false; }

    // 以.开头的相对导入，或者看起来像本地模块的导入
    return packageName.startsWith('.') ||
      (!isStandardLibrary(packageName) && !isThirdPartyLibrary(packageName));
  }

  function getImportPriority(importObj) {
    const { packageName, className } = importObj;

    // 1. __future__ imports (最高优先级)
    if (packageName === '__future__') {
      return 1;
    }

    // 2. 标准库 import 语句
    if (!packageName && isStandardLibrary(className)) {
      return 2;
    }

    // 3. 标准库 from...import 语句
    if (packageName && isStandardLibrary(packageName)) {
      return 3;
    }

    // 4. 第三方库 import 语句
    if (!packageName && isThirdPartyLibrary(className)) {
      return 4;
    }

    // 5. 第三方库 from...import 语句
    if (packageName && isThirdPartyLibrary(packageName)) {
      return 5;
    }

    // 6. 本地/相对 import 语句
    if (!packageName && isLocalImport(className)) {
      return 6;
    }

    // 7. 本地/相对 from...import 语句
    if (packageName && isLocalImport(packageName)) {
      return 7;
    }

    // 8. 其他情况
    return 8;
  }


  // 生成排序键
  function getSortKey(importObj) {
    const { packageName, className } = importObj;
    const priority = getImportPriority(importObj);

    // 构建排序键：优先级 + 包名 + 类名
    const sortPackage = packageName || '';
    const sortClass = className || '';

    return `${priority.toString().padStart(2, '0')}_${sortPackage}_${sortClass}`;
  }

  //合并同一包的from imports
  function mergeFromImportsByPackage(imports) {
    const packageGroups = new Map();
    const nonFromImports = [];

    for (const importObj of imports) {
      if (importObj.packageName) {
        if (!packageGroups.has(importObj.packageName)) {
          packageGroups.set(importObj.packageName, []);
        }
        packageGroups.get(importObj.packageName).push(importObj);
      } else {
        nonFromImports.push(importObj);
      }
    }

    const mergedImports = [...nonFromImports];
    for (const [packageName, packageImports] of packageGroups) {
      if (packageImports.length === 1) {
        mergedImports.push(packageImports[0]);
      } else {
        const canMerge = packageImports.every(imp => !imp.aliasName);

        if (canMerge) {
          const classNames = packageImports.map(imp => imp.className).sort();
          mergedImports.push({
            packageName: packageName,
            className: classNames.join(', '),
            aliasName: '',
            _isMerged: true
          });
        } else {
          mergedImports.push(...packageImports);
        }
      }
    }

    return mergedImports;
  }


  const importMap = new Map();
  for (const importObj of imports) {
    const key = `${importObj.packageName}|${importObj.className}|${importObj.aliasName}`;

    if (importMap.has(key)) {
      continue;
    }
    importMap.set(key, importObj);
  }


  const mergedImports = mergeFromImportsByPackage(Array.from(importMap.values()));

  // 对imports进行排序
  const sortedImports = [...mergedImports].sort((a, b) => {
    const keyA = getSortKey(a);
    const keyB = getSortKey(b);
    return keyA.localeCompare(keyB);
  });

  return sortedImports;
}

// 辅助函数：将排序后的导入转换为Python代码字符串
function _importsToString(sortedImports) {
  const lines = [];
  let lastPriority = -1;

  // 内部函数需要访问外部的getImportPriority
  function getImportPriority(importObj) {
    const { packageName, className } = importObj;

    function isStandardLibrary(packageName) {
      if (!packageName) { return false; }
      const rootModule = packageName.split('.')[0];
      return standardLibraries.has(rootModule);
    }

    if (packageName === '__future__') { return 1; }
    if (!packageName && isStandardLibrary(className)) { return 2; }
    if (packageName && isStandardLibrary(packageName)) { return 3; }
    if (!packageName && !isStandardLibrary(className)) { return 4; }
    if (packageName && !isStandardLibrary(packageName)) { return 5; }
    return 6;
  }

  sortedImports.forEach(importObj => {
    const { packageName, className, aliasName } = importObj;
    const currentPriority = getImportPriority(importObj);

    // 在不同优先级组之间添加空行
    if (lastPriority !== -1 && currentPriority !== lastPriority) {
      lines.push('');
    }

    // 生成import语句
    let importLine;
    if (packageName) {
      // from...import 语句
      if (aliasName) {
        importLine = `from ${packageName} import ${className} as ${aliasName}`;
      } else {
        importLine = `from ${packageName} import ${className}`;
      }
    } else {
      // import 语句
      if (aliasName) {
        importLine = `import ${className} as ${aliasName}`;
      } else {
        importLine = `import ${className}`;
      }
    }

    lines.push(importLine);
    lastPriority = currentPriority;
  });

  return lines.join('\n');
}


module.exports = {
  _removeFilesInDirectory,
  _name,
  _escape,
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
  _isDefault,
  _type,
  _getImport,
  _adaptedQuotes,
  _sortImports,
  _importsToString,
  CORE,
  REQUEST,
  RESPONSE,
  EXCEPTION,
  RESP_EXCEPTION,
  MODEL,
};