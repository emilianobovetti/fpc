const { is, pipe, first, slice, map, reduce, failWith } = require('../src/index.mjs');

const forAll = (vals, fn) =>
  vals.reduce((acc, val, idx) => acc && fn(val, idx), true);

const objectToArrayPair = obj =>
  Object.keys(obj)
    .sort()
    .map(key => [ key, obj[key] ]);

const isObjectEqual = (v1, v2) =>
  is.obj(v1) &&
  is.obj(v2) &&
  pipe([ v1, v2 ])
    .into(map, objectToArrayPair)
    .and(([ o1, o2 ]) => isArrayEqual(o1, o2))
    .result;

const isArrayEqual = (v1, v2) =>
  is.array.like(v1) &&
  is.array.like(v2) &&
  v1.length === v2.length &&
  forAll(v1, (val, idx) => isEqual(val, v2[idx]));

const isEqual = (v1, v2) =>
  v1 === v2 ||
  isNaN(v1) && isNaN(v2) ||
  isArrayEqual(v1, v2) ||
  isObjectEqual(v1, v2);

const toString = val =>
  is.array(val)
  ? `[ ${val.map(toString).join(', ')} ]`
  : is.obj(val)
  ? `{ ${objectToArrayPair(val).map(([ k, v ]) => `${k}: ${toString(v)}`)} }`
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
