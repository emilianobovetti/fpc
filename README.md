# fpc

<div align="center">
  <a href="https://travis-ci.org/emilianobovetti/fpc" target="_blank">
    <img src="https://travis-ci.org/emilianobovetti/fpc.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/emilianobovetti/fpc/blob/master/dist/fpc.umd.js" target="_blank">
    <img src="https://badge-size.herokuapp.com/emilianobovetti/fpc/master/dist/fpc.umd.js" alt="dist/fpc.umd.js file size">
  </a>
  <a href="https://snyk.io/test/github/emilianobovetti/fpc?targetFile=package.json">
    <img src="https://snyk.io/test/github/emilianobovetti/fpc/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/emilianobovetti/fpc?targetFile=package.json" style="max-width:100%;">
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

`fpc` is a lightweight collection of functional patterns, compatible with es6 module system and [import][Statement-import]able.

So I have written [another][awesome-fp-js] functional js library.

![xkcd standards][xkcd-standards]

Anyway I'll try to show `fpc`'s approach to functional javascript with some examples.

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
import { map } from 'fpc';

pipe('a, p')
  .into(querySelectorAll)
  .and(map, node => node.style)
  .and(applyToAll, Object.assign, { color: 'red' });
```

The idea is to use many small functions instead of relying on currying and [pointfree style][point-free].

What is this [pipe()][pipe] madness anyway?

One day [pipeline-operator][tc39-proposal-pipeline-operator] and [partial-application][tc39-proposal-partial-application] may become a thing and we may write something like

```javascript
// ⚠️ not actual javascript

'a, p'
|> querySelectorAll
|> map(?, node => node.style)
|> applyToAll(?, Object.assign, { color: 'red' })
```

If you don't like the [pipe()][pipe] approach there are still many other [functions][functions] and patterns like [Maybe][maybe-docs] and [Result][result-docs] that `fpc` brings to you.

E.g.:

```javascript
import { Maybe, lazy } from 'fpc';

const lazyLoadElement = id =>
  lazy(() => Maybe(document.getElementById(id)));

const lazyMenu = lazyLoadElement('menu');

const toggleMenuOpen = () =>
  lazyMenu()
    .orElse(lazyMenu.update)
    .forEach(menu => menu.classList.toggle('opened'));
```

Here (roughly) an imperative counterpart:

```javascript
let menu;

const loadMenu = () => {
  if (menu == null) {
    menu = document.getElementById('menu');
  }
};

const toggleMenuOpen = () => {
  loadMenu();

  if (menu != null) {
    menu.classList.toggle('opened');
  }
};
```

## Usage

Please refer to the following docs:

- [functions][functions]
- [pipe][piping-docs]
- [compose][composition-docs]
- [Maybe][maybe-docs]
- [Result][result-docs]

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

For direct browser usage you can include the [UMD][umdjs-umd] bundle:

```HTML
<script type="text/javascript" src="path/to/dist/fpc.umd.js"></script>
```

[pipe]: docs/README.md#user-content-pipe

[functions]: docs/README.md
[piping-docs]: docs/piping.md
[composition-docs]: docs/composition.md
[maybe-docs]: docs/maybe.md
[result-docs]: docs/result.md

[point-free]: https://wiki.haskell.org/Pointfree
[xkcd-standards]: https://imgs.xkcd.com/comics/standards.png
[awesome-fp-js]: https://github.com/stoeffel/awesome-fp-js
[tc39-proposal-pipeline-operator]: https://github.com/tc39/proposal-pipeline-operator
[tc39-proposal-partial-application]: https://github.com/tc39/proposal-partial-application
[umdjs-umd]: https://github.com/umdjs/umd

[Statement-throw]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
[Statement-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

[Operators-typeof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof

[Glossary-falsy]: https://developer.mozilla.org/en-US/docs/Glossary/Falsy

[API-console]: https://developer.mozilla.org/en-US/docs/Web/API/console

[Glob-null]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null
[Glob-undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
[Glob-String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Glob-Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[Glob-Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Glob-NaN]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN
[Glob-Infinity]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity
[Glob-Error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[Glob-TypeError]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
[Glob-Array-slice]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
