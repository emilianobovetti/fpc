const fpc = require('../../../src/index.mjs');
const should = require('should');
const _ = require('lodash');

describe('fpc', () => {

  describe('#pair', () =>
    it('should create a two-elements array', () =>
      _.isEqual(fpc.pair(1, 2), [ 1, 2 ])
    )
  );

  describe('#first', () =>
    it('should get the first item of an array', () =>
      fpc.first([ 1 ]).should.be.equal(1)
    )
  );

  describe('#first', () =>
    it('should return undefined on an empty array', () =>
      _.isEqual(fpc.first([]), undefined)
    )
  );

  describe('#second', () =>
    it('should get the second item of an array', () =>
      fpc.second([ 1, 2 ]).should.be.equal(2)
    )
  );

  describe('#second', () =>
    it('should return undefined on an empty array', () =>
      _.isEqual(fpc.second([]), undefined)
    )
  );

  describe('#second', () =>
    it('should return undefined on a one-item array', () =>
      _.isEqual(fpc.second([ 1 ]), undefined)
    )
  );

  describe('#last', () =>
    it('should get the last item of an array', () =>
      fpc.last([ 1, 2, 3, 4 ]).should.be.equal(4)
    )
  );

  describe('#last', () =>
    it('should return undefined on an empty array', () =>
      _.isEqual(fpc.last([]), undefined)
    )
  );

  describe('#unshift', () =>
    it('should put an item on the head of an array', () =>
      _.isEqual(fpc.unshift([ 1, 2, 3 ], 0), [ 0, 1, 2, 3 ])
    )
  );

  describe('#reduce', () =>
    it('should work on arrays', () =>
      fpc.reduce([ 1, 2, 3 ], (acc, x) => acc + x, 0).should.be.equal(6)
    )
  );

  describe('#reduce', () =>
    it('should work on strings', () =>
      fpc.reduce('123', (acc, x) => acc + parseInt(x), 0).should.be.equal(6)
    )
  );

  describe('#map', () =>
    it('should work on arrays', () =>
      _.isEqual(fpc.map([ 1, 2, 3 ], x => x + 1), [ 2, 3, 4 ])
    )
  );

  describe('#map', () =>
    it('should work on strings', () =>
      _.isEqual(fpc.map('123', x => parseInt(x)), [ 1, 2, 3 ])
    )
  );

});
