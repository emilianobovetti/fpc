import slice from './slice';
import is from './is';

const forEach = (coll, ...args) => {
  (is.fun(coll.forEach) ? coll : slice(coll)).forEach(...args);

  return coll;
};

export default forEach;
