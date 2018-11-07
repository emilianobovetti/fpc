const { Maybe, Nothing, Just } = require('../../../src/index.mjs');
const jsc = require('jsverify');
const _ = require('lodash');

Maybe.isEqual = (m1, m2) => {
  return m1.empty || m2.empty
    ? m1.empty && m2.empty
    : m1 === m2 || _.isEqual(m1.get(), m2.get());
};

/*
 * m >>= return == m
 */
const p1 = v_ => {
  const m = Just(v_);

  return Maybe.isEqual(
    m.map(Just), m
  );
};

/*
 * (return x) >>= f == f x
 */
const p2 = (x, f_) => {
  const f = x => Maybe(f_(x));

  return Maybe.isEqual(
    Just(x).map(f), f(x)
  );
};

/*
 * (m >>= f) >>= g == m >>= (\x -> f x >>= g)
 */
const p3 = (v_, f_, g_) => {
  const m = Just(v_);
  const f = x => Maybe(f_(x));
  const g = x => Maybe(g_(x));


  return Maybe.isEqual(
    m.map(f).map(g), m.map(x => f(x).map(g))
  );
};

const any = jsc.oneof([ jsc.json, jsc.falsy ]);

describe('given a maybe `m`', () => {

  jsc.property('should satisfy `m >>= return == m`', any, p1);

  describe('and a function `f`', () => {

    jsc.property('should satisfy `(return x) >>= f == f x`', any, jsc.fn(any), p2);

    describe('and a function `g`', () => {

      jsc.property('should satisfy `(m >>= f) >>= g == m >>= (\\x -> f x >>= g)`', any, jsc.fn(any), jsc.fn(any), p3);

    });
  });
});
