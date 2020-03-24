import test from "testami";
import { zip } from "./zip.mjs";

test("zip is defined", (t) => {
  t.is(typeof zip, "function");
});

test("zip returns an iterable", (t) => {
  const res = zip([1, 2], ["a", "b"]);
  t.is(typeof res, "object");
  t.is(typeof res[Symbol.iterator], "function");
});

test("zip mixes elements from input arrays", (t) => {
  const res = zip([1, 2], ["a", "b"], [true, false]);
  t.deepEqual(
    [...res],
    [
      [1, "a", true],
      [2, "b", false],
    ]
  );
});

test("zip throw if any arguments is not an iterable", (t) => {
  t.throws(() => zip(42).next(), "Iterable arguments expected.");
});

test("zip returns an empty iterator when given no input arguments", (t) => {
  t.deepEqual(zip().next(), { done: true, value: undefined });
});

test("zip accepts generator functions", (t) => {
  t.deepEqual(
    [...zip(odd(), even())],
    [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]
  );
});

function* odd() {
  yield 1;
  yield 3;
  yield 5;
  yield 7;
}

function* even() {
  yield 2;
  yield 4;
  yield 6;
  yield 8;
}
