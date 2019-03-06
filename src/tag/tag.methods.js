import {Tag} from './tag';

/**
 * Parses all tags and adds all matching photos
 * @param {Array<Photo>} photos
 * @return {Array<Tag>} Return all individual tags with their corresponding photos
 */
export function parseTags(photos) {
  return photos.reduce((tags, photo) => {
    let updateTags = [...tags];

    photo.tags.forEach((tag) => {
      const findExistingTag = (ts, label) => ts.find((t) => !!t && t.name === label);
      // First iteration
      if (!updateTags || !updateTags.length) {
        updateTags = [new Tag(tag, [photo.id])];
      } else {
        const existingTag = findExistingTag(updateTags, tag);
        if (!!existingTag) {
          const replaceTag = new Tag(existingTag.name, [...existingTag.photos, photo.id]);
          updateTags = updateTags.filter((t) => t !== existingTag);
          updateTags.push(replaceTag);
        } else {
          updateTags.push(new Tag(tag, [photo.id]));
        }
      }
    },
    []);

    return [...updateTags];
  },
  []);
}
