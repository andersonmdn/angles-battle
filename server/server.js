const Express = require("express")();
const Http = require("http").Server(Express);
const io = require("socket.io")(Http);

import Game from "./src/game/Game.js";

var MyGame = new Game();

io.on("connection", socket => {
    console.log(`> Player Connected: ${ socket.id }`);
    
    MyGame.addPlayer(socket.id);

    socket.on("newShip", ({ shipLocation }) => {
        console.log(`> New ${ socket.id } Ship - Type: ${ shipLocation.type }`);
        console.log(`\t Location Circle: ${ shipLocation.circle } Angle: ${ shipLocation.angle }`);
        
        io.emit("updateMap", { position, players });
    });

    socket.on("disconnect", () => {
        console.log(`> Player Disconnected: ${ socket.id }`);
        MyGame.removePlayer(socket.id);
    });
});

Http.listen(3001, () => {
    console.log("- Local: http://localhost:3001/");
});