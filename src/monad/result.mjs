import failWith from '../function/failWith';
import id from '../function/id';

/* eslint-disable no-use-before-define */

class Result {
  constructor (opts = {}) {
    Object.assign(this, opts);
  }

  map (fn) {
    return this.isError ? this : Ok.of(fn(this.get()));
  }

  mapError (fn) {
    return this.isOk ? this : Err(fn(this.getError()));
  }

  forEach (fn) {
    if (this.isOk) {
      fn(this.get());
    }

    return this;
  }

  forEachError (fn) {
    if (this.isError) {
      fn(this.getError());
    }

    return this;
  }

  merge (mapErrFn = id, mapFn = id) {
    const result = this.mapError(mapErrFn).map(mapFn);

    return result.isOk ? result.get() : result.getError();
  }
}

Result.of = (fn, ...args) => {
  try {
    return Ok.of(fn(...args));
  } catch (e) {
    return Err(e);
  }
};

const Ok = function (val) {
  if (!(this instanceof Ok)) {
    return new Ok(val);
  }

  this.get = () => val;

  return this;
};

Ok.prototype = new Result({
  isOk: true,
  isError: false,
  getError: () => failWith(new Error('Trying to get error of Ok'))
});

Ok.of = val => (
  val instanceof Result ? val : Ok(val)
);

const Err = function (val) {
  if (!(this instanceof Err)) {
    return new Err(val);
  }

  this.getError = () => val;

  return this;
};

Err.prototype = new Result({
  isOk: false,
  isError: true,
  get: () => failWith(new Error('Trying to get value of Err'))
});

export { Ok, Err, Result };
