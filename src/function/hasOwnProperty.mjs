const hop = {}.hasOwnProperty;

const hasOwnProperty = (val, propName) =>
  hop.call(val, propName);

export default hasOwnProperty;
