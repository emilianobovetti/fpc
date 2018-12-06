const { curry, cat } = require('../../src/index.mjs');
const should = require('should');

const cat3 = curry((a, b, c) => a + b + c);

describe('curry', () => {
  it('should currify a function', () =>
    cat3(1)(2)(3).should.be.equal(cat3(1, 2, 3))
  );

  it('should throw an error if the second argument is not a positive integer', () =>
    (() => curry(cat, -1)).should.throw()
  );
});
