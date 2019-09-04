/* global BigInt */
/* eslint no-underscore-dangle: "off" */
const BigInt_ = BigInt === undefined ? Number : BigInt;

const unbox = val => {
  const isBoxed =
    val instanceof Number ||
    val instanceof String ||
    val instanceof Symbol ||
    val instanceof Boolean ||
    val instanceof BigInt_;

  return isBoxed ? val.valueOf() : val;
};

export default unbox;
