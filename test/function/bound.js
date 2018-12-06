const { bound } = require('../../src/index.mjs');
const should = require('should');

describe('bound', () =>
  it('should clamp a value', () =>
    bound(1, 4, 6).should.be.equal(4)
      && bound(5, 4, 6).should.be.equal(5)
      && bound(7, 4, 6).should.be.equal(6)
  )
);
