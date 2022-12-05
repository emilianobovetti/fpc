# fpc

<div align="center">
  <a href="https://drone.tno.sh/emilianobovetti/fpc" target="_blank">
    <img src="https://drone.tno.sh/api/badges/emilianobovetti/fpc/status.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://snyk.io/test/github/emilianobovetti/fpc?targetFile=package.json">
    <img src="https://snyk.io/test/github/emilianobovetti/fpc/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/emilianobovetti/fpc?targetFile=package.json" style="max-width:100%;">
  </a>
  <a href="https://github.com/semantic-release/semantic-release" target="_blank">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release">
  </a>
</div>

Meta package that bundles together [@fpc/types](https://github.com/fpc-js/types), [@fpc/utils](https://github.com/fpc-js/utils), [@fpc/stream](https://github.com/fpc-js/stream), [@fpc/maybe](https://github.com/fpc-js/maybe) and [@fpc/result](https://github.com/fpc-js/result).

`fpc` is a lightweight collection of functional patterns, compatible with es6 module system and [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)able.

## Installation

```
$ yarn add fpc
```

Module import:

```javascript
import { Maybe, Stream, expectFunction } from 'fpc';
```

Require in node:

```javascript
const fpc = require('fpc');
```

For direct browser usage you can include the [UMD](https://github.com/umdjs/umd) bundle:

```HTML
<script type="text/javascript" src="path/to/dist/fpc.umd.js"></script>
```

You can import the es6 [module bundle](https://github.com/emilianobovetti/fpc/blob/master/dist/fpc.es6.js) in [Deno](https://deno.land):

```javascript
import { Stream, Result } from 'https://unpkg.com/fpc@3.0.0/dist/fpc.es6.js';
```

Yes, I have written [another](https://github.com/stoeffel/awesome-fp-js) functional-js library.

![xkcd standards](https://imgs.xkcd.com/comics/standards.png)
