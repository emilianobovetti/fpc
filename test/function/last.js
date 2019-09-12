/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers */

const { last } = require('../../src/index.mjs');
const { compare } = require('../utils');

describe('last', () => {
  it('should get the last item of an array', () =>
    last([ 1, 2, 3, 4 ]).should.be.equal(4)
  );

  it('should return undefined on an empty array', () =>
    compare(last([]), undefined)
  );
});
