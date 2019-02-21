/** server.js
 * We use separate files for running node separately (`target: node`).
 * `fs` for example, can not be used when using `target: web`
 * This way we can fiddle client- and server side without certain functionality causing crashes.
 */

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

/** Using rxjs is possible */
import {ajax} from 'rxjs/ajax';
import {map, catchError} from 'rxjs/operators';

// It needs to be available globally, before RxJS is loaded
// import {of, fromEvent} from 'rxjs';
// import {map, filter, debounceTime, distinctUntilChanged} from 'rxjs/operators';

const testApi = () => {
  const obs$ = ajax.getJSON(`https://api.github.com/users?per_page=5`)
    .pipe(
      map((userResponse) => console.log('Users: ', userResponse)),
      catchError((error) => console.log('error: ', error))
    );

  obs$.subscribe();
};

testApi();
