const fpc = require('../../../src/index.mjs');
const jsc = require('jsverify');
const compare = require('../../compare');

const any = jsc.oneof([ jsc.json, jsc.falsy ]);

const shiftChar = c => String.fromCharCode(c.charCodeAt(0) + 1);

const isNumeric = val => (
  fpc.is.str(val)
    ? val >= 0 && val <= 9
    : fpc.is.obj(val)
    ? fpc.reduce(val, (acc, x) => acc && isNumeric(x), true)
    : fpc.is.num(val)
);

describe('fpc', () => {

  describe('#slice', () => {
    jsc.property('should work as Array.prototype.slice()', jsc.array(any), array =>
      compare(
        array.slice(),
        fpc.slice(array)
      )
    );

    const doubleSlice = fpc.compose(fpc.slice).with(fpc.slice);

    jsc.property('should be idempotent', jsc.array(any), jsc.integer(), jsc.integer(),  (array, n1, n2) =>
      compare(
        doubleSlice(array),
        fpc.slice(array)
      ) && compare(
        doubleSlice(array, n1),
        fpc.slice(array, n1)
      ) && compare(
        doubleSlice(array, n1, n2),
        fpc.slice(array, n1, n2)
      )
    );
  });

  describe('#reverse', () => {
    jsc.property('should work as Array.prototype.reverse()', jsc.array(any), array =>
      compare(
        array.slice().reverse(),
        fpc.reverse(array)
      )
    );

    const doubleReverse = fpc.compose(fpc.reverse).with(fpc.reverse);
    const tripleReverse = fpc.compose(doubleReverse).with(fpc.reverse);
    const quadrupleReverse = fpc.compose(tripleReverse).with(fpc.reverse);

    jsc.property('should satisfy rev(rev(rev(x)) = rev(x)', jsc.array(any), array =>
      compare(
        tripleReverse(array),
        fpc.reverse(array)
      )
    );

    jsc.property('should satisfy rev(rev(rev(rev(x))) = rev(rev(x))', jsc.array(any), array =>
      compare(
        quadrupleReverse(array),
        doubleReverse(array)
      )
    );
  });

  describe('#map', () => {
    jsc.property('should work as Array.prototype.map()', jsc.array(any), jsc.fn(jsc.nat), (array, fn) =>
      compare(
        array.map(fn),
        fpc.map(array, fn)
      )
    );

    jsc.property('should work on strings too', jsc.string, str =>
      compare(
        str.split('').map(shiftChar),
        fpc.map(str, shiftChar)
      )
    );
  });

  describe('#reduce', () => {
    jsc.property('should work as Array.prototype.reduce()', jsc.array(any), jsc.fn(jsc.nat), (array, fn) =>
      compare(
        array.reduce(fn, 0),
        fpc.reduce(array, fn, 0)
      )
    );

    jsc.property('should work on strings too', jsc.string, str =>
      compare(
        str.split('').map(shiftChar).join(''),
        fpc.reduce(str, (acc, c) => acc + shiftChar(c), '')
      )
    );
  });

  describe('#filter', () => {
    jsc.property('should work as Array.prototype.filter()', jsc.array(any), jsc.fn(jsc.bool), (array, fn) =>
      compare(
        array.filter(fn),
        fpc.filter(array, fn)
      )
    );

    jsc.property('should work on strings too', jsc.string, str =>
      compare(
        str.split('').filter(isNumeric),
        fpc.filter(str, isNumeric)
      )
    );
  });

  describe('#forEach', () => {
    jsc.property('should work as Array.prototype.forEach()', jsc.array(any), jsc.fn(jsc.nat), (array, fn) => {
      const array1 = [];
      const array2 = [];

      array.forEach(x => array1.push(fn(x)));
      fpc.forEach(array, x => array2.push(fn(x)));

      return compare(array1, array2);
    });

    jsc.property('should work on strings too', jsc.string, str => {
      const array1 = [];
      const array2 = [];

      str.split('').forEach(char => array1.push(shiftChar(char)));
      fpc.forEach(str, char => array2.push(shiftChar(char)));

      return compare(array1, array2);
    });
  });

});
