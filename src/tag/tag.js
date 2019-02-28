/**
 * Tag class
 * @class Tag
 */
export class Tag {
  /**
   *
   * @param {string} name Descriptor of the tag
   * @param {Array<Photo>} photos List of photos that share this tag
   */
  constructor(name, photos) {
    this.name = name;
    this.photos = photos;
  }
}
