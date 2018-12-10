const { is } = require('../../src/index.mjs');
const should = require('should');

describe('is', () => {

  describe('#num', () =>
    it('should be true on numbers', () =>
      is.num(1).should.be.true()
    )
  );

  describe('#int', () =>
    it('should be true on integers', () =>
      is.int(1).should.be.true()
    )
  );

  describe('#str', () =>
    it('should be true on strings', () =>
      is.str('').should.be.true()
    )
  );

  describe('#sym', () =>
    it('should be true on symbols', () =>
      is.sym(Symbol('desc')).should.be.true()
    )
  );

  describe('#obj', () =>
    it('should be true on objects', () =>
      is.obj({}).should.be.true()
    )
  );

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
    it('should be true on strings', () =>
      is.array.like('').should.be.true()
    );

    it('should be true on arrays', () =>
      is.array.like([]).should.be.true()
    );

    it('should be true on array-like objects', () =>
      is.array.like({ 0: 'a', length: 1 }).should.be.true()
    );
  });

});
