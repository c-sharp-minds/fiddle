/** server.js
 * We use separate files for running node separately (`target: node`).
 * `fs` for example, can not be used when using `target: web`
 * This way we can fiddle client- and server side without certain functionality causing crashes.
 */

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import {findAllPhotoCollections, parseAllPhotoCollections, mergeAllVerticalPhotos, sortAllPhotos} from './photo';
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
  console.group('executeAll');
  console.time('Total');
  /* console.log('photos: ', photos); */
  /* const result = photos.map((photoCollection) => {
    const r = parseTags(photoCollection);
    console.log('r: ', r);
    r.sort((a, b) => b.photos.length - a.photos.length);
    return r;
  });
  console.log('result: ', result); */

  photoCollections.map(
    (collection, index) => {
      const p = mergeAllVerticalPhotos(collection.photos);
      collection.photos = sortAllPhotos(p);
      collection.collectionSize = collection.photos.length;
      console.log('collection: ', collection);
    });

  console.log('photoCollections: ', photoCollections);
  console.timeEnd('Total');
  console.groupEnd();
}

executeAll();
