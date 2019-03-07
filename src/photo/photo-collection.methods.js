// eslint-disable-next-line no-unused-vars
import {parseAllPhotoCollections, mergeAllVerticalPhotos, sortAllPhotos, PhotoCollection} from './photo.methods';
import {readDirectory, writeFile, readFile} from '../shared';
import {parseTags} from '../tag';

/**
 *  ### **Flow 1** - First check the cache folder for files that may contain already parsed collections
 *  * **Step 1**: Read from the cached directory
 *  * **Step 2**: Read from the input directory
 *  * **Step 3**: Get content from cached files
 *  * **Step 4**: Compare cached and input file count
 *  * **Step 5**: Get files from input directory that have not yet been cached
 *  * **Step 6**: Combine both contents and sort by their (old) filename
 *
 * ### **Flow 2** - Else read the input files
 *  * **Step 1**: Read and parse the input files
 *  * **Step 2**: Merge all vertical photos, that have the least possible matching tags
 * @param {string} inputLocation The directory where the actual input files are located. E.g. 'resources/pizza'
 * @param {string} cacheLocation The directory where the parsed outcome of the input files will be or are located. E.g. 'resources/cache'
 * @return {Array<PhotoCollection>}
 */
export function getPhotoCollections(inputLocation, cacheLocation) {
  let inputFiles = null;
  let cachedFiles = null;
  let cachedCollections = null;
  let inputCollections = null;
  let collections = null;


  /** *******
   * Flow 1 *
   **********/

  // Step 1
  cachedFiles = readDirectory(cacheLocation);

  // Step 2
  inputFiles = readDirectory(inputLocation);


  if (!!cachedFiles && !!cachedFiles.length) {
    // Step 3
    cachedCollections = cachedFiles.map((c) => {
      const f = readFile(`${cacheLocation}/${c}`);
      return JSON.parse(f.toString());
    });

    // Step 4
    const extensionRegex = /\.[^.]*$/;
    const cachedExtensionless = cachedFiles.map((c) => c.replace(extensionRegex, ''));
    const filesExtensionless = inputFiles.map((c) => c.replace(extensionRegex, ''));
    const inputExtension = !!inputFiles && !!inputFiles.length ? inputFiles[0].match(extensionRegex)[0] : '';

    const notCached = filesExtensionless.filter((f) => !cachedExtensionless.includes(f));

    if (!!notCached && !!notCached.length) {
      console.warn(`${notCached.length} input file(s) to be parsed`);
      // Step 5: Parse uncached files
      inputCollections = parseAllPhotoCollections(notCached.map((n) => n + inputExtension), inputLocation);
    }
  } else {
  /** ********
    * Flow 2 *
    **********/
    // Step 1
    inputCollections = parseAllPhotoCollections(inputFiles, inputLocation);
  }

  // Step 2
  if (!!inputCollections) {
    inputCollections.map(
    /** @param {PhotoCollection} collection Collection to perform parsing, calculations, ... */
      (collection) => {
      // Merge vertical photos
        const p = mergeAllVerticalPhotos(collection.photos);
        collection.photos = sortAllPhotos(p);
        collection.collectionSize = collection.photos.length;

        // Parse tags
        collection.tags = parseTags(collection.photos).sort((a, b) => b.photos.length - a.photos.length);

        const writeName = collection.originalFileName.replace(/\.[^.]*$/, '.json');
        writeFile(JSON.stringify(collection, null, 2), `${cacheLocation}/${writeName}`);
      });

    // Step 6
    collections = [...cachedCollections, ...inputCollections].sort((a, b) => b.originalFileName - a.originalFileName);
  } else {
    // Step 6
    collections = cachedCollections.sort((a, b) => b.originalFileName - a.originalFileName);
  }

  if (!collections) return;
  return collections;
}
