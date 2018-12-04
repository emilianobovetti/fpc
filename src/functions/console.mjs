/**
 * Console functions.
 *
 * @example
 * import { log } from 'fpc';
 *
 * const string = log('hello, world');
 *
 * @module functions/console
 * @author Emiliano Bovetti <emiliano.bovetti@gmail.com>
 */

import { is, id } from './basic';
import { first } from './collection';

/* global console */

/**
 * Logs its arguments to console, then returns the first one.
 * If global object `console` doesn't exist,
 * returns its first argument without rising errors.
 *
 * @example
 * //logs and returns 'hello, world'
 * pipe('hello, world')
 *   .into(fpc.log)
 *   .result;
 *
 * @param {...*} args - values to log
 * @return {*} the first argument
 */
export const log =
  is.obj(console)
    ? (...args) => {
      console.log(...args);

      return first(args);
    }
    /* istanbul ignore next */
    : id;

/**
 * Acts like `log`, but logs its first argument as last one.
 *
 * @example
 * // logs 'hello, world' and returns 'world'
 * pipe('world')
 *   .into(fpc.show, 'hello,')
 *   .result;
 *
 * @param {*} fstArg - argument to log in last position
 * @param {...*} args - other arguments to log
 * @return {*} `fstArg`
 */
export const show = (fstArg, ...args) => {
  args.push(fstArg);
  log(...args);

  return fstArg;
};
