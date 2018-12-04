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

## Why

Here I'll tell you why this library exists, feel free to [skip](#user-content-usage) this chapter.

![xkcd standards](https://imgs.xkcd.com/comics/standards.png)

I know what you thinking: «do we really need [another](https://github.com/stoeffel/awesome-fp-js) *functional-js-library*?».
No, we don't. Seriously.

### ⚠️ Disclaimer ⚠️

This library is not intended to replace anything. It won't cover everyone's use cases. It just proposes a different approach to functional javascript, it was fun to write, I hope It's fun to use too.

I'm not trying to blame other libraries here — all of which are *great* open source projects — I'm just telling my personal experience with them.

I'll try to show [difference in approaches](https://youtu.be/m3svKOdZijAt?t=512) with `ramda`:

```javascript
const R = require('ramda');
R.map(R.take(2), [ 'jim', 'kate' ]); // [ 'ji', 'ka' ]
```

`ramda` loves [pointfree style](https://wiki.haskell.org/Pointfree) and currying, at the cost of being less explicit.

With modern javascript, anyway, we don't need a library to write that code, we can be functional, expressive and terse.

```javascript
[ 'jim', 'kate' ].map(str => str.slice(0, 2)); // [ 'ji', 'ka' ]
```

I think we shouldn't use libraries when aren't really useful. `fpc`'s `map` and `reduce` are designed to be used in [`pipe()`](docs/piping.md) and [`compose()`](docs/composition.md), they don't replace `Array.prototype`'s methods.

Now suppose we need this function:

```javascript
wordCount('There are seven words in this sentence'); // 7
```

The `ramda` way should be

```javascript
const wordCount = R.compose(R.length, R.split(' '));
```

I have to admit, it's pretty cool, but I don't think a developer who inherits this code would be very happy, unless he or she already has experience with `ramda`.

Once again we should ask if we *need* a library:

```javascript
const wordCount = str => str.split(' ').length;
```

What if we *want* to use function composition? `fpc` doesn't have a `split` nor a `lenght` function, but you can still write something like

```javascript
const wordCount = fpc.compose(fpc.call, 'split', ' ')
  .with(fpc.prop, 'length');
```

Anyway we can do better

```javascript
const splitWords = str => str.split(' ');

const wordCount = fpc.compose(splitWords)
          .with(fpc.prop, 'length');
```

I think that now is pretty clear how our `wordCount` function is defined.

Finally there are good reasons not to currying everything in javascript:

* Javascript is not Haskell<sup>[citation needed]</sup>, many developers don't expect all function are curried.
* Being *too clever* is considered an anti-pattern even in some [fp communities](http://martin.janiczek.cz/clanek/being-clever-antipattern-in-elm/), write explicitly the arguments of a function *is not a crime*!
* Currying functions in javascript often requires to reverse the order of arguments (e.g.: [underscore](https://underscorejs.org) vs. [ramda](https://ramdajs.com/docs/)), so `fpc` plays well with other libraries and js user code, `ramda` sometimes doesn't.

*There's a lady who's sure all that glitters is gold...*

But `fpc` ain't no stairway to heaven:

* It's a micro-library with one maintainer and just a few functions.
* More verbose than `ramda`.
* If you forget to unwrap the value at the end of a [`pipe()`](docs/piping.md)  you're gonna have a bad time.

## Usage

Please refer to the following docs:

- [`pipe()`](docs/piping.md)
- [`compose()`](docs/composition.md)
- [`Maybe`](docs/maybe.md)
- [API docs](docs/api.md)

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
