import slice from './slice';
import is from './is';

const filter = (coll, ...args) =>
  (is.fun(coll.filter) ? coll : slice(coll)).filter(...args);

export default filter;
