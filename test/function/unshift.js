/* eslint-env node, mocha */

const { unshift } = require('../../src/index.mjs');
const { compare } = require('../utils');

describe('unshift', () =>
  it('should put an item on the head of an array', () =>
    compare(unshift([ 1, 2, 3 ], 0), [ 0, 1, 2, 3 ])
  )
);
