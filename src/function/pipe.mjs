import failWith from './failWith';
import expect from './expect';
import first from './first';

const pipe = (...args) => {
  const self = {};

  self.result = args.length > 0
    ? first(args)
    : failWith(new Error('pipe() cannot be called without an argument'));

  self.into = (fn, ...innerArgs) => {
    expect.fun(fn);

    return pipe(fn(...args.concat(innerArgs)));
  };

  self.and = self.into;

  return self;
};

export default pipe;
