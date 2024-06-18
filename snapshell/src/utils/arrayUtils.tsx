/**
 * Splits an array into a specified number of parts.
 * @param array The array to split.
 * @param numOfParts The number of parts to split the array into.
 * @returns An array of arrays, each containing a part of the original array.
 */
export function splitArray<T>(array: Array<T>, numOfParts: number): Array<Array<T>> {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const idx = i % numOfParts;

    if (!result[idx]) result[idx] = [];

    result[idx].push(array[i]);
  }

  return result;
}
