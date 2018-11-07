const fpc = require('../../../src/index.mjs');
const should = require('should');

describe('fpc', () => {

  describe('#log', () =>
    it('should act as identity function', () =>
      fpc.log(1, 2, 3).should.be.equal(1)
    )
  );

  describe('#show', () =>
    it('should act as identity function', () =>
      fpc.show(1, 2, 3).should.be.equal(1)
    )
  );
});
