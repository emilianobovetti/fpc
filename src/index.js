/* global require, exports, module, define */

'use strict';

const pkg = require('../package.json');
const fpc = require(`../${pkg['umd:main']}`);

if (typeof exports === 'object' && typeof module === 'object') {
  module.exports = fpc;
} else if (typeof define === 'function' && define.amd) {
  define([], () => fpc);
} else if (typeof exports === 'object') {
  exports.fpc = fpc;
}
