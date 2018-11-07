const fpc = require('../src/index.mjs');
const _ = require('lodash');

const eqReducer = ([ areEquals, last ], current) =>
  [ areEquals && _.isEqual(current, last), current ];

/*
 * compare(v1, v2, .., vp, vn)
 *
 * compare([ v1, v2, .., vp, vn ])
 *
 * _.isEqual(v1, v2) && .. && _.isEqual(vp, vn)
 *
 * compare( ) and compare(oneArg) always return false
 *         ^                 ^
 *      no args    if it's not iterable
 *
 * compare({ 0: [], 1: null, length: 2 }) // false
 * compare({ 0: [], 1: [], length: 2 }) // true
 * compare('aaaaaba') // false
 * compare('aaaaaaa') // true
 *
 *
 */
const compare = (...args) => {
  const fst = fpc.first(args);

  switch (args.length + ',' + fpc.is.iter(fst)) {
    case '0,false':
    case '1,false': return false;
    case '1,true': return compare(...fpc.slice(fst));
  }

  return fpc.pipe(args)
    .into(fpc.reduce, eqReducer, [ true, fst ])
    .and(fpc.first)
    .result;
};

module.exports = compare;
