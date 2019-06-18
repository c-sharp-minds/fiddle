import fs from 'fs';

/**
   *
   * @param {Array<any>} a First list to find matches in
   * @param {Array<any>} b Second list to find matches in
   * @return {number} Number of matches between the two lists
   */
export function countCommonItems(a, b) {
  let count = 0;
  for (let i = 0; i < a.length; ++i) {
    const aItem = a[i];
    if (b.includes(aItem)) {
      count++;
    }
  }
  return count;
}

/**
   *
   * @param {Array<any>} a List to get distinct count from
   * @param {Array<any>} b Second list to find matches in
   * @return {number} Number of matches between the two lists
   */
export function countDistinctItems(a, b) {
  let count = 0;
  for (let i = 0; i < a.length; ++i) {
    const aItem = a[i];
    if (!b.includes(aItem)) {
      count++;
    }
  }
  return count;
}

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

/**
 * Write content to a specified file location
 * @export
 * @param {string} content The content to write in the file
 * @param {string} location The location and name of the file
 */
export function writeFile(content, location) {
  if (!location) return;
  /* The fs.createWriteStream() returns an (WritableStream {aka} internal.Writeable) and we want the encoding as 'utf'-8 */
  /* The WriteableStream has the method write() */
  // fs.createWriteStream(location, 'utf-8').write(content);
  fs.writeFileSync(location, content);
}

/**
 * Check a specified directory for files and return their location/names
 * @param {string} directory The directory location to check for files
 * @return {Array<string>} Array of file locations/names
 */
export function readDirectory(directory) {
  if (!directory) return;

  const files = fs.readdirSync(directory);
  return files;
}

/**
 * Check a specified file and return its contents
 * @param {string} file The file location/name to read
 * @return {string} File contents
 */
export function readFile(file) {
  if (!file) return;

  const content = fs.readFileSync(file);
  return content;
}
