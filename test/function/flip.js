const { flip, cat } = require('../../src/index.mjs');
const should = require('should');

describe('flip', () =>
  it('should reverse the arguments order', () =>
    flip(cat)(1, 2, 3) === cat(3, 2, 1)
  )
);
