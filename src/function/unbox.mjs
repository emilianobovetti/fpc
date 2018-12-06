const unbox = val => {
  const unb = (val || {}).valueOf();

  return typeof unb !== 'object' && typeof unb !== 'function' ? unb : val;
};

export default unbox;
