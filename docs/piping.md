```javascript
import { pipe } from 'fpc';
```

JavaScript developers with functional programming background would appreciate the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator)<sup>[citation needed]</sup>.

Note: some examples are translated from [tc39/proposal-pipeline-operator](https://github.com/tc39/proposal-pipeline-operator).

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

The value in `pipe()` will be passed to functions as *first* argument. In many [ML dialects](https://en.wikipedia.org/wiki/ML_%28programming_language%29) traditionally the pipe operator will pass its value as *last* argument in functions, but in JavaScript the "context" argument is often the first one. If you came from [Elixir](https://elixir-lang.org) it's nothing new.

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

`show()` will help to keep track of the value inside a pipe:

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
