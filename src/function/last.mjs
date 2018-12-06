import expect from './expect';

const last = coll =>
  expect.array.like(coll)[coll.length - 1];

export default last;
