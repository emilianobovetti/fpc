const fpc = require('../src/fpc');
const jsc = require('jsverify');
const _ = require('lodash');

const any = jsc.oneof([ jsc.json, jsc.falsy ]);

function shiftChar (c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

function isNumeric (val) {
  return fpc.is.str(val)
    ? val >= 0 && val <= 9
    : fpc.is.reduceable(val)
    ? fpc.reduce(val, (acc, x) => acc && isNumeric(x), true)
    : fpc.is.num(val);
}

function eqReducer ([ areEquals, last ], current) {
  return [ areEquals && _.isEqual(current, last), current ];
}

/*
 * compare(v1, v2, .., vp, vn)
 *
 * compare([ v1, v2, .., vp, vn ])
 *
 * _.isEqual(v1, v2) && .. && _.isEqual(vp, vn)
 *
 * compare( ) and compare(oneArg) always return false
 *         ^                 ^
 *      no args    if it's not `fpc reduceable`
 *
 * compare({ 0: [], 1: null, length: 2 }) // false
 * compare({ 0: [], 1: [], length: 2 }) // true
 * compare('aaaaaba') // false
 * compare('aaaaaaa') // true
 *
 *
 */
function compare (fst) {
  switch (arguments.length + ',' + fpc.is.reduceable(fst)) {
    case '0,false':
    case '1,false': return false;
    case '1,true': return compare.apply(null, fpc.slice(fst));
  }

  return fpc.pipe(arguments)
    .then(fpc.reduce, eqReducer, [ true, fpc.first(arguments) ])
    .then(fpc.first)
    .end;
}

describe('fpc', () => {

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
      array1 = [];
      array2 = [];

      array.forEach(x => array1.push(fn(x)));
      fpc.forEach(array, x => array2.push(fn(x)));

      return compare(array1, array2);
    });

    jsc.property('should work on strings too', jsc.string, str => {
      array1 = [];
      array2 = [];

      str.split('').forEach(char => array1.push(shiftChar(char)));
      fpc.forEach(str, char => array2.push(shiftChar(char)));

      return compare(array1, array2);
    });
  });

  describe('#slice', () => {
    jsc.property('should work as Array.prototype.slice()', jsc.array(any), array =>
      compare(
        array.slice(),
        fpc.slice(array)
      )
    );

    const doubleSlice = fpc.compose(fpc.slice).with(fpc.slice);

    jsc.property('should be idempotent', any, jsc.integer(), jsc.integer(),  (val, n1, n2) =>
      compare(
        doubleSlice(val),
        fpc.slice(val)
      ) && compare(
        doubleSlice(val, n1),
        fpc.slice(val, n1)
      ) && compare(
        doubleSlice(val, n1, n2),
        fpc.slice(val, n1, n2)
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

    jsc.property('should satisfy rev(rev(rev(x)) = rev(x)', any, val =>
      compare(
        tripleReverse(val),
        fpc.reverse(val)
      )
    );

    jsc.property('should satisfy rev(rev(rev(rev(x))) = rev(rev(x))', any, val =>
      compare(
        quadrupleReverse(val),
        doubleReverse(val)
      )
    );
  });

  describe('#sum', () => {
    jsc.property('should sum its arguments', any, any, any, (a, b, c) =>
      compare(
        a + b,
        fpc.sum(a, b),
        fpc.sum([ a, b ])
      ) && compare(
        a + b + c,
        fpc.sum(a, b, c),
        fpc.sum([ a, b, c ])
      )
    );
  });

  describe('#cat', () => {
    jsc.property('should concat strings', any, any, any, (a, b, c) =>
      compare(
        String(a) + String(b),
        fpc.cat(a, b),
        fpc.cat([ a, b ])
      ) && compare(
        String(a) + String(b) + String(c),
        fpc.cat(a, b, c),
        fpc.cat([ a, b, c ])
      )
    );
  });
});
