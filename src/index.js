import './main.css';
import loader from './components/loader/loader.js';

/** Using rxjs is possible */
// import {of, fromEvent} from 'rxjs';
// import {map, filter, debounceTime, distinctUntilChanged} from 'rxjs/operators';

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
