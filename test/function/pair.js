const { pair } = require('../../src/index.mjs');
const { compare } = require('../utils');

describe('pair', () =>
  it('should create a two-elements array', () =>
    compare(pair(1, 2), [ 1, 2 ])
  )
);
