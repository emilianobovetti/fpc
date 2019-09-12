import slice from '../slice';
import prop from '../prop';
import is from '../is';

const collectionMethodApply = (val, method, args) =>
  (is.fun(prop(val, method)) ? val : slice(val))[method].apply(val, args);

export default collectionMethodApply;
