import fs from 'fs';
import {PhotoCollection} from './photo-collection';
import {Photo, OrientationEnum} from './photo';
import {countUnique, filterUnique, Performance} from '../shared';

/**
 * Read the file and splitit into readable rows
 * @param {string} file The location of the file we want to read
 * @return {PhotoCollection} PhotoCollection objects
 */
export function parsePhotoCollection(file) {
  if (!file) return;

  const photoCollection = fs.readFileSync(file);
  const lines = photoCollection.toString().split('\n');
  if (!lines || !lines.length) return;

  const size = lines[0];
  const photos = lines
    .filter((line) => !!line) // Filter out \n at the end
    .slice(1, lines.length + 1);

  return new PhotoCollection(size, photos);
};


/**
 * Check a specified directory for photos
 * @param {string} directory The directory location to check for photo files
 * @return {Array<string>} Array of photo files
 */
export function findAllPhotoCollections(directory) {
  if (!directory) return;

  const photos = fs.readdirSync(directory);
  return photos;
}

/**
 * Parse a series of photos for their content
 * @param {Array<string>} collections A list of photos to parse
 * @param {string} location The location of the photos
 * @return {Array<Array<string>>} Array of photo collections
 */
export function parseAllPhotoCollections(collections, location) {
  if (!collections || !collections.length) return;

  return collections.map((photo) => parsePhotoCollection(`${location}/${photo}`));
}

/**
 * Find least matches between two photos
 * @param {Photo} comparePhoto Photo to compare against all other photos
 * @param {Array<Photo>} photos All other photos to compare with
 * @return {number} Return id from the photo that have the least matches with `comparePhoto`
 */
export function findLeastMatches(comparePhoto, photos) {
  if (!photos) return;
  let id = null;
  let matchScore = 0;

  for (let index = 0; index < photos.length; index++) {
    const photo = photos[index];

    const combinedTags = [...photo.tags, ...comparePhoto.tags];

    const uniqueTags = countUnique(combinedTags);

    if (matchScore < uniqueTags) {
      id = photo.id;
      matchScore = uniqueTags;
    }
  }

  return id;
}

/**
 * Merge 2 pictures: combine tags, filter them to be distinct and create new id
 * @param {Photo} photoA First picture to merge
 * @param {Photo} photoB Second picture to merge
 * @return {Photo} Merged photo result
 */
export function mergePhotos(photoA, photoB) {
  if (!photoA || !photoB) return;
  const tags = filterUnique([...photoA.tags, ...photoB.tags]);
  return new Photo(photoA.id, OrientationEnum.Merged, `${tags.length}`, tags, `${photoA.id} ${photoB.id}`);
}

/**
 * Merge all vertical
 * @export
 * @param {Array<Photo>} photos
 * @return {Array<Photo>} Returns a list of photos where all vertical photos have been merged
 */
export function mergeAllVerticalPhotos(photos) {
  let verticalPhotos = photos.filter((photo) => photo.orientation === OrientationEnum.Vertical);
  console.groupCollapsed(`Merging ${verticalPhotos.length} vertical photos...`);

  /** Keep track of ID's that have been matched, so another id cannot match it as well */
  const alreadyMatched = [];
  const perf = new Performance();

  // Tricky part:
  //  We decrease the size of `verticalPhotos` for performance and to make sure that photos aren't merged a second time.
  //  The decrease of the length will, at some point, fall below the index, which will end the loop.
  //  For example with 60 000 photos, when the index has reached 20 000, we will have parsed 40 000 photos.
  //  So that leaves 20 000 vertical photos unmerged.
  // A solution:
  // Set the condition of the loop to stop when there are no more photos left in the `verticalPhoto` array (or maybe 1 in case the vertical photos are uneven)
  for (let index = 0; verticalPhotos.length > 1; index++) {
    const vertical = verticalPhotos[0];
    /** Id to match with current `vertical` photo */
    let leastMatchesId;

    // Don't try to match if already matched before and don't match to itself
    if (!!vertical && !alreadyMatched.includes(vertical.id)) {
      const p2 = new Performance();
      verticalPhotos = verticalPhotos.filter((v) => v.id !== vertical.id);
      const compareVerticals = verticalPhotos
        // .filter((v) => !alreadyMatched.includes(v.id) && v.id !== vertical.id) // This is getting heavier when the `alreadyMatched` array grows
        // IMPORTANT: Increasing the number of items to be checked in the slice has large impact on performance
        /** Compare to the first few in the array to save time */
        .slice(0, 1);
      leastMatchesId = findLeastMatches(vertical, compareVerticals);
      alreadyMatched.push(vertical.id, leastMatchesId);
      const merged = mergePhotos(vertical, verticalPhotos.find((v) => v.id === leastMatchesId));
      // Remove photos from the current list and add the merged photo instead
      photos = photos.filter((photo) => photo.id !== leastMatchesId && photo.id !== vertical.id );
      verticalPhotos = verticalPhotos.filter((v) => v.id !== leastMatchesId);
      photos.push(merged);
      p2.end();
    }

    if (index % 1000 === 0) {
      perf.stamp(`Merged ${index} vertical photos, timestamp: `);
    }
  }
  console.groupEnd();
  perf.log(`Merging took `);
  return photos;
}

const tagCount = (a, b) => {
  return b.tagCount - a.tagCount;
};

/**
 * Sort all the photos
 *  * By `tagCount`
 * @export
 * @param {Array<Photo>} photos (Unordered) list of photos
 * @return {Array<Photo>} Sorted list of photos
 */
export function sortAllPhotos(photos) {
  return photos.sort(tagCount);
}
