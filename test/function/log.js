const { log } = require('../../src/index.mjs');
const should = require('should');

describe('log', () =>
  it('should act as identity function', () =>
    log(1, 2, 3).should.be.equal(1)
  )
);
