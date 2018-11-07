const fpc = require('../../../src/index.mjs');
const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const _ = require('lodash');
require('should-sinon');

const values = [
  undefined,
  null,
  NaN,
  [],
  {},
  0,
  1
];

const forAll = (vals, fn) =>
  vals.reduce((acc, x) => acc && fn(x), true);

const revCat = fpc.flip(fpc.cat);

const cat2 = fpc.curry2(fpc.cat);

describe('fpc', () => {

  describe('#id', () =>
    it('should be the identity function', () =>
      forAll(values, v => _.isEqual(fpc.id(v), v))
    )
  );

  describe('#not', () =>
    it('should negate a function', () =>
      forAll(values, v => _.isEqual(fpc.not(x => !x)(v), !!v))
    )
  );

  describe('#flip', () =>
    it('should reverse the arguments order', () =>
      revCat(1, 2, 3) === fpc.cat(3, 2, 1)
    )
  );

  describe('#failWith', () =>
    it('should throw an error', () =>
      fpc.failWith.should.throw()
    )
  );

  describe('#curry2', () =>
    it('should currify a two-arguments function', () =>
      cat2(1)(2).should.be.equal(cat2(1, 2))
    )
  );

  describe('#unbox', () =>
    it('should unbox primitive objects', () =>
      fpc.pipe('')
        .into(Object)
        .and(fpc.unbox)
        .and(v => typeof v)
        .result
        .should.be.equal('string')
    )
  );

  describe('#typeOf', () =>
    it('should unbox objects before return their type', () =>
      fpc.pipe('')
        .into(Object)
        .and(fpc.typeOf)
        .result
        .should.be.equal('string')
    )
  );

  describe('#typeOf', () =>
    it('of null should be "null"', () =>
      fpc.typeOf(null).should.be.equal('null')
    )
  );

  describe('#prop', () =>
    it('should return undefined on non-objects', () =>
      assert.equal(fpc.prop(null, 'p'), undefined)
    )
  );

  describe('#prop', () =>
    it('should return the property value', () =>
      fpc.prop({ p: 1 }, 'p').should.be.equal(1)
    )
  );

  describe('#is.num', () =>
    it('should be true on numbers', () =>
      fpc.is.num(1).should.be.true()
    )
  );

  describe('#is.str', () =>
    it('should be true on strings', () =>
      fpc.is.str('').should.be.true()
    )
  );

  describe('#is.sym', () =>
    it('should be true on symbols', () =>
      fpc.is.sym(Symbol('desc')).should.be.true()
    )
  );

  describe('#is.obj', () =>
    it('should be true on objects', () =>
      fpc.is.obj({}).should.be.true()
    )
  );

  describe('#is.fun', () =>
    it('should be true on functions', () =>
      fpc.is.fun(() => null).should.be.true()
    )
  );

  describe('#is.bool', () =>
    it('should be true on booleans', () =>
      fpc.is.bool(false).should.be.true()
    )
  );

  describe('#is.iter', () =>
    it('should be true on strings', () =>
      fpc.is.iter('').should.be.true()
    )
  );

  describe('#is.iter', () =>
    it('should be true on arrays', () =>
      fpc.is.iter([]).should.be.true()
    )
  );

  describe('#is.array', () =>
    it('should be false on strings', () =>
      fpc.is.array('').should.be.false()
    )
  );

  describe('#is.array', () =>
    it('should be true on arrays', () =>
      fpc.is.array([]).should.be.true()
    )
  );

  describe('#bound', () =>
    it('should clamp a value', () =>
      fpc.bound(1, 4, 6).should.be.equal(4)
        && fpc.bound(5, 4, 6).should.be.equal(5)
        && fpc.bound(7, 4, 6).should.be.equal(6)
    )
  );

  describe('#call', () =>
    it('should call an object method', () =>
      fpc.call({ m: x => x }, 'm', 1).should.be.equal(1)
    )
  );

  describe('#pass', () =>
    it('should pass the first argument as result', () =>
      fpc.pass(1, fpc.id).should.be.equal(1)
    )
  );

  describe('#pass', () =>
    it('should call its callback with right arguments', () => {
      const callback = sinon.spy();

      fpc.pass(1, callback, 2, 3);

      callback.should.be.calledWith(1, 2, 3);
    })
  );
});
