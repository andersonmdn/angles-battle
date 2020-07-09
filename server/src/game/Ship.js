
/* Mesmo obtejo existe no lado do Client os dois devem ser iguais */

function Ship(playerId, shipLocation) {
  this.playerId = playerId;
  this.type = shipLocation.type;
  this.circle = shipLocation.circle;
  this.angle = shipLocation.angle;

  // if (!shipLocation.alive) {
  //   this.alive = shipLocation.alive;
  // }else{
    this.alive = true;
  // }
  

  this.isAlive = function() {
    return this.alive;
  }

  this.isDead = function() {
    return !this.alive;
  }
}
  
  export default Ship;
  