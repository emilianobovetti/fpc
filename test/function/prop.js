const { prop } = require('../../src/index.mjs');
const should = require('should');
const assert = require('assert');

describe('prop', () => {
  it('should return undefined on non-objects', () =>
    assert.equal(prop(null, 'any'), undefined)
  );

  it('should return the property value', () =>
    prop({ propertyName: 1 }, 'propertyName').should.be.equal(1)
  );
});
