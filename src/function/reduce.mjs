import slice from './slice';
import is from './is';

const reduce = (coll, ...args) =>
  (is.fun(coll.reduce) ? coll : slice(coll)).reduce(...args);

export default reduce;
