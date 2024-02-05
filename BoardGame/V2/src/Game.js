import { Board } from './Board.js';

export class Game {
  #cellClass = ['black', 'grey', 'win'];
  #updateScore = undefined;
  #board = undefined;

  constructor(div, size, type, players, updateScore) {
    this.#board = new Board(size, type, players);
    this.#updateScore = updateScore;
    this.#createBoard(div);
    this.#updatePrompt();
  }

  /**
   * Generate the IA Player random play
   */
  next() {
    if (!this.#isHumanTurn()) {
      const size = this.#board.size;
      this.#click(
        Math.floor(Math.random() * size),
        Math.floor(Math.random() * size)
      );
    }
  }

  /**
   * Create the DOM board
   * @param {HTMLElement} div The destination div
   */
  #createBoard(div) {
    const table = document.createElement('table');
    const body = document.createElement('tbody');

    this.#board.table.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      row.forEach((cell, cellIndex) => {
        const td = document.createElement('td');
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });

    table.id = 'board';
    table.appendChild(body);
    table.addEventListener('click', this.#handleCellClick);

    if (div.firstChild) {
      div.removeChild(div.firstChild);
    }

    div.appendChild(table);
  }

  /**
   * Handle a click on a DOM table cell
   * @param {MouseEvent} event The mouse table click event
   */
  #handleCellClick = (event) => {
    if (this.#isHumanTurn()) {
      const { cellIndex, parentNode: { rowIndex } } = event.target;
      this.#click(rowIndex, cellIndex);
    }
  }

  /**
   * Process a click on the given board cell and update board
   */
  #click(row, col) {
    this.#board.clickCell(row, col);
    this.#updateBoard(row, col);
    this.#updatePrompt();
  }

  /**
   * Update a cell in the DOM board
   * @param {number} row The cell row index
   * @param {number} col The cell column index
   */
  #updateBoard(row, col) {
    const className = this.#getColorClass(this.#board.table[row][col]);
    const { firstChild } = document.querySelector('#board');

    const tr = firstChild.childNodes[row];
    const td = tr.childNodes[col];

    td.classList.remove(...this.#cellClass);
    td.classList.add(className);
  }

  /**
   * Update the prompt with the current player or the winner
   */
  #updatePrompt() {
    const prompt = document.getElementById('prompt');

    prompt.classList.remove(...this.#cellClass);

    if (this.#board.winner !== undefined) {
      prompt.textContent = `${this.#getPlayerName(this.#board.winner)} player win !`;
      prompt.classList.add('win');
      this.#setWinnerInfo();
    } else {
      prompt.textContent = `${this.#getPlayerName(this.#board.player)} player turn...`;
      const className = this.#getColorClass(this.#board.player);
      prompt.classList.add(className);
    }

    const playButton = document.getElementById('next');
    playButton.style.visibility = this.#isHumanTurn() ? 'hidden' : 'visible';
  }

  /**
   * Return true if human player has to play
   * @returns true if human else false
   */
  #isHumanTurn() {
    return this.#board.getPlayer(this.#board.player).human;
  }

  /**
   * Return the name for the given player
   * @param {number} player id
   * @returns The color name string
   */
  #getPlayerName(player) {
    return this.#board.getPlayer(player).name;
  }

  /**
   * Return the color name for the given player
   * @param {number} player id
   * @returns The color name string
   */
  #getColorClass(player) {
    return this.#cellClass[player];
  }

  /**
   * Update and display the winner info
   */
  #setWinnerInfo() {
    if (typeof this.#updateScore === 'function') {
      this.#updateScore();
    }
  }
}
