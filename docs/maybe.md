# Maybe

```javascript
import { Maybe, Nothing, Just } from 'fpc';
```

A `Maybe` behaves like an array of at most one element: you can use [map][maybe-map], [filter][maybe-filter] and [forEach][maybe-forEach] like usual.

## How to create new Maybe

[`Maybe(value)`][Maybe-constructor] creates a new object wrapping `value`.

If `value` is [null][Glob-null] or [undefined][Glob-undefined] the result will be [`Nothing`][Nothing] instance, otherwise it'll be [`Just(value)`][Just].

`Maybe` objects aren't nested by constructor function.

```javascript
const m = Maybe('hello, world');

m === Maybe(m); // true
```
If the emptiness definition isn't trivial (i.e. [null][Glob-null] or [undefined][Glob-undefined]), you can use [`Nothing`][Nothing] and [`Just()`][Just].

```javascript
const filterPeople = ({ people, maxAge, atLeast }) => {
  const areBelowMaxAge = people
    .reduce((acc, p) => acc && p.age <= maxAge, true);

  if (people.length >= atLeast && areBelowMaxAge) {
    return Just(people);
  } else {
    return Nothing;
  }
};

const ppl = [ { age: 10 }, { age: 15 } ];

filterPeople({ people: ppl, maxAge: 16, atLeast: 2 }).isEmpty; // false;
filterPeople({ people: ppl, maxAge: 14, atLeast: 2 }).isEmpty; // true;
filterPeople({ people: ppl, maxAge: 16, atLeast: 3 }).isEmpty; // true;
```

Note that [`Just()`][Just], unlike [`Maybe()`][Maybe-constructor], doesn't make any check. A `Just` instance is *always* created.

```javascript
// `Maybe`s *can* contain null or undefined
const m1 = Just(null);

m1.isEmpty; // false
m1.get(); // null

const m2 = Maybe('something');

// `Maybe`s *can* be nested using `Just()`
m2 !== Just(m2);
m2 === Just(m2).get();
```

In a nutshell with [`Just()`][Just] you are explicitly asking for a `Just` instance.

If you want to be sure the wrapped value isn't [null][Glob-null] or [undefined][Glob-undefined], use [`Maybe()`][Maybe-constructor] instead of [`Just()`][Just].

## Using Maybes

```javascript
const user1 = { name: 'Bob' };
const user2 = { name: null };

const getUser = id => {
  let user;

  // TODO: fetch the user!
  if (id === 1) {
    user = user1;
  } else if (id === 2) {
    user = user2;
  } else {
    user = null;
  }

  return Maybe(user);
};

/*
 * Get user's name or 'unknown'
 * if user doesn't exist or user.name
 * doesn't exist, is null or undefined
 */
const getUserName = id =>
  getUser(id)
    .map(user => user.name)
    .getOrElse('unknown');

getUserName(0); // 'unknown'
getUserName(1); // 'Bob'
getUserName(2); // 'unknown'
```
You can wrap a lot of useful objects into `Maybe`s:

```javascript
Maybe.getElementById = id => Maybe(document.getElementById(id));

// remove an element if exist
Maybe.getElementById('some-id')
  .forEach(element => element.remove());

// get header's height or 0
Maybe.getElementById('header-id')
  .map(header => header.offsetHeight)
  .getOrElse(0);

// execute a function if an element exist
// or another function if it doesn't
Maybe.getElementById('some-other-id')
  .forEach(e => console.log('element found!'))
  .orElse(() => console.log('element not found'));

// the `toString` method returns an empty string
// on Nothing
Maybe.getElementById('some-node')
  .map(e => e.textContent)
  .toString();
```

Sometimes nesting functions might seem the only way to go. There are some tricks to keep the code simple, like use [filter][maybe-filter] method.
For example, let's write a function to update meta description only if the meta tag exists and the given description is a non-empty string:

```javascript
// plain javascript
let updateMetaDescription = desc => {
  const metaDescription = document.getElementById('meta-description');

  if (metaDescription !== null && typeof desc === 'string' && desc !== '') {
    metaDescription.setAttribute('content', desc);
  }
};

// now nesting `forEach`
let updateMetaDescription = desc =>
  Maybe(document.getElementById('meta-description'))
    .forEach(element =>
      Maybe.str(desc).forEach(() =>
        // okay, this look worse
        element.setAttribute('content', desc);
      )
    );

// using `filter`
let updateMetaDescription = desc =>
  Maybe(document.getElementById('meta-description'))
    .filter(() => Maybe.str(desc).nonEmpty)
    .forEach(el => el.setAttribute('content', desc));
```

## API

### Just

Function that always returns a `Just` instance.

### Nothing

`Nothing` instance.

```javascript
import { Nothing } from 'fpc';

Nothing.get(); // fancy way to throw an error
```

### Maybe constructor

Facade function: returns [`Nothing`][Nothing] if value is [null][Glob-null] or [undefined][Glob-undefined], returns [`Just(value)`][Just] otherwise.

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

## Type specific constructors

All type-specific constructors also unbox their value before making checks, so `0` and [`Object(0)`][Glob-Object] are treated identically.

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

Creates a `Maybe` object that contains a number that is not [NaN][Glob-NaN] or [Infinity][Glob-Infinity].

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

### isEmpty

`true` on [`Nothing`][Nothing], `false` otherwise.

```javascript
Maybe(null).isEmpty; // true
Maybe(undefined).isEmpty; // true
Maybe(0).isEmpty; // false
```

### nonEmpty

Negation of [isEmpty][isEmpty].


### get

Returns the `Maybe` value, throws an [Error][Glob-Error] if it's empty.

```javascript
Maybe(0).get(); // 0
Maybe(null).get(); // throws Error: Trying to get value of Nothing
```

### getOrThrow

Works like [get][get], allows to customize the [Error][Glob-Error] to throw.

```javascript
Maybe(null).getOrThrow(new Error('Oh no!'));
```

### filter

If the object is a [Just][Just] instance and `fn(value)` is [falsy][Glossary-falsy] returns [Nothing][Nothing]. Returns the `Maybe` itself otherwise.

### map

If the object is a [Just][Just] instance and `fn(value)` isn't [null][Glob-null], [undefined][Glob-undefined] or [Nothing][Nothing], returns `Maybe(fn(value))`. Returns [Nothing][Nothing] otherwise.

### forEach

Does nothing if the object is [Nothing][Nothing].
Applies the given function to wrapped value otherwise.
Always returns the `Maybe` itself.

### getOrElse

If the object is a [Just][Just] instance, returns its value.
If it's a [Nothing][Nothing] returns `orElse`.

`orElse` can be:

1. a function - which is called and its result returned if the maybe is empty.
2. any other value - which is returned in case the maybe is empty.

### orElse

Acts like [getOrElse][getOrElse], but returns a `Maybe` instance instead of wrapped value.

### toString

If the object is a [Just][Just] instance returns wrapped value casted to string.
Returns an empty string otherwise.

[Just]: #user-content-just
[Nothing]: #user-content-nothing
[Maybe-constructor]: #user-content-maybe-constructor
[maybe-map]: #user-content-map
[maybe-filter]: #user-content-filter
[maybe-forEach]: #user-content-foreach

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
