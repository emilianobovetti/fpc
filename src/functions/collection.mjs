/**
 * Functions that operate on javascript collections like
 * strings, arrays and array-like objects.
 *
 * @example
 * import { slice } from 'fpc';
 *
 * const array = slice('123'); // [ '1', '2', '3' ]
 *
 * @module functions/collection
 * @author Emiliano Bovetti <emiliano.bovetti@gmail.com>
 */

import { is, expect, pass, call } from './basic';

/**
 * Creates a two-elements array.
 *
 * @param {*} fst - first element
 * @param {*} snd - second element
 * @return {Array} `[ fst, snd ]`
 */
export const pair = (fst, snd) => [ fst, snd ];

/**
 * @param {string|object} coll - array-like object
 * @return {*} the first item or `undefined`
 */
export const first = coll =>
  expect.array.like(coll)[0];

/**
 * @param {string|object} coll - array-like object
 * @return {*} the second item or `undefined`
 */
export const second = coll =>
  expect.array.like(coll)[1];

/**
 * @param {string|object} coll - array-like object
 * @return {*} the last item or `undefined`
 */
export const last = coll =>
  expect.array.like(coll)[coll.length - 1];

/**
 * Calls [Array.prototype.slice][1] on an array-like object.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
 *
 * @example
 * slice([ 1, 2, 3 ], 1, 3); // [ 2, 3 ]
 * slice('str'); // [ 's', 't', 'r' ]
 *
 * @param {string|object} coll - array-like object
 * @param {number} [$1=0] - starting index
 * @param {number} [$2=coll.length] - ending index
 * @return {Array} sliced array
 */
export const slice = (coll, ...args) =>
  [].slice.call(expect.array.like(coll), ...args);

/**
 * @example
 * unshift([ 1, 2, 3 ], 0); // [ 0, 1, 2, 3 ]
 * unshift('123', '0'); // [ '0', '1', '2', '3' ]
 *
 * @param {string|object} coll - array-like object
 * @param {*} head - element to unshift
 * @return {Array} new array with `head` as first element
 */
export const unshift = (coll, head) =>
  pass(slice(coll), call, 'unshift', head);

/**
 * @example
 * reverse([ 1, 2, 3 ]); // [ 3, 2, 1 ]
 * reverse('nice'); // [ 'e', 'c', 'i', 'n' ]
 *
 * @param {string|object} coll - array-like object
 * @return {Array} reversed array
 */
export const reverse = coll =>
  slice(coll).reverse();

/**
 * @example
 * reduce([ 1, 2, 3 ], (acc, val) => acc + ', ' + val, '0'); // '0, 1, 2, 3'
 *
 * @example
 * const shiftChar = char =>
 *   String.fromCharCode(char.charCodeAt(0) + 1);
 *
 * reduce('hello', (acc, c) => acc + shiftChar(c), ''); // 'ifmmp'
 *
 * @example
 * const isNumeric = val =>
 *   reduce(val, (acc, x) => acc && x >= 0 && x <= 9, true);
 *
 * isNumeric('0123456789'); // true
 * isNumeric('0123x45678'); // false
 *
 * isNumeric([ 0, 1, 2 ]); // true
 * isNumeric([ 0, '1', 2 ]); // true
 * isNumeric([ 0, 'x', 2 ]); // false
 *
 * @param {string|object} coll - array-like object
 * @param {function} $1 - reduce function
 * @param {*} [$2=coll[0]] - initial value
 * @return {*} reduced value
 */
export const reduce = (coll, ...args) =>
  (is.fun(coll.reduce) ? coll : slice(coll)).reduce(...args);

/**
 * @example
 * map([ 1, 2, 3 ], x => x * 2); // [ 2, 4, 6 ]
 *
 * @example
 * const shiftChar = char =>
 *   String.fromCharCode(char.charCodeAt(0) + 1);
 *
 * map('hello', shiftChar); // [ 'i', 'f', 'm', 'm', 'p' ]
 *
 * @param {string|object} coll - array-like object
 * @param {function} $1 - map function
 * @return {Array} mapped array
 */
export const map = (coll, ...args) =>
  (is.fun(coll.map) ? coll : slice(coll)).map(...args);

/**
 * @example
 * filter([ 1, 2, 3, 4, 5 ], x => x % 2 == 0); // [ 2, 4 ]
 * filter([ 1, 2, 3, 4 ], x => x > 2); // [ 3, 4 ]
 * filter('hello, world', x => x > 'l'); // [ 'o', 'w', 'o', 'r' ]
 *
 * @param {string|object} coll - array-like object
 * @param {function} $1 - filter function
 * @return {Array} filtered array
 */
export const filter = (coll, ...args) =>
  (is.fun(coll.filter) ? coll : slice(coll)).filter(...args);

/**
 * @example
 * forEach([ 1, 2, 3 ], console.log); // logs 1, 2, 3 and returns the array
 *
 * @param {string|object} coll - array-like object
 * @param {function} $1 - callback
 * @return {Array} input coll
 */
export const forEach = (coll, ...args) => {
  (is.fun(coll.forEach) ? coll : slice(coll)).forEach(...args);

  return coll;
};
