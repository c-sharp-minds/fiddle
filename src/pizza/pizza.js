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
    this.toppings = toppings;
  }
}
