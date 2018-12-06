import first from './first';
import is from './is';
import id from './id';

/* global console */

const log =
  is.obj(console)
    ? (...args) => {
      console.log(...args);

      return first(args);
    }
    /* istanbul ignore next */
    : id;

export default log;
