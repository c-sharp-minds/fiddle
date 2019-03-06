/**
 * Count unique items
 * @param {Array<any>} iterable
 * @return {number} Number of unique items
 */
export function countUnique(iterable) {
  return new Set(iterable).size;
}

/**
 * Distinct array items
 * According to [`Georg`](https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array) this is the most performant way of filtering,
 * because it uses a loop instead of function calls
 * @param {Array<any>} a
 * @return {number} Number of unique items
 */
export function filterUnique(a) {
  const seen = {};
  const out = [];
  const len = a.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    const item = a[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}
