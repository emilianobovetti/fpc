import reduce from './reduce';
import first from './first';

const sum = (...args) =>
  reduce(args.length > 1 ? args : first(args), (a, b) => a + b);

export default sum;
