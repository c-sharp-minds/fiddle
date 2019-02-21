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
  const testFolder = `resources/pizza/b_small.in`;

  const test = fs.readFileSync(testFolder);

  const lines = test.toString().split('\n');
  const [R, C, L, H] = lines[0].split(' ');
  console.log('Rows: ', R);
  console.log('Columns: ', C);
  console.log('Minimum ingredients on each slice: ', L);
  console.log('Maximum amount of cells in a slice: ', H);

  // for (i = 1; i < lines.length; i++) {
  //   lines[i].split('');
  // }
};

testReadPizza();
