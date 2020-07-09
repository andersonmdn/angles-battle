
function KonvaMap() {
	this._defaultKonva 	= { width: 1500, height: 600 };
	this._defaultCircle = { x: 300, y: 300, radius: undefined, stroke: "white", strokeWidth: 1 };

	this.getKonvaConfig = function() {
		return this._defaultKonva;
	};

	this.getRadiosConfig = function(radio) {
		switch (radio) {
			case 0:
				this._defaultCircle.radius = 7.92;
				break;

			case 1:
				this._defaultCircle.radius = 59.4;
				break;
		
			case 2:
				this._defaultCircle.radius = 118.8;
				break;

			default:
				this._defaultCircle.radius = 178.2;
				break;
		}
		
		return this._defaultCircle;
	};
}

export default KonvaMap;
