const fpc = require('../../../src/index.mjs');
const jsc = require('jsverify');
const compare = require('../../compare');

const any = jsc.oneof([ jsc.json, jsc.falsy ]);

describe('fpc', () => {

  describe('#sum', () => {
    jsc.property('should sum its arguments', any, any, any, (a, b, c) =>
      compare(
        a + b,
        fpc.sum(a, b),
        fpc.sum([ a, b ])
      ) && compare(
        a + b + c,
        fpc.sum(a, b, c),
        fpc.sum([ a, b, c ])
      )
    );
  });

  describe('#cat', () => {
    jsc.property('should concat strings', any, any, any, (a, b, c) =>
      compare(
        String(a) + String(b),
        fpc.cat(a, b),
        fpc.cat([ a, b ])
      ) && compare(
        String(a) + String(b) + String(c),
        fpc.cat(a, b, c),
        fpc.cat([ a, b, c ])
      )
    );
  });
});
