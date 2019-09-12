/* eslint-env node */

const { pipe, first, reduce, failWith } = require('../src/index.mjs');
const isEqual = require('lodash.isequal');

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
    .result;

  return areEquals || failWith(
    new Error(`compare ${JSON.stringify(args)} failed`)
  );
};

const forAll = (vals, fn) =>
  vals.reduce((acc, val, idx) => acc && fn(val, idx), true);

const values = [
  undefined,
  null,
  -Infinity,
  Infinity,
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
