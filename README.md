English | [简体中文](/README-CN.md)

# Darabonba Python Generator

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![codecov][cov-image]][cov-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@darabonba/python-generator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@darabonba/python-generator
[travis-image]: https://img.shields.io/travis/aliyun/darabonba-python-generator.svg?style=flat-square
[travis-url]: https://travis-ci.org/aliyun/darabonba-python-generator
[cov-image]: https://codecov.io/gh/aliyun/darabonba-python-generator/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/aliyun/darabonba-python-generator
[david-image]: https://img.shields.io/david/aliyun/darabonba-python-generator.svg?style=flat-square
[david-url]: https://david-dm.org/aliyun/darabonba-python-generator
[download-image]: https://img.shields.io/npm/dm/@darabonba/python-generator.svg?style=flat-square
[download-url]: https://npmjs.org/package/@darabonba/python-generator

## Installation

Darabonba Code Generator was designed to work in Node.js. The preferred way to install the Generator is to use the [NPM](https://www.npmjs.com/) package manager. Simply type the following into a terminal window:

```bash
npm install @darabonba/python-generator
```

## Usage

```javascript
'use strict';

const path = require('path');
const fs = require('fs');

const Generator = require('@darabonba/python-generator');
const DSL = require('@darabonba/parser');

const modulePath = '<module path>';
const moduleOutputDir = '<output dir path>';

const teaFile = fs.readFileSync(path.join(modulePath, 'Darafile'), 'utf8');
const main = fs.readFileSync(path.join(modulePath, 'main.dara'), 'utf8');

const pkgInfo = JSON.parse(teaFile);
const config = {
    outputDir: moduleOutputDir,
    pkgDir: modulePath,
    ...pkgInfo
  };
// generate AST data by parser
const ast = DSL.parse(main, path.join(modulePath, 'main.dara'));
// initialize generator
const generator = new Generator(config, 'python');

generator.visit(ast);
```

## Issues

[Opening an Issue](https://github.com/aliyun/darabonba-python-generator/issues/new), Issues not conforming to the guidelines may be closed immediately.

## Changelog

Detailed changes for each release are documented in the [release notes](/ChangeLog.md).

## License

[Apache-2.0](/LICENSE)
Copyright (c) 2009-present, Alibaba Cloud All rights reserved.
