/* eslint-env node, mocha */

const { log } = require('../../src/index.mjs');

describe('log', () =>
  it('should act as identity function', () =>
    log(1, 2, 3).should.be.equal(1)
  )
);
