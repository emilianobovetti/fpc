/* eslint-env node, mocha */

const { call } = require('../../src/index.mjs');

describe('call', () =>
  it('should call an object method', () =>
    call({ m: x => x }, 'm', 1).should.be.equal(1)
  )
);
