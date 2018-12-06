const { sum } = require('../../src/index.mjs');
const { compare } = require('../utils');

describe('sum', () =>
  it('should sum its arguments', () =>
    compare(1 + 2 + 3, sum(1, 2, 3), sum([ 1, 2, 3 ]))
  )
);
