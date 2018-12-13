import empty from './internal/empty';

const lazy = (fn, ...args) => {
  let result = empty;

  const cached = () => (
    result === empty ? cached.update() : result
  );

  cached.update = () =>
    /* eslint no-return-assign: "off" */
    result = fn(...args);

  return cached;
};

export default lazy;
