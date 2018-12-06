const { cat } = require('../../src/index.mjs');
const { compare } = require('../utils');
const should = require('should');

describe('cat', () =>
  it('should cast its input to string', () =>
    compare('123', cat(1, 2, 3), cat([ 1, 2, 3 ]))
  )
);
