const { is, pipe, first, map, reduce, failWith } = require('../src/index.mjs');
const isEqual = require('lodash.isequal');

const stringifyArray = arr =>
  arr.length === 0 ? '[]' : `[ ${arr.map(stringify).join(', ')} ]`;

const stringifyObject = obj =>
  pipe(obj)
    .into(Object.entries)
    .and(map, ([ key, val ]) => `${key}: ${stringify(val)}`)
    .and(arr => arr.length === 0 ? '{}' : `{ ${arr.join(', ')} }`)
    .result;

const stringify = val =>
  is.array(val)
  ? stringifyArray(val)
  : is.obj(val)
  ? stringifyObject(val)
  : is.str(val)
  ? `"${val}"`
  : String(val);

const eqReducer = ([ areEquals, last ], current) =>
  [ areEquals && isEqual(current, last), current ];

/*
 * compare(v1, v2, .., vp, vn)
 *
 * isEqual(v1, v2) && .. && isEqual(vp, vn)
 */
const compare = (...args) => {
  const areEquals = pipe(args)
    .into(reduce, eqReducer, [ true, first(args) ])
    .and(first)
    .result

  return areEquals || failWith(new Error(`compare(${args.map(stringify)}) failed`));
};

const forAll = (vals, fn) =>
  vals.reduce((acc, val, idx) => acc && fn(val, idx), true);

const values = [
  undefined,
  null,
  NaN,
  [],
  {},
  0,
  1
];

module.exports = {
  compare,
  forAll,
  values
};
