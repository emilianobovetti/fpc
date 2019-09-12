/* eslint-env node, mocha */

const { show } = require('../../src/index.mjs');

describe('show', () =>
  it('should act as identity function', () =>
    show(1, 2, 3).should.be.equal(1)
  )
);
