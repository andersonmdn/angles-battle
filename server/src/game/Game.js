import Map from './Map.js';
import Ship from './Ship.js';
import Meteor from './Meteor.js';

var MyMap = new Map();

function Game() {
	this._players = ['', ''];
	this._playersName = ['', ''];
	this._ready = [false, false];
	this._ships = [[], []];

	this._time = 10;
	(this._shift = ''), //ID1 or ID2
		(this.setReady = function (playerId) {
			if (this.isP1(playerId)) {
				this._ready[0] = true;
			} else {
				this._ready[1] = true;
			}
		});

	this.addPlayer = function (playerId) {
		const P2Empty = this._players[1] == '' && this._players[0] != '';
		const P1Empty = this._players[0] == '';

		if (P2Empty) {
			this._players[1] = playerId;
		}
		if (P1Empty) {
			this._players[0] = playerId;
		}
		console.log(`[+ ${playerId}] Game - Players:`, this._players);
	};

	this.removeShips = function (playerId) {
		if (this.isP1(playerId)) {
			this._ships[0] = [];
			this._ready[0] = false;
		} else {
			this._ships[1] = [];
			this._ready[1] = false;
		}
	};

	this.removePlayer = function (playerId) {
		this.removeShips(playerId);

		if (this._players[0] == playerId) {
			this._players[0] = '';
		}
		if (this._players[1] == playerId) {
			this._players[1] = '';
		}
		console.log(`[X ${playerId}] Game - Players:`, this._players);
	};

	this.isP1 = function (playerId) {
		return playerId == this._players[0];
	};

	this.isP2 = function (playerId) {
		return playerId == this._players[1];
	};

	this.addShip = function (playerId, shipLocation) {
		if (this.isP1(playerId)) {
			this._ships[0][this._ships[0].length] = new Ship(playerId, shipLocation);
		} else {
			this._ships[1][this._ships[1].length] = new Ship(playerId, shipLocation);
		}
	};

	this.addMeteor = function (playerId, meteorLocation) {
		if (this.isP1(playerId)) {
			this._ships[0][this._ships[0].length] = new Meteor(playerId, meteorLocation);
		} else {
			this._ships[1][this._ships[1].length] = new Meteor(playerId, meteorLocation);
		}
	};

	this.attackShip = function (playerId, attackLocation) {
		let enemyShips = [];
		let attackReturn = 'not destroyed';

		if (this.isP1(playerId)) {
			enemyShips = this._ships[1]; //P2
		} else {
			enemyShips = this._ships[0]; //P1
		}

		enemyShips.forEach((ship) => {
			let equalCircle = ship.circle == attackLocation.circle;
			let equalAngle =
				ship.angle == attackLocation.angle ||
				(ship.angle == 0 && attackLocation.angle == 360) ||
				(ship.angle == 360 && attackLocation.angle == 0);

			if (equalCircle && equalAngle) {
				if (ship.alive) {
					ship.alive = false;
					attackReturn = 'destroyed';
				} else {
					attackReturn = 'was destroyed';
				}
			}
		});

		return attackReturn;
	};

	this.isWinner = function (playerId) {
		let enemyShips = [];
		let isWinner = true;

		if (this.isP1(playerId)) {
			enemyShips = this._ships[1]; //P2
		} else {
			enemyShips = this._ships[0]; //P1
		}

		enemyShips.forEach((ship) => {
			if (ship.isAlive()) {
				isWinner = false;
			}
		});

		return isWinner;
	};

	this.getPlayer = function (playerId) {
		if (this.isP1(playerId)) {
			return this._players[0];
		} else {
			return this._players[1];
		}
	};

	this.getEnemy = function (playerId) {
		if (this.isP1(playerId)) {
			return this._players[1];
		} else {
			return this._players[0];
		}
	};

	this.getMap = function (playerId) {
		let playerMap = [[], []];

		if (this.isP1(playerId)) {
			playerMap = [this._ships[0], this._ships[1]];
		} else {
			playerMap = [this._ships[1], this._ships[0]];
		}

		return playerMap;
	};

	this.setPlayerName = function (playerId, playerName) {
		if (this.isP1(playerId)) {
			this._playersName[0] = playerName;
			console.log('P1', playerName);
		} else {
			this._playersName[1] = playerName;
			console.log('P2', playerName);
		}
	};

	this.getEnemyName = function (playerId) {
		if (this.isP1(playerId)) {
			return this._playersName[1];
		} else {
			return this._playersName[0];
		}
	};

	this.getPlayerName = function (playerId) {
		if (this.isP1(playerId)) {
			return this._playersName[0];
		} else {
			return this._playersName[1];
		}
	};

	this.changeShift = function (player) {
		if (this.isReady()) {
			if (this.shift == this._players[0]) {
				this.shift = this._players[1];
			} else {
				this.shift = this._players[0];
			}
		}
	};

	this.getShift = function () {
		return this.shift;
	};

	this.setShift = function (shift) {
		this.shift = shift;
	};

	this.resetTime = function () {
		this._time = 50;
	};

	this.resetTimeCountDown = function () {
		this._time = 10;
	};

	this.isReady = function () {
		return this._players[0] !== '' && this._players[1] !== '' && this._ready[0] && this._ready[1];
	};

	this.decreaseTime = function () {
		if (this.isReady()) {
			if (this._time > 0) {
				this._time -= 1;
			} else {
				this.resetTime();
			}
		}

		return this._time;
	};
}

export default Game;
