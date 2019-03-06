/**
 * Photo class
 * @export
 * @class Photo
 */
export class Photo {
  /**
   * @param {number} id Photo id number
   * @param {OrientationEnum} orientation Horizontal or vertical orientation
   * @param {number} tagCount Number of tags for the photo
   * @param {Array<string>} tags List of tags for the photo
   * @param {string} [resultId=id] In case of merged vertical pictures, combine their id's and use them as a result id
   * @memberof Photo
   */
  constructor(id, orientation, tagCount, tags, resultId = `${id}`) {
    this.id = id;
    this.orientation = orientation;
    this.tagCount = tagCount;
    this.tags = tags;
    this.resultId = resultId;
  }

  /**
   * The generated ID that will be used in the written file
   * @readonly
   * @memberof Photo
   */
  get resultId() {
    if (!!this._resultId) {
      return this._resultId;
    }
    return `${this.id}`;
  }

  /**
   * Set the value of the generated ID that will be used in the output file
   * @memberof Photo
   * @param {number | string} value Generated ID value
   */
  set resultId(value) {
    this._resultId = value;
  }
}


export const OrientationEnum = Object.freeze({
  Horizontal: 'H',
  Vertical: 'V',
  Merged: 'M',
});
