import collectionCall from './internal/collectionCall';
import pass from './pass';

const forEach = (val, fn) =>
  pass(val, _ => collectionCall(_, 'forEach', fn));

export default forEach;
