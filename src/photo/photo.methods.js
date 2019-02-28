import fs from 'fs';
import {PhotoCollection} from './photo-collection';

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

  // console.log('photos: ', photos);
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
 * @param {Array<string>} photos A list of photos to parse
 * @param {string} location The location of the photos
 * @return {Array<Array<string>>} Array of photo content
 */
export function parseAllPhotoCollections(photos, location) {
  if (!photos || !photos.length) return;

  return photos.map((photo) => parsePhotoCollection(`${location}/${photo}`));
}
