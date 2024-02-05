import { HumanPlayer }  from './Player.js';

export class Services {
  apiUrl = 'http://localhost:3000';

  /**
   * Log user to its account
   * @param {*} login The user login
   * @returns The logged user or undefined if error
   */
  async signin(login) {
    const url = `${this.apiUrl}/users?login=${login}`;
    const response = await fetch(url);
    const [user] = await response.json();
    return this.toPlayer(user);
  }

  /**
   * Register a new user account
   * @param {*} login The user login
   * @returns The registered user or undefined if error
   */
  async signup(login) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, wins: 0, defeats: 0 })
    }

    const response = await fetch(`${this.apiUrl}/users`, options);
    const user = await response.json();
    return this.toPlayer(user);
  }

  /**
   * Update the user's score
   * @param {*} login
   * @returns
   */
  async updateScore({ id, wins, defeats }) {
    const response = await fetch(`${this.apiUrl}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wins, defeats })
    });
    const [user] = await response.json();
    return this.toPlayer(user);
  }

  /**
   * Convert a json object to a Player instance
   * @param {*} value The user object
   * @returns A HumanPlayer instance or undefined if value is undefined
   */
  toPlayer(value) {
    return value ? new HumanPlayer(value) : undefined;
  }
}
