/* Mesmo obtejo existe no lado do Client os dois devem ser iguais */

function Ship(playerId, shipLocation) {
  this.playerId = playerId;
  this.type = shipLocation.type;
  this.circle = shipLocation.circle;
  this.angle = shipLocation.angle;
  this.alive = true;
}

export default Ship;
