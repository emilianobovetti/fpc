```javascript
import { Maybe, Nothing, Just } from 'fpc';
```

## How to create new Maybe

`Maybe(someValue)` creates a new object wrapping `someValue`.

If `someValue` is `null` or `undefined` the result will be `Nothing` instance, otherwise it'll be `Just(someValue)`.

`Maybe` objects aren't nested by constructor function.

```javascript
const m = Maybe('hello, world');

m === Maybe(m); // true
```
If the emptiness definition isn't trivial (i.e. `null` or `undefined`), you can use `Nothing` and `Just()`.

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

Note that `Just()`, unlike `Maybe()`, doesn't make any check. A `Just` instance is *always* created.

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

In a nutshell with `Just()` you are explicitly asking for a `Just` instance.

If you want to be sure the wrapped value isn't `null` or `undefined`, use `Maybe()` instead of `Just()`.

## Check if a value is a Maybe

```javascript
Maybe.isInstance(null); // false
Maybe.isInstance(Maybe(null)); // true
```

## Type specific constructors

All type-specific constructors also unbox their value before making checks, so `0` and `Object(0)` are treated identically.

### `Maybe.str(value)`
Checks if `value` is a non-empty string.

```javascript
Maybe.str(1) === Nothing;
Maybe.str('') === Nothing;

Maybe.string(Object('hello')).get() === 'hello';
```

### `Maybe.num(value)`
Checks if `value` is finite, valid number.

```javascript
Maybe.num('1') === Nothing;
Maybe.num(0/0) === Nothing;
Maybe.num(NaN) === Nothing;

Maybe.num(Object(1)).get() === 1;
```

### `Maybe.obj(value)`
Checks if `value` is a non-null object.

```javascript
Maybe.object('') === Nothing;
Maybe.object(null) === Nothing;

Maybe.object(Object('hello')) === Nothing;
Maybe.object(Object(1)) === Nothing;
```

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

Sometimes nesting functions might seem the only way to go. There are some tricks to keep the code simple, like use `filter` method.
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
