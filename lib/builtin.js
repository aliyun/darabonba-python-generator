'use strict';
const DSL = require('@darabonba/parser');
const { _vid, _name, CORE } = require('./helper');

const types = [
  'integer', 'int8', 'int16', 'int32',
  'int64', 'long', 'ulong', 'string',
  'uint8', 'uint16', 'uint32', 'uint64',
  'number', 'float', 'double', 'boolean',
  'bytes', 'readable', 'writable', 'object', 'any'
];

const integers = [
  'integer', 'int8', 'int16', 'int32',
  'int64', 'long', 'ulong',
  'uint8', 'uint16', 'uint32', 'uint64'
];

const floats = ['float', 'double'];

const BuiltinModule = {
  DaraMath: {
    packageName: 'darabonba.utils',
    className: 'Math',
  },
  DaraStream: {
    packageName: 'darabonba.utils',
    className: 'Stream',
  },
  DaraConsole: {
    packageName: 'darabonba.utils',
    className: 'Logger',
  },
  DaraXML: {
    packageName: 'darabonba.utils',
    className: 'XML',
  },
  DaraURL: {
    packageName: 'darabonba.utils',
    className: 'Url',
  },
  DaraForm: {
    packageName: 'darabonba.utils',
    className: 'Form',
  },
  DaraFile: {
    packageName: 'darabonba.utils',
    className: 'File',
  },
  DaraBytes: {
    packageName: 'darabonba.utils',
    className: 'Bytes',
  },
  DaraDate: {
    packageName: 'darabonba.utils',
    className: 'Date',
  },
};

class Builtin {
  constructor(generator, module = '', methods = []) {
    this.generator = generator;
    this.module = module;

    methods.forEach(method => {
      this[method] = function (args, level) {
        this.generator.emit(`${this.module}.${method}`);
        this.generator.visitArgs(args, level);
      };
    });
  }

  getInstanceName(ast) {
    if (ast.left.id.tag === DSL.Tag.Tag.VID) {
      this.generator.emit(`this.${_vid(ast.left.id)}`);
    } else {
      this.generator.emit(`${_name(ast.left.id)}`);
    }
  }
}

class Env extends Builtin {
  constructor(generator) {
    const methods = ['get', 'set'];
    super(generator, 'Env', methods);
  }
}

class Logger extends Builtin {
  constructor(generator) {
    const methods = ['log', 'info', 'debug', 'warning', 'error', 'critical', 'setLevel', 'format'];
    super(generator, 'Logger', methods);
  }
}

class XML extends Builtin {
  constructor(generator) {
    const methods = ['parseXml', 'toXML'];
    super(generator, `XML`, methods);
  }
}

class URL extends Builtin {
  constructor(generator) {
    const methods = ['parse', 'urlEncode', 'percentEncode', 'pathEncode'];
    super(generator, `URL`, methods);
  }
}

class Stream extends Builtin {
  constructor(generator) {
    const methods = ['readAsBytes', 'readAsJSON', 'readAsString', 'readAsSSE'];
    super(generator, `Stream`, methods);
  }
}

class Number extends Builtin {
  constructor(generator) {
    const methods = ['random', 'floor'];
    super(generator, 'Math', methods);
  }

  round(ast) {
    this.generator.emit('round(`${');
    this.getInstanceName(ast);
    this.generator.emit('}`)');
  }

  min(ast, level) {
    this.generator.emit(`min(`);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(', ');
    this.generator.visitExpr(ast.args[1], level);
    this.generator.emit(')');
  }

  max(ast, level) {
    this.generator.emit(`max(`);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(', ');
    this.generator.visitExpr(ast.args[1], level);
    this.generator.emit(')');
  }

  parseInt(ast) {
    this.generator.emit('int(`${');
    this.getInstanceName(ast);
    this.generator.emit('}`)');
  }

  parseLong(ast) {
    this.generator.emit('int(`${');
    this.getInstanceName(ast);
    this.generator.emit('}`)');
  }

  parseFloat(ast) {
    this.generator.emit('float(`${');
    this.getInstanceName(ast);
    this.generator.emit('}`)');
  }

  parseDouble(ast) {
    this.generator.emit('float(`${');
    this.getInstanceName(ast);
    this.generator.emit('}`)');
  }

  itol(ast) {
    this.getInstanceName(ast);
  }

  ltoi(ast) {
    this.getInstanceName(ast);
  }
}

class JSON extends Builtin {
  constructor(generator) {
    const methods = ['stringify', 'parseJSON'];
    super(generator, 'JSON', methods);
  }
}

class Form extends Builtin {
  constructor(generator) {
    const methods = ['toFormString', 'getBoundary', 'toFileForm'];
    super(generator, `Form`, methods);
  }
}

class File extends Builtin {
  constructor(generator) {
    const methods = ['createReadStream', 'createWriteStream', 'exists'];
    super(generator, `File`, methods);
  }
}

class Bytes extends Builtin {
  constructor(generator) {
    const methods = ['from', 'toHex', 'toBase64', 'toJSON'];
    super(generator, 'Bytes', methods);
  }

  toString(ast, level, type = 'utf8') {
    this.getInstanceName(ast, level);
    this.generator.emit(`.decode("${type}")`);
  }

  length(ast) {
    this.generator.emit('len(`${');
    this.getInstanceName(ast);
    this.generator.emit('}`)');
  }
}


class Converter {
  constructor(generator) {
    this.generator = generator;
    integers.forEach(type => {
      this[type] = function (args) {
        const expr = args[0];
        generator.emit('parseInt(');
        generator.visitExpr(expr);
        generator.emit(')');
      };
    });

    floats.forEach(type => {
      this[type] = function (args) {
        const expr = args[0];
        generator.emit('parseFloat(');
        generator.visitExpr(expr);
        generator.emit(')');
      };
    });
  }

  string(args) {
    const expr = args[0];
    this.generator.emit('String(');
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }

  number(args) {
    const expr = args[0];
    this.generator.emit('Number(');
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }

  boolean(args) {
    const expr = args[0];
    this.generator.emit('Boolean(');
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }

  bytes(args) {
    const expr = args[0];
    this.generator.emit('Buffer.from(');
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }

  any(args) {
    const expr = args[0];
    this.generator.visitExpr(expr);
  }

  object(args) {
    const expr = args[0];
    this.generator.visitExpr(expr);
  }

  readable(args) {
    const expr = args[0];
    this.generator.emit('Readable.from(');
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }

  writable(args) {
    const expr = args[0];
    this.generator.emit('Writable.from(');
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }
}

class Func {
  constructor(generator) {
    this.generator = generator;
    ['sleep', 'isNull'].forEach(method => {
      this[method] = function (args) {
        generator.emit(`$dara.${method}`);
        generator.visitArgs(args);
      };
    });
  }

  equal(args) {
    this.generator.visitExpr(args[0]);
    this.generator.emit(' === ');
    this.generator.visitExpr(args[1]);
  }

  default(args) {
    this.generator.visitExpr(args[0]);
    this.generator.emit(' || ');
    this.generator.visitExpr(args[1]);
  }
}

class String extends Builtin {
  replace(ast, level) {
    this.getInstanceName(ast);
    const args = ast.args;
    const regex = args[0].value.string;
    this.generator.emit('.replace');
    this.generator.emit(`(${regex}, `);
    this.generator.visitExpr(args[1], level);
    this.generator.emit(')');
  }

  contains(ast, level) {
    this.getInstanceName(ast);
    const args = ast.args;
    this.generator.emit('.includes');
    this.generator.visitArgs(args, level);
  }

  length(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.length');
  }

  hasPrefix(ast, level) {
    this.getInstanceName(ast);
    const args = ast.args;
    this.generator.emit('.startsWith');
    this.generator.visitArgs(args, level);
  }

  hasSuffix(ast, level) {
    this.getInstanceName(ast);
    const args = ast.args;
    this.generator.emit('.endsWith');
    this.generator.visitArgs(args, level);
  }

  index(ast, level) {
    this.getInstanceName(ast);
    const args = ast.args;
    this.generator.emit('.indexOf');
    this.generator.visitArgs(args, level);
  }

  subString(ast, level) {
    this.getInstanceName(ast);
    const args = ast.args;
    this.generator.emit('.slice');
    this.generator.visitArgs(args, level);
  }

  toLower(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.toLowerCase');
    this.generator.emit('()');
  }

  toUpper(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.toUpperCase');
    this.generator.emit('()');
  }

  equals(ast) {
    this.getInstanceName(ast);
    const args = ast.args;
    const expr = args[0];
    this.generator.emit(' == ');
    this.generator.visitExpr(expr);

  }

  empty(ast) {
    this.generator.emit('!');
    this.getInstanceName(ast);
  }

  toBytes(ast) {
    const args = ast.args;
    const expr = args[0];
    this.generator.emit('Buffer.from(');
    this.getInstanceName(ast);
    this.generator.emit(', ');
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }

  parseInt(ast) {
    this.generator.emit('parseInt(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  parseLong(ast) {
    this.generator.emit('parseInt(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  parseFloat(ast) {
    this.generator.emit('parseFloat(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  parseDouble(ast) {
    this.generator.emit('parseFloat(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }
}

class Array extends Builtin {
  constructor(generator) {
    const methods = ['toJSON'];
    super(generator, 'Map', methods);
  }

  join(ast, level, env) {
    this.generator.emit(`'`);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(`'.join(`);
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  contains(ast, level, env) {
    this.generator.emit(`if `);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(` in `);
    this.getInstanceName(ast);
  }

  length(ast) {
    this.generator.emit('len(`${');
    this.getInstanceName(ast);
    this.generator.emit('}`)');
  }

  index(ast, level) {
    this.getInstanceName(ast);
    this.generator.emit('.index(');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }

  get(ast, level) {
    this.getInstanceName(ast);
    this.generator.emit(`[`);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(`]`);
  }

  sort(ast, level) {
    this.getInstanceName(ast);
    this.generator.emit('.sort()');
  }

  shift(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.pop(0)');
  }

  pop(ast, level) {
    this.getInstanceName(ast);
    this.generator.emit('.pop()');
  }

  unshift(ast, level) {
    this.getInstanceName(ast);
    this.generator.emit('.insert(0, ');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }

  push(ast, level) {
    this.getInstanceName(ast);
    this.generator.emit('.insert(');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }

  concat(ast, level) {
    this.getInstanceName(ast);
    this.generator.emit(' + ');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }

  append(ast, level) {
    this.getInstanceName(ast);
    this.generator.emit('.append(');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }

  remove(ast, level) {
    this.getInstanceName(ast);
    this.generator.emit('.remove(');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }
}

class Map extends Builtin {

  constructor(generator) {
    const methods = ['toJSON'];
    super(generator, 'Map', methods);
  }

  length(ast) {
    this.generator.emit('len(`${');
    this.getInstanceName(ast);
    this.generator.emit('}`)');
  }

  keySet(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.keys()');
  }

  entries(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.items()');
  }

  merge(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.update(');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }
}

class Entry extends Builtin {

  key(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.Key');
  }

  value(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.Value');
  }
}

class Date extends Builtin {
  constructor(generator) {
    const methods = [
      'format', 'unix', 'diff', 'UTC', 'add', 'sub', 'hour',
      'minute', 'second', 'dayOfYear', 'dayOfMonth', 'dayOfWeek',
      'weekOfYear', 'weekOfMonth', 'month', 'year'
    ];
    super(generator, 'Date', methods);
  }
}

module.exports = (generator) => {
  const builtin = {};
  builtin['$Env'] = new Env(generator);
  builtin['$Logger'] = new Logger(generator);
  builtin['$XML'] = new XML(generator);
  builtin['$URL'] = new URL(generator);
  builtin['$Stream'] = new Stream(generator);
  builtin['$Number'] = new Number(generator);
  builtin['$JSON'] = new JSON(generator);
  builtin['$Form'] = new Form(generator);
  builtin['$File'] = new File(generator);
  builtin['$Bytes'] = new Bytes(generator);
  const converter = new Converter(generator);
  types.map(type => {
    builtin[`$${type}`] = converter;
  });

  const func = new Func(generator);
  builtin['$isNull'] = func;
  builtin['$sleep'] = func;
  builtin['$default'] = func;
  builtin['$equal'] = func;

  builtin['$String'] = new String(generator);
  builtin['$Array'] = new Array(generator);
  builtin['$Date'] = new Date(generator);
  builtin['$Map'] = new Map(generator);
  builtin['$Entry'] = new Entry(generator);

  return builtin;
};