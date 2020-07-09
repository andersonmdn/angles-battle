import TrigonometricTable from "./TrigonometricTable.js";

function Canvas(canvas, images) {
  //CTX
  this._context = canvas.getContext("2d");
  this._images = images;

  //Measures
  this._canvasWidth = canvas.width;
  this._canvasHeight = canvas.height;
  this._blockWidth = canvas.height * 0.66;
  this._blockHeight = canvas.height * 0.66;
  this._halfBlockWidth = this._blockWidth / 2;
  this._halfBlockHeight = this._blockHeight / 2;
  this._additionalXP1 = canvas.width * 0.033;
  this._additionalXP2 = canvas.width * 0.7;
  this._additionalYP1 = canvas.height * 0.16;
  this._additionalYP2 = canvas.height * 0.16;

  //Style
  this._radioA = (2 * this._blockWidth) / 100;
  this._radioB = (15 * this._blockWidth) / 100;
  this._radioC = (30 * this._blockWidth) / 100;
  this._radioD = (45 * this._blockWidth) / 100;
  this._lineColor = "#ffffff";

  // Classes e Functions
  var myTrigonometricTable = new TrigonometricTable();

  this.drawHorizontalLine = function(addX, addY) {
    this._context.beginPath();
    this._context.moveTo(0 + addX, this._halfBlockHeight + addY);
    this._context.lineTo(this._blockWidth + addX, this._halfBlockHeight + addY);
    this._context.strokeStyle = this._lineColor;
    this._context.stroke();
  };

  this.drawVerticalLine = function(addX, addY) {
    this._context.beginPath();
    this._context.moveTo(this._halfBlockWidth + addX, addY);
    this._context.lineTo(this._halfBlockWidth + addX, this._blockHeight + addY);
    this._context.strokeStyle = this._lineColor;
    this._context.stroke();
  };

  this.drawLine = function(initialX, initialY, lastX, lastY, addX, addY) {
    this._context.beginPath();
    this._context.moveTo(initialX + addX, initialY + addY);
    this._context.lineTo(lastX + addX, lastY + addY);
    this._context.strokeStyle = this._lineColor;
    this._context.stroke();
  };

  this.drawCircle = function(radius, addX, addY) {
    this._context.beginPath();
    this._context.arc(
      this._halfBlockWidth + addX,
      this._halfBlockHeight + addY,
      radius,
      0,
      2 * Math.PI,
      true
    );
    this._context.strokeStyle = this._lineColor;
    this._context.opaciti = 1;
    this._context.stroke();
  };

  this.drawImage = function(img, x, y) {
    this._context.drawImage(img, x - 20, y - 20, 40, 40);
  };

  this.drawRadios = function(addX, addY) {
    let posA = myTrigonometricTable.getSeno(30) * this._radioD;
    let posB = this._blockWidth - posA;

    this.drawCircle(this._radioA, addX, addY);
    this.drawCircle(this._radioB, addX, addY);
    this.drawCircle(this._radioC, addX, addY);
    this.drawCircle(this._radioD, addX, addY);
    this.drawVerticalLine(addX, addY);
    this.drawHorizontalLine(addX, addY);

    let positionX = this._canvasWidth / 2;

    this.drawLine(positionX, 0, positionX, this._blockHeight, 0, addY);

    // Calculo para separar o quadro em 30º
    this.drawLine(posB, 0, posA, this._blockHeight, addX, addY);
    this.drawLine(posA, 0, posB, this._blockHeight, addX, addY);
    this.drawLine(0, posB, this._blockWidth, posA, addX, addY);
    this.drawLine(0, posA, this._blockWidth, posB, addX, addY);
  };

  this.drawRadiosP1 = function() {
    this.drawRadios(this._additionalXP1, this._additionalYP1);
  };

  this.drawRadiosP2 = function() {
    this.drawRadios(this._additionalXP2, this._additionalYP2);
  };

  this.drawText = function(text, x, y) {
    this._context.font = "20px Arial";
    this._context.fillText(text, x, y);
  };

  this.clearAll = function() {
    this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
  };

  this.getOriginalCoordinate = function(angle) {
    let _coordinate = [
      { angle: 0, x: 60, y: -0 },
      { angle: 30, x: 51.96, y: -30 },
      { angle: 60, x: 30, y: -51.96 },
      { angle: 90, x: -0, y: -60 },
      { angle: 120, x: -30, y: -51.96 },
      { angle: 150, x: -51.96, y: -30 },
      { angle: 180, x: -60, y: 0 },
      { angle: 210, x: -51.96, y: 30 },
      { angle: 240, x: -30, y: 51.96 },
      { angle: 270, x: 0, y: 60 },
      { angle: 300, x: 30, y: 51.96 },
      { angle: 330, x: 51.96, y: 30 },
      { angle: 360, x: 60, y: 0 }
    ];

    let coordinateAux = _coordinate.find(
      coordinate => coordinate.angle == angle
    );

    return { x: coordinateAux.x, y: coordinateAux.y };
  };

  this.getCoordinate = function(circle, angle) {
    let coordinate = this.getOriginalCoordinate(angle);

    return { x: coordinate.x * circle, y: coordinate.y * circle };
  };

  this.drawGame = function(playerMap) {
    this.clearAll();
    this.drawRadiosP1();
    this.drawRadiosP2();

    playerMap[0].forEach(ship => {
      if (
        ship != undefined &&
        ship.circle != undefined &&
        ship.angle != undefined &&
        ship.type !== 5
      ) {
        let coodenate = this.getCoordinate(ship.circle, ship.angle);

        if (ship.alive) {
          this.drawImage(
            this._images[ship.type - 1],
            coodenate.x + this._additionalXP1 + this._halfBlockWidth,
            coodenate.y + this._additionalYP1 + this._halfBlockHeight
          );
        } else {
          this.drawImage(
            this._images[ship.type - 1 + 5],
            coodenate.x + this._additionalXP1 + this._halfBlockWidth,
            coodenate.y + this._additionalYP1 + this._halfBlockHeight
          );
        }
      }
    });

    playerMap[1].forEach(ship => {
      if (
        ship != undefined &&
        !ship.alive &&
        ship.circle != undefined &&
        ship.angle != undefined
      ) {
        let coodenate = this.getCoordinate(ship.circle, ship.angle);
        this.drawImage(
          this._images[ship.type - 1],
          coodenate.x + this._additionalXP2 + this._halfBlockWidth,
          coodenate.y + this._additionalYP2 + this._halfBlockHeight
        );
      }
    });

    let angulos = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

    angulos.forEach(angle => {
      let coodenate = this.getCoordinate(4, angle);

      this._context.beginPath();
      this._context.font = "20px Arial";
      this._context.fillStyle = "#ffffff";

      this._context.fillText(
        angle,
        coodenate.x +
          this._additionalXP1 +
          this._halfBlockWidth -
          (this._context.measureText(angle).width / 2),
        coodenate.y + this._additionalYP1 + this._halfBlockHeight + 10
      );
      this._context.stroke();
    });

    angulos.forEach(angle => {
      let coodenate = this.getCoordinate(4, angle);

      this._context.beginPath();
      this._context.font = "20px Arial";
      this._context.fillStyle = "#ffffff";

      this._context.fillText(
        angle,
        coodenate.x +
          this._additionalXP2 +
          this._halfBlockWidth -
          this._context.measureText(angle).width / 2,
        coodenate.y + this._additionalYP2 + this._halfBlockHeight + 10
      );
      this._context.stroke();
    });
  };
}

function Map(playerId, canvas, images) {
  this._playerId = playerId;
  this._myCanvas = new Canvas(canvas, images);

  this.drawGame = function(playerMap) {
    this._myCanvas.drawGame(playerMap);
  };
}

export default Map;
