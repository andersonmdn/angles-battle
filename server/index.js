const Express = require('express')();
const Http = require('http').Server(Express);
const io = require('socket.io')(Http);

var players = { p1: '', p2: '' };

var position = [
	{ radio: 60, angle: 0, x: 60, y: -0, p1: { life: -1, type: 'A' }, p2: { life: -1, type: 'A' } },
	{
		radio: 60,
		angle: 30,
		x: 51.96,
		y: -30,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 60,
		angle: 60,
		x: 30,
		y: -51.96,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{ radio: 60, angle: 90, x: -0, y: -60, p1: { life: -1, type: 'A' }, p2: { life: -1, type: 'A' } },
	{
		radio: 60,
		angle: 120,
		x: -30,
		y: -51.96,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 60,
		angle: 150,
		x: -51.96,
		y: -30,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{ radio: 60, angle: 180, x: -60, y: 0, p1: { life: -1, type: 'A' }, p2: { life: -1, type: 'A' } },
	{
		radio: 60,
		angle: 210,
		x: -51.96,
		y: 30,
		p1: { life: -1, type: 'B' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 60,
		angle: 240,
		x: -30,
		y: 51.96,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{ radio: 60, angle: 270, x: 0, y: 60, p1: { life: -1, type: 'A' }, p2: { life: -1, type: 'A' } },
	{
		radio: 60,
		angle: 300,
		x: 30,
		y: 51.96,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'C' },
	},
	{
		radio: 60,
		angle: 330,
		x: 51.96,
		y: 30,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{ radio: 60, angle: 360, x: 60, y: 0, p1: { life: -1, type: 'A' }, p2: { life: -1, type: 'A' } },
	{ radio: 120, angle: 0, x: 120, y: -0, p1: { life: -1, type: 'A' }, p2: { life: -1, type: 'A' } },
	{
		radio: 120,
		angle: 30,
		x: 103.92,
		y: -60,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 120,
		angle: 60,
		x: 60,
		y: -103.92,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 120,
		angle: 90,
		x: -0,
		y: -120,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 120,
		angle: 120,
		x: -60,
		y: -103.92,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 120,
		angle: 150,
		x: -103.92,
		y: -60,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 120,
		angle: 180,
		x: -120,
		y: 0,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 120,
		angle: 210,
		x: -103.92,
		y: 60,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 120,
		angle: 240,
		x: -60,
		y: 103.92,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 120,
		angle: 270,
		x: 0,
		y: 120,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 120,
		angle: 300,
		x: 60,
		y: 103.92,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'C' },
	},
	{
		radio: 120,
		angle: 330,
		x: 103.92,
		y: 60,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 120,
		angle: 360,
		x: 120,
		y: 0,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{ radio: 180, angle: 0, x: 180, y: -0, p1: { life: -1, type: 'A' }, p2: { life: -1, type: 'A' } },
	{
		radio: 180,
		angle: 30,
		x: 155.88,
		y: -90,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 180,
		angle: 60,
		x: 90,
		y: -155.88,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 180,
		angle: 90,
		x: -0,
		y: -180,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 180,
		angle: 120,
		x: -90,
		y: -155.88,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 180,
		angle: 150,
		x: -155.88,
		y: -90,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 180,
		angle: 180,
		x: -180,
		y: 0,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 180,
		angle: 210,
		x: -155.88,
		y: 90,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 180,
		angle: 240,
		x: -90,
		y: 155.88,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 180,
		angle: 270,
		x: 0,
		y: 180,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 180,
		angle: 300,
		x: 90,
		y: 155.88,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'C' },
	},
	{
		radio: 180,
		angle: 330,
		x: 155.88,
		y: 90,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
	{
		radio: 180,
		angle: 360,
		x: 180,
		y: 0,
		p1: { life: -1, type: 'A' },
		p2: { life: -1, type: 'A' },
	},
];

io.on('connection', (socket) => {
	console.log(`> Player Connected: ${socket.id}`);

	if (players.p1 == '') {
		players.p1 = socket.id;
	} else {
		players.p2 = socket.id;
	}

	console.log(players);

	socket.emit('position', { position, players });

	socket.on('addSpaceship', (data) => {
		for (let index = 0; index < position.length; index++) {
			const _postion = position[index];

			if (_postion.radio == data.radio && _postion.angle == data.angle) {
				if (players.p1 == socket.id) {
					position[index].p1.type = data.type;
					position[index].p1.life = 1;
				} else {
					position[index].p2.type = data.type;
					position[index].p2.life = 1;
				}
			}
		}

		io.emit('position', { position, players });
	});

	socket.on('fire', (data) => {
		position.forEach((pos) => {
			if (pos.radio == data.radio && pos.angle == data.angle) {
				if (players.p1 == socket.id) {
					if (pos.p2.life == 1) {
						pos.p2.life = 0;
					}
				}
				if (players.p2 == socket.id) {
					if (pos.p1.life == 1) {
						pos.p1.life = 0;
					}
				}
			}
		});

		io.emit('position', { position, players });
	});

	socket.on('disconnect', (data) => {
		socket.emit('position', { position, players });
		if (players.p1 == socket.id) {
			players.p1 = '';
		}
		if (players.p2 == socket.id) {
			players.p2 = '';
		}
	});
});

Http.listen(3001, () => {
	console.log('- Local: http://localhost:3001/');
});
