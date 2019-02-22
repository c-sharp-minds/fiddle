import fs from 'fs';
import {Pizza} from './pizza.js';

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
 * @param {number} number The number of the current
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
