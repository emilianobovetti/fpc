/* eslint-env node, mocha */

const { failWith } = require('../../src/index.mjs');

describe('failWith', () =>
  it('should throw an error', () =>
    failWith.should.throw()
  )
);
