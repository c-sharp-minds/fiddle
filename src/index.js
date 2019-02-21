/** index.js
 * We use separate files for running web separately (`target: web`).
 * `fs` for example, can not be used when using `target: web`
 * This way we can fiddle client- and server side without certain functionality causing crashes.
 */

import './style.css';
import loader from './components/loader/loader.js';

/** Using rxjs is possible */
// import {of, fromEvent} from 'rxjs';
// import {map, filter, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {map, catchError} from 'rxjs/operators';

// Fiddle away
const print = (input) => {
  const temp1 = document.getElementById('fiddle');
  temp1.innerHTML += input;
};

/** Example snippet with load component */
print('<span class="title">Fiddle</span>');
print(loader);
print('<br/><br/>');

/** Example snippet with reduce */
const decodedCookie = decodeURIComponent(document.cookie).split(';').reduce(
  (acc, c) => {
    const splitC = c.trim().split('=');
    return ({
      ...acc,
      [splitC[0]]: splitC[1],
    });
  },
  {}
);

console.table(decodedCookie);

const testApi = () => {
  const obs$ = ajax.getJSON(`https://api.github.com/users?per_page=5`)
    .pipe(
      map((userResponse) => console.log('Users: ', userResponse)),
      catchError((error) => console.log('error: ', error))
    );

  obs$.subscribe();
};

testApi();
