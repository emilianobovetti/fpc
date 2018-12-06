const { first } = require('../../src/index.mjs');
const { compare } = require('../utils');
const should = require('should');

describe('first', () => {
  it('should get the first item of an array', () =>
    first([ 1 ]).should.be.equal(1)
  );

  it('should return undefined on an empty array', () =>
    compare(first([]), undefined)
  );
});
