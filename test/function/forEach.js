/* eslint-env node, mocha */
/* eslint-disable max-len */

const { forEach } = require('../../src/index.mjs');
const { compare } = require('../utils');
const jsc = require('jsverify');

const any = jsc.oneof([ jsc.json, jsc.falsy ]);

const shiftChar = c => String.fromCharCode(c.charCodeAt(0) + 1);

describe('forEach', () => {
  jsc.property('should work as Array.prototype.forEach()', jsc.array(any), jsc.fn(jsc.nat), (array, fn) => {
    const array1 = [];
    const array2 = [];

    array.forEach(x => array1.push(fn(x)));
    forEach(array, x => array2.push(fn(x)));

    return compare(array1, array2);
  });

  jsc.property('should work on strings too', jsc.string, str => {
    const array1 = [];
    const array2 = [];

    str.split('').forEach(char => array1.push(shiftChar(char)));
    forEach(str, char => array2.push(shiftChar(char)));

    return compare(array1, array2);
  });
});
