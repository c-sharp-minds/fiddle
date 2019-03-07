/** server.js
 * We use separate files for running node separately (`target: node`).
 * `fs` for example, can not be used when using `target: web`
 * This way we can fiddle client- and server side without certain functionality causing crashes.
 */

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import {Performance} from './shared';
import {getPhotoCollections} from './photo';

/**
 * Execute all
 */
function executeAll() {
  debugger;
  const inputLocation = 'resources/photos';
  const cacheLocation = 'resources/cache';

  const collections = getPhotoCollections(inputLocation, cacheLocation);
  console.log('collections: ', collections);

  // Calculations here...
  if (!collections) {
    console.warn('No collections found.');
    return;
  }
}

/** ********
 * Execute *
 ***********/
console.clear();
console.group('Execute all');
const perf = new Performance();
executeAll();
perf.log(`Total execution time `);
console.groupEnd();
