const { is } = require('../../src/index.mjs');
const should = require('should');

describe('is', () => {

  describe('#num', () => {
    it('should be true on numbers', () =>
      is.num(1).should.be.true()
    );

    it('should be false on NaN', () =>
      is.num(0/0).should.be.false()
    );

    it('should be false on Infinity', () =>
      is.num(1/0).should.be.false()
    );

    it('should be false on -Infinity', () =>
      is.num(-1/0).should.be.false()
    );
  });

  describe('#int', () => {
    it('should be true on integers', () =>
      is.int(1).should.be.true()
    );

    it('should be false on NaN', () =>
      is.int(0/0).should.be.false()
    );

    it('should be false on Infinity', () =>
      is.int(1/0).should.be.false()
    );

    it('should be false on -Infinity', () =>
      is.int(-1/0).should.be.false()
    );
  });

  describe('#str', () => {
    it('should be true on strings', () =>
      is.str('').should.be.true()
    );

    it('should be true on boxed strings', () =>
      is.str(Object('')).should.be.true()
    );
  });

  describe('#sym', () => {
    it('should be true on symbols', () =>
      is.sym(Symbol('desc')).should.be.true()
    );

    it('should be true on boxed symbols', () =>
      is.sym(Object(Symbol('desc'))).should.be.true()
    );
  });

  describe('#obj', () => {
    it('should be true on objects', () =>
      is.obj({}).should.be.true()
    );

    it('should be false on boxed primitive', () =>
      is.obj(Object('')).should.be.false()
    );
  });

  describe('#fun', () =>
    it('should be true on functions', () =>
      is.fun(() => null).should.be.true()
    )
  );

  describe('#bool', () =>
    it('should be true on booleans', () =>
      is.bool(false).should.be.true()
    )
  );

  describe('#iter', () => {
    it('should be true on strings', () =>
      is.iter('').should.be.true()
    );

    it('should be true on arrays', () =>
      is.iter([]).should.be.true()
    );
  });

  describe('#array', () => {
    it('should be false on strings', () =>
      is.array('').should.be.false()
    );

    it('should be true on arrays', () =>
      is.array([]).should.be.true()
    );
  });

  describe('#array.like', () => {
    it('should be false null', () =>
      is.array.like(null).should.be.false()
    );

    it('should be false undefined', () =>
      is.array.like(undefined).should.be.false()
    );

    it('should be true on strings', () =>
      is.array.like('').should.be.true()
    );

    it('should be true on arrays', () =>
      is.array.like([]).should.be.true()
    );

    it('should be true on a objects with `length: 0`', () =>
      is.array.like({ length: 0 }).should.be.true()
    );

    it('should be true on array-like objects', () =>
      is.array.like({ 0: 'a', length: 1 }).should.be.true()
    );

    it('should be false on objects with non integer lengths', () =>
      is.array.like({ length: 0.2 }).should.be.false()
    );

    it('should be false if hasOwnProperty(val, "length") is false', () =>
      is.array.like(Object.create({ length: 0 })).should.be.false()
    );

    it('should be false if `obj.length > 0 && !hasOwnProperty(obj, 0)`', () =>
      is.array.like({ length: 1 }).should.be.false()
    );
  });

});
