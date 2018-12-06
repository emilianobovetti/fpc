const prop = (val, propName) => (
  val == null ? undefined : val[propName]
);

export default prop;
