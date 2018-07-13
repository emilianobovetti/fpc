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

  var fpc = {};

  fpc.compose = function (fn) {
    fpc.expect.fun(fn);

    var args = fpc.slice(arguments, 1);

    function self () {
      return fn.apply(null, fpc.slice(arguments).concat(args));
    }

    self['with'] = self.and = function (fn) {
      fpc.expect.fun(fn);

      var args = fpc.slice(arguments, 1);

      return fpc.compose(function () {
        var args_ = fpc.unshift(args, self.apply(null, arguments));

        return fn.apply(null, args_);
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
      var args_ = args.concat(fpc.slice(arguments, 1));

      return fpc.pipe(fpc.expect.fun(fn).apply(null, args_));
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
    return val == null
      ? undefined
      : fpc.is.str(val) && fpc.is.num(prop)
      ? val.charAt(prop)
      : val[prop];
  };

  fpc.slice = function (val, begin, end) {
    if (val == null) return val;

    if (arguments.length < 3) end = val.length;
    if (arguments.length < 2) begin = 0;
    if (fpc.is.str(val)) val = val.split('');

    return [].slice.call(val, begin, end);
  };

  fpc.unshift = function (val, x) {
    return [ x ].concat(val);
  };

  fpc.reverse = function (val) {
    return fpc.is.str(val)
      ? fpc.slice(val).reverse().join('')
      : fpc.is.obj(val)
      ? fpc.slice(val).reverse()
      : val;
  };

  fpc.reduce = function (val, fn, init) {
    fpc.expect.reduceable(val);
    fpc.expect.fun(fn);

    if (val.length === 0) {
      if (arguments.length < 3) {
        throw new Error('Invalid call of fpc.reduce() with zero-length value');
      } else {
        return init;
      }
    }

    var acc = arguments.length < 3
      ? fpc.prop(val, 0)
      : fn(init, fpc.prop(val, 0));

    for (var len = val.length, index = 1; index < len; index++) {
      acc = fn(acc, fpc.prop(val, index));
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
    return fpc.sum.apply(null, fpc.map(arguments.length > 1 ? arguments : fst, String));
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
      return fpc.is.num(fpc.prop(val, 'length'));
    }
  };

  function expect (expected, val) {
    return arguments.length < 2
      ? function (v) { return expect(expected, v); }
      : is(expected, val)
        ? fpc.unbox(val)
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

  fpc.log = typeof console !== 'object' ? fpc.id : function (fst) {
    console.log.apply(null, arguments);

    return fst;
  };

  fpc.show = function (fst) {
    fpc.log.apply(null, fpc.pipe(arguments)
      .into(fpc.slice, 1)
      .then(fpc.pass, fpc.call, 'push', fst)
      .end
    );

    return fst;
  };

  return fpc;
}));
