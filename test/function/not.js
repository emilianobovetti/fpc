/* eslint-env node, mocha */

const { not } = require('../../src/index.mjs');
const { compare, forAll, values } = require('../utils');

describe('not', () =>
  it('should negate a function', () =>
    forAll(values, v => compare(not(x => !x)(v), Boolean(v)))
  )
);
