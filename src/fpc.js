/* global define */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.fpc = factory();
  }
}(this, function () {
  'use strict';

  function fpc (val) {
    return typeof val === 'function'
      ? fpc.compose.apply(null, arguments)
      : fpc.pipe.apply(null, arguments);
  }

  fpc.compose = function (fn) {
    fpc.expect.fun(fn);

    var args = fpc.slice(arguments, 1);

    function self () {
      return fn.apply(null, fpc.slice(arguments).concat(args));
    }

    self.with = self.and = function (fn) {
      fpc.expect.fun(fn);

      var args = fpc.slice(arguments, 1);

      return fpc.compose(function () {
        args.unshift(self.apply(null, arguments));

        return fn.apply(null, args);
      });
    };

    self.ply = function () {
      return self.apply(null, arguments);
    };

    return self;
  };

  fpc.pipe = function (arg) {
    var args = fpc.slice(arguments);
    var self = {};

    self.end = arg;

    self.into = self.then = function (fn) {
      args = args.concat(fpc.slice(arguments, 1));

      return fpc.pipe(fpc.expect.fun(fn).apply(null, args));
    };

    return self;
  };

  fpc.id = function (x) {
    return x;
  };

  fpc.failWith = function (e) {
    throw e instanceof Error ? e : new Error(e);
  };

  fpc.prop = function (val, prop) {
    return val == null ? undefined : val[prop];
  }

  fpc.slice = function (val, begin, end) {
    return [].slice.call(val, begin || 0, end || val.length);
  };

  fpc.reverse = function (val) {
    return [].reverse.call(val);
  };

  fpc.reduce = function (val, fn, init) {
    var len = fpc.is.num(fpc.prop(val, 'length'))
      ? val.length
      : fpc.failWith(new Error('Invalid value without "length" in fpc.reduce()'));

    if (len === 0) {
      if (arguments.length < 3) {
        throw new Error('Invalid call of fpc.reduce() with zero-length value');
      } else {
        return init;
      }
    }

    fpc.expect.fun(fn);
    fpc.expect.reduceable(val);

    var acc = arguments.length < 3
      ? val[0]
      : fn(init, val[0]);

    for (var index = 1; index < len; index++) {
      acc = fn(acc, val[index]);
    }

    return acc;
  };

  fpc.map = function (val, fn) {
    fpc.expect.fun(fn);

    return fpc.reduce(val, function (acc, val) {
      acc.push(fn(val));
      return acc;
    }, []);
  };

  fpc.pair = function (fst, snd) {
    return [ fst, snd ];
  };

  fpc.first = function (val) {
    return val[0];
  };

  fpc.second = function (val) {
    return val[1];
  };

  fpc.last = function (val) {
    return val[val.length - 1];
  };

  fpc.flip = function (fn) {
    fpc.expect.fun(fn);

    return function () {
      return fn.apply(null, fpc.reverse(arguments));
    };
  };

  fpc.sum = function (fst) {
    return fpc.reduce(fpc.is.reduceable(fst) && ! fpc.is.str(fst) ? fst : arguments,
      function (a, b) { return a + b; }
    );
  };

  fpc.cat = function () {
    return fpc.sum(fpc.map(arguments, String));
  };

  fpc.bound = function (val, min, max) {
    return Math.max(min, Math.min(max, val));
  };

  fpc.typeOf = function (val) {
    return val === null ? 'null' : typeof val;
  };

  function is (expected, val) {
    return arguments.length < 2
      ? function (v) { return is(expected, v); }
      : fpc.typeOf(val) === expected;
  }

  fpc.is = {
    num: is('number'),
    str: is('string'),
    sym: is('symbol'),
    obj: is('object'),
    fun: is('function'),
    bool: is('boolean'),
    reduceable: function (val) {
      return fpc.is.num(fpc.prop(val, 'length')) && typeof val[0] !== undefined;
    }
  };

  function expect (expected, val) {
    return arguments.length < 2
      ? function (v) { return expect(expected, v); }
      : is(expected, val)
        ? val
        : fpc.failWith(new Error('Expected ' + expected + ', got ' + fpc.typeOf(val)));
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

  fpc.log = typeof console !== 'object'
    ? fpc.id
    : function (arg) {
      var args = fpc.slice(arguments, 1);
      args.push(arg);
      console.log.apply(null, args);

      return arg;
    };

  return fpc;
}));
