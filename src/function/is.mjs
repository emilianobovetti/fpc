import unsafeCurry from './internal/curry';
import typeOf from './typeOf';
import unbox from './unbox';
import prop from './prop';

const is = unsafeCurry((expected, val) => {
  /* eslint complexity: "off" */
  /* eslint no-mixed-operators: "off" */

  if (expected === 'array-like') {
    return is.str(val) || is.obj(val) && is.int(val.length) && val.length >= 0;
  }

  if (expected === 'iterable') {
    return is.fun(prop(val, Symbol.iterator));
  }

  if (expected === 'integer') {
    return is.num(val) &&
      isFinite(val) &&
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
