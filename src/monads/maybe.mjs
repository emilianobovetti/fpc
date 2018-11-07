/**
 * Maybe monad ported from [stateless-maybe-js](https://github.com/emilianobovetti/stateless-maybe-js).
 *
 * @example
 * import { Maybe } from 'fpc';
 *
 * Maybe('hello, world')
 *  .forEach(console.log);
 *
 * @module monads/maybe
 * @author Emiliano Bovetti <emiliano.bovetti@gmail.com>
 */

import { failWith, is, unbox } from '../functions/basic';

/* eslint-disable no-use-before-define */

/**
 * @interface
 */
class MaybeInterface {
  /**
   * `true` if maybe is `Nothing`, `false` otherwise.
   *
   * @name isEmpty
   * @constant
   * @type {boolean}
   * @memberof MaybeInterface
   */

  /**
   * Negation of `isEmpty`.
   *
   * @name nonEmpty
   * @constant
   * @type {boolean}
   * @memberof MaybeInterface
   */

  /**
   * Returns wrapped value or throws an `Error`
   * if the object is `Nothing`.
   *
   * @name get
   * @method
   * @memberof MaybeInterface
   * @return wrapped value
   * @throws {Error}
   */

  /**
   * @param {Error} e - a custom error
   * @return {*} wrapped value or throws the error
   * @throws {Error}
   */
  getOrThrow (e) {
    return this.get(e);
  }

  /**
   * If the object is a `Just` instance and `fn(value) == false`,
   * returns `Nothing`. Returns the maybe itself otherwise.
   *
   * @param {function} fn - filter function
   * @return {MaybeInterface} itself or `Nothing`
   */
  filter (fn) {
    return this.isEmpty ? this : fn(this.get()) ? this : Nothing;
  }

  /**
   * If the object is a `Just` instance and `fn(value)`
   * isn't `null` or `undefined`, returns `Just(fn(value))`.
   * Returns `Nothing` otherwise.
   *
   * @param {function} fn - map function
   * @return {MaybeInterface} `Maybe(fn(value))` or `Nothing`
   */
  map (fn) {
    return this.isEmpty ? this : Maybe(fn(this.get()));
  }

  /**
   * Does nothing if the object is `Nothing`.
   * Applies the given function to wrapped value otherwise.
   * Always returns itself.
   *
   * @param {function} fn - function to apply
   * @return {MaybeInterface} itself
   */
  forEach (fn) {
    if (this.nonEmpty) {
      fn(this.get());
    }

    return this;
  }

  /**
   * If the object is a `Just` instance, returns its value.
   * If it's a `Nothing returns `orElse`.
   *
   * `orElse` can be:
   * 1. a function - which is called and its result returned
   *  if the maybe is empty.
   * 2. any other value - which is returned
   *  in case the maybe is empty.
   *
   * @param {*} orElse - some value or a function
   * @return {*} wrapped value or `orElse`
   */
  getOrElse (orElse) {
    return this.nonEmpty ? this.get() : is.fun(orElse) ? orElse() : orElse;
  }

  /**
   * Acts like `getOrElse`, but returns a `Maybe` instance
   * instead of wrapped value.
   *
   * @see getOrElse
   * @param {*} orElse - some value or a function
   * @return {MaybeInterface} itself or `Maybe(orElse)`
   */
  orElse (orElse) {
    return this.isEmpty ? Maybe(this.getOrElse(orElse)) : this;
  }

  /**
   * If the object is a `Just` instance returns
   * wrapped value casted to string.
   * Returns an empty string otherwise.
   *
   * @return {string} empty string or `String(this.get())`
   */
  toString () {
    return this.isEmpty ? '' : String(this.get());
  }
}

/**
 * Just constructor: function that always returns
 * a `Just` instance.
 *
 * @example
 * import { Just } from 'fpc';
 *
 * // Maybe objects *can* contain null or undefined
 * const m1 = Just(null);
 *
 * m1.isEmpty; // false
 * m1.get(); // null
 *
 * @example
 * import { Maybe, Just } from 'fpc';
 *
 * const m2 = Maybe('hello, world');
 *
 * // Maybe objects *can* be nested with `Just()`
 * m2 !== Just(m2);
 * m2 === Just(m2).get();
 *
 * @param {*} val - value to wrap
 * @return {MaybeInterface} `Just(val)`
 */
export const Just = val => {
  const self = new MaybeInterface();

  self.isEmpty = false;

  self.nonEmpty = true;

  self.get = () => val;

  return Object.freeze(self);
};

/**
 * `Nothing` instance.
 *
 * @constant
 * @type {MaybeInterface}
 */
export const Nothing = new MaybeInterface();

Nothing.isEmpty = true;

Nothing.nonEmpty = false;

Nothing.get = e => failWith(e || new Error('Trying to get value of Nothing'));

Object.freeze(Nothing);

/**
 * Façade: returns `Nothing` if value is `null` or `undefined`,
 * returns `Just(value)` otherwise.
 *
 * @example
 * const m1 = Maybe('hello, world');
 * const m2 = Maybe(undefined);
 * const m3 = Maybe(null);
 *
 * m1.isEmpty; // false
 * m2.isEmpty; // true
 * m3.isEmpty; // true
 *
 * @example
 * const m = Maybe('hello, world');
 *
 * // when Maybe() receives a maybe monad
 * // it simply returns the maybe itself
 * m === Maybe(m); // true
 *
 * @param {*} val - value to wrap
 * @return {MaybeInterface} `Just(val)` or `Nothing`
 */
export const Maybe = val => (
  val == null ? Nothing : val instanceof MaybeInterface ? val : Just(val)
);

Maybe.Just = Just;

Maybe.Nothing = Nothing;

/**
 * Allows to determine if an object is a `Maybe` instance.
 *
 * @example
 * Maybe.isInstance(null); // false
 * Maybe.isInstance(Maybe(null)); // true
 *
 * @name Maybe.isInstance
 * @param {*} val - some value
 * @return {boolean} `true` if `val` is a `Maybe` instance
 */
Maybe.isInstance = val => val instanceof MaybeInterface;

/**
 * Alias of {@link Maybe}.
 *
 * @see Maybe
 * @name Maybe.of
 * @param {*} val - value to wrap
 * @return {MaybeInterface} `Just(val)` or `Nothing`
 */
Maybe.of = val => Maybe(val);

/**
 * Creates a `Maybe` object that contains a non-empty string.
 *
 * @example
 * Maybe.str('string') // Just('string')
 * Maybe.str(Object('string')) // Just('string')
 *
 * Maybe.str('') // Nothing
 * Maybe.str(Object('')) // Nothing
 * Maybe.str(anythingElse) // Nothing
 *
 * @name Maybe.str
 * @param {*} val - some value
 * @return {MaybeInterface} `Just(nonEmptyString)` or `Nothing`
 */
Maybe.str = val => {
  const unb = unbox(val);

  return is.str(unb) && unb !== '' ? Just(unb) : Nothing;
};

/**
 * Creates a `Maybe` object that contains a number
 * that is not `NaN` or `Infinite`.
 *
 * @example
 * Maybe.num(0) // Just(0)
 * Maybe.num(Object(0)) // Just(0)
 *
 * Maybe.num(NaN) // Nothing
 * Maybe.num(Object(NaN)) // Nothing
 * Maybe.num(anythingElse) // Nothing
 *
 * @name Maybe.num
 * @param {*} val - some value
 * @return {MaybeInterface} `Just(validNumber)` or `Nothing`
 */
Maybe.num = val => {
  const unb = unbox(val);

  return is.num(unb) && !isNaN(unb) && isFinite(unb) ? Just(unb) : Nothing;
};

/**
 * Creates a `Maybe` object that contains a non-primitive object.
 *
 * @example
 * Maybe.obj({}) // Just({})
 * Maybe.obj([]) // Just([])
 *
 * Maybe.obj(Object('')) // Nothing
 * Maybe.obj(Object('string')) // Nothing
 * Maybe.obj(Object(0)) // Nothing
 * Maybe.obj(Object(NaN)) // Nothing
 *
 * @name Maybe.obj
 * @param {*} val - some value
 * @return {MaybeInterface} `Just(object)` or `Nothing`
 */
Maybe.obj = val => (
  is.obj(val) ? Maybe(val) : Nothing
);
