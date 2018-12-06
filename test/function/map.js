const { map } = require('../../src/index.mjs');
const { compare } = require('../utils');
const jsc = require('jsverify');

const any = jsc.oneof([ jsc.json, jsc.falsy ]);

const shiftChar = c => String.fromCharCode(c.charCodeAt(0) + 1);

describe('map', () => {
  it('should work on arrays', () =>
    compare(map([ 1, 2, 3 ], x => x + 1), [ 2, 3, 4 ])
  );

  it('should work on strings too', () =>
    compare(map('123', x => parseInt(x)), [ 1, 2, 3 ])
  );

  jsc.property('should work as Array.prototype.map()', jsc.array(any), jsc.fn(jsc.nat), (array, fn) =>
    compare(
      array.map(fn),
      map(array, fn)
    )
  );

  jsc.property('should work on strings too', jsc.string, str =>
    compare(
      str.split('').map(shiftChar),
      map(str, shiftChar)
    )
  );
});
