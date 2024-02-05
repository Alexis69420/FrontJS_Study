import { Services } from './Services.js';
import { IAPlayer } from './Player.js';
import { Game } from './Game.js';

let services = new Services();
let player = undefined;
let game = undefined;

/**
 * Listen to start game button click
 */
document.getElementById('start').addEventListener('click', () => {
  const type = document.getElementById('type').value;
  const size = document.getElementById('size').value;
  const div = document.getElementById('game');

  if (div && type && size && player) {
    try {
      game = new Game(div, +size, +type, [player, new IAPlayer()], async () => {
        await updateScore(player);
      });
    } catch (e) {
      console.error('Error creating game', e);
    }
  }
});

/**
 * Listen to IA play click button
 */
document.getElementById('next').addEventListener('click', () => {
  if (game) {
    game.next();
  }
});

/**
 * The player login form submit function
 * @param {Event} The form submit event
 */
window.logPlayer = async function(e) {
  e.preventDefault();

  const { login } = Object.fromEntries(new FormData(e.target));

  player = await services.signin(login);
  if (!player) {
    const register = confirm('The login does not exist. Would you like to register ?\nRegistration is mandatory to play.');
    if (register) {
      player = await services.signup(login);
    }
  }

  if (player) {
    document.getElementById('game-container').classList.toggle('hidden');
    document.getElementById('login').classList.toggle('hidden');
    updateScore(player);
  }
}

/**
 * Update user score
 */
async function updateScore(player) {
  const { name, wins, defeats } = player;
  let field;

  field = document.getElementById('player');
  field.textContent = name;

  field = document.getElementById('wins');
  field.textContent = wins;

  field = document.getElementById('defeats');
  field.textContent = defeats;

  await services.updateScore(player);
}
