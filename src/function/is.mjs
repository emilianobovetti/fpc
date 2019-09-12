/* eslint-disable complexity, no-mixed-operators */

import unsafeCurry from './internal/curry';
import typeOf from './typeOf';
import unbox from './unbox';
import prop from './prop';
import hasOwnProperty from './hasOwnProperty';

const is = unsafeCurry((expected, val) => {
  if (typeof expected === 'function') {
    return val instanceof expected;
  }

  if (typeof expected !== 'string') {
    throw new TypeError(`Invalid parameter type: ${typeOf(expected)}`);
  }

  if (expected === 'array-like') {
    const length = hasOwnProperty(val, 'length') ? val.length : undefined;

    return is.int(length) &&
      length >= 0 &&
      (length === 0 || hasOwnProperty(val, 0));
  }

  if (expected === 'iterable') {
    return is.fun(prop(val, Symbol.iterator));
  }

  if (expected === 'integer') {
    return is.num(val) &&
      Math.floor(val) === unbox(val);
  }

  if (expected === 'array') {
    return Array.isArray(val);
  }

  return typeOf(val) === expected;
}, 2);

is.num = is('number');
is.int = is('integer');
is.str = is('string');
is.sym = is('symbol');
is.obj = is('object');
is.fun = is('function');
is.bool = is('boolean');
is.iter = is('iterable');
is.array = is('array');
is.array.like = is('array-like');

export default is;
