const { pipe, typeOf } = require('../../src/index.mjs');
const should = require('should');

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
