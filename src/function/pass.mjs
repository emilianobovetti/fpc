import expect from './expect';

const pass = (val, fn, ...args) => {
  args.unshift(val);
  expect.fun(fn)(...args);

  return val;
};

export default pass;
