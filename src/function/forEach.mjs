import collectionMethodApply from './internal/collectionMethodApply';
import pass from './pass';

const forEach = (val, fn) =>
  pass(val, _ => collectionMethodApply(_, 'forEach', [ fn ]));

export default forEach;
