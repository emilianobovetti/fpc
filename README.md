# Functional piping & composition

JavaScript developers with functional programming background would appreciate the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator)<sup>[citation needed]</sup>.

I made this implementation focused on portability that supports piping and function composition with fluent syntax. This allows to apply more than one argument to non-curried functions.

## Examples

Note: some examples are translated from [tc39/proposal-pipeline-operator](https://github.com/tc39/proposal-pipeline-operator).

### Piping

```javascript
function doubleSay (str) {
  return str + ', ' + str;
}

function capitalize (str) {
  return str[0].toUpperCase() + str.substring(1);
}

function exclaim (str) {
  return str + '!';
}

// Without fpc.pipe()
var result = exclaim(capitalize(doubleSay('hello'))); // 'Hello, hello!'

// With fpc.pipe()
var result = fpc.pipe('hello')
  .into(doubleSay)
  .then(capitalize)
  .then(exclaim)
  .end; // 'Hello, hello!'

// Note that if you miss the trailing `.end`, then `result`
// won't contain the correct result
```

### Multiple Arguments

Note that the value in `fpc.pipe()` will be passed to piped functions as *first* argument. In many ML dialects traditionally the pipe operator will pass its value as *last* argument in functions, but in JavaScript the "context" argument is often the first one.

```javascript
function double (x) { return x + x; }
function add (x, y) { return x + y; }

function boundScore (score, min, max) {
  return Math.max(min, Math.min(max, score));
}

var person = { score: 25 };

// Without fpc.pipe()
var newScore = boundScore(add(double(person.score), 7), 0, 100); // 57

// With fpc.pipe()
var newScore = fpc.pipe(person.score)
  .into(double)
  .then(add, 7)
  .then(boundScore, 0, 100)
  .end; // 57
```

`fpc` comes with a collection of pure functions:

```javascript
var newScore = fpc.pipe(person.score)
  .into(double)
  .then(fpc.sum, 7)
  .then(fpc.bound, 0, 100)
  .end; // 57
```

### Composition

Function composition works similarly:

```javascript
// Without fpc.compose()
function scoreUpdater (score) {
  return fpc.bound(score * 2 + 7, 0, 100);
}

// With fpc.compose()
var scoreUpdater =
  fpc.compose(double)
    .with(fpc.sum, 7)
    .and(fpc.bound, 0, 100);

var newScore = scoreUpdater(user.score); // 57
```

### Logging

`fpc.show()` will help to keep track of the value inside a pipe:

```javascript
var user = { name: 'Bob', score: 25 };

// Note that `fpc.show()` will log the first argument as last
fpc.pipe('hello, ')
  .into(fpc.cat, user.name, '!')
  .then(fpc.show, 'Before adding score:') // Before adding score: hello, Bob!
  .then(fpc.cat, ' Your score is: ', user.score)
  .then(fpc.show, 'Before capitalize:') // Before capitalize: hello, Bob! Your score is: 25
  .then(capitalize)
  .then(fpc.show, 'Final value:') // Final value: Hello, Bob! Your score is: 25
  .end;
```

## Built in Functions

- `fpc.id`

    Identity function.

- `fpc.failWith`

    Throws an error but as expression, unlike `throw`.

    ```javascript
    arguments.length > 0 || fpc.failWith(new Error('No args'));
    ```

- `fpc.prop`

    Get a property from an object, or undefined.

    ```javascript
    fpc.prop({ p: 'val' }, 'p') === 'val';
    fpc.prop(null, 'p') === undefined;
    ```

- `fpc.slice`

    Works like `Array.prototype.slice()`, but accepts array-like objects like `arguments` and also strings.

    ```javascript
    fpc.slice([ 1, 2, 3 ], 1, 3); // [ 2, 3 ]
    fpc.slice('str'); // [ 's', 't', 'r' ]
    ```

- `fpc.unshift`

  Like `Array.prototype.unshift()`, but doesn't modify the given array.

    ```javascript
    fpc.unshift([ 1, 2 ], 0); // [ 0, 1, 2 ]
    fpc.unshift(2, 1); // [ 1, 2 ]
    ```

- `fpc.reverse`

    Accepts a string, an array or an array-like object and returns a copy of that object reversed. Doesn't modify the given array.

    ```javascript
    fpc.reverse([ 1, 2, 3 ]); // [ 3, 2, 1 ]
    fpc.reverse('nice'); // 'ecin'
    ```

- `fpc.reduce`

    Portable implementation of `Array.prototype.reduce()`.

    ```javascript
    var str = fpc.pipe([ 1, 2, 3 ])
      .into(fpc.reduce, (acc, val) => acc + ', ' + val)
      .end;

    str === '1, 2, 3';
    ```

    Works on strings too:

    ```javascript
    function shiftChar (char) {
      return String.fromCharCode(char.charCodeAt(0) + 1);
    }

    fpc.reduce('hello', (acc, c) => acc + shiftChar(c), ''); // 'ifmmp'

    function isNumeric (str) {
      return fpc.reduce(str, (acc, x) => acc && x >= 0 && x <= 9, true);
    }

    isNumeric('0123456789'); // true
    isNumeric('0123x45678'); // false

    isNumeric([ 0, '1', 2 ]); // true
    isNumeric([ 0, 'x', 2 ]); // false
    isNumeric([ 0, 1, 2 ]); // true
    ```

- `fpc.map`

    Portable implementation of `Array.prototype.map()`.

    ```javascript
    fpc.pipe([ 1, 2, 3 ])
      .into(fpc.map, val => val * 2)
      .end; // [ 2, 4, 6 ]
    ```

    Works on strings like `fpc.reduce`:

    ```javascript
    fpc.map('hello', shiftChar); // [ 'i', 'f', 'm', 'm', 'p' ]
    fpc.map('hello', shiftChar).join(''); // 'ifmmp'
    ```

- `fpc.pair`

    Creates a two elements array.

- `fpc.first`

    Takes the first element of an array.

- `fpc.second`

    Takes the second element of an array.

- `fpc.last`

    Takes the last element of an array.

- `fpc.sum`

    Summation:

    ```javascript
    fpc.sum(1, 2, 3) === 6;
    fpc.sum([ 1, 2, 3 ]) === 6;
    ```

- `fpc.cat`

    Like `fpc.sum` but casts its arguments to string.

    ```javascript
    fpc.cat(1, 2, 3) === '123';
    fpc.cat([ 1, 2, 3 ]) === '123';
    ```

- `fpc.flip`

    Given a function `fn`, returns a version of that function that takes its arguments in reverse order.

    ```javascript
    var invCat = fpc.flip(fpc.cat);
    invCat(1, 2, 3) === fpc.cat(3, 2, 1);
    ```

- `fpc.bound`

    Clamps a number within a given range.

- `fpc.unbox`

  Returns the unboxed value on some objects, works as identity function on other values.

    ```javascript
    typeof fpc.unbox(Object('str')); // 'string'
    ```

- `fpc.typeOf`

    Like `typeof`, but `fpc.typeOf(null) === 'null'` and returns the correct type for boxed values `fpc.typeOf(Object('str')) === 'string'`.

- `fpc.is`

    ```javascript
    fpc.is.num(v)  // fpc.typeOf(v) === 'number'
    fpc.is.str(v)  // fpc.typeOf(v) === 'string'
    fpc.is.sym(v)  // fpc.typeOf(v) === 'symbol'
    fpc.is.obj(v)  // fpc.typeOf(v) === 'object'
    fpc.is.fun(v)  // fpc.typeOf(v) === 'function'
    fpc.is.bool(v) // fpc.typeOf(v) === 'boolean'
    fpc.is.reduceable(v) // true if v can be reduced by fpc.reduce
    ```

- `fpc.expect`

    Throws an error if respective `fpc.is` function returns false, otherwise returns given — unboxed — value.

    ```javascript
    fpc.expect.obj(val).something;
    typeof fpc.expect.str(Object('str')); // 'string'
    ```

- `fpc.call`

    ```javascript
    fpc.call('1,2,3', 'split', ','); // '1,2,3'.split(',')
    ```

- `fpc.pass`

    ```javascript
    fpc.pipe([ 1 ])
      .into(fpc.pass, fpc.call, 'push', 2)
      .end; // [ 1, 2 ]`
    ```

- `fpc.log`

  The following logs `hello, world` and returns `'hello, world'`:

    ```javascript
    fpc.pipe('hello, world')
      .into(fpc.log)
      .end;
    ```

- `fpc.show`

    Logs `hello, world` and returns `'world'`:

    ```javascript
    fpc.pipe('world')
      .into(fpc.show, 'hello,')
      .end;
    ```

## Installation

```
$ npm install fpc
```

For browser installation all you need is to include the script:

```HTML
<script type="text/javascript" src="path/to/fpc.js"></script>
```

or require in node:

```javascript
const fpc = require('fpc');
```
