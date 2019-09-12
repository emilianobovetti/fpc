/* eslint-env node, mocha */

const { id } = require('../../src/index.mjs');
const { compare, forAll, values } = require('../utils');

describe('id', () =>
  it('should be the identity function', () =>
    forAll(values, v => compare(id(v), v))
  )
);
