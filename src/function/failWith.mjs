import is from './is';

const failWith = e => {
  throw e && is.str(e.stack) && is.str(e.message) ? e : new Error(e);
};

export default failWith;
