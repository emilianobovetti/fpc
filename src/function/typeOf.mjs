import unbox from './unbox';

const typeOf = val => (
  val === null ? 'null' : typeof unbox(val)
);

export default typeOf;
