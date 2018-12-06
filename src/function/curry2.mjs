import unsafeCurry from './internal/curry';

const curry2 = fn => unsafeCurry(fn, 2);

export default curry2;
