 
 
'use strict';
const DSL = require('@darabonba/parser');
const { _getImport, _name, CORE, _snakeCase, _isDefault } = require('./helper');

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
  'uint8', 'uint16', 'uint32', 'uint64',
];

const floats = ['float', 'double'];

class Builtin {
  constructor(generator, module = '', methods = []) {
    this.generator = generator;
    this.module = module;

    methods.forEach(method => {
      this[method] = function (ast, level, async) {
        this.generator.imports.push(_getImport(this.module));
        if(async) {
          this.generator.emit('await ');
        }
        this.generator.emit(`${this.module}.${_snakeCase(method)}`);
        if(async) {
          this.generator.emit('_async');
        }
        this.generator.visitArgs(ast.args, level);
      };
    });
  }

  getInstanceName(ast) {
    if (!ast.left) {
      return;
    }
    if (ast.left.id.tag === DSL.Tag.Tag.VID) {
      this.generator.emit(`this.${_snakeCase(ast.left.id)}`);
    } else {
      this.generator.emit(`${_snakeCase(_name(ast.left.id)).replace('$','')}`);
    }
  }

  getClientName() {
    this.generator.imports.push(_getImport(this.module));
    return this.module;
  }
}

class Env extends Builtin {
  constructor(generator) {
    const methods = [];
    super(generator, `${CORE}Env`, methods);
  }

  get(ast) {
    this.generator.imports.push(_getImport(this.module));
    this.generator.emit('os.environ.get(');
    this.generator.emit(`'${ast.args[0].value.string}'`);
    this.generator.emit(')');
  }

  set(ast) {
    this.generator.imports.push(_getImport(this.module));
    this.generator.emit('os.environ[');
    this.generator.emit(`'${ast.args[0].value.string}'] = ${ast.args[1].left.id.lexeme} + '${ast.args[1].right.value.string}'`);
  }
}

class Logger extends Builtin {
  constructor(generator) {
    const methods = ['critical', 'setLevel', 'format'];
    super(generator, `${CORE}Logger`, methods);
  }
  log(ast) {
    this.generator.imports.push(_getImport(this.module));
    this.generator.emit('logging.log(logging.NOTSET, ');
    this.generator.visitExpr(ast.args[0]);
    this.generator.emit(')');
  }

  info(ast) {
    this.generator.imports.push(_getImport(this.module));
    this.generator.emit('logging.log(logging.INFO, ');
    this.generator.visitExpr(ast.args[0]);
    this.generator.emit(')');
  }

  warning(ast) {
    this.generator.imports.push(_getImport(this.module));
    this.generator.emit('logging.log(logging.WARNING, ');
    this.generator.visitExpr(ast.args[0]);
    this.generator.emit(')');
  }

  debug(ast) {
    this.generator.imports.push(_getImport(this.module));
    this.generator.emit('logging.log(logging.DEBUG, ');
    this.generator.visitExpr(ast.args[0]);
    this.generator.emit(')');
  }

  error(ast) {
    this.generator.imports.push(_getImport(this.module));
    this.generator.emit('logging.log(logging.ERROR, ');
    this.generator.visitExpr(ast.args[0]);
    this.generator.emit(')');
  }
}

class XML extends Builtin {
  constructor(generator) {
    const methods = [ 'toXML'];
    super(generator, `${CORE}XML`, methods);
  }

  parseXml(ast){
    const clientName = this.getClientName();
    this.generator.emit(`${clientName}.parse_xml(`);
    this.generator.visitExpr(ast.args[0]);
    if (ast.args[1].type === 'null') {
      this.generator.emit(', ');
      this.generator.emit('None');
    } else {
      this.generator.emit(', ');
      this.generator.visitExpr(ast.args[1]);
    }
    this.generator.emit(')');
  }
}

class URL extends Builtin {
  constructor(generator) {
    const methods = ['parse', 'urlEncode', 'percentEncode', 'pathEncode'];
    super(generator, `${CORE}URL`, methods);
  }
}

class Stream extends Builtin {
  constructor(generator) {
    const methods = ['readAsBytes', 'readAsJSON', 'readAsString'];
    super(generator, `${CORE}Stream`, methods);
  }

  readAsSSE(ast, level, async) {
    this.generator.imports.push(_getImport(this.module));
    this.generator.emit(`${this.module}.read_as_sse`);
    if(async) {
      this.generator.emit('_async');
    }
    this.generator.visitArgs(ast.args, level);
  }

  write(ast, level, async) {
    if(async) {
      this.emit('await ');
    }
    this.generator.emit(`${_snakeCase(ast.left.id.lexeme)}.write${async ? '_async' : ''}(`);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')\n');
  }

  pipe(ast) {
    this.generator.emit(`${_snakeCase(ast.left.id.lexeme)}.seek(0)\n`);
    // this.generator.visitExpr(ast.args[0]);
    // this.generator.emit(')\n');
  }
}

class Number extends Builtin {
  constructor(generator) {
    const methods = [];
    super(generator, `${CORE}Math`, methods);
  }

  floor(ast, level) {
    this.generator.imports.push({
      className: 'math',
    });
    this.generator.emit('math.floor(');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }

  round(ast, level) {
    this.generator.emit('round(');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }

  min(ast, level) {
    this.generator.emit('min(');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(', ');
    this.generator.visitExpr(ast.args[1], level);
    this.generator.emit(')');
  }

  max(ast, level) {
    this.generator.emit('max(');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(', ');
    this.generator.visitExpr(ast.args[1], level);
    this.generator.emit(')');
  }

  parseInt(ast) {
    this.generator.emit('int(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  parseLong(ast) {
    this.generator.emit('int(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  parseFloat(ast) {
    this.generator.emit('float(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  parseDouble(ast) {
    this.generator.emit('float(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  itol(ast) {
    this.getInstanceName(ast);
  }

  ltoi(ast) {
    this.getInstanceName(ast);
  }

  random() {
    this.generator.imports.push({
      className: 'random',
    });
    this.generator.emit('random.random()');
  }
}

class JSON extends Builtin {
  constructor(generator) {
    const methods = [];
    super(generator, `${CORE}JSON`, methods);
  }

  stringify(ast, level) {
    this.generator.imports.push({
      aliasName: `${CORE}Core`,
      className: `${CORE}Core`,
      packageName: 'darabonba.core',
    });
    this.generator.emit(`${CORE}Core.to_json_string(`);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }

  parseJSON(ast, level) {
    this.generator.imports.push({
      className: 'json',
    });
    this.generator.emit('json.loads(');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }
}

class Form extends Builtin {
  constructor(generator) {
    const methods = ['toFormString', 'getBoundary', 'toFileForm'];
    super(generator, `${CORE}Form`, methods);
  }
}

class File extends Builtin {
  constructor(generator) {
    const methods = ['createReadStream', 'createWriteStream', 'exists'];
    super(generator, `${CORE}File`, methods);
  }
}

class Bytes extends Builtin {
  constructor(generator) {
    const methods = [];
    super(generator, `${CORE}Bytes`, methods);
  }

  from_(ast) {
    const clientName = this.getClientName();
    this.generator.emit(`${clientName}.from_`);
    this.generator.visitArgs(ast.args);
  }

  toString(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.decode(\'utf-8\')');
  }

  length(ast) {
    this.generator.emit('len(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  toHex(ast){
    this.getInstanceName(ast);
    this.generator.emit('.hex()');
  }

  toBase64(ast){
    this.generator.imports.push({
      className: 'base64',
    });
    this.generator.emit('base64.b64encode(');
    this.getInstanceName(ast);
    this.generator.emit(').decode(\'utf-8\')');
  }

  toJSON(ast){
    this.toString(ast);
  }

}


class Converter {
  constructor(generator) {
    this.generator = generator;
    integers.forEach(type => {
      this[type] = function (ast) {
        const expr = ast.args[0];
        generator.emit('int(');
        generator.visitExpr(expr);
        generator.emit(')');
      };
    });

    floats.forEach(type => {
      this[type] = function (ast) {
        const expr = ast.args[0];
        generator.emit('float(');
        generator.visitExpr(expr);
        generator.emit(')');
      };
    });
  }

  string(ast) {
    const expr = ast.args[0];
    if(_isDefault(expr)) {
      this.generator.visitExpr(expr);
      return;
    }
    this.generator.emit('str(');
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }

  number(ast) {
    const expr = ast.args[0];
    this.generator.imports.push({
      aliasName: `${CORE}Core`,
      className: `${CORE}Core`,
      packageName: 'darabonba.core',
    });
    this.generator.emit(`${CORE}Core.to_number(`);
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }

  boolean(ast) {
    const expr = ast.args[0];
    this.generator.emit('bool(');
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }

  bytes(ast) {
    const expr = ast.args[0];
    this.generator.emit('bytes(');
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }

  any(ast) {
    const expr = ast.args[0];
    this.generator.visitExpr(expr);
  }

  object(ast) {
    const expr = ast.args[0];
    this.generator.visitExpr(expr);
  }

  readable(ast) {
    const expr = ast.args[0];
    this.generator.imports.push(_getImport(`${CORE}Stream`));
    this.generator.emit(`${CORE}Stream.to_readable(`);
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }

  writable(ast) {
    const expr = ast.args[0];
    this.generator.imports.push(_getImport(`${CORE}Stream`));
    this.generator.emit(`${CORE}Stream.to_writable(`);
    this.generator.visitExpr(expr);
    this.generator.emit(')');
  }
}

class Func {
  constructor(generator) {
    this.generator = generator;
    ['isNull'].forEach(method => {
      this[method] = function (ast) {
        const clientName = this.getClientName();
        generator.emit(`${clientName}.${_snakeCase(method)}`);
        generator.visitArgs(ast.args);
      };
    });
  }

  sleep(ast, level, async) {
    const clientName = this.getClientName();
    if(async) {
      this.generator.emit('await ');
    }
    this.generator.emit(`${clientName}.sleep`);
    if(async) {
      this.generator.emit('_async');
    }
    this.generator.visitArgs(ast.args, level);
  }

  equal(ast) {
    this.generator.visitExpr(ast.args[0]);
    this.generator.emit(' == ');
    this.generator.visitExpr(ast.args[1]);
  }

  default(ast) {
    this.generator.visitExpr(ast.args[0]);
    this.generator.emit(' or ');
    this.generator.visitExpr(ast.args[1]);
  }

  getClientName() {
    this.generator.imports.push({
      aliasName: `${CORE}Core`,
      className: `${CORE}Core`,
      packageName: 'darabonba.core',
    });
    return `${CORE}Core`;
  }
}

class String extends Builtin {

  replace(ast, level) {
    this.getInstanceName(ast);
    const args = ast.args;
    const regex = ast.args[0].value.string;
    const [, extractedString, flag] = regex.match(/\/(.*?)\/(.*)/) || [];
    this.generator.emit('.replace');
    this.generator.emit(`('${extractedString}', `);
    this.generator.visitExpr(args[1], level);
    if (flag.includes('i')) {
      this.generator.emit(', flags=re.IGNORECASE)');
      return;
    }
    if (!flag.includes('g')) {
      this.generator.emit(', 1)');
      return;
    }
    this.generator.emit(')');
  }

  contains(ast, level) {
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(' in ');
    this.getInstanceName(ast);
  }

  length(ast) {
    this.generator.emit('len(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  hasPrefix(ast, level) {
    this.getInstanceName(ast);
    const args = ast.args;
    this.generator.emit('.startswith');
    this.generator.visitArgs(args, level);
  }

  hasSuffix(ast, level) {
    this.getInstanceName(ast);
    const args = ast.args;
    this.generator.emit('.endswith');
    this.generator.visitArgs(args, level);
  }

  index(ast, level) {
    this.getInstanceName(ast);
    const args = ast.args;
    this.generator.emit('.find');
    this.generator.visitArgs(args, level);
  }

  subString(ast, level) {
    this.getInstanceName(ast);
    const args = ast.args;
    this.generator.emit('[');
    this.generator.visitExpr(args[0], level);
    this.generator.emit(':');
    this.generator.visitExpr(args[1], level);
    this.generator.emit(']');
  }

  toLower(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.lower()');
  }

  toUpper(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.upper()');
  }

  equals(ast) {
    this.getInstanceName(ast);
    const expr = ast.args[0];
    this.generator.emit(' == ');
    this.generator.visitExpr(expr);

  }

  empty(ast) {
    this.generator.emit('not ');
    this.getInstanceName(ast);
  }

  toBytes(ast) {
    const expr = ast.args[0];
    this.getInstanceName(ast);
    this.generator.emit('.encode(');
    if (expr.value.string === 'utf8'){
      this.generator.emit('\'utf-8\'');
    }else{
      this.generator.visitExpr(expr);
    }
    this.generator.emit(')');
  }

  parseInt(ast) {
    this.generator.emit('int(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  parseLong(ast) {
    this.generator.emit('int(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  parseFloat(ast) {
    this.generator.emit('float(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  parseDouble(ast) {
    this.generator.emit('float(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  trim(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.strip()');
  }
}

class Array extends Builtin {
  constructor(generator) {
    const methods = ['toJSON'];
    super(generator, `${CORE}Array`, methods);
  }

  join(ast, level) {
    // this.generator.emit(`'`);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit('.join(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  contains(ast, level) {
    // this.generator.emit(`if `);
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(' in ');
    this.getInstanceName(ast);
  }

  length(ast) {
    this.generator.emit('len(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  index(ast, level) {
    this.getInstanceName(ast);
    this.generator.emit('.index(');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(')');
  }

  get(ast, level) {
    this.getInstanceName(ast);
    this.generator.emit('[');
    this.generator.visitExpr(ast.args[0], level);
    this.generator.emit(']');
  }

  sort(ast) {
    if (ast.args[0].value.string === 'acs'){
      this.generator.emit('sorted(');
      this.getInstanceName(ast);
      this.generator.emit(')');
    }else{
      this.generator.emit('sorted(');
      this.getInstanceName(ast);
      this.generator.emit(', reverse=True');
      this.generator.emit(')');
    }
  }

  shift(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.pop(0)');
  }

  pop(ast) {
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
  }

  append(ast, level) {
    this.getInstanceName(ast);
    this.generator.emit('.insert(');
    if (ast.args[1]) {
      this.generator.visitExpr(ast.args[1], level);
      this.generator.emit(', ');
    }
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
    const methods = [];
    super(generator, `${CORE}Map`, methods);
  }

  toJSON(ast) {
    this.generator.imports.push({
      className: 'json',
    });
    this.generator.emit('json.dumps(');
    this.getInstanceName(ast);
    this.generator.emit(')');
  }

  length(ast) {
    this.generator.emit('len(');
    this.getInstanceName(ast);
    this.generator.emit(')');
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
    this.generator.visitExpr(ast.args[0]);
    this.generator.emit(')');
  }
}

class Entry extends Builtin {

  key() {
    this.generator.emit('k');
  }

  value() {
    this.generator.emit('v');
  }
}

class Date extends Builtin {

  constructor(generator) {
    const methods = [
      // 'format', 'unix', 'diff', 'UTC', 'add', 'sub', 'hour',
      // 'minute', 'second', 'dayOfYear', 'dayOfMonth', 'dayOfWeek',
      // 'weekOfYear', 'weekOfMonth', 'month', 'year'
    ];
    super(generator, `${CORE}Date`, methods);
  }

  format(ast) {
    this.generator.emit(`${ast.left.id.lexeme}.strftime(`);
    this.generator.emit('\'%Y-%m-%d %H:%M:%S\'');
    this.generator.emit(')');
  }

  unix(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.timestamp(');
    this.generator.emit(')');
  }
  dayOfWeek(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.weekday()');
  }

  UTC(ast) {
    this.getInstanceName(ast);
    this.generator.emit('.UTC()');
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