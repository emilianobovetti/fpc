const { is, pipe, first, reduce, failWith } = require('../src/index.mjs');
const isEqual = require('lodash.isequal');

const toString = val =>
  is.array(val)
  ? `[${val.map(toString).join(',')}]`
  : is.obj(val)
  ? val.toSource()
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

  return areEquals || failWith(new Error(`compare(${args.map(toString)}) failed`));
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
