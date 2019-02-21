const { hasOwnProperty } = require('../../src/index.mjs');
const should = require('should');

describe('hasOwnProperty', () => {
  it('should check whether an object has a specified property as its own property', () =>
    hasOwnProperty({ someProp: 1 }, 'someProp').should.be.true()
  );

  it('should return false on "toString" property', () =>
    hasOwnProperty({}, 'toString').should.be.false()
  );

  it('should return false on "hasOwnProperty" property', () =>
    hasOwnProperty({}, 'hasOwnProperty').should.be.false()
  );
});
