[English](/README.md) | 简体中文

# Darabonba Python 生成器

[![NPM version][npm-image]][npm-url]
[![codecov][cov-image]][cov-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@darabonba/python-generator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@darabonba/python-generator
[cov-image]: https://codecov.io/gh/aliyun/darabonba-python-generator/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/aliyun/darabonba-python-generator
[david-image]: https://img.shields.io/david/aliyun/darabonba-python-generator.svg?style=flat-square
[david-url]: https://david-dm.org/aliyun/darabonba-python-generator
[download-image]: https://img.shields.io/npm/dm/@darabonba/python-generator.svg?style=flat-square
[download-url]: https://npmjs.org/package/@darabonba/python-generator

## 安装

Darabonba 生成器只能在 Node.js 环境下运行。建议使用 [NPM](https://www.npmjs.com/) 包管理工具安装。在终端输入以下命令进行安装:

```bash
npm install @darabonba/python-generator
```

## 使用说明

```javascript
'use strict';

const path = require('path');
const fs = require('fs');

const Generator = require('@darabonba/python-generator');
const DSL = require('@darabonba/parser');

const modulePath = '<module path>';
const outputDir = '<output dir path>';

const teaFile = fs.readFileSync(path.join(modulePath, 'Darafile'), 'utf8');
const main = fs.readFileSync(path.join(modulePath, 'main.dara'), 'utf8');

const pkgInfo = JSON.parse(teaFile);
const config = {
    outputDir: outputDir,
    pkgDir: modulePath,
    ...pkgInfo
  };

const ast = DSL.parse(main, path.join(modulePath, 'main.dara'));
const generator = new Generator(config, 'python');

generator.visit(ast);
```

## 问题

[Opening an Issue](https://github.com/aliyun/darabonba-python-generator/issues/new)，不符合指南的问题可能会立即关闭。

## 发布日志

发布详情会更新在 [release notes](/ChangeLog.md) 文件中

## 许可证

[Apache-2.0](/LICENSE)
Copyright (c) 2009-present, Alibaba Cloud All rights reserved.
