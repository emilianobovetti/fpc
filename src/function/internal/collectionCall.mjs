import slice from '../slice';
import prop from '../prop';
import is from '../is';

const collectionCall = (val, method, ...args) =>
  (is.fun(prop(val, method)) ? val : slice(val))[method].apply(val, args);

export default collectionCall;
