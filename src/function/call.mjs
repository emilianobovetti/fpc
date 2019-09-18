import expect from './expect';
import prop from './prop';

const call = (obj, method, ...args) =>
  expect.fun(prop(obj, method)).apply(obj, args);

export default call;
