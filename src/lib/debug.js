'use strict';
const os = require('os');

var count = 0;

function dump(...data) {
  data.forEach(d => {
    console.log(d);
  });
}

function halt(...data) {
  this.dump(...data);
  process.exit(-1);
}

function jump(jumpNumber = 0, ...data) {
  if (count === jumpNumber) {
    this.halt(...data);
    count = 0;
  } else {
    count++;
  }
  return count;
}

function stack(...data) {
  let msg = '';
  if (data[0] && typeof data[0] === 'string') {
    msg = data[0];
    data = data.slice(1);
  }
  this.dump(...data);
  throw new Error(msg);
}

function warning(...data) {
  let msg = '';
  if (data[0] && typeof data[0] === 'string') {
    msg = data[0];
    data = data.slice(1);
  }
  this.dump(...data);
  if (msg.length) {
    process.stdout.write(`\x1b[33m[WARNING] ${msg}\x1b[0m${os.EOL}`);
  }
}

module.exports = {
  dump,
  halt,
  stack,
  jump,
  warning
};
