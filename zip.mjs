function getAndRunIterator(iterable) {
  return iterable[Symbol.iterator]();
}

function* _map(fn, iterable) {
  let i = 0;
  for (const item of iterable) {
    yield fn(item, i);
    i++;
  }
}

function map(fn, iterable) {
  if (iterable === undefined) {
    return (iterable) => map(fn, iterable);
  }

  return _map(fn, iterable);
}

function* filter(predicate, iterable) {
  if (iterable === undefined) {
    return (iterable) => filter(predicate, iterable);
  }

  let i = 0;
  for (const item of iterable) {
    if (predicate(item, i)) {
      yield item;
    }
    i++;
  }
}

function some(predicate, iterable) {
  if (iterable === undefined) {
    return (iterable) => some(predicate, iterable);
  }

  // eslint-disable-next-line no-unused-vars
  for (const item of filter(predicate, iterable)) {
    return true;
  }

  return false;
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

const iteratorDone = Symbol.for("iterator-done");
const pickNextValues = map((iter) => iter.next());
const getValues = map(({ done, value }) => (done ? iteratorDone : value));
const getAndRunIterators = map(getAndRunIterator);
const someIteratorContinue = some((v) => v !== iteratorDone);
const someIsNotIterable = some(not(isIterable));

// `zip` function takes in iterables as arguments and returns an iterable.
// This iterable generates a series of arrays containing elements from each iterable.
// If one or more input iterables ends before the others, their places in the output
// get filled with `undefined` values.
export function* zip(...iterables) {
  if (someIsNotIterable(iterables)) {
    throw new TypeError("Iterable arguments expected.");
  }

  const iterators = [...getAndRunIterators(iterables)];

  while (true) {
    const iterResults = [...getValues(pickNextValues(iterators))];
    if (!someIteratorContinue(iterResults)) {
      return;
    }

    yield iterResults;
  }
}
