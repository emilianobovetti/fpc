const hop = {}.hasOwnProperty;

const hasOwnProperty = (val, propName) => (
  val == null ? false : hop.call(val, propName)
);

export default hasOwnProperty;
