import { Board } from './Board.js';

export class Game {
  #cellClass = ['black', 'grey', 'win'];
  #board = undefined;

  constructor(div, size, type) {
    this.#board = new Board(size, type);
    this.#createBoard(div);
    this.#updatePrompt();
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
    const { cellIndex, parentNode: { rowIndex } } = event.target;

    this.#board.clickCell(rowIndex, cellIndex);

    this.#updateBoard(rowIndex, cellIndex);
    this.#updatePrompt();
  }

  /**
   * Update a cell in the DOM board
   * @param {number} row The cell row index
   * @param {number} col The cell column index
   */
  #updateBoard(row, col) {
    const className = this.#getUserClass(this.#board.table[row][col]);
    const { firstChild } = document.querySelector('table');

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
      prompt.textContent = `${this.#getUserClass(this.#board.winner)} player win !`;
      prompt.classList.add('win');
    } else {
      const className = this.#getUserClass(this.#board.user);
      prompt.textContent = `${className} player turn...`;
      prompt.classList.add(className);
    }
  }

  /**
   * Return the color name for the given user
   * @param {number} user
   * @returns The color name string
   */
  #getUserClass(user) {
    return this.#cellClass[user];
  }
}
