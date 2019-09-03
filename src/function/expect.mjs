import unsafeCurry from './internal/curry';
import failWith from './failWith';
import typeOf from './typeOf';
import unbox from './unbox';
import is from './is';

const print = val => (
  typeof val === 'function' ? val.name : val
);

const expect = unsafeCurry((expected, val) => (
  is(expected, val)
    ? unbox(val)
    : failWith(new TypeError(`Expected ${print(expected)}, got ${typeOf(val)}`))
), 2);

expect.num = expect('number');
expect.int = expect('integer');
expect.str = expect('string');
expect.sym = expect('symbol');
expect.obj = expect('object');
expect.fun = expect('function');
expect.bool = expect('boolean');
expect.iter = expect('iterable');
expect.array = expect('array');
expect.array.like = expect('array-like');

export default expect;
