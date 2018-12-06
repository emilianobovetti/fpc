const { pass, id } = require('../../src/index.mjs');
const should = require('should');
const sinon = require('sinon');

describe('pass', () => {
  it('should pass the first argument as result', () =>
    pass(1, id).should.be.equal(1)
  );

  it('should call its callback with right arguments', () => {
    const callback = sinon.spy();

    pass(1, callback, 2, 3);

    callback.should.be.calledWith(1, 2, 3);
  });
});
