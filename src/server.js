/* eslint-disable valid-jsdoc */
/* eslint no-use-before-define: 0 */ // --> OFF

/** server.js
 * We use separate files for running node separately (`target: node`).
 * `fs` for example, can not be used when using `target: web`
 * This way we can fiddle client- and server side without certain functionality causing crashes.
 */

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// import {findAllPizzas, parseAllPizzas, logPizzaInfo, generatePizzaHtml, writeFile} from './pizza';
import {findAllPhotoCollections, parseAllPhotoCollections, OrientationEnum, Photo} from './photo';
// import {parseTags} from './tag';

// const pizzaLocation = 'resources/pizza';
// const pizzaFiles = findAllPizzas(pizzaLocation);
// const pizzas = parseAllPizzas(pizzaFiles, pizzaLocation);
// const pizzas = parseAllPizzas([pizzaFiles[0], pizzaFiles[1]], pizzaLocation);

// pizzas.map((pizza, index) => {
//   logPizzaInfo(pizza, index + 1);
//   const html = generatePizzaHtml(pizza, index + 1);
//   writeFile(html, `resources/visual/pizza${index + 1}.html`);
// });


const photosLocation = 'resources/photos';
const photoCollectionFiles = findAllPhotoCollections(photosLocation);
/* All */
// const photoCollections = parseAllPhotoCollections(photoCollectionFiles);

const oneCollection = [photoCollectionFiles[1]];
const photoCollections = parseAllPhotoCollections(oneCollection, photosLocation);
const photos = photoCollections.map((collection) => collection.photos)[0];

// console.log('photoCollections: ', JSON.stringify(photoCollections));
// console.log('photoCollections: ', JSON.stringify(photoCollections, null, 2));

// const tags = parseTags(photos[0]);
// console.log('tags: ', tags);
// console.log('tags: ', JSON.stringify(tags, null, 2));

/**
 * Sort by amount of tags from most to least
 * @return {Array<Photo>} Sorted array
 */
function sortByAmount() {
  return photos.sort((a, b) => {
    return b.tagCount - a.tagCount;
  });
}

/**
 * Step1
 * Take the first photo with orientation V and the most amount of tags
 * @return {Photo} First photo with V orientation
 */
function getFirstVertical() {
  const sorted = sortByAmount();
  // console.log('sorted: ', sorted);
  return sorted.find((s) => s.orientation === OrientationEnum.Vertical);
}

/**
 * Step1
 * Take the first photo with orientation V and the most amount of tags
 * @return {Photo} First photo with V orientation
 */
function arrayUnique(array) {
  const a = array.concat();
  for (let i=0; i<a.length; ++i) {
    for (let j=i+1; j<a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1);
      }
    }
  }

  return a;
}

/**
 *
 * @param {*} original
 */
function countDuplicates(original) {
  const uniqueItems = new Set();
  const duplicates = new Set();
  for (const value of original) {
    if (uniqueItems.has(value)) {
      duplicates.add(value);
      uniqueItems.delete(value);
    } else {
      uniqueItems.add(value);
    }
  }
  return duplicates.size;
}


/**
 * Execute step1
 */
function step2() {
  const firstVertical = getFirstVertical();
  if (firstVertical) {
    const sorted = sortByAmount();

    sorted.map((s) => {
      if (firstVertical !== s && s.orientation === OrientationEnum.Vertical) {
        const mergedUnfiltered = arrayUnique(s.tags.concat(firstVertical.tags));
        const merged = new Photo(firstVertical.id + ' ' + s.id, OrientationEnum.Horizontal, mergedUnfiltered.length, mergedUnfiltered);
        photos.splice(photos.indexOf(firstVertical), 1);
        photos.splice(photos.indexOf(s), 1);
        photos.push(merged);
        step2();
      } else {
        return firstVertical;
      }
    });
  }
}

let reference = 0;
let tempScore = 0;

/**
 *
 * @param {*} photo1
 * @param {*} photo2
 */
function step3() {
  const sorted = sortByAmount();

  for (let index = reference + 1; index < reference + 5 && index < sorted.length; index++) {
    console.log('index: ', index);
    const score = calculateScore(sorted[index], sorted[reference]);
    // console.log('score: ', score);
    tempScore = score > tempScore ? score : tempScore;
  }
  reference++;
  if (reference < sorted.length) {
    console.log('reference: ', reference);
    if (reference % 1000 === 0) {
      console.log('reference: ', reference);
    }
    step3();
  }
}

/**
 * Calculate score between 2 photos
 *  * Matching tags
 *  * Non-matching tags of first photo
 *  * Non-matching tags of second photo
 */
function calculateScore(photo1, photo2) {
  let score = 0;
  const mergeBothTags = [...photo1.tags, ...photo2.tags];
  score = countDuplicates(mergeBothTags);

  return score;
}

step2();
step3();

console.log('tempScore: ', tempScore);

console.log('step1(): ', getFirstVertical());
// console.log('step1(): ', step1());
