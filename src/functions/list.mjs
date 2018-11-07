/**
 * List functions.
 *
 * @example
 * import { first } from 'fpc';
 *
 * const fst = first([ 1, 2, 3 ]); // 1
 *
 * @module functions/list
 * @author Emiliano Bovetti <emiliano.bovetti@gmail.com>
 */

import { is } from './basic';

/**
 * Creates a list of two elements.
 *
 * @param {*} fst - first element
 * @param {*} snd - second element
 * @return {Array} `[ fst, snd ]`
 */
export const pair = (fst, snd) => [ fst, snd ];

/**
 * @param {iterable} $0 - any collection
 * @param {*} $0.0 - the first item
 * @return {*} the first item or `undefined`
 */
export const first = ([ fst ]) => fst;

/**
 * @param {iterable} $0 - any collection
 * @param {*} $0.0 - the first item
 * @param {*} $0.1 - the second item
 * @return {*} the second item or `undefined`
 */
export const second = ([ _, snd ]) => snd;

/**
 * @param {iterable} $0 - any collection
 * @return {*} the last item or `undefined`
 */
export const last = ([ ...list ]) => list[list.length - 1];

/**
 * @example
 * slice([ 1, 2, 3 ], 1, 3); // [ 2, 3 ]
 * slice('str'); // [ 's', 't', 'r' ]
 *
 * @param {iterable} $0 - any collection
 * @param {number} [$1=0] - starting index
 * @param {number} [$2=list.length] - ending index
 * @return {Array} sliced array
 */
export const slice = ([ ...list ], ...args) => [].slice.call(list, ...args);

/**
 * @example
 * unshift([ 1, 2, 3 ], 0); // [ 0, 1, 2, 3 ]
 * unshift('123', '0'); // [ '0', '1', '2', '3' ]
 *
 * @param {iterable} $0 - any collection
 * @param {*} head - element to unshift
 * @return {Array} new list with `head` as first element
 */
export const unshift = ([ ...list ], head) => [ head ].concat(list);

/**
 * @example
 * reverse([ 1, 2, 3 ]); // [ 3, 2, 1 ]
 * reverse('nice'); // [ 'e', 'c', 'i', 'n' ]
 *
 * @param {iterable} $0 - any collection
 * @return {Array} reversed list
 */
export const reverse = ([ ...list ]) => slice(list).reverse();

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
 * @param {iterable} $0 - any collection
 * @param {function} $1 - reduce function
 * @param {*} [$2=list[0]] - initial value
 * @return {*} reduced value
 */
export const reduce = ([ ...list ], ...args) =>
  (is.fun(list.reduce) ? list : slice(list)).reduce(...args);

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
 * @param {iterable} $0 - any collection
 * @param {function} $1 - map function
 * @return {Array} mapped array
 */
export const map = ([ ...list ], ...args) =>
  (is.fun(list.map) ? list : slice(list)).map(...args);

/**
 * @example
 * filter([ 1, 2, 3, 4, 5 ], x => x % 2 == 0); // [ 2, 4 ]
 * filter([ 1, 2, 3, 4 ], x => x > 2); // [ 3, 4 ]
 * filter('hello, world', x => x > 'l'); // [ 'o', 'w', 'o', 'r' ]
 *
 * @param {iterable} $0 - any collection
 * @param {function} $1 - filter function
 * @return {Array} filtered array
 */
export const filter = ([ ...list ], ...args) =>
  (is.fun(list.filter) ? list : slice(list)).filter(...args);

/**
 * @example
 * forEach([ 1, 2, 3 ], console.log); // logs 1, 2, 3 and returns the array
 *
 * @param {iterable} $0 - any collection
 * @param {function} $1 - callback
 * @return {Array} input list
 */
export const forEach = ([ ...list ], ...args) => {
  (is.fun(list.forEach) ? list : slice(list)).forEach(...args);

  return list;
};
