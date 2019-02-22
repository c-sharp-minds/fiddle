/** server.js
 * We use separate files for running node separately (`target: node`).
 * `fs` for example, can not be used when using `target: web`
 * This way we can fiddle client- and server side without certain functionality causing crashes.
 */

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import {findAllPizzas, parseAllPizzas, logPizzaInfo} from './pizza';

const pizzaLocation = 'resources/pizza';
const pizzaFiles = findAllPizzas(pizzaLocation);
const pizzas = parseAllPizzas(pizzaFiles, pizzaLocation);

pizzas.map((pizza, index) => {
  logPizzaInfo(pizza, index + 1);
});
