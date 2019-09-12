/* eslint-env node, mocha */
/* eslint-disable max-len, no-magic-numbers */

const { filter, reduce, is } = require('../../src/index.mjs');
const { compare } = require('../utils');
const jsc = require('jsverify');

const any = jsc.oneof([ jsc.json, jsc.falsy ]);

const isNumeric = val => (
  is.str(val)
    ? val >= 0 && val <= 9
    : is.obj(val)
      ? reduce(val, (acc, x) => acc && isNumeric(x), true)
      : is.num(val)
);

describe('filter', () => {
  jsc.property('should work as Array.prototype.filter()', jsc.array(any), jsc.fn(jsc.bool), (array, fn) =>
    compare(
      array.filter(fn),
      filter(array, fn)
    )
  );

  jsc.property('should work on strings too', jsc.string, str =>
    compare(
      str.split('').filter(isNumeric),
      filter(str, isNumeric)
    )
  );
});
