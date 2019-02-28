/** index.js
 * We use separate files for running web separately (`target: web`).
 * `fs` for example, can not be used when using `target: web`
 * This way we can fiddle client- and server side without certain functionality causing crashes.
 */

import './style.css';
import pizza from './components/pizza/pizza';

// Fiddle away
const print = (input) => {
  const temp1 = document.getElementById('fiddle');
  temp1.innerHTML += input;
};

/** Example snippet with load component */
// print('<span class="title">Fiddle</span>');
print(pizza);
