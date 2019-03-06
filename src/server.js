/** server.js
 * We use separate files for running node separately (`target: node`).
 * `fs` for example, can not be used when using `target: web`
 * This way we can fiddle client- and server side without certain functionality causing crashes.
 */

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import {findAllPhotoCollections, parseAllPhotoCollections, mergeAllVerticalPhotos, sortAllPhotos} from './photo';
import {Performance} from './shared';
import {parseTags} from './tag/tag.methods';
// import {parseTags} from './tag';

const photosLocation = 'resources/photos';
const photoCollectionFiles = findAllPhotoCollections(photosLocation);
/* All */
const photoCollections = parseAllPhotoCollections(photoCollectionFiles, photosLocation);

// const selectCollection = [photoCollectionFiles[0], photoCollectionFiles[2]];
// const selectCollection = [photoCollectionFiles[0]];
// const photoCollections = parseAllPhotoCollections(selectCollection, photosLocation);

// const photos = photoCollections.map((collection) => collection.photos);

console.log('photoCollections: ', photoCollections);
// console.log('photoCollections: ', JSON.stringify(photoCollections, null, 2));

// const tags = parseTags(photos[0]);
// console.log('tags: ', tags);
// console.log('tags: ', JSON.stringify(tags, null, 2));

/**
 * Execute all
 *  * **Step 1**: Merge all vertical photos, that have the least possible matching tags
 */
function executeAll() {
  console.group('Execute all');
  const perf = new Performance();

  photoCollections.map(
    (collection) => {
      // Merge vertical photos
      const p = mergeAllVerticalPhotos(collection.photos);
      collection.photos = sortAllPhotos(p);
      collection.collectionSize = collection.photos.length;

      // Parse tags
      // const parsedTags = parseTags(collection.photos);
      // collection.tags = parsedTags.sort((a, b) => b.photos.length - a.photos.length);
      collection.tags = parseTags(collection.photos);

      console.log('collection: ', collection);
    });

  perf.log(`Total execution time `);
  console.log('photoCollections: ', photoCollections);
  console.groupEnd();
}

executeAll();
