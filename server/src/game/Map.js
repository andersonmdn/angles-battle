function Map() {
    this._map = [
        { angle: 0,     x: 60, 		y: -0 },
        { angle: 30,    x: 51.96, 	y: -30 },
        { angle: 60,    x: 30, 		y: -51.96 },
        { angle: 90,    x: -0, 		y: -60 },
        { angle: 120,   x: -30, 	y: -51.96 },
        { angle: 150,   x: -51.96, 	y: -30 },
        { angle: 180,   x: -60, 	y: 0 },
        { angle: 210,   x: -51.96, 	y: 30 },
        { angle: 240,   x: -30, 	y: 51.96 },
        { angle: 270,   x: 0, 		y: 60 },
        { angle: 300,   x: 30, 		y: 51.96 },
        { angle: 330,   x: 51.96, 	y: 30 },
        { angle: 360,   x: 60, 		y: 0 }
    ];

    function getOriginalCoordinate(angle) {
        let coordinate = this._map.find(coordinate => coordinate.angle == angle);

        return { x : coordinate.x, y : coordinate.y };
    };

    this.getCoordinate = function(circle, angle) {
        let coordinate = getOriginalCoordinate(angle);

        return { x : coordinate.x * circle, y : coordinate.y * circle };
    };
};

export default Map;