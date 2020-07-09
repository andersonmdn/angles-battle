
function Player(id) {
  this._id = id;

  this.getPlayerId = function() {
    return this._id;
  }
}

export default Player;
