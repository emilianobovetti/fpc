# Result

```javascript
import { Result, Err, Ok } from 'fpc';
```

Result is an object that represents either a success status [Ok][Ok] or failure [Err][Err].

```javascript
import { pipe, expect } from 'fpc';

const parseNum = str => {
  try {
    return Ok(expect.num(JSON.parse(str)));
  } catch (e) {
    return Err(e);
  }
};

parseNum('hello').mapError(e => e.message).getError(); // 'Unexpected token h in JSON at position 0'

parseNum('"actually a string"').mapError(e => e.message).getError(); // 'Expected number, got string'

// or more compactly using `Result.of`
const parseInt = str =>
  Result.of(() => expect.int(JSON.parse(str)));

parseInt('hello').mapError(e => e.message).getError(); // 'Unexpected token h in JSON at position 0'

parseInt('"actually a string"').mapError(e => e.message).getError(); // 'Expected integer, got string'

parseInt('6').get(); // 6
```

## API

### Ok

```javascript
const res = Ok(1);

res.isOk; // true
res.isError; // false
```

### Err

```javascript
const res = Err('Something went wrong');

res.isOk; // false
res.isError; // true
```

### Result.of

Runs a function in a exception-safe environment and returns a `Result` wrapping returned value.

```javascript
let res;

res = Result.of(() => 'my value');
res.isOk; // true

// pass arguments to function
import { sum } from 'fpc';

Result.of(sum, 1, 2, 3); // Ok(6)

// explicitly return a result
Result.of(() => Ok('my value')); // Ok('my value')
Result.of(() => Err('my error')); // Err('my error')

// catch function's exception
import { failWith } from 'fpc';

Result.of(() => failWith(new Error('Oops'))); // Err(Error: Oops [...])
```

### isOk

`true` if `Result` contains a value.

### isError

`true` if `Result` contains an error.

### get

Returns `Result` value, throws an [Error][Glob-Error] if it contains an error.

```javascript
Ok(1).get(); // 1
```

### getError

Returns `Result` error, throws an [Error][Glob-Error] if it contains a value.

```javascript
Err('Oh no!').getError(); // 'Oh no!'
```

### map

Maps `Result` value, does nothing if it contains an error.

```javascript
Ok(1).map(x => x + 1); // Ok(2)
Err('Oops').map(x => x + 1); // Err('Oops')

// explicitly return a result
Ok(1).map(x => x > 9 ? Err('Too big!') : Ok(x)); // Ok(1)
Ok(10).map(x => x > 9 ? Err('Too big!') : Ok(x)); // Err('Too big!')
```

### mapError

```javascript
import { failWith } from 'fpc';

Result.of(() => failWith(new Error('Doh!'))).mapError(e => e.message); // Err('Doh!')
```

### forEach

Runs a function on a `Result` value.

```javascript
Ok(1).forEach(console.log); // logs 1, returns Ok(1)
```

### forEachError

```javascript
Err('No good').forEachError(console.log); // logs 'No good', returns Err('No good')
```

### merge

Returns the `Result` value *or* its error, optionally accepts two `map` functions.

```javascript
Ok(1).merge(); // 1
Err('I am a message').merge(); // 'I am a message'

Ok(1).merge(_ => 0, x => x + 1); // 2
Err('Oops').merge(_ => 0, x => x + 1); // 0
```

[Ok]: #user-content-ok
[Err]: #user-content-err

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
