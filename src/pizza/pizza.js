/**
 * Pizza existing of a certain amount of slices
 * @export
 * @class Slice
 */
export class Pizza {
  /**
   * Creates an instance of Pizza.
   * @param {number} rows
   * @param {number} columns
   * @param {number} minIngredients
   * @param {number} maxSliceCells
   * @param {Array<string>} toppings
   * @memberof Pizza
   */
  constructor(rows, columns, minIngredients, maxSliceCells, toppings) {
    this.rows = rows;
    this.columns = columns;
    this.minIngredients = minIngredients;
    this.maxSliceCells = maxSliceCells;
    this.toppings = toppings.map((row) => row.split(''));
  }

  /**
   * Calculates the size of the pizza, based on its rows and columns
   */
  get size() {
    if (!this.rows || !this.columns) return;
    return this.rows * this.columns;
  }

  /**
   * Calculates the size of the pizza, based on its rows and columns
   * @return {number} Total amount of tomatoes on the pizza
   */
  get tomatoCount() {
    if (!this.toppings) return;

    return this.toppings.reduce(
      (amount, row) => {
        const tomatoesInRow = row.filter((topping) => topping === ToppingsEnum.tomato).length;
        return amount + tomatoesInRow;
      },
      0);
  }

  /**
   * Calculates the size of the pizza, based on its rows and columns
   * @return {number} Total amount of mushrooms on the pizza
   */
  get mushroomCount() {
    if (!this.toppings) return;

    return this.toppings.reduce(
      (amount, row) => {
        const mushroomsInRow = row.filter((topping) => topping === ToppingsEnum.mushroom).length;
        return amount + mushroomsInRow;
      },
      0
    );
  }
}

export const ToppingsEnum = Object.freeze({
  tomato: 'T',
  mushroom: 'M',
});
