const { reverse, compose } = require('../../src/index.mjs');
const { compare } = require('../utils');
const jsc = require('jsverify');

const any = jsc.oneof([ jsc.json, jsc.falsy ]);

const reverseReverse = compose(reverse).with(reverse);
const reverseReverseReverse = compose(reverseReverse).with(reverse);
const reverseReverseReverseReverse = compose(reverseReverseReverse).with(reverse);

describe('reverse', () => {
  jsc.property('should work as Array.prototype.reverse()', jsc.array(any), array =>
    compare(
      array.slice().reverse(),
      reverse(array)
    )
  );

  jsc.property('should satisfy rev(rev(rev(x)) = rev(x)', jsc.array(any), array =>
    compare(
      reverseReverseReverse(array),
      reverse(array)
    )
  );

  jsc.property('should satisfy rev(rev(rev(rev(x))) = rev(rev(x))', jsc.array(any), array =>
    compare(
      reverseReverseReverseReverse(array),
      reverseReverse(array)
    )
  );
});
