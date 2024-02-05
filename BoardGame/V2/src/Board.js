/**
 * The game types
 */
export const BoardType = {
  Fill: 1,
  Crush: 2
};

/**
 * The player types
 */
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
  #playerIndex = undefined;
  #winnerIndex = undefined;
  #table = undefined;
  #type = undefined;
  #size = undefined;
  #players = [];

  constructor(size, type, players) {
    this.#playerIndex = (type === BoardType.Crush) ? Player.One : Player.Two;
    this.#players = players;
    this.#size = size;
    this.#type = type;

    this.#generateTable(size);
  }

  /**
   * Return the board table
   */
  get table() {
    return this.#table;
  }

  /**
   * Return the board size
   */
  get size() {
    return this.#size;
  }

  /**
   * Return the current player index
   */
  get player() {
    return this.#playerIndex;
  }

  /**
   * Return the winner index
   */
  get winner() {
    return this.#winnerIndex;
  }

  /**
   * Get the current player instance
   * @param {number} index The player index
   * @returns The Player instance or undefined if index is invalid
   */
  getPlayer(index) {
    return this.#players[index];
  }

  /**
   * Process click on the given board cell and set the winner if needed
   * @param {number} row
   * @param {number} col
   */
  clickCell(row, col) {
    if (this.#winnerIndex === undefined) {
      const opponent = this.#opponent(this.#playerIndex);

      if (this.#type === BoardType.Crush) {
        if (this.#table[row][col] === opponent) {
          this.#setWinner(this.#playerIndex);
        }
      } else if (this.#table[row][col] !== undefined) {
        this.#setWinner(opponent);
      }

      if (this.#winnerIndex === undefined) {
        this.#table[row][col] = this.#playerIndex;
        this.#changePlayer();
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
  #changePlayer() {
    this.#playerIndex = this.#opponent(this.#playerIndex);
  }

  /**
   * Return the current player opponent
   * @param {number} index The current player index
   * @returns {number} The opponent index
   */
  #opponent(index) {
    return index === Player.One ? Player.Two : Player.One;
  }

  /**
   * Set the winner and update the scores
   * @param {number} index The winner index
   */
  #setWinner(index) {
    let player;

    this.#winnerIndex = index;

    player = this.getPlayer(index);
    player.wins++;

    player = this.getPlayer(this.#opponent(index));
    player.defeats++;
  }
}
