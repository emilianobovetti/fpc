const { second } = require('../../src/index.mjs');
const { compare } = require('../utils');

describe('second', () => {
  it('should get the second item of an array', () =>
    second([ 1, 2 ]).should.be.equal(2)
  );

  it('should return undefined on an empty array', () =>
    compare(second([]), undefined)
  );

  it('should return undefined on a one-item array', () =>
    compare(second([ 1 ]), undefined)
  );
});
