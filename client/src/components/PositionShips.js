function PositionsShips() {
	this.occupiedPosition = function(allShips, currentShip, currentIndex) {
		if (currentShip.circle == 0 && currentShip.angle == 0) {
			return true;
		}

		let occupiedPosition =
			allShips.find((ship, index) => {
				let equalCircle = ship.circle == currentShip.circle;
				let equalAngle =
					ship.angle == currentShip.angle ||
					(ship.angle == 0 && currentShip.angle == 360) ||
					(ship.angle == 360 && currentShip.angle == 0);
				let notIntexCurrent = index != currentIndex;

				return equalCircle && equalAngle && notIntexCurrent;
			}) !== undefined;

		if (occupiedPosition) {
			return false;
		}

		return true;
	};

	this.adjacentAngle = function(allShips, currentShip, currentIndex) {
		if (currentShip.circle == 0 && currentShip.angle == 0) {
			return true;
		}

		let isAdjacentAngle =
			allShips.find((ship, index) => {
				let equalCircle = ship.circle == currentShip.circle;
				let equalType = ship.type == currentShip.type;
				let adjacentAngle =
					ship.angle == currentShip.angle + 30 ||
					ship.angle == currentShip.angle - 30 ||
					(ship.angle == 0 && currentShip.angle == 330) ||
					(ship.angle == 330 && currentShip.angle == 0);
				let notIntexCurrent = index != currentIndex;

				return equalCircle && adjacentAngle && notIntexCurrent && equalType;
			}) !== undefined;

		return isAdjacentAngle;
	};

	this.adjacentCircle = function(allShips, currentShip, currentIndex) {
		if (currentShip.circle == 0 && currentShip.angle == 0) {
			return true;
		}

		let isAdjacentCircle =
			allShips.find((ship, index) => {
				let adjacentCircle =
					ship.circle == currentShip.circle + 1 || ship.circle == currentShip.circle - 1;
				let equalAngle =
					ship.angle == currentShip.angle ||
					(ship.angle == 0 && currentShip.angle == 360) ||
					(ship.angle == 360 && currentShip.angle == 0);
				let equalType = ship.type == currentShip.type;
				let notIntexCurrent = index != currentIndex;

				return equalAngle && adjacentCircle && notIntexCurrent && equalType;
			}) !== undefined;

		return isAdjacentCircle;
	};
}

export default PositionsShips;
