import failWith from '../function/failWith';
import unbox from '../function/unbox';
import is from '../function/is';

/* eslint-disable no-use-before-define */

const Maybe = val => (
  val == null ? Nothing : val instanceof Maybe ? val : Just(val)
);

Maybe.prototype = {
  isEmpty: true,

  nonEmpty: false,

  get (e) {
    failWith(e || new Error('Trying to get value of Nothing'));
  },

  getOrThrow (e) {
    return this.get(e);
  },

  filter (fn) {
    return this.isEmpty ? this : fn(this.get()) ? this : Nothing;
  },

  map (fn) {
    return this.isEmpty ? this : Maybe(fn(this.get()));
  },

  forEach (fn) {
    if (this.nonEmpty) {
      fn(this.get());
    }

    return this;
  },

  getOrElse (orElse) {
    return this.nonEmpty ? this.get() : is.fun(orElse) ? orElse() : orElse;
  },

  orElse (orElse) {
    return this.isEmpty ? Maybe(this.getOrElse(orElse)) : this;
  },

  toString () {
    return this.isEmpty ? '' : String(this.get());
  }
};

const Just = function (val) {
  if (!(this instanceof Just)) {
    return new Just(val);
  }

  this.get = () => val;

  return Object.freeze(this);
};

Just.prototype = Object.create(Maybe.prototype, {
  isEmpty: { value: false },
  nonEmpty: { value: true }
});

const Nothing = Object.freeze(Object.create(Maybe.prototype));

Maybe.Just = Just;

Maybe.Nothing = Nothing;

Maybe.isInstance = val => val instanceof Maybe;

Maybe.of = val => Maybe(val);

Maybe.str = val => (
  /* eslint eqeqeq: "off" */
  is.str(val) && val != '' ? Just(unbox(val)) : Nothing
);

Maybe.num = val => (
  is.num(val) ? Just(unbox(val)) : Nothing
);

Maybe.obj = val => (
  is.obj(val) ? Maybe(val) : Nothing
);

export { Just, Nothing, Maybe };
