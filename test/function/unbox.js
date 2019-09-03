const { compose, unbox } = require('../../src/index.mjs');
const should = require('should');

const boxUnbox =
  compose(Object)
    .with(unbox)
    .and(v => typeof v);

describe('unbox', () => {
  console.log(typeof unbox(Object('')));

  it('should work on boxed strings', () =>
    boxUnbox('').should.be.equal('string')
  );

  it('should work on boxed numbers', () =>
    boxUnbox(0).should.be.equal('number')
  );

  it('should work on boxed bigints', () =>
    boxUnbox(BigInt(0)).should.be.equal('bigint')
  );

  it('should work on boxed booleans', () =>
    boxUnbox(true).should.be.equal('boolean')
  );

  it('should work on boxed symbols', () =>
    boxUnbox(Symbol('desc')).should.be.equal('symbol')
  );
});
