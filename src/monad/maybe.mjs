import failWith from '../function/failWith';
import unbox from '../function/unbox';
import is from '../function/is';

/* eslint-disable no-use-before-define */

class MaybeCtor {
  getOrThrow (e) {
    return this.get(e);
  }

  filter (fn) {
    return this.isEmpty ? this : fn(this.get()) ? this : Nothing;
  }

  map (fn) {
    return this.isEmpty ? this : Maybe(fn(this.get()));
  }

  forEach (fn) {
    if (this.nonEmpty) {
      fn(this.get());
    }

    return this;
  }

  getOrElse (orElse) {
    return this.nonEmpty ? this.get() : is.fun(orElse) ? orElse() : orElse;
  }

  orElse (orElse) {
    return this.isEmpty ? Maybe(this.getOrElse(orElse)) : this;
  }

  toString () {
    return this.isEmpty ? '' : String(this.get());
  }
}

export const Just = val => {
  const self = new MaybeCtor();

  self.isEmpty = false;

  self.nonEmpty = true;

  self.get = () => val;

  return Object.freeze(self);
};

export const Nothing = new MaybeCtor();

Nothing.isEmpty = true;

Nothing.nonEmpty = false;

Nothing.get = e => failWith(e || new Error('Trying to get value of Nothing'));

Object.freeze(Nothing);

export const Maybe = val => (
  val == null ? Nothing : val instanceof MaybeCtor ? val : Just(val)
);

Maybe.Just = Just;

Maybe.Nothing = Nothing;

Maybe.isInstance = val => val instanceof MaybeCtor;

Maybe.of = val => Maybe(val);

Maybe.str = val => {
  const unb = unbox(val);

  return is.str(unb) && unb !== '' ? Just(unb) : Nothing;
};

Maybe.num = val => {
  const unb = unbox(val);

  return is.num(unb) && !isNaN(unb) && isFinite(unb) ? Just(unb) : Nothing;
};

Maybe.obj = val => (
  is.obj(val) ? Maybe(val) : Nothing
);
