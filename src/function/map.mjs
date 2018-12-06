import slice from './slice';
import is from './is';

const map = (coll, ...args) =>
  (is.fun(coll.map) ? coll : slice(coll)).map(...args);

export default map;
