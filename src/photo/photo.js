/**
 * Photo class
 * @export
 * @class Photo
 */
export class Photo {
  /**
   *
   * @param {number} id Photo id number
   * @param {OrientationEnum} orientation Horizontal or vertical orientation
   * @param {number} tagCount Number of tags for the photo
   * @param {Array<string>} tags List of tags for the photo
   */
  constructor(id, orientation, tagCount, tags) {
    this.id = id;
    this.orientation = orientation;
    this.tagCount = tagCount;
    this.tags = tags;
  }
}


export const OrientationEnum = Object.freeze({
  Horizontal: 'H',
  Vertical: 'V',
});
