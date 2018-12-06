const { pipe, unbox } = require('../../src/index.mjs');
const should = require('should');

describe('unbox', () =>
  it('should unbox primitive objects', () =>
    pipe('')
      .into(Object)
      .and(unbox)
      .and(v => typeof v)
      .result
      .should.be.equal('string')
  )
);
