import {Tag} from './tag';
import {Performance} from '../shared';

/**
 * Parses all tags and adds all matching photos
 * @param {Array<Photo>} photos
 * @return {Array<Tag>} Return all individual tags with their corresponding photos
 */
export function parseTags(photos) {
  const perf = new Performance();
  const tags = {};

  console.groupCollapsed(`Parsing ${photos.length} photos for tags...`);
  for (let index = 0; index < photos.length; index++) {
    const photo = photos[index];

    for (let i = 0; i < photo.tags.length; i++) {
      const tag = photo.tags[i];

      const existingTag = tags[tag];
      // console.log('existingTag: ', existingTag);

      // const findExistingTag = (ts, label) => ts.find((t) => !!t && t.name === label);

      // const existingTag = findExistingTag(tags, tag);
      if (!!existingTag) {
        // const replaceTag = new Tag(existingTag.name, [...existingTag.photos, photo.id]);
        // tags = tags.filter((t) => t !== existingTag);
        tags[tag] = new Tag(existingTag.name, [...existingTag.photos, photo.id]);
      } else {
        tags[tag] = new Tag(tag, [photo.id]);
      }
    }

    if (index % 1000 === 0) {
      perf.stamp(`Parsed ${index} photos for tags, timestamp: `);
    }
  }

  perf.log(`Parsed tags in `);

  const out = [];
  const destruct = Object.entries(tags);
  // Object.entries(tags);
  for (let index = 0; index < destruct.length; index++) {
    const [, value] = destruct[index];
    out.push(value);

    if (index % 10000 === 0) {
      perf.stamp(`Destructured ${index} tags, timestamp: `);
    }
  }

  perf.log(`Transformed object to array in `);

  console.groupEnd();
  perf.end();

  return out;
}

