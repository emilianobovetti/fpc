/* global define */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {

    /* AMD. Register as an anonymous module. */
    define([], factory);
  } else if (typeof exports === 'object') {

    /*
     * Node. Does not work with strict CommonJS, but
     * only CommonJS-like environments that support module.exports,
     * like Node.
     */
    module.exports = factory();
  } else {

    /* Browser globals (root is window) */
    root.fpc = factory();
  }
}(this, function () {
  'use strict';

  var fpc = {};

  fpc.compose = function (fn1) {
    var args = fpc.slice(arguments, 1);

    fpc.expect.fun(fn1);

    function self () {
      return fn1.apply(null, fpc.slice(arguments).concat(args));
    }

    self['with'] = function (fn2) {
      var innerArgs = fpc.slice(arguments, 1);

      fpc.expect.fun(fn2);

      return fpc.compose(function () {
        var argsCopy = fpc.unshift(innerArgs, self.apply(null, arguments));

        return fn2.apply(null, argsCopy);
      });
    };

    self.and = self['with'];

    self.ply = function () {
      return self.apply(null, arguments);
    };

    return self;
  };

  fpc.pipe = function (arg) {
    var args = fpc.slice(arguments);
    var self = {};

    self.end = arg;

    self.into = function (fn) {
      var argsCopy = args.concat(fpc.slice(arguments, 1));

      return fpc.pipe(fpc.expect.fun(fn).apply(null, argsCopy));
    };

    self.then = self.into;

    return self;
  };

  fpc.id = function (x) {
    return x;
  };

  fpc.failWith = function (e) {
    throw e instanceof Error ? e : new Error(e);
  };

  fpc.prop = function (val, prop) {
    if (val == null) {
      return undefined;
    }

    if (fpc.is.str(val) && fpc.is.num(prop)) {
      return val.charAt(prop);
    }

    return val[prop];
  };

  fpc.slice = function (val, b, e) {
    var toSlice, begin, end;

    if (val == null) {
      return val;
    }

    end = arguments.length < 3 ? val.length : e;
    begin = arguments.length < 2 ? 0 : b;
    toSlice = fpc.is.str(val) ? val.split('') : val;

    return [].slice.call(toSlice, begin, end);
  };

  fpc.unshift = function (val, x) {
    return [ x ].concat(val);
  };

  fpc.reverse = function (val) {
    if (fpc.is.str(val)) {
      return fpc.slice(val)
        .reverse()
        .join('');
    }

    if (fpc.is.obj(val)) {
      return fpc.slice(val)
        .reverse();
    }

    return val;
  };

  fpc.reduce = function (val, fn, init) {
    var acc, len, index;

    fpc.expect.reduceable(val);
    fpc.expect.fun(fn);

    if (val.length === 0) {
      if (arguments.length < 3) {
        throw new Error('Invalid call of fpc.reduce() with zero-length value');
      } else {
        return init;
      }
    }

    acc = arguments.length < 3
      ? fpc.prop(val, 0)
      : fn(init, fpc.prop(val, 0));

    for (len = val.length, index = 1; index < len; index++) {
      acc = fn(acc, fpc.prop(val, index));
    }

    return acc;
  };

  fpc.map = function (val, fn) {
    fpc.expect.fun(fn);

    return fpc.reduce(val, function (acc, x) {
      acc.push(fn(x));

      return acc;
    }, []);
  };

  fpc.filter = function (val, fn) {
    fpc.expect.fun(fn);

    return fpc.reduce(val, function (acc, x) {
      if (fn(x)) {
        acc.push(x);
      }

      return acc;
    }, []);
  };

  fpc.forEach = function (val, fn) {
    fpc.expect.fun(fn);

    fpc.reduce(val, function (_, x) {
      fn(x);
    }, null);

    return val;
  };

  fpc.pair = function (fst, snd) {
    return [ fst, snd ];
  };

  fpc.first = function (val) {
    return fpc.prop(val, 0);
  };

  fpc.second = function (val) {
    return fpc.prop(val, 1);
  };

  fpc.last = function (val) {
    return fpc.is.num((val || {}).length)
      ? fpc.prop(val, val.length - 1)
      : undefined;
  };

  fpc.flip = function (fn) {
    fpc.expect.fun(fn);

    return function () {
      return fn.apply(null, fpc.reverse(arguments));
    };
  };

  fpc.sum = function (fst) {
    return fpc.reduce(arguments.length > 1 ? arguments : fst, function (a, b) {
      return a + b;
    });
  };

  fpc.cat = function (fst) {
    var arg = arguments.length > 1 ? arguments : fst;

    return fpc.sum.apply(null, fpc.map(arg, String));
  };

  fpc.bound = function (val, min, max) {
    return Math.max(min, Math.min(max, val));
  };

  fpc.unbox = function (val) {
    var unb = (val || {}).valueOf();

    return typeof unb !== 'object' && typeof unb !== 'function' ? unb : val;
  };

  fpc.typeOf = function (val) {
    return val === null ? 'null' : typeof fpc.unbox(val);
  };

  function is (exp, val) {
    if (arguments.length < 2) {
      return function (v) {
        return is(exp, v);
      };
    }

    return fpc.typeOf(val) === exp;
  }

  fpc.is = {
    num: is('number'),
    str: is('string'),
    sym: is('symbol'),
    obj: is('object'),
    fun: is('function'),
    bool: is('boolean'),
    reduceable: function (val) {
      return fpc.is.num(fpc.prop(val, 'length'));
    }
  };

  function expect (exp, val) {
    if (arguments.length < 2) {
      return function (v) {
        return expect(exp, v);
      };
    }

    if (!is(exp, val)) {
      fpc.failWith(new Error('Expected ' + exp + ', got ' + fpc.typeOf(val)));
    }

    return fpc.unbox(val);
  }

  fpc.expect = {
    num: expect('number'),
    str: expect('string'),
    sym: expect('symbol'),
    obj: expect('object'),
    fun: expect('function'),
    bool: expect('boolean'),
    reduceable: function (val) {
      return fpc.is.reduceable(val)
        ? val
        : fpc.failWith(new Error('Expected a reduceable value'));
    }
  };

  fpc.call = function (obj, prop) {
    var method = fpc.expect.fun(fpc.prop(obj, prop));

    return method.apply(obj, fpc.slice(arguments, 2));
  };

  fpc.pass = function (arg) {
    var args = fpc.slice(arguments, 2);
    args.unshift(arg);

    fpc.pipe(arguments)
      .into(fpc.second)
      .then(fpc.expect.fun)
      .end
      .apply(null, args);

    return arg;
  };

  if (typeof console === 'object') {
    fpc.log = function (fst) {
      console.log.apply(null, arguments);

      return fst;
    };
  } else {
    fpc.log = fpc.id;
  }

  fpc.show = function (fst) {
    var args = fpc.pipe(arguments)
      .into(fpc.slice, 1)
      .then(fpc.pass, fpc.call, 'push', fst)
      .end;

    fpc.log.apply(null, args);

    return fst;
  };

  return fpc;
}));
