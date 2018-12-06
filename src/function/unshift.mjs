import slice from './slice';
import pass from './pass';
import call from './call';

const unshift = (coll, head) =>
  pass(slice(coll), call, 'unshift', head);

export default unshift;
