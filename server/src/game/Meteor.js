
function Meteor(playerId, meteorLocation) {
    this.playerId = playerId;
    this.type = 5;
    this.circle = meteorLocation.circle;
    this.angle = meteorLocation.angle;
    this.alive = false;

    this.isAlive = function() {
        return this.alive;
    }

    this.isDead = function() {
        return !this.alive;
    }
}
    
export default Meteor;