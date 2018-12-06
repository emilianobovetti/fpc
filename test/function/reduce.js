const { reduce } = require('../../src/index.mjs');
const { compare } = require('../utils');
const should = require('should');
const jsc = require('jsverify');

const any = jsc.oneof([ jsc.json, jsc.falsy ]);

const shiftChar = c => String.fromCharCode(c.charCodeAt(0) + 1);

describe('reduce', () => {
  it('should work on arrays', () =>
    reduce([ 1, 2, 3 ], (acc, x) => acc + x, 0).should.be.equal(6)
  );

  it('should work on strings too', () =>
    reduce('123', (acc, x) => acc + parseInt(x), 0).should.be.equal(6)
  );

  jsc.property('should work as Array.prototype.reduce()', jsc.array(any), jsc.fn(jsc.nat), (array, fn) =>
    compare(
      array.reduce(fn, 0),
      reduce(array, fn, 0)
    )
  );

  jsc.property('should work on strings too', jsc.string, str =>
    compare(
      str.split('').map(shiftChar).join(''),
      reduce(str, (acc, c) => acc + shiftChar(c), '')
    )
  );
});
