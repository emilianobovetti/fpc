import expect from './expect';

const second = coll =>
  expect.array.like(coll)[1];

export default second;
