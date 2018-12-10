```javascript
import { pipe } from 'fpc';
```

JavaScript developers with functional programming background would appreciate the [pipeline operator][tc39-proposal-pipeline-operator]<sup>[citation needed]</sup>.

Note: some examples are translated from [tc39/proposal-pipeline-operator][tc39-proposal-pipeline-operator].

```javascript
const doubleSay = str => str + ', ' + str;

const capitalize = str => str[0].toUpperCase() + str.substring(1);

const exclaim = str => str + '!';

let output;

// Without pipe()
output = exclaim(capitalize(doubleSay('hello'))); // 'Hello, hello!'

// With pipe()
output = pipe('hello')
  .into(doubleSay)
  .and(capitalize)
  .and(exclaim)
  .result; // 'Hello, hello!'

// Note that if you miss the trailing `.result`, then `output`
// won't contain the correct value!
```

### Multiple Arguments

The value in [pipe()][pipe] will be passed to functions as *first* argument. In many [ML dialects][ML-lang] traditionally the pipe operator will pass its value as *last* argument in functions, but in JavaScript the "context" argument is often the first one. If you came from [Elixir][elixir-lang] it's nothing new.

```javascript
const double = x => x * 2;
const add = (x, y) => x + y;

const boundScore = (score, min, max) =>
  Math.max(min, Math.min(max, score));

const player = { score: 25 };

// Without pipe()
let newScore = boundScore(add(double(player.score), 7), 0, 100); // 57

// With pipe()
newScore = pipe(player.score)
  .into(double)
  .and(add, 7)
  .and(boundScore, 0, 100)
  .result; // 57
```

Of course you can use `fpc`'s built-in functions:

```javascript
import { sum, bound } from 'fpc';

newScore = pipe(person.score)
  .into(x => x * 2)
  .and(sum, 7)
  .and(bound, 0, 100)
  .result; // 57
```

### Logging

[show()][show] will help to keep track of the value inside a pipe:

```javascript
import { show, cat } from 'fpc';

const user = { name: 'Bob', score: 25 };

// Note that `fpc.show()` will log the first argument as last
pipe('hello, ')
  .into(cat, user.name, '!')
  .and(show, 'Before adding score:') // Before adding score: hello, Bob!
  .and(cat, ' Your score is: ', user.score)
  .and(show, 'Before capitalize:') // Before capitalize: hello, Bob! Your score is: 25
  .and(capitalize)
  .and(show, 'Final value:') // Final value: Hello, Bob! Your score is: 25
  .result;
```

[pipe]: README.md#user-content-pipe
[show]: README.md#user-content-show

[ML-lang]: https://en.wikipedia.org/wiki/ML_%28programming_language%29
[elixir-lang]: https://elixir-lang.org
[tc39-proposal-pipeline-operator]: https://github.com/tc39/proposal-pipeline-operator

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
