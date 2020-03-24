// `zip` function takes in iterables as arguments and returns an iterable.
// This iterable generates a series of arrays containing elements from each iterable.
// If one or more input iterables ends before the others, their places in the output
// get filled with `undefined` values.
export function* zip(...iterables) {
  // TODO: implement `some` for iterables
  if ([...iterables].some(not(isIterable))) {
    throw new TypeError("Iterable arguments expected.");
  }

  // TODO: implement `map` for iterables
  const iterators = [...iterables].map((iterable) =>
    iterable[Symbol.iterator]()
  );

  while (true) {
    const resTuple = [];

    let allItersDone = true;
    for (const iter of iterators) {
      const { value, done } = iter.next();
      if (!done) {
        allItersDone = false;
      }
      resTuple.push(value);
    }
    if (allItersDone) {
      return;
    }

    yield resTuple;
  }
}

function not(fn) {
  return (...args) => !fn(...args);
}

function isIterable(iter) {
  return (
    typeof iter === "object" &&
    iter !== null &&
    typeof iter[Symbol.iterator] === "function"
  );
}
