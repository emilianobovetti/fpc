import unbox from './unbox';

const typeOf = val => {
  const unboxed = unbox(val);

  if (unboxed === null) {
    return 'null';
  }

  if (typeof unboxed === 'number') {
    if (isNaN(unboxed)) {
      return 'NaN';
    }

    if (!isFinite(unboxed)) {
      return 'infinity';
    }
  }

  return typeof unboxed;
};

export default typeOf;
