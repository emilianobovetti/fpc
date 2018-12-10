```javascript
import { compose } from 'fpc';
```

Function composition works like [piping][piping-docs]:

```javascript
import { bound, sum } from 'fpc';

const user = { name: 'Bob', score: 25 };

// Without compose()
const scoreUpdater = score =>
  bound(score * 2 + 7, 0, 100);

// With compose()
const scoreUpdater =
  compose(x => x * 2)
    .with(sum, 7)
    .and(bound, 0, 100);

const newScore = scoreUpdater(user.score); // 57
```

In general function composition comes in handy when you see something like:

```javascript
const doAthenBthenC = someValue =>
  doC(doB(doA(someValue)));

// we can rewrite this function with `compose()`
const doAthenBthenC =
  compose(doA)
    .with(doB)
    .and(doC);
```

What if we need to supply more arguments to composed functions?

```javascript
import { filter, map } from 'fpc';

const getNameOfAdults =
  compose(filter, user => user.age >= 18)
    .with(map, user => user.name);

const users = [
  { name: 'Walter', age: 23 },
  { name: 'Amanda', age: 24 },
  { name: 'Sara', age: 17 },
];

getNameOfAdults(users); // [ 'Walter', 'Amanda' ]
```

[filter][filter] and [map][map] will receive `users` as first argument and the callback as second.
Of course in this case we are composing [filter][filter] and [map][map], and we could use array's native methods, but [compose()][compose] would work with any function:

```javascript
import { is } from 'fpc';

const normalizeString = s =>
  s[0].toUpperCase() + s.slice(1).toLowerCase();

const normalizeNum = n =>
  (is.num(n) ? n : is.str(n) ? parseInt(n) : null);

const update = (obj, propName, fn) =>
  Object.assign(obj, { [propName]: fn(obj[propName]) });

const parseUser =
  compose(JSON.parse)
    .with(update, 'name', normalizeString)
    .and(update, 'age', normalizeNum);

parseUser('{ "name": "WILL", "age": "31" }');
// { name: 'Will', age: 31 }
```

[map]: README.md#user-content-map
[filter]: README.md#user-content-filter
[compose]: README.md#user-content-compose

[piping-docs]: piping.md

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

