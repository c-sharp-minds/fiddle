/** server.js
 * We use separate files for running node separately (`target: node`).
 * `fs` for example, can not be used when using `target: web`
 * This way we can fiddle client- and server side without certain functionality causing crashes.
 */

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import {Performance} from './shared';
// eslint-disable-next-line no-unused-vars
import {getPhotoCollections, Photo, Score} from './photo';

/**
 * Calculate slideshow result scores
 * @export
 * @param {Array<Photo>} slideshow
 * @return {Array<Score>}
 */
export function calculateResult(slideshow) {
  const result = [];
  for (let i = 0; i < slideshow.length - 1; i++) {
    const slideA = slideshow[i];
    const slideB = slideshow[i+1];
    result.push(new Score(slideA, slideB));
  }
  return result;
}

/**
 * First try at calculating an interesting slideshow
 *
 * @export
 * @param {PhotoCollection} collection
 * @return {Array<Photo>} A slideshow where the photos have been ordered as interesting as possible
 */
export function calculate1(collection) {
  const p1 = new Performance();
  const slideshow = [];
  const usedPhotos = [];
  for (let i = 0; i < collection.photos.length; i++) {
    const a = collection.photos[i];
    a.scores = [];

    for (let j = 0; j < collection.photos.length; j++) {
      const b = collection.photos[j];

      // Skip calculating score against itself
      if (a.id === b.id) {
        continue;
      }
      const s = new Score(a, b);
      a.scores.push(s);
    }

    a.scores.sort((a, b) => b.min - a.min);
  }

  p1.log(`Calculated scores recursively in `);

  const photos = collection.photos.sort((a, b) => b.scores[0] - a.scores[0]);

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];

    if (!!slideshow.length) {
      const last = slideshow[slideshow.length-1];
      let next = last.scores[0].next;
      for (let j = 0; j < last.scores.length; j++) {
        const score = last.scores[j];
        if (usedPhotos.includes(score.next)) {
          continue;
        }
        if (!!next) {
          continue;
        }
        next = score.next;
      }
      slideshow.push(photos.find((p) => p.id === next));
    } else {
      // First iteration
      slideshow.push(photo);
      usedPhotos.push(photo.id);
    }
  }

  collection.slideshow = slideshow;
  p1.log(`Slideshow made in `);
  p1.end();
  return collection;
}

/**
 * Execute all
 */
function executeAll() {
  // debugger;
  const inputLocation = 'resources/photos';
  const cacheLocation = 'resources/cache';

  const collections = getPhotoCollections(inputLocation, cacheLocation);
  console.log('collections: ', collections);

  if (!collections) {
    console.warn('No collections found.');
    return;
  }

  // Calculations here...
  for (let c of collections) {
    c = calculate1(c);
    // c.photos.sort((a, b) => b.score.min - a.score.min);
    const result = calculateResult(c.slideshow);
    console.log('result: ', result);
    console.log('photos: ', c);
  }
  // let slideshow;
  // for (let i = 0; i < photos.length; i++) {
  //   const photo = photos[i];

  // }
  // slideshow = [];
  // console.log('slideshow: ', slideshow);
}

/** ********
 * Execute *
 ***********/
console.clear();
console.group('Execute all');
const perf = new Performance();
executeAll();
perf.log(`Total execution time `);
console.groupEnd();

debugger;
