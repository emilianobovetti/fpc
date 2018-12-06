const { curry2, cat } = require('../../src/index.mjs');
const should = require('should');

const cat2 = curry2(cat);

describe('curry2', () =>
  it('should currify a two-arguments function', () =>
    cat2(1)(2).should.be.equal(cat2(1, 2))
  )
);
