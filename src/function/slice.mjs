import expect from './expect';

const slice = (coll, ...args) =>
  [].slice.call(expect.array.like(coll), ...args);

export default slice;
