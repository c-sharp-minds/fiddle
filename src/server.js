/** server.js
 * We use separate files for running node separately (`target: node`).
 * `fs` for example, can not be used when using `target: web`
 * This way we can fiddle client- and server side without certain functionality causing crashes.
 */

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import {findAllPizzas, parseAllPizzas, logPizzaInfo, generatePizzaHtml, writeFile} from './pizza';

const pizzaLocation = 'resources/pizza';
const pizzaFiles = findAllPizzas(pizzaLocation);
const pizzas = parseAllPizzas(pizzaFiles, pizzaLocation);
// const pizzas = parseAllPizzas([pizzaFiles[0], pizzaFiles[1]], pizzaLocation);

pizzas.map((pizza, index) => {
  logPizzaInfo(pizza, index + 1);
  const html = generatePizzaHtml(pizza, index + 1);
  writeFile(html, `resources/visual/pizza${index + 1}.html`);
});
