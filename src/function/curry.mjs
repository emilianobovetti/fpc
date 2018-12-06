import unsafeCurry from './internal/curry';
import failWith from './failWith';
import is from './is';

const curry = (fn, numArgs = fn.length) => (
  is.int(numArgs) && numArgs >= 0
    ? unsafeCurry(fn, numArgs)
    : failWith(new Error('curry() expects a non-negative integer as numArgs'))
);

export default curry;
