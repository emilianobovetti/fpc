/* eslint-env node, mocha */

const { pipe, pair } = require('../../src/index.mjs');
const { compare } = require('../utils');

describe('pipe', () => {
  it('should throw an error if called without arguments', () =>
    (() => pipe()).should.throw()
  );

  it('should pipe multiple arguments', () =>
    compare([ 1, 2 ], pipe(1, 2).into(pair).result)
  );
});
