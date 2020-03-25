# Zip function

`zip` yields aggregation of elements read from two or more iterables.

<img width="100%" src="https://assets.webiconspng.com/uploads/2017/09/Zipper-PNG-Image-28114-300x95.png">

The `zip` generator yields a series of Array containing elements from each iterable.

## Example

When you zip together two arrays containing 3 elements each, the result has 3 elements; each element is a two element array that contains one element from each of the input arrays.

```javascript
assert.deepEqual(
  zip(
    [1,   2,   3  ],
    ["a", "b", "c"]
  ),
  [[1, "a"],
   [2, "a"],
   [3, "c"]]
);
```

## Iterables with different length

If some of the input iterables terminate before the others, their place in the remaining yielded arrays will be replaced with `undefined`.

Zip function is used to aggregate the contents of two lists into a single list of pairs.

Consider that, we have two lists one contain the list of tasks and another contains list of person names. We want to create another list contains person and task pair. Let see how we can use zip function to do this.

## Empty iterable arguments

When you pass `iter` 0 arguments, the function return an iterator that yields nothing.

## Function inverse

You're not actually unzipping when you do `zip(*your_list)`. You're still zipping.

[`zip`](https://docs.python.org/2/library/functions.html#zip) is a function that can take as many arguments as you want. In your case, you essentially have four different sequences that you want to zip: `('a', 1)`, `('b', 2)`, `('c', 3)` and `('d', 4)`. Thus, you want to call `zip` like this:

    >>> zip(('a', 1), ('b', 2), ('c', 3), ('d', 4))
    [('a', 'b', 'c', 'd'), (1, 2, 3, 4)]

But your sequences aren't in separate variables, you just have a list which contains them all. This is where the [`*` operator](https://docs.python.org/2/tutorial/controlflow.html#unpacking-argument-lists) comes in. This operator _unpacks_ the list in a way that each element of your list becomes an argument to the function.

This means that when you do this:

    your_list = [('a', 1), ('b', 2), ('c', 3), ('d', 4)]
    zip(*your_list)

Python calls `zip` which each element of your list as an argument, like this:

    zip(('a', 1), ('b', 2), ('c', 3), ('d', 4))

This is why an `unzip` function isn't necessary: Unzipping is just another kind of zip, and is easily achievable with just the `zip` function and the `*` operator.

## Partial application of option object argument

## Async input iterables

## Input iterable that yields promises

## Convolution wiki page

https://en.wikipedia.org/wiki/Convolution_(computer_science)
