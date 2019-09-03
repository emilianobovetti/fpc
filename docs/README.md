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

Throws an error but, unlike [throw][Statement-throw], it's an expression.

Converts its input if it isn't already an [Error][Glob-Error] instance.

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

Differences with [typeof][Operators-typeof] operator:

```javascript
import { typeOf } from 'fpc';

/*
 * `null` is not 'object'
 */
typeOf(null); // 'null'

/*
 * auto "unboxing"
 */
typeOf(Object('str')); // 'string'

/*
 * safe numbers
 */
typeOf(0/0); // 'NaN'
typeOf(1/0); // 'infinity'
typeOf(-1/0); // 'infinity'
```

### prop

Returns an object property value, or [undefined][Glob-undefined].
Doesn't throw errors.

```javascript
import { prop } from 'fpc';

prop({ propertyName: 'val' }, 'propertyName'); // 'val'
prop(null, 'propertyName'); // undefined
```

### hasOwnProperty

Works like [Object.prototype.hasOwnProperty()][Glob-Object-hasOwnProperty].
This function exists to cover some edge-cases:

```javascript
const obj = { prop: 'value', hasOwnProperty: '' };
obj.hasOwnProperty('value'); // throws: TypeError
```

```javascript
Object.create(null).hasOwnProperty('any'); // throws: TypeError
```

See also [no-prototype-builtins][eslint-no-prototype-builtins].

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

Calls [Array.prototype.slice][Glob-Array-slice] on an array-like object.

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

These functions check the type of a value and return a [boolean][Glob-Boolean].

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

These functions check if a value respect given type, then throw a [TypeError][Glob-TypeError] if it doesn't or return the value itself.

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

Works like [sum][sum], but first casts its arguments to [string][Glob-String].

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

Throws a [TypeError][Glob-TypeError] if `obj[propName]` isn't a function.

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
import { pipe, pass, call } from 'fpc';

// logs 'hello, world', returns 'hello'
pass('hello', console.log, ', world');

// returns [ 1, 2 ]
pipe([ 1 ])
  .into(pass, call, 'push', 2)
  .result;
```

### lazy

```javascript
import { lazy } from 'fpc';

const counter = (() => {
  let count = 0;

  return () => count++;
})();

const lazyCounter = lazy(counter);

lazyCounter(); // 0
lazyCounter(); // 0
lazyCounter.update(); // 1

import { id } from 'fpc';

const lazyOne = lazy(id, 1);
lazyOne(); // 1
```

### compose

Function composition, read more [here][composition-docs].

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

Pipe function, read more [here][piping-docs].

```javascript
import { pipe, map, sum } from 'fpc';

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

If global object [console][API-console] doesn't exist, acts like [identity][id] function without rising errors.

```javascript
import { log, pipe } from 'fpc';

//logs 'hello, world', returns 'hello, world'
pipe('hello, world')
  .into(log)
  .result;
```

### show

Acts like [log][log], but logs its first argument as last one.

```javascript
import { show } from 'fpc';

// logs 'hello, world', returns 'world'
pipe('world')
  .into(show, 'hello,')
  .result;
```

[id]: #user-content-id
[sum]: #user-content-sum
[log]: #user-content-log

[piping-docs]: piping.md
[composition-docs]: composition.md

[Statement-throw]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
[Statement-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

[Operators-typeof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof

[Glossary-falsy]: https://developer.mozilla.org/en-US/docs/Glossary/Falsy

[API-console]: https://developer.mozilla.org/en-US/docs/Web/API/console

[Glob-null]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null
[Glob-undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined
[Glob-String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Glob-Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[Glob-Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Glob-NaN]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN
[Glob-Infinity]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity
[Glob-Error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[Glob-TypeError]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
[Glob-Array-slice]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
[Glob-Object-hasOwnProperty]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty

[eslint-no-prototype-builtins]: https://eslint.org/docs/rules/no-prototype-builtins
