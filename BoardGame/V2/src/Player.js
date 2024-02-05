export class Player {
  wins = 0;
  defeats = 0;
  human = false;
  name = '';

  constructor(human, { login, wins, defeats }) {
    this.human = human;
    this.name = login;
    this.wins = wins;
    this.defeats = defeats;
  }
}

export class HumanPlayer extends Player {
  id;

  constructor(player) {
    super(true, player);
    this.id = player.id;
  }
}

export class IAPlayer extends Player {
  constructor() {
    super(false, { login: 'IA', wins: 0, defeats: 0 });
  }
}
