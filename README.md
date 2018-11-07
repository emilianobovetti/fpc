# Functional piping & composition

<div align="center">
  <a href="https://travis-ci.org/emilianobovetti/fpc" target="_blank">
    <img src="https://travis-ci.org/emilianobovetti/fpc.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/emilianobovetti/fpc/blob/master/dist/fpc.umd.js" target="_blank">
    <img src="https://badge-size.herokuapp.com/emilianobovetti/fpc/master/dist/fpc.umd.js" alt="dist/fpc.umd.js file size">
  </a>
  <a href="https://greenkeeper.io/" target="_blank">
    <img src="https://badges.greenkeeper.io/emilianobovetti/fpc.svg" alt="Greenkeeper badge">
  </a>
  <a href="https://coveralls.io/github/emilianobovetti/fpc?branch=master" target="_blank">
    <img src="https://coveralls.io/repos/github/emilianobovetti/fpc/badge.svg?branch=master" alt="Coverage Status">
  </a>
  <a href="https://github.com/emilianobovetti/fpc/blob/master/src/index.d.ts" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-.d.ts-blue.svg" alt="TypeScript">
  </a>
  <a href="https://github.com/semantic-release/semantic-release" target="_blank">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release">
  </a>
</div>

`fpc` 2.0 is a lightweight library of functional patterns, compatible with es6 module system and [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)able.

It allows piping and function composition with fluent syntax, so it's possible to apply more than one argument to non-curried functions.

## Installation

```
$ npm install fpc
```

Module import:

```javascript
import * as fpc from 'fpc';
```

Require in node:

```javascript
const fpc = require('fpc');
```

For direct browser usage you can include the [UMD](https://github.com/umdjs/umd) bundle:

```HTML
<script type="text/javascript" src="path/to/dist/fpc.umd.js"></script>
```

## Usage

Please refer to the following docs:

- [`pipe()`](docs/piping.md)
- [`compose()`](docs/composition.md)
- [`Maybe`](docs/maybe.md)
- [API docs](docs/api.md)
