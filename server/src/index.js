const Express = require('express')();
const Http = require('http').Server(Express);
const io = require('socket.io')(Http);

import Game from './game/Game.js';

var Start = false;
var CountDown = false;
var StartCountDown = false;
var Attack = false;
var MyGame = new Game();

function updateShift() {
	let time = MyGame.decreaseTime();

	io.emit('updateTime', time);

	if (StartCountDown) {
		StartCountDown = false;
		CountDown = true;
		MyGame.resetTimeCountDown();
		io.emit('countDown', true);
	}

	if (time == 0 && CountDown) {
		Start = true;
		CountDown = false;
		io.emit('countDown', false);
	}

	if ((time == 0 || Start || Attack) && !CountDown) {
		MyGame.resetTime();
		Start = false;
		Attack = false;
		MyGame.changeShift();
		io.emit('updateShiftPlayer', MyGame.getShift());
	}
}

setInterval(updateShift, 1000);

io.on('connection', (socket) => {
	MyGame.addPlayer(socket.id);

	socket.on('saveMap', (shipsLocation) => {
		for (let index = 0; index < shipsLocation.length; index++) {
			const ship = shipsLocation[index];
			MyGame.addShip(socket.id, { type: ship.type, circle: ship.circle, angle: ship.angle });
		}

		MyGame.setReady(socket.id);

		let playersIds = MyGame._players;

		if (MyGame.isReady()) {
			StartCountDown = true;
			playersIds.forEach((playerId) => {
				io.to(`${playerId}`).emit('enemyName', MyGame.getEnemyName(playerId));
			});
		}

		playersIds.forEach((playerId) => {
			io.to(`${playerId}`).emit('updateMap', MyGame.getMap(playerId));
		});
	});

	socket.on('attack', (attackLocation) => {
		/* Chamar uma função para dar dano em uma nave inimiga */
		let attackReturn = MyGame.attackShip(socket.id, attackLocation);

		if (attackReturn == 'was destroyed') {
		} else {
			if (attackReturn == 'not destroyed') {
				MyGame.addMeteor(MyGame.getEnemy(socket.id), {
					circle: attackLocation.circle,
					angle: attackLocation.angle,
				});
			}

			let playersIds = MyGame._players;

			playersIds.forEach((playerId) => {
				io.to(`${playerId}`).emit('updateMap', MyGame.getMap(playerId));
			});

			Attack = true;

			updateShift();

			if (MyGame.isWinner(socket.id)) {
				io.to(`${socket.id}`).emit('winner');
				io.to(`${MyGame.getEnemy(socket.id)}`).emit('loser');

				//Reiniciar
				Start = false;
				CountDown = false;
				StartCountDown = false;
				Attack = false;
				playersIds.forEach((playerId) => {
					MyGame.removeShips(playerId);
					io.to(`${playerId}`).emit('updateMap', MyGame.getMap(playerId));
				});
			}
		}

		io.to(`${socket.id}`).emit('attackReturn', attackReturn);
	});

	socket.on('disconnect', () => {
		if (MyGame.isReady()) {
			var player1 = MyGame.getPlayerName(MyGame.getPlayer(socket.id));
			var player2 = MyGame.getPlayerName(MyGame.getEnemy(socket.id));
			io.to(`${MyGame.getEnemy(socket.id)}`).emit('interruptedGame', {
				winner: player2,
				loser: player1,
			});

			MyGame.removeShips(MyGame.getPlayer(socket.id));
			MyGame.removeShips(MyGame.getEnemy(socket.id));
		}

		MyGame.removePlayer(socket.id);
	});

	socket.on('playerName', (playerName) => {
		MyGame.setPlayerName(socket.id, playerName);
	});
});

Http.listen(3001, () => {
	console.log('- Local: http://localhost:3001/');
});
