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

`fpc` is a lightweight collection of functional patterns, compatible with es6 module system and [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)able.

So I have written [another](https://github.com/stoeffel/awesome-fp-js) functional js library.

![xkcd standards](https://imgs.xkcd.com/comics/standards.png)

Anyway I'll try to show `fpc`'s' approach to functional javascript with some examples.

```javascript
import { pipe, forEach } from 'fpc';

const querySelectorAll = select =>
  document.querySelectorAll(select);

const style = (node, style) =>
  Object.assign(node.style, style);

const applyToAll = (nodes, fn, ...args) =>
  forEach(nodes, node => fn(node, ...args));

pipe('a, p')
  .into(querySelectorAll)
  .and(applyToAll, style, { color: 'red' });

// or without `style` function
pipe('a, p')
  .into(querySelectorAll)
  .and(map, node => node.style)
  .and(applyToAll, Object.assign, { color: 'red' });
```

The idea is to build many small modular and reusable functions instead of relying on currying and [pointfree style](https://wiki.haskell.org/Pointfree) and use them in sequence.

What is this `pipe()` madness?

One beautiful day we will use [pipeline-operator](https://github.com/tc39/proposal-pipeline-operator) and [partial-application](https://github.com/tc39/proposal-partial-application) and our code will look like

```javascript
'a, p'
|> querySelectorAll
|> map(?, node => node.style)
|> applyToAll(?, Object.assign, { color: 'red' })
```

Pretty sweet eh? While we wait for that day we can use `pipe()`.

## Usage

Please refer to the following docs:

- [`pipe()`](docs/piping.md)
- [`compose()`](docs/composition.md)
- [`Maybe`](docs/maybe.md)
- [API docs](docs/README.md)

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
