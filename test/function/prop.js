/* eslint-env node, mocha */

const { prop } = require('../../src/index.mjs');
const assert = require('assert');

describe('prop', () => {
  it('should return undefined on non-objects', () =>
    assert.equal(prop(null, 'any'), undefined)
  );

  it('should return the property value', () =>
    prop({ propertyName: 1 }, 'propertyName').should.be.equal(1)
  );
});
