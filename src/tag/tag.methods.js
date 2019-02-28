// import {Tag} from './tag';

/**
 * Parses all tags and adds all matching photos
 * @param {Array<Photo>} photos
 * @return {Array<Tag>} Return all individual tags with their corresponding photos
 */
export function parseTags(photos) {
  return photos.reduce((tags, photo, index) => {
    console.log(photo.id, photo.tags);
    const test = photo.tags.reduce((tag, t) => {
      // console.log('tag: ', tag);
      // console.log('t: ', t);
      const existing = tags.find((e) => {
        console.log('existing: ', e);
        return existing.name === t;
      });
    });
    console.log('test: ', test);
    return [...tags];
  },
  []);
}
