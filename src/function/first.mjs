import expect from './expect';

const first = coll =>
  expect.array.like(coll)[0];

export default first;
