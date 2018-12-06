# Functions

### id

Identity function.

```javascript
import { id } from 'fpc';

id(5); // 5
```

### not

```javascript
import { not } from 'fpc';

const isOdd = x => x % 2 !== 0;
[1, 2, 3, 4].filter(not(isOdd)); // [ 2, 4 ]
```

### flip

Creates a copy of a function that takes its arguments in reversed order.

```javascript
import { flip, cat } from 'fpc';

const revCat = flip(cat);

revCat(1, 2, 3) === cat(3, 2, 1);
```

### failWith

Throws an error but, unlike `throw`, it's an expression.

Converts its input if it isn't already an [Error][Error] instance.

```javascript
import { failWith } from 'fpc';

args.length > 0 || failWith(new Error('No args'));
```

### unbox

Returns the unboxed value, works as identity function on values that aren't boxed.

```javascript
import { unbox } from 'fpc';

typeof unbox(Object('str')); // 'string'
```

### typeOf

Two differences with `typeof` operator:

1. `typeOf(null) === 'null'`
2. `typeOf(Object('str')) === 'string'`

```javascript
import { typeOf } from 'fpc';

typeOf(Object('str')); // 'string'
```

### prop

Returns an object property value, or `undefined`.
Doesn't throw errors.

```javascript
import { prop } from 'fpc';

prop({ propertyName: 'val' }, 'propertyName'); // 'val'
prop(null, 'propertyName'); // undefined
```

### pair

Creates a two-elements array.

```javascript
import { pair } from 'fpc';

pair(4, 8); // [ 4, 8 ]
```

### first

```javascript
import { first } from 'fpc';

first('abc'); // 'a'
first([ 1, 2, 3 ]); // 1
first({ 0: 'fst', 1: 'snd', 2: 'trd' length: 3 }); // 'fst'
```

### second

```javascript
import { second } from 'fpc';

second('abc'); // 'b'
second([ 1, 2, 3 ]); // 2
second({ 0: 'fst', 1: 'snd', 2: 'trd', length: 3 }); // 'snd'
```

### last

```javascript
import { last } from 'fpc';

last('abc'); // 'c'
last([ 1, 2, 3 ]); // 3
last({ 0: 'fst', 1: 'snd', 2: 'trd', length: 3 }); // 'trd'
```

### slice

Calls [Array.prototype.slice][slice] on an array-like object.

```javascript
import { slice } from 'fpc';

slice([ 1, 2, 3 ], 1, 3); // [ 2, 3 ]
slice('str'); // [ 's', 't', 'r' ]
slice({ 0: 'fst', 1: 'snd', 2: 'trd', length: 3 }); // [ 'fst', 'snd', 'trd' ]
```

### unshift

```javascript
import { unshift } from 'fpc';

unshift([ 1, 2, 3 ], 0); // [ 0, 1, 2, 3 ]
unshift('123', '0'); // [ '0', '1', '2', '3' ]
unshift({ 0: 1, length: 1 }, 0); // [ 0, 1 ]
```

### reverse

```javascript
import { reverse } from 'fpc';

reverse([ 1, 2, 3 ]); // [ 3, 2, 1 ]
reverse('nice'); // [ 'e', 'c', 'i', 'n' ]
reverse({ 0: 'a', 1: 'b', length: 2 }); // [ 'b', 'a' ]
```

### reduce

```javascript
import { reduce } from 'fpc';

reduce([ 1, 2, 3 ], (acc, val) => acc + ', ' + val, '0'); // '0, 1, 2, 3'

const shiftChar = char =>
  String.fromCharCode(char.charCodeAt(0) + 1);

reduce('hello', (acc, c) => acc + shiftChar(c), ''); // 'ifmmp'

const isNumeric = val =>
  reduce(val, (acc, x) => acc && x >= 0 && x <= 9, true);

isNumeric('0123456789'); // true
isNumeric('0123x45678'); // false

isNumeric([ 0, 1, 2 ]); // true
isNumeric([ 0, '1', 2 ]); // true
isNumeric([ 0, 'x', 2 ]); // false
```

### map

```javascript
import { map } from 'fpc';

map([ 1, 2, 3 ], x => x * 2); // [ 2, 4, 6 ]

const shiftChar = char =>
  String.fromCharCode(char.charCodeAt(0) + 1);

map('hello', shiftChar); // [ 'i', 'f', 'm', 'm', 'p' ]

import { Maybe } from 'fpc';

map(Maybe(0), x => x + 1); // Just(1)
map(Maybe.str('0'), parseInt); // Just(0)
```

### filter

```javascript
import { filter } from 'fpc';

filter([ 1, 2, 3, 4, 5 ], x => x % 2 == 0); // [ 2, 4 ]
filter([ 1, 2, 3, 4 ], x => x > 2); // [ 3, 4 ]
filter('hello, world', x => x > 'l'); // [ 'o', 'w', 'o', 'r' ]

import { Maybe } from 'fpc';

filter(Maybe(-1), x => x > 0); // Nothing
filter(Maybe([ 1, 2, 3 ]), lst => lst.length > 2); // Just([ 1, 2, 3 ])
```

### forEach

```javascript
import { forEach } from 'fpc';

// logs 0, 1, 2, returns [ 1, 2, 3 ]
forEach([ 1, 2, 3 ], (val, index) => console.log(index));

import { Maybe } from 'fpc';

// logs 'hey', returns Just('hey')
forEach(Maybe('hey'), console.log);
```

### is

These functions check the type of a value and return a [boolean][Boolean].

```javascript
import { is } from 'fpc';

is.num(0.1);
is.int(0);
is.str('hi');
is.sym(Symbol('x'));
is.obj({});
is.fun(x => x);
is.bool(false);

/*
 * Checks if a value is iterable.
 * Uses `Symbol.iterator` so it's compatible with es6.
 */
is.iter([]);

/*
 * Checks if a value is an array.
 * Uses `Array.isArray` so it's compatible with es5.1.
 */
is.array([]);

/*
 * Checks if a value is an array-like object.
 */
is.array.like({ length: 1, 0: 'a' });
is.array.like('strings are array-like');
```

### expect

These functions check if a value respect given type, then throw a [TypeError][TypeError] if it doesn't or return the value itself.

```javascript
import { expect } from 'fpc';

expect.num(0.1); // 0.1
expect.int(0);   // 0
expect.str('hey');
expect.sym(Symbol('x'));
expect.obj({});
expect.fun(x => x);
expect.bool(true);
expect.iter([]);
expect.array([]);
expect.array.like('');
```

### curry

Creates currified a copy of a function.

```javascript
import { curry } from 'fpc';

const sum = curry((x, y) => x + y);
sum(1, 2); // 3

const add2 = sum(2);
add2(3); // 5
```

### curry2

Creates currified a copy of a two-arguments function.

When we have a variadic function `fn` unfortunately we cannot use `curry(fn)` because `fn.length` is 0.

So we need to specify how many arguments `fn` expects:
`curry(fn, 2)` or simply `curry2(fn)`.

```javascript
import { curry2 } from 'fpc';

const sum = curry2((...xs) => xs.reduce((a, b) => a + b, 0));

sum(1, 2); // 3

const add2 = sum(2);
add2(3); // 5
```

### sum

Sums its arguments.

If called with only one argument, then it must be array-like.

```javascript
import { sum } from 'fpc';

sum(1, 2, 3) === 1 + 2 + 3
sum('1', 2, 3) === '1' + 2 + 3
sum([ 1, 2, 3 ]) === 1 + 2 + 3
```

### cat

Works like [sum](#user-content-sum), but first casts its arguments to `string`.

```javascript
import { cat } from 'fpc';

cat(1, 2, 3) === '1' + '2' + '3'
cat([ 1, 2, 3 ]) === '1' + '2' + '3'
```

### bound

Clamps a number within a given range.

```javascript
import { bound } from 'fpc';

bound(1, 4, 6); // 4
bound(5, 4, 6); // 5
bound(7, 4, 6); // 6
```

### call

Calls an object's method.

Throws a [TypeError][TypeError] if `obj[propName]` isn't a function.

```javascript
import { call } from 'fpc';

const obj = {
  someMethod: arg => console.log('hello, ' + arg)
};

call(obj, 'someMethod', 'world'); // logs 'hello, world'

// same as '1,2,3'.split(',')
call('1,2,3', 'split', ','); // [ '1', '2', '3' ]
```

### pass

```javascript
import { pass, pipe } from 'fpc';

// logs 'hello, world', returns 'hello'
pass('hello', console.log, ', world');

// returns [ 1, 2 ]
pipe([ 1 ])
  .into(pass, call, 'push', 2)
  .result;
```

### compose

Function composition, read more [here](composition.md).

```javascript
import { compose, log } from 'fpc';

const increment = x => x + 1;
const double = x => x * x;

const fn =
  compose(increment)
    .with(double)
    .and(log);

// logs 9, returns 9
fn(2);
```

### pipe

Pipe function, read more [here](piping.md).

```javascript
import { pipe, sum } from 'fpc';

const items = [
  { price: 0.12 },
  { price: 1.52 },
  { price: 2.48 },
];

// returns 1.3733333333333333
const mean =
  pipe(items)
    .into(map, i => i.price)
    .and(sum)
    .and(tot => tot / items.length)
    .result;
```

### log

Logs its arguments to console, then returns the first one.

If global object `console` doesn't exist, acts like [id](#user-content-id) without rising errors.

```javascript
import { log, pipe } from 'fpc';

//logs 'hello, world', returns 'hello, world'
pipe('hello, world')
  .into(log)
  .result;
```

### show

Acts like [log](#user-content-log), but logs its first argument as last one.

```javascript
import { show } from 'fpc';

// logs 'hello, world', returns 'world'
pipe('world')
  .into(show, 'hello,')
  .result;
```

# Monads

## Maybe

Maybe monad ported from [stateless-maybe-js](https://github.com/emilianobovetti/stateless-maybe-js).

[Read more](maybe.md).

### Just

Function that always returns a `Just` instance.

```javascript
import { Just, Maybe } from 'fpc';

// Maybe objects *can* contain null or undefined
const m1 = Just(null);

m1.isEmpty; // false
m1.get(); // null

const m2 = Maybe('hello, world');

// Maybe objects *can* be nested with `Just()`
m2 !== Just(m2);
m2 === Just(m2).get();
```

### Nothing

`Nothing` instance.

```javascript
import { Nothing } from 'fpc';

Nothing.get(); // fancy way to throw an error
```

### Maybe

Façade function: returns `Nothing` if value is `null` or `undefined`, returns `Just(value)` otherwise.

Alias: `Maybe.of`

```javascript
import { Maybe } from 'fpc';

const m1 = Maybe('hello, world');
const m2 = Maybe(undefined);
const m3 = Maybe(null);

m1.isEmpty; // false
m2.isEmpty; // true
m3.isEmpty; // true

const m = Maybe('hello, world');

// when Maybe() receives a maybe monad
// it simply returns the maybe itself
m === Maybe(m); // true
```

### Maybe.isInstance

Allows to determine if an object is a `Maybe` instance.

```javascript
Maybe.isInstance(null); // false
Maybe.isInstance(Maybe(null)); // true
```

### Maybe.str

Creates a `Maybe` object that contains a non-empty string.

```javascript
Maybe.str('string'); // Just('string')
Maybe.str(Object('string')); // Just('string')

Maybe.str(''); // Nothing
Maybe.str(Object('')); // Nothing
Maybe.str(anythingElse); // Nothing
```

### Maybe.num

Creates a `Maybe` object that contains a number that is not [NaN][NaN] or [Infinity][Infinity].

```javascript
Maybe.num(0); // Just(0)
Maybe.num(Object(0)); // Just(0)

Maybe.num(NaN); // Nothing
Maybe.num(Object(NaN)); // Nothing
Maybe.num(anythingElse); // Nothing
```

### Maybe.obj

Creates a `Maybe` object that contains a non-primitive object.

```javascript
Maybe.obj({}); // Just({})
Maybe.obj([]); // Just([])

Maybe.obj(null); // Nothing
Maybe.obj(Object('')); // Nothing
Maybe.obj(Object('string')); // Nothing
Maybe.obj(Object(0)); // Nothing
Maybe.obj(Object(NaN)); // Nothing
```

## Methods

### isEmpty

`true` on `Nothing`, `false` otherwise.

```javascript
Maybe(null).isEmpty; // true
Maybe(undefined).isEmpty; // true
Maybe(0).isEmpty; // false
```

### nonEmpty

Negation of [isEmpty](#user-content-isEmpty).


### get

Returns the `Maybe` value, throws an [Error][Error] if it's empty.

```javascript
Maybe(0).get(); // 0
Maybe(null).get(); // throws Error: Trying to get value of Nothing
```

### getOrThrow

Works like [get](#user-content-get), allows to customize the [Error][Error] to throw.

```javascript
Maybe(null).getOrThrow(new Error('Oh no!'));
```

### filter

If the object is a `Just` instance and `fn(value)` is [falsy][Falsy] returns `Nothing`. Returns the `Maybe` itself otherwise.

### map

If the object is a `Just` instance and `fn(value)` isn't `null`, `undefined` or `Nothing`, returns `Maybe(fn(value))`. Returns `Nothing` otherwise.

### forEach

Does nothing if the object is `Nothing`.
Applies the given function to wrapped value otherwise.
Always returns the `Maybe` itself.

### getOrElse

If the object is a `Just` instance, returns its value.
If it's a `Nothing` returns `orElse`.

`orElse` can be:

1. a function - which is called and its result returned if the maybe is empty.
2. any other value - which is returned in case the maybe is empty.

### orElse

Acts like `getOrElse`, but returns a `Maybe` instance instead of wrapped value.

### toString

If the object is a `Just` instance returns wrapped value casted to string.
Returns an empty string otherwise.

[Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[Falsy]: https://developer.mozilla.org/en-US/docs/Glossary/Falsy
[NaN]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN
[Infinity]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity
[Error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[TypeError]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
[slice]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
