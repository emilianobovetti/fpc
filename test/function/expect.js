const { expect } = require('../../src/index.mjs');
const should = require('should');

const string = 'abc';
const symbol = Symbol('desc');
const object = {};
const func = () => 0;
const array = [];
const arrayLike = { 0: 'a', length: 1 };

describe('expect', () => {

  describe('#num', () =>
    it('should act as identity function', () =>
      expect.num(1).should.be.equal(1)
    )
  );

  describe('#int', () => {
    it('should act as identity function', () =>
      expect.int(1).should.be.equal(1)
    );

    it('should not work on non-integer numbers', () =>
      (() => expect.int(0.1)).should.throw()
    );
  });

  describe('#str', () =>
    it('should act as identity function', () =>
      expect.str(string).should.be.equal(string)
    )
  );

  describe('#sym', () =>
    it('should act as identity function', () =>
      expect.sym(symbol).should.be.equal(symbol)
    )
  );

  describe('#obj', () =>
    it('should act as identity function', () =>
      expect.obj(object).should.be.equal(object)
    )
  );

  describe('#fun', () =>
    it('should act as identity function', () =>
      expect.fun(func).should.be.equal(func)
    )
  );

  describe('#bool', () =>
    it('should act as identity function', () =>
      expect.bool(false).should.be.equal(false)
    )
  );

  describe('#iter', () => {
    it('should act as identity function', () =>
      expect.iter(array).should.be.equal(array)
    );

    it('should work on strings', () =>
      expect.iter(string).should.be.equal(string)
    );
  });

  describe('#array', () =>
    it('should act as identity function', () =>
      expect.array(array).should.be.equal(array)
    )
  );

  describe('#array.like', () => {
    it('should act as identity function', () =>
      expect.array.like(array).should.be.equal(array)
    );

    it('should work on strings', () =>
      expect.array.like(string).should.be.equal(string)
    );

    it('should work on array-like objects', () =>
      expect.array.like(arrayLike).should.be.equal(arrayLike)
    );
  });

});
