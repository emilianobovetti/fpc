const flip = fn =>
  (...args) => fn(...args.reverse());

export default flip;
