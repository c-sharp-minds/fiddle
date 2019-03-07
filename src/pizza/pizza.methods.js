import fs from 'fs';
import {Pizza, ToppingsEnum} from './pizza.js';

/**
 * Read the file and splitit into readable rows
 * @param {string} file The location of the file we want to read
 * @return {Array<Pizza>} Array of pizza objects
 */
export function parsePizza(file) {
  if (!file) return;

  const pizza = fs.readFileSync(file);
  const lines = pizza.toString().split('\n');
  if (!lines || !lines.length) return;

  const [R, C, L, H] = lines[0].split(' ');
  const toppings = lines
    .filter((line) => !!line) // Filter out \n at the end
    .slice(1, lines.length + 1);

  return new Pizza(R, C, L, H, toppings);
};

/**
 * Check a specified directory for pizzas
 * @param {string} directory The directory location to check for pizza files
 * @return {Array<string>} Array of pizza files
 */
export function findAllPizzas(directory) {
  if (!directory) return;

  const pizzas = fs.readdirSync(directory);
  return pizzas;
}

/**
 * Parse a series of pizzas for their content
 * @param {Array<string>} pizzas A list of pizzas to parse
 * @param {string} location The location of the pizzas
 * @return {Array<Array<string>>} Array of pizza content
 */
export function parseAllPizzas(pizzas, location) {
  if (!pizzas || !pizzas.length) return;

  return pizzas.map((pizza) => parsePizza(`${location}/${pizza}`));
}

/**
 * Log the information of a pizza
 * @param {Pizza} pizza The pizza to output the information about
 * @param {number} number The number of the current pizza
 */
export function logPizzaInfo(pizza, number) {
  console.group('Pizza nr.', number);
  console.log('\t R Rows: \t\t\t\t', pizza.rows);
  console.log('\t C Columns: \t\t\t\t', pizza.columns);
  console.log('\t L Minimum ingredients on each slice: \t', pizza.minIngredients);
  console.log('\t H Maximum amount of cells in a slice: \t', pizza.maxSliceCells);
  console.log('\t Size: \t\t\t\t\t', pizza.size);
  console.log('\t # Tomatoes: \t\t\t\t', pizza.mushroomCount);
  console.log('\t # Mushrooms: \t\t\t\t', pizza.tomatoCount);
  console.log('');
  console.groupEnd();
}

/**
 * Generate html to visualize the pizza
 * @export
 * @param {Pizza} pizza The pizza visualize
 * @param {number} number The number of the current pizza
 * @return {string} The html for the pizza
 */
export function generatePizzaHtml(pizza, number) {
  if (!pizza) return;
  const tomato = (index) => `<div class="tomato tom${index}"></div>`;
  const mushroom = (index) => `<div class="mushroom mush${index}"></div>`;
  const tomatoStyle = (index, row, offset, nr) => `
    .pizza${nr} .tom${index} {
      position: absolute;
      top: ${(row * 100) + 50}px;
      left: ${((index - offset) * 100) + 50}px;
    }
  `;
  const mushroomStyle = (index, row, offset, nr) => `
    .pizza${nr} .mush${index} {
      position: absolute;
      top: ${(row * 100) + 50}px;
      left: ${((index - offset) * 100) + 50}px;
    }
  `;

  const body = (rows, columns, topping, style, nr) => `
    <style>
    .pizza${nr} {
        position: relative;
      }

      .pizza${nr} .crust {
        width: ${(columns * 100) + 100}px;
        height: ${(rows * 100) + 100}px;
        background: burlywood;
      }

      .pizza${nr} .cheese {
        width: ${(columns * 100)}px;
        height: ${(rows * 100)}px;
        background: gold;
        position: absolute;
        top: 50px;
        left: 50px;
      }

      .pizza${nr} .tomato {
        width: 90px;
        height: 90px;
        margin: 5px;
        background: firebrick;
        border-radius: 37.5px;
      }
      .pizza${nr} .mushroom {
        height: 40px;
        width: 90px;
        margin: 5px;
        margin-top: 20px;
        border-radius: 90px 90px 0 0;
        background:#b49989;
      }

      ${style}
    </style>
    <h1>Pizza ${nr}</h1>
    <div class="pizza${nr}">
      <div class="crust"></div>
      <div class="cheese"></div>
      ${topping}
    </div>
  `;

  const toppingMarkup = pizza.toppings.reduce(
    (markup, row, i) => markup += row.reduce(
      (m, ingredient, j) => m += ingredient === ToppingsEnum.tomato
        ? tomato(i * row.length + j)
        : mushroom(i * row.length + j),
      ''
    ),
    ''
  );

  const toppingStyle = pizza.toppings.reduce(
    (style, row, i) => style += row.reduce(
      (s, ingredient, j) => s += ingredient === ToppingsEnum.tomato
        ? tomatoStyle(i * row.length + j, i, i * row.length, number)
        : mushroomStyle(i * row.length + j, i, i * row.length, number),
      ''
    ),
    ''
  );

  return body(pizza.rows, pizza.columns, toppingMarkup, toppingStyle, number);
}
