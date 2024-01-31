import { Game } from './Game.js';

let game = undefined;

document.getElementById('start').addEventListener('click', () => {
  const type = document.getElementById('type').value;
  const size = document.getElementById('size').value;
  const dest = document.getElementById('game');

  if (dest && type && size) {
    try {
      game = new Game(dest, +size, +type);
    } catch (e) {
      console.error('Error creating game', e);
    }
  }
});
