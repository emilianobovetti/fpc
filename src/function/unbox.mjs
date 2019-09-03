/* global BigInt */
/* eslint no-underscore-dangle: "off" */
const BigInt_ = BigInt === undefined ? Number : BigInt;

const unbox = val => {
  const isBoxed =
    val instanceof String ||
    val instanceof Number ||
    val instanceof BigInt_ ||
    val instanceof Boolean ||
    val instanceof Symbol;

  return isBoxed ? val.valueOf() : val;
};

export default unbox;
