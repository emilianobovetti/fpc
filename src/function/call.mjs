import expect from './expect';
import prop from './prop';

const call = (obj, propName, ...args) =>
  expect.fun(prop(obj, propName)).apply(obj, args);

export default call;
