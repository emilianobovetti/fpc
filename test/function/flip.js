/* eslint-env node, mocha */

const { flip, cat } = require('../../src/index.mjs');

describe('flip', () =>
  it('should reverse the arguments order', () =>
    flip(cat)(1, 2, 3) === cat(3, 2, 1)
  )
);
