/** server.js
 * We use separate files for running node separately (`target: node`).
 * `fs` for example, can not be used when using `target: web`
 * This way we can fiddle client- and server side without certain functionality causing crashes.
 */

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import fs from 'fs';

// import {of, fromEvent} from 'rxjs';
// import {map, filter, debounceTime, distinctUntilChanged} from 'rxjs/operators';


const testReadPizza = () => {
  const testFolder = `resources/pizza/a_example.in`;

  const test = fs.readFileSync(testFolder);
  console.log('test: ', test);
};

testReadPizza();
