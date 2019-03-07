import {Photo} from './photo';
// eslint-disable-next-line no-unused-vars
import {Tag} from '../tag';

/**
 * PhotoCollection
 * @property {number} collectionSize The amount of photos in this collection
 * @property {Array<Photo>} photos A list of photos
 * @property {string} originalFileName The original filename that was parsed to get this collection
 * @property {Array<Tag>} tags A list of tags that are present in all of the collections' photos
 * @export
 * @class PhotoCollection
 */
export class PhotoCollection {
  /**
   * Creates an instance of PhotoCollection.
   * @param {number} collectionSize The amount of photos in this collection
   * @param {Array<Photo>} photos A list of photos
   * @param {string} originalFileName The original filename that was parsed to get this collection
   * @param {Array<Tag>} tags A list of tags that are present in all of the collections' photos
   * @memberof PhotoCollection
   */
  constructor(collectionSize, photos, originalFileName, tags = null) {
    this.collectionSize = collectionSize;

    this.photos = photos
      .map((row, id) => {
        // console.log('row: ', row);
        const [orientation, M, ...tags] = row.split(' ');
        return new Photo(id, orientation, M, tags);
      });

    this.originalFileName = originalFileName;

    this.tags = tags;
  }
}
