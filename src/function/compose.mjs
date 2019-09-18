import expect from './expect';

const compose = (fn1, ...fn1Args) => {
  expect.fun(fn1);

  const self = (...args) => fn1(...args, ...fn1Args);

  self.with = (fn2, ...fn2Args) => {
    expect.fun(fn2);

    return compose((...args) => fn2(self(...args), ...fn2Args));
  };

  self.and = self.with;

  self.ply = (...args) => self(...args);

  return self;
};

export default compose;
