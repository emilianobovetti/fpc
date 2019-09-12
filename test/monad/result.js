/* eslint-env node, mocha */

const { Result, Err, Ok, failWith, id } = require('../../src/index.mjs');
const sinon = require('sinon');

const error = new Error('Message');

const ok0 = Ok(0);
const err = Err(error);

describe('Result', () => {

  it('should be an object constructor', () =>
    (new Result() instanceof Result).should.be.true()
  );

  describe('#of', () => {
    it('should return on Ok instance be default', () =>
      Result.of(() => 0).get().should.be.equal(0)
    );

    it('should be `throw` safe', () =>
      Result.of(() => failWith(error)).getError().should.be.equal(error)
    );

    it('should not wrap Ok instances', () =>
      Result.of(() => ok0).get().should.be.equal(0)
    );

    it('should not wrap Err instances', () =>
      Result.of(() => Err(error)).getError().should.be.equal(error)
    );
  });

});

describe('Ok', () => {

  describe('#isOk', () =>
    it('should be true', () =>
      ok0.isOk.should.be.true()
    )
  );

  describe('#isError', () =>
    it('should be false', () =>
      ok0.isError.should.be.false()
    )
  );

  describe('#get', () =>
    it('should return the wrapped value', () =>
      ok0.get().should.be.equal(0)
    )
  );

  describe('#getError', () =>
    it('should throw an error', () =>
      ok0.getError.should.throw()
    )
  );

  describe('#map', () => {
    it('should implement collection interface', () =>
      ok0.map(x => x + 1).get().should.be.equal(1)
    );

    it('should not wrap Ok instances', () =>
      ok0.map(x => Ok(x + 1)).get().should.be.equal(1)
    );

    it('should not wrap Err instances', () =>
      ok0.map(_ => Err(error)).getError().should.be.equal(error)
    );
  });

  describe('#mapError', () =>
    it('should return the result itself', () =>
      ok0.mapError(_ => failWith(new Error('Should not be called')))
        .should.be.equal(ok0)
    )
  );

  describe('#forEach', () =>
    it('should implement collection interface', () => {
      const callback = sinon.spy();

      ok0.forEach(callback);

      callback.should.be.calledWith(0);
    })
  );

  describe('#forEachError', () =>
    it('should not call its function', () => {
      const callback = sinon.spy();

      ok0.forEachError(callback);

      callback.should.not.be.called();
    })
  );

  describe('#merge', () => {
    it('should work like get()', () =>
      ok0.merge().should.be.equal(0)
    );

    it('should work like map()', () =>
      ok0.merge(id, x => x + 1).should.be.equal(1)
    );
  });
});

describe('Err', () => {

  describe('#isOk', () =>
    it('should be true', () =>
      err.isOk.should.be.false()
    )
  );

  describe('#isError', () =>
    it('should be false', () =>
      err.isError.should.be.true()
    )
  );

  describe('#get', () =>
    it('should throw an error', () =>
      err.get.should.throw()
    )
  );

  describe('#getError', () =>
    it('should return the wrapped value', () =>
      err.getError().should.be.equal(error)
    )
  );

  describe('#map', () =>
    it('should return the result itself', () =>
      err.map(x => x + 1).should.be.equal(err)
    )
  );

  describe('#mapError', () =>
    it('should work like map() on the error', () =>
      err.mapError(e => e.message).getError().should.be.equal(error.message)
    )
  );

  describe('#forEach', () =>
    it('should not call its function', () => {
      const callback = sinon.spy();

      err.forEach(callback);

      callback.should.not.be.called();
    })
  );

  describe('#forEachError', () =>
    it('should work like forEach() on the error', () => {
      const callback = sinon.spy();

      err.forEachError(callback);

      callback.should.be.calledWith(error);
    })
  );

  describe('#merge', () => {
    it('should work like getError()', () =>
      err.merge().should.be.equal(error)
    );

    it('should work like mapError()', () =>
      err.merge(e => e.message, id).should.be.equal(error.message)
    );
  });

});
