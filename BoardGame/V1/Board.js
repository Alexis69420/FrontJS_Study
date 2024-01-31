export const BoardType = {
  Fill: 1,
  Crush: 2
};

export const Player = {
  One: 0,
  Two: 1
};

/**
 * Board class
 * size : size of the board (square)
 * type : BoardType
 */
export class Board {
  #currentUser = undefined;
  #winner = undefined;
  #table = undefined;
  #type = undefined;

  constructor(size, type) {
    this.#currentUser = (type === BoardType.Crush) ? Player.One : Player.Two;
    this.#type = type;

    this.#generateTable(size);
  }

  get table() {
    return this.#table;
  }

  get user() {
    return this.#currentUser;
  }

  get winner() {
    return this.#winner;
  }

  /**
   * Process click on the given board cell and set the winner if needed
   * @param {number} row
   * @param {number} col
   */
  clickCell(row, col) {
    if (this.#winner === undefined) {
      if (this.#type === BoardType.Crush) {
        if (this.#table[row][col] === this.#opponent()) {
          this.#winner = this.#currentUser;
        }
      } else if (this.#table[row][col] !== undefined) {
        this.#winner = this.#opponent();
      }

      if (this.#winner === undefined) {
        this.#table[row][col] = this.#currentUser;
        this.#changeUser();
      }
    }
  }

  /**
   * Build a new board 2D table
   * @param {number} size
   */
  #generateTable(size) {
    this.#table = Array.from({ length: size }, () => (
      Array(size).fill(undefined)
    ));
  }

  /**
   * Change the current user
   */
  #changeUser() {
    this.#currentUser = this.#opponent();
  }

  /**
   * Return the current player opponent
   * @returns {number} The opponent user
   */
  #opponent() {
    return this.#currentUser === Player.One ? Player.Two : Player.One;
  }
}
