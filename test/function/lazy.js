const { lazy } = require('../../src/index.mjs');
const { compare } = require('../utils');
const should = require('should');
const sinon = require('sinon');

describe('lazy', () => {
  it('should not invoke immediately its function', () => {
    const callback = sinon.spy();
    const cached = lazy(callback);

    callback.should.not.be.called();
  });

  it('should invoke its function  when called', () => {
    const callback = sinon.spy();
    const cached = lazy(callback);
    const result = cached();

    callback.should.be.called();
  });

  it('should pass its arguments to callback', () => {
    const callback = sinon.spy();
    const cached = lazy(callback, 1, 2, 3);
    const result = cached();

    callback.should.be.calledWith(1, 2, 3);
  });

  it('should always return the first result of its function', () => {
    const cached = lazy(Math.random);

    compare(cached(), cached(), cached(), cached());
  });

  it('should invoke its function when `update` method is called', () => {
    let count = 0;
    const counter = () => count++;
    const cached = lazy(counter);

    cached().should.be.equal(0);
    cached().should.be.equal(0);
    cached.update().should.be.equal(1);
    cached().should.be.equal(1);
    cached.update().should.be.equal(2);
    cached().should.be.equal(2);
  });
});
