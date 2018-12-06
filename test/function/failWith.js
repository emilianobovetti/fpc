const { failWith } = require('../../src/index.mjs');
const should = require('should');

describe('failWith', () =>
  it('should throw an error', () =>
    failWith.should.throw()
  )
);
