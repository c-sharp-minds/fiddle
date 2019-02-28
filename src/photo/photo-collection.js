import {Photo} from './photo';

/**
 * PhotoCollection
 * @export
 * @class PhotoCollection
 */
export class PhotoCollection {
  /**
   * Creates an instance of PhotoCollection.
   * @param {number} collectionSize
   * @param {Array<Photo>} photos
   * @memberof PhotoCollection
   */
  constructor(collectionSize, photos) {
    this.collectionSize = collectionSize;
    this.photos = photos
      .map((row, id) => {
        // console.log('row: ', row);
        const [orientation, M, ...tags] = row.split(' ');
        return new Photo(id, orientation, M, tags);
      });
  }
}
