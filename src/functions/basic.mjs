/**
 * Collection of basic functions.
 *
 * @example
 * import { id } from 'fpc';
 *
 * console.log(id('hello, world'));
 *
 * @module functions/basic
 * @author Emiliano Bovetti <emiliano.bovetti@gmail.com>
 */

import { first, unshift, reduce, map } from './collection';

/**
 * Identity function.
 *
 * @param {*} x - value
 * @return {*} `x`
 */
export const id = x => x;

/**
 * @example
 * const isOdd = x => x % 2 !== 0;
 *
 * [1, 2, 3, 4].filter(not(isOdd)); // [ 2, 4 ]
 *
 * @param {function} fn - input
 * @return {function} `(...args) => !fn(...args)`
 */
export const not = fn => (...args) => !fn(...args);

/**
 * Creates a copy of a function that takes its arguments in reversed order.
 *
 * @example
 * const revCat = flip(cat);
 *
 * revCat(1, 2, 3) === cat(3, 2, 1);
 *
 * @param {function} fn - input
 * @return {function} the flipped version of `fn`
 */
export const flip = fn => (...args) => fn(...args.reverse());

/**
 * Throws an error but as expression, unlike `throw`.
 * Converts `e` to {@link Error} if isn't already an `Error` instance.
 *
 * @example
 * args.length > 0 || failWith(new Error('No args'));
 *
 * @param {Error} e - to throw
 * @return {Never} always throws `e`
 * @throws {Error}
 */
export const failWith = e => {
  throw e instanceof Error ? e : new Error(e);
};

/**
 * Returns the unboxed value on some objects,
 * works as identity function on other values.
 *
 * @example
 * typeof unbox(Object('str')); // 'string'
 *
 * @param {*} val - value
 * @return {*} the unboxed value
 */
export const unbox = val => {
  const unb = (val || {}).valueOf();

  return typeof unb !== 'object' && typeof unb !== 'function' ? unb : val;
};

/**
 * Two differences with `typeof` operator:
 *
 * 1. `typeOf(null) === 'null'`
 * 2. `typeOf(Object('str')) === 'string'`
 *
 * @param {*} val - value
 * @return {string} `value` type
 */
export const typeOf = val => (
  val === null ? 'null' : typeof unbox(val)
);

/**
 * Returns an object property value, or `undefined`.
 * Doesn't throw errors.
 *
 * @example
 * prop({ p: 'val' }, 'p'); // 'val'
 * prop(null, 'p'); // undefined
 *
 * @param {*} val - value
 * @param {string} propName - property name
 * @return {*} the property value
 */
export const prop = (val, propName) => (
  val == null ? undefined : val[propName]
);

const privCurry = (fn, numArgs, args = []) => (
  args.length < numArgs
    ? (...innerArgs) => privCurry(fn, numArgs, args.concat(innerArgs))
    : fn(...args)
);

export const is = privCurry((expected, val) => {
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

/**
 * @name is.num
 * @param {*} val - value
 * @return {boolean} `typeOf(val) === 'number'`
 */
is.num = is('number');

/**
 * @name is.str
 * @param {*} val - value
 * @return {boolean} `typeOf(val) === 'string'`
 */
is.str = is('string');

/**
 * @name is.sym
 * @param {*} val - value
 * @return {boolean} `typeOf(val) === 'symbol'`
 */
is.sym = is('symbol');

/**
 * @name is.obj
 * @param {*} val - value
 * @return {boolean} `typeOf(val) === 'object'`
 */
is.obj = is('object');

/**
 * @name is.fun
 * @param {*} val - value
 * @return {boolean} `typeOf(val) === 'function'`
 */
is.fun = is('function');

/**
 * @name is.bool
 * @param {*} val - value
 * @return {boolean} `typeOf(val) === 'boolean'`
 */
is.bool = is('boolean');

/**
 * Checks if a value is integer.
 *
 * @since 2.2.0
 * @name is.int
 * @param {*} val - value
 * @return {boolean} `true` if value is integer
 */
is.int = is('integer');

/**
 * Checks if a value is iterable.
 * Uses `Symbol.iterator` so it's compatible with es6.
 *
 * @name is.iter
 * @param {*} val - value
 * @return {boolean} `true` if `val[Symbol.iterator]` is a function
 */
is.iter = is('iterable');

/**
 * Checks if a value is an array.
 * Uses `Array.isArray` so it's compatible with es5.1.
 *
 * @name is.array
 * @param {*} val - value
 * @return {boolean} `Array.isArray(val)`
 */
is.array = is('array');

/**
 * Checks if a value is an array-like object.
 *
 * @since 2.2.0
 * @name is.array.like
 * @param {*} val - value
 * @return {boolean} `true` if `val` is a string or an object with a length
 */
is.array.like = is('array-like');

export const expect = privCurry((expected, val) => (
  is(expected, val)
    ? unbox(val)
    : failWith(new TypeError(`Expected ${expected}, got ${typeOf(val)}`))
), 2);

/**
 * Checks if `is.num(number)`, then returns that number or throws a `TypeError`.
 *
 * @name expect.num
 * @param {*} val - value
 * @return {number} val
 * @throws {TypeError}
 */
expect.num = expect('number');

/**
 * Checks if `is.num(string)`, then returns that string or throws a `TypeError`.
 *
 * @name expect.str
 * @param {*} val - value
 * @return {string} val
 * @throws {TypeError}
 */
expect.str = expect('string');

/**
 * Checks if `is.sym(symbol)`, then returns that symbol or throws a `TypeError`.
 *
 * @name expect.sym
 * @param {*} val - value
 * @return {symbol} val
 * @throws {TypeError}
 */
expect.sym = expect('symbol');

/**
 * Checks if `is.obj(object)`, then returns that object or throws a `TypeError`.
 *
 * @name expect.obj
 * @param {*} val - value
 * @return {object} val
 * @throws {TypeError}
 */
expect.obj = expect('object');

/**
 * Checks if `is.fun(function)`, then returns that function or throws a `TypeError`.
 *
 * @name expect.fun
 * @param {*} val - value
 * @return {function} val
 * @throws {TypeError}
 */
expect.fun = expect('function');

/**
 * Checks if `is.bool(boolean)`, then returns that boolean or throws a `TypeError`.
 *
 * @name expect.bool
 * @param {*} val - value
 * @return {boolean} val
 * @throws {TypeError}
 */
expect.bool = expect('boolean');

/**
 * Checks if `is.int(value)`, then returns that value or throws a `TypeError`.
 *
 * @since 2.2.0
 * @name expect.int
 * @param {*} val - value
 * @return {*} number
 * @throws {TypeError}
 */
expect.int = expect('integer');

/**
 * Checks if `is.iter(value)`, then returns that value or throws a `TypeError`.
 *
 * @name expect.iter
 * @param {*} val - value
 * @return {iterable} iterable
 * @throws {TypeError}
 */
expect.iter = expect('iterable');

/**
 * Checks if `is.array(value)`, then returns that value or throws a `TypeError`.
 *
 * @name expect.array
 * @param {*} val - value
 * @return {Array} array
 * @throws {TypeError}
 */
expect.array = expect('array');

/**
 * Checks if `is.array.like(value)`, then returns that value or throws a `TypeError`.
 *
 * @since 2.2.0
 * @name expect.array.like
 * @param {*} val - value
 * @return {string|object} array like object
 * @throws {TypeError}
 */
expect.array.like = expect('array-like');

/**
 * Creates currified a copy of a function.
 *
 * @example
 * const currifSum = curry((x, y) => x + y);
 *
 * currifSum(1, 2); // 3
 *
 * const add2 = currifSum(2);
 * add2(3); // 5
 *
 * @since 2.1.0
 * @param {function} fn - to curry
 * @param {number} [numArgs=fn.length] - how many arguments `fn` takes
 * @return {function} currified version
 */
export const curry = (fn, numArgs = fn.length) => (
  is.int(numArgs) && numArgs >= 0
    ? privCurry(fn, numArgs)
    : failWith(new Error('curry() expects a non-negative integer as numArgs'))
);

/**
 * Creates currified a copy of a two-arguments function.
 *
 * When we variadic function `fn` unfortunately we cannot use
 * `curry(fn)` because its `length` is 0.
 * So we need to specify how many arguments `fn` expects:
 * `curry(fn, 2)` or simply `curry2(fn)`.
 *
 * @example
 * const currifSum = curry2((...xs) => xs.reduce((a, b) => a + b, 0));
 *
 * currifSum(1, 2); // 3
 *
 * const add2 = currifSum(2);
 * add2(3); // 5
 *
 * @param {function} fn - that takes two arguments
 * @return {function} currified version
 */
export const curry2 = fn =>
  privCurry(fn, 2);

/**
 * Sums its arguments.
 * If called with only one argument, then it must be iterable.
 *
 * @example
 * sum(1, 2, 3) === 1 + 2 + 3
 * sum('1', 2, 3) === '1' + 2 + 3
 * sum([ 1, 2, 3 ]) === 1 + 2 + 3
 *
 * @param {...*|Array} args - the addends or array of addends
 * @return {number|string} the summation
 */
export const sum = (...args) =>
  reduce(args.length > 1 ? args : first(args), (a, b) => a + b);

/**
 * Works like `sum`, but first casts its arguments to `string`.
 *
 * @example
 * cat(1, 2, 3) === '1' + '2' + '3'
 * cat([ 1, 2, 3 ]) === '1' + '2' + '3'
 *
 * @param {...*|Array} args - elements to concat
 * @return {string} the concatenation
 */
export const cat = (...args) =>
  sum(map(args.length > 1 ? args : first(args), String));

/**
 * Clamps a number within a given range.
 *
 * @example
 * bound(1, 4, 6); // 4
 * bound(5, 4, 6); // 5
 * bound(7, 4, 6); // 6
 *
 * @param {number} num - to clamp
 * @param {number} min - minimum of the range
 * @param {number} max - maximum of the range
 * @return {number} the clamped value
 */
export const bound = (num, min, max) =>
  Math.max(min, Math.min(max, num));

/**
 * Calls an object method.
 *
 * @example
 * const obj = {
 *   someMethod: arg => console.log('hello, ' + arg)
 * };
 *
 * call(obj, 'someMethod', 'world'); // logs 'hello, world'
 *
 * @example
 * // same as '1,2,3'.split(',')
 * call('1,2,3', 'split', ',');
 *
 * @param {object} obj - context
 * @param {string} propName - method name
 * @param {...*} args - method arguments
 * @return {*} `obj[propName](...args)`
 * @throws {TypeError} if `obj[propName]` isn't a function
 */
export const call = (obj, propName, ...args) =>
  expect.fun(prop(obj, propName)).apply(obj, args);

/**
 * @example
 * // logs 'hello, world', returns 'hello'
 * pass('hello', console.log, ', world');
 *
 * @example
 * // returns [ 1, 2 ]
 * pipe([ 1 ])
 *   .into(pass, call, 'push', 2)
 *   .result;
 *
 * @param {*} val - to return
 * @param {function} fn - callback
 * @param {...*} args - additional arguments
 * @return {*} the first argument
 */
export const pass = (val, fn, ...args) => {
  args.unshift(val);
  expect.fun(fn)(...args);

  return val;
};

/**
 * Function composition, read more [here](composition.md).
 *
 * @param {function} fn1 - to compose
 * @param {...*} fn1Args - additional arguments
 * @return {function} composable function object
 */
export const compose = (fn1, ...fn1Args) => {
  expect.fun(fn1);

  const self = (...args) => fn1(...args.concat(fn1Args));

  self.with = (fn2, ...fn2Args) => {
    expect.fun(fn2);

    return compose((...args) => fn2(...unshift(fn2Args, self(...args))));
  };

  self.and = self.with;

  self.ply = (...args) => self(...args);

  return self;
};

/**
 * Pipe function, read more [here](piping.md).
 *
 * @param {...*} args - pipe arguments
 * @return {object} pipeable object
 */
export const pipe = (...args) => {
  const self = {};

  self.result = args.length > 0
    ? first(args)
    : failWith(new Error('pipe() cannot be called without an argument'));

  self.into = (fn, ...innerArgs) => {
    expect.fun(fn);

    return pipe(fn(...args.concat(innerArgs)));
  };

  self.and = self.into;

  return self;
};
