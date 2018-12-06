const { slice, compose } = require('../../src/index.mjs');
const { compare } = require('../utils');
const jsc = require('jsverify');

const any = jsc.oneof([ jsc.json, jsc.falsy ]);

const sliceSlice = compose(slice).with(slice);

describe('slice', () => {
  jsc.property('should work as Array.prototype.slice()', jsc.array(any), array =>
    compare(
      array.slice(),
      slice(array)
    )
  );

  jsc.property('should be idempotent', jsc.array(any), jsc.integer(), jsc.integer(),  (array, n1, n2) =>
    compare(
      sliceSlice(array),
      slice(array)
    ) &&
    compare(
      sliceSlice(array, n1),
      slice(array, n1)
    ) &&
    compare(
      sliceSlice(array, n1, n2),
      slice(array, n1, n2)
    )
  );
});
