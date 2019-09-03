const { Maybe, Nothing, Just } = require('../../src/index.mjs');
const { compare } = require('../utils');
const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const jsc = require('jsverify');
const _ = require('lodash');
require('should-sinon');

Maybe.compare = (m1, m2) => {
  return m1.empty || m2.empty
    ? m1.empty && m2.empty
    : m1 === m2 || compare(m1.get(), m2.get());
};

const just0 = Just(0);

// Nothing
describe('Nothing', () => {
  it('should be equal to Maybe(null)', () => {
    Nothing.should.be.equal(Maybe(null));
  });

  it('should be equal to Maybe(undefined)', () => {
    Nothing.should.be.equal(Maybe(undefined));
  });

  it('should be equal to Maybe(Nothing)', () => {
    Nothing.should.be.equal(Maybe(Nothing));
  });

  // Nothing.isEmpty
  describe('#isEmpty', () => {
    it('should be true', () => {
      Nothing.isEmpty.should.be.true();
    });
  });

  // Nothing.nonEmpty
  describe('#nonEmpty', () => {
    it('should be false', () => {
      Nothing.nonEmpty.should.be.false();
    });
  });

  // Nothing.filter
  describe('#filter(_ => false)', () => {
    it('should be Nothing', () => {
      Nothing.filter(_ => false).should.be.equal(Nothing);
    });
  });

  describe('#filter(_ => true)', () => {
    it('should be Nothing', () => {
      Nothing.filter(_ => true).should.be.equal(Nothing);
    });
  });

  // Nothing.map
  describe('#map(_ => 1)', () => {
    it('should be Nothing', () => {
      Nothing.map(_ => 1).should.be.equal(Nothing);
    });
  });

  // Nothing.forEach
  describe('#forEach(fn)', () => {
    it('should not call `fn`', () => {
      const callback = sinon.spy();

      Nothing.forEach(callback);

      callback.should.not.be.called();
    });
  });

  // Nothing.get
  describe('#get()', () => {
    it('should throw an error', () => {
      Nothing.get.should.throw();
    });
  });

  describe('#get(new Error(..))', () => {
    it('should throw the specified error', () => {
      const error = new TypeError('Custom error');

      (_ => Nothing.get(error)).should.throw(error);
    });
  });

  // Nothing.getOrElse
  describe('#getOrElse(1)', () => {
    it('should be 1', () => {
      Nothing.getOrElse(1).should.be.equal(1);
    });
  });

  describe('#getOrElse(_ => 1)', () => {
    it('should be 1', () => {
      Nothing.getOrElse(_ => 1).should.be.equal(1);
    });
  });

  // Nothing.getOrThrow
  describe('#getOrThrow()', () => {
    it('should throw an error', () => {
      Nothing.getOrThrow.should.throw();
    });
  });

  describe('#getOrThrow(new Error(..))', () => {
    it('should throw the specified error', () => {
      const error = new TypeError('Custom error');

      (_ => Nothing.getOrThrow(error)).should.throw(error);
    });
  });

  // Nothing.orElse
  describe('#orElse(1)', () => {
    it('should be Just(1)', () => {
      Nothing.orElse(1).get().should.be.equal(1);
    });
  });

  describe('#orElse(_ => 1)', () => {
    it('should be a Just(1)', () => {
      Nothing.orElse(_ => 1).get().should.be.equal(1);
    });
  });

  // Nothing.toString
  describe('#toString()', () => {
    it('should be ""', () => {
      Nothing.toString().should.be.equal('');
    });
  });
});

// Just(0)
describe('Just(0)', () => {

  // Just(0).isEmpty
  describe('#isEmpty', () => {
    it('should be false', () => {
      just0.isEmpty.should.be.false();
    });
  });

  // Just(0).nonEmpty
  describe('#nonEmpty', () => {
    it('should be true', () => {
      just0.nonEmpty.should.be.true();
    });
  });

  // Just(0).filter
  describe('#filter(_ => false)', () => {
    it('should be Nothing', () => {
      just0.filter(_ => false).should.be.equal(Nothing);
    });
  });

  describe('#filter(_ => true)', () => {
    it('should be equal to itself', () => {
      just0.filter(_ => true).should.be.equal(just0);
    });
  });

  // Just(0).map
  describe('#map(x => x + 1)', () => {
    it('should be Just(1)', () => {
      just0.map(x => x + 1).get().should.be.equal(1);
    });
  });

  describe('#map(x => Maybe(x + 1)', () => {
    it('should be Just(1)', () => {
      just0.map(x => Maybe(x + 1)).get().should.be.equal(1);
    });
  });

  // Just(0).forEach
  describe('#forEach(fn)', () => {
    it('should call `fn(0)`', () => {
      const callback = sinon.spy();

      just0.forEach(callback);

      callback.should.be.calledWith(0);
    });
  });

  // Just(0).get
  describe('#get()', () => {
    it('should be 0', () => {
      just0.get().should.be.equal(0);
    });
  });

  // Just(0).getOrElse
  describe('#getOrElse(1)', () => {
    it('should be 0', () => {
      just0.getOrElse(1).should.be.equal(0);
    });
  });

  describe('#getOrElse(_ => 1)', () => {
    it('should be 0', () => {
      just0.getOrElse(_ => 1).should.be.equal(0);
    });
  });

  // Just(0).getOrThrow
  describe('#getOrThrow()', () => {
    it('should be 0', () => {
      just0.getOrThrow().should.be.equal(0);
    });
  });

  describe('#getOrThrow(new Error(..))', () => {
    it('should be 0', () => {
      just0.getOrThrow(new TypeError('Custom error')).should.be.equal(0);
    });
  });

  // Just(0).orElse
  describe('#orElse(1)', () => {
    it('should be equal to itself', () => {
      just0.orElse(1).should.be.equal(just0);
    });
  });

  describe('#orElse(_ => 1)', () => {
    it('should be equal to itself', () => {
      just0.orElse(_ => 1).should.be.equal(just0);
    });
  });

  // Just(0).toString
  describe('#toString()', () => {
    it('should be "0"', () => {
      just0.toString().should.be.equal('0');
    });
  });
});

// Maybe
describe('Maybe', () => {

  // Maybe.isInstance
  describe('#isInstance(null)', () => {
    it('should be false', () => {
      Maybe.isInstance(null).should.be.false();
    });
  });

  describe('#isInstance(Maybe(null))', () => {
    it('should be true', () => {
      Maybe.isInstance(Maybe(null)).should.be.true();
    });
  });

  // Maybe.of
  describe('#of(null)', () => {
    it('should be Nothing', () => {
      Maybe.of(null).should.be.equal(Nothing);
    });
  });

  describe('#of(undefined)', () => {
    it('should be Nothing', () => {
      Maybe.of(undefined).should.be.equal(Nothing);
    });
  });

  describe('#of(true)', () => {
    it('should be Just(true)', () => {
      Maybe.of(true).get().should.be.true();
    });
  });

  describe('#of(false)', () => {
    it('should be Just(false)', () => {
      Maybe.of(false).get().should.be.false();
    });
  });

  describe('#of(0)', () => {
    it('should be Just(0)', () => {
      Maybe.of(0).get().should.be.equal(0);
    });
  });

  describe('#of(Symbol())', () => {
    it('should be Just(Symbol())', () => {
      const sym = Symbol('desc');

      Maybe.of(sym).get().should.be.equal(sym);
    });
  });

  describe('#of(_ => 0)', () => {
    it('should be Just(_ => 0)', () => {
      const fn = _ => 0;

      Maybe.of(fn).get().should.be.equal(fn);
    });
  });

  describe('#of({})', () => {
    it('should be Just({})', () => {
      const obj = {};

      Maybe.of(obj).get().should.be.equal(obj);
    });
  });

  describe('#of("")', () => {
    it('should be Just("")', () => {
      Maybe.of('').get().should.be.equal('');
    });
  });

  describe('#of(Just(0))', () => {
    it('should be Just(0)', () => {
      Maybe.of(just0).get().should.be.equal(0);
    });
  });

  // Maybe.str
  describe('#str(undefined)', () => {
    it('should be Nothing', () => {
      Maybe.str(undefined).should.be.equal(Nothing);
    });
  });

  describe('#str(null)', () => {
    it('should be Nothing', () => {
      Maybe.str(null).should.be.equal(Nothing);
    });
  });

  describe('#str(true)', () => {
    it('should be Nothing', () => {
      Maybe.str(true).should.be.equal(Nothing);
    });
  });

  describe('#str(false)', () => {
    it('should be Nothing', () => {
      Maybe.str(false).should.be.equal(Nothing);
    });
  });

  describe('#str(0)', () => {
    it('should be Nothing', () => {
      Maybe.str(0).should.be.equal(Nothing);
    });
  });

  describe('#str(Symbol())', () => {
    it('should be Nothing', () => {
      Maybe.str(Symbol('desc')).should.be.equal(Nothing);
    });
  });

  describe('#str(_ => 0)', () => {
    it('should be Nothing', () => {
      Maybe.str(_ => 0).should.be.equal(Nothing);
    });
  });

  describe('#str({})', () => {
    it('should be Nothing', () => {
      Maybe.str({}).should.be.equal(Nothing);
    });
  });

  describe('#str("")', () => {
    it('should be Nothing', () => {
      Maybe.str('').should.be.equal(Nothing);
    });
  });

  describe('#str(Object(""))', () => {
    it('should be Nothing', () => {
      Maybe.str(Object('')).should.be.equal(Nothing);
    });
  });

  describe('#str(Object("hello"))', () => {
    it('should be Just("hello")', () => {
      Maybe.str(Object('hello')).get().should.be.equal('hello');
    });
  });

  describe('#str("hello")', () => {
    it('should be Just("hello")', () => {
      Maybe.str('hello').get().should.be.equal('hello');
    });
  });

  // Maybe.num
  describe('#num(undefined)', () => {
    it('should be Nothing', () => {
      Maybe.num(undefined).should.be.equal(Nothing);
    });
  });

  describe('#num(null)', () => {
    it('should be Nothing', () => {
      Maybe.num(null).should.be.equal(Nothing);
    });
  });

  describe('#num(true)', () => {
    it('should be Nothing', () => {
      Maybe.num(true).should.be.equal(Nothing);
    });
  });

  describe('#num(false)', () => {
    it('should be Nothing', () => {
      Maybe.num(false).should.be.equal(Nothing);
    });
  });

  describe('#num(Symbol())', () => {
    it('should be Nothing', () => {
      Maybe.num(Symbol('desc')).should.be.equal(Nothing);
    });
  });

  describe('#num(_ => 0)', () => {
    it('should be Nothing', () => {
      Maybe.num(_ => 0).should.be.equal(Nothing);
    });
  });

  describe('#num({})', () => {
    it('should be Nothing', () => {
      Maybe.num({}).should.be.equal(Nothing);
    });
  });

  describe('#num("")', () => {
    it('should be Nothing', () => {
      Maybe.num('').should.be.equal(Nothing);
    });
  });

  describe('#num("0")', () => {
    it('should be Nothing', () => {
      Maybe.num('0').should.be.equal(Nothing);
    });
  });

  describe('#num(NaN)', () => {
    it('should be Nothing', () => {
      Maybe.num(NaN).should.be.equal(Nothing);
    });
  });

  describe('#num(Infinity)', () => {
    it('should be Nothing', () => {
      Maybe.num(Infinity).should.be.equal(Nothing);
    });
  });

  describe('#num(-Infinity)', () => {
    it('should be Nothing', () => {
      Maybe.num(-Infinity).should.be.equal(Nothing);
    });
  });

  describe('#num(Object("0"))', () => {
    it('should be Nothing', () => {
      Maybe.num(Object('0')).should.be.equal(Nothing);
    });
  });

  describe('#num(Object(NaN))', () => {
    it('should be Nothing', () => {
      Maybe.num(Object(NaN)).should.be.equal(Nothing);
    });
  });

  describe('#num(Object(Infinity))', () => {
    it('should be Nothing', () => {
      Maybe.num(Object(Infinity)).should.be.equal(Nothing);
    });
  });

  describe('#num(Object(-Infinity))', () => {
    it('should be Nothing', () => {
      Maybe.num(Object(-Infinity)).should.be.equal(Nothing);
    });
  });

  describe('#num(Object(0))', () => {
    it('should be Just(0)', () => {
      Maybe.num(Object(0)).get().should.be.equal(0);
    });
  });

  describe('#num(0)', () => {
    it('should be Just(0)', () => {
      Maybe.num(0).get().should.be.equal(0);
    });
  });

  // Maybe.obj
  describe('#obj(undefined)', () => {
    it('should be Nothing', () => {
      Maybe.obj(undefined).should.be.equal(Nothing);
    });
  });

  describe('#obj(null)', () => {
    it('should be Nothing', () => {
      Maybe.obj(null).should.be.equal(Nothing);
    });
  });

  describe('#obj(true)', () => {
    it('should be Nothing', () => {
      Maybe.obj(true).should.be.equal(Nothing);
    });
  });

  describe('#obj(false)', () => {
    it('should be Nothing', () => {
      Maybe.obj(false).should.be.equal(Nothing);
    });
  });

  describe('#obj(0)', () => {
    it('should be Nothing', () => {
      Maybe.obj(0).should.be.equal(Nothing);
    });
  });

  describe('#obj(Symbol())', () => {
    it('should be Nothing', () => {
      Maybe.obj(Symbol('desc')).should.be.equal(Nothing);
    });
  });

  describe('#obj(_ => 0)', () => {
    it('should be Nothing', () => {
      Maybe.obj(_ => 0).should.be.equal(Nothing);
    });
  });

  describe('#obj("")', () => {
    it('should be Nothing', () => {
      Maybe.obj('').should.be.equal(Nothing);
    });
  });

  describe('#obj(Object(""))', () => {
    it('should be Nothing', () => {
      Maybe.obj(Object('')).should.be.equal(Nothing);
    });
  });

  describe('#obj(Object("hello"))', () => {
    it('should be Nothing', () => {
      Maybe.obj(Object('hello')).should.be.equal(Nothing);
    });
  });

  describe('#obj(Object(NaN))', () => {
    it('should be Nothing', () => {
      Maybe.obj(Object(NaN)).should.be.equal(Nothing);
    });
  });

  describe('#obj(Object(0))', () => {
    it('should be Nothing', () => {
      Maybe.obj(Object(0)).should.be.equal(Nothing);
    });
  });

  describe('#obj({})', () => {
    it('should be Just({})', () => {
      const obj = {};

      Maybe.obj(obj).get().should.be.equal(obj);
    });
  });

  describe('#obj(Just(0))', () => {
    it('should be Just(0)', () => {
      Maybe.obj(just0).get().should.be.equal(0);
    });
  });

  // Just
  describe('Just(undefined)', () => {
    it('should be Just(undefined)', () => {
      assert.equal(Just(undefined).get(), undefined);
    });
  });

  describe('Just(null)', () => {
    it('should be Just(null)', () => {
      assert.equal(Just(null).get(), null);
    });
  });

  describe('Just(true)', () => {
    it('should be Just(true)', () => {
      Just(true).get().should.be.true();
    });
  });

  describe('Just(false)', () => {
    it('should be Just(false)', () => {
      Just(false).get().should.be.false();
    });
  });

  describe('Just(0)', () => {
    it('should be Just(0)', () => {
      Just(0).get().should.be.equal(0);
    });
  });

  describe('Just(Symbol())', () => {
    it('should be Just(Symbol())', () => {
      const sym = Symbol('desc');

      Just(sym).get().should.be.equal(sym);
    });
  });

  describe('Just(_ => 0)', () => {
    it('should be Just(_ => 0)', () => {
      const fn = _ => 0;

      Just(fn).get().should.be.equal(fn);
    });
  });

  describe('Just("")', () => {
    it('should be Just("")', () => {
      Just('').get().should.be.equal('');
    });
  });

  describe('Just({})', () => {
    it('should be Just({})', () => {
      const obj = {};

      Just(obj).get().should.be.equal(obj);
    });
  });

  describe('Just(Just(0))', () => {
    it('should be Just(Just(0))', () => {
      Just(just0).get().should.be.equal(just0);
    });
  });

  // Maybe()
  it('shouldn\'t produce nested `Maybe`s', () => {
    Maybe(just0).should.be.equal(just0);
  });
});

/*
 * m >>= return == m
 */
const p1 = v_ => {
  const m = Just(v_);

  return Maybe.compare(
    m.map(Just), m
  );
};

/*
 * (return x) >>= f == f x
 */
const p2 = (x, f_) => {
  const f = x => Maybe(f_(x));

  return Maybe.compare(
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

  return Maybe.compare(
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
