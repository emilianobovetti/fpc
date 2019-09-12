/* eslint-env node, mocha */

const { pipe, typeOf } = require('../../src/index.mjs');

describe('typeOf', () => {
  it('should unbox objects before return their type', () =>
    pipe('')
      .into(Object)
      .and(typeOf)
      .result
      .should.be.equal('string')
  );

  it('should return "null" on null', () =>
    typeOf(null).should.be.equal('null')
  );
});
