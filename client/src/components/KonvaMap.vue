<template>
  <div>
    <img id="ship1" src="../assets/Kenney/Spaceship/1.png" style="display: none;" />
    <img id="ship2" src="../assets/Kenney/Spaceship/2.png" style="display: none;" />
    <img id="ship3" src="../assets/Kenney/Spaceship/3.png" style="display: none;" />
    <img id="ship4" src="../assets/Kenney/Spaceship/4.png" style="display: none;" />
    <img id="ship5" src="../assets/Kenney/Spaceship/5.png" style="display: none;" />
    <img id="ship6" src="../assets/Kenney/Spaceship/6.png" style="display: none;" />
    <img id="ship7" src="../assets/Kenney/Spaceship/7.png" style="display: none;" />
    <img id="ship8" src="../assets/Kenney/Spaceship/8.png" style="display: none;" />
    <img id="meteor" src="../assets/Kenney/Spaceship/9.png" style="display: none;" />
    <img id="fx" src="../assets/SparklinLabs/Fx/Fx7.png" style="display: none;" />

    <audio id="sparklinLabsDeath" style="display: block;">
      <source src="../assets/audio/SparklinLabs/Death.wav" type="audio/wav" />
    </audio>

    <audio id="sparklinLabsShootDestroy3" style="display: block;">
      <source src="../assets/audio/SparklinLabs/shoot-destroy-3.wav" type="audio/wav" />
    </audio>

    <audio id="sparklinLabsShooDarkShoot" style="display: block;">
      <source src="../assets/audio/SparklinLabs/darkShoot.wav" type="audio/wav" />
    </audio>

    <v-stage :config="configKonva">
      <v-layer>
        <v-circle v-for="n in konvaCircles.length" :key="n.id" :config="konvaCircles[n - 1]"></v-circle>
        <v-line v-for="n in konvaMainLines.length" :key="n.id" :config="konvaMainLines[n - 1]"></v-line>
        <v-image v-for="n in konvaImagesP1.length" :key="n.id" :config="konvaImagesP1[n - 1]"></v-image>
        <v-image v-for="n in konvaImagesP2.length" :key="n.id" :config="konvaImagesP2[n - 1]"></v-image>
        <v-text
          v-for="n in konvaAngleTextsP1.length"
          :key="n.id"
          :config="konvaAngleTextsP1[n - 1]"
        ></v-text>
        <v-text
          v-for="n in konvaAngleTextsP2.length"
          :key="n.id"
          :config="konvaAngleTextsP2[n - 1]"
        ></v-text>

        <v-sprite ref="sprite" :config="konvaSprite1"></v-sprite>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
/* eslint-disable */

import TrigonometricTable from "../scripts/TrigonometricTable.js";

const myTrigonometricTable = new TrigonometricTable();

const posX00 = myTrigonometricTable.getCosseno(0);
const posX30 = myTrigonometricTable.getCosseno(30);
const posX60 = myTrigonometricTable.getCosseno(60);
const posX90 = myTrigonometricTable.getCosseno(90);
const posY00 = myTrigonometricTable.getSeno(0);
const posY30 = myTrigonometricTable.getSeno(30);
const posY60 = myTrigonometricTable.getSeno(60);
const posY90 = myTrigonometricTable.getSeno(90);

export default {
  props: [],
  data() {
    return {
      configKonva: { width: 1900, height: 700 },
      konvaCircles: [
        { x: 0, y: 0, radius: 7.92, stroke: "#69B173", strokeWidth: 1 },
        { x: 0, y: 0, radius: 59.4, stroke: "#69B173", strokeWidth: 1 },
        { x: 0, y: 0, radius: 118.8, stroke: "#69B173", strokeWidth: 1 },
        { x: 0, y: 0, radius: 178.2, stroke: "#69B173", strokeWidth: 1 },

        { x: 0, y: 0, radius: 7.92, stroke: "#e24c50", strokeWidth: 1 },
        { x: 0, y: 0, radius: 59.4, stroke: "#e24c50", strokeWidth: 1 },
        { x: 0, y: 0, radius: 118.8, stroke: "#e24c50", strokeWidth: 1 },
        { x: 0, y: 0, radius: 178.2, stroke: "#e24c50", strokeWidth: 1 }
      ],
      konvaMainLines: [
        { x: 0, y: 0, stroke: "#69B173", strokeWidth: 1, points: [] },
        { x: 0, y: 0, stroke: "#69B173", strokeWidth: 1, points: [] },
        { x: 0, y: 0, stroke: "#69B173", strokeWidth: 1, points: [] },
        { x: 0, y: 0, stroke: "#69B173", strokeWidth: 1, points: [] },
        { x: 0, y: 0, stroke: "#69B173", strokeWidth: 1, points: [] },
        { x: 0, y: 0, stroke: "#69B173", strokeWidth: 1, points: [] },

        { x: 0, y: 0, stroke: "#e24c50", strokeWidth: 1, points: [] },
        { x: 0, y: 0, stroke: "#e24c50", strokeWidth: 1, points: [] },
        { x: 0, y: 0, stroke: "#e24c50", strokeWidth: 1, points: [] },
        { x: 0, y: 0, stroke: "#e24c50", strokeWidth: 1, points: [] },
        { x: 0, y: 0, stroke: "#e24c50", strokeWidth: 1, points: [] },
        { x: 0, y: 0, stroke: "#e24c50", strokeWidth: 1, points: [] }
      ],

      konvaAngleTextsP1: [
        {
          x: 0,
          y: 0,
          text: "0º / 360º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "30º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "60º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "90º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "120º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "150º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "180º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "210º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "240º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "270º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "300º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "330º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        }
        //			  	  { x: 0 + 300, y: 0 + 300, text: '', fontSize: 20, fontFamily: 'Avenir', fill: 'white' },
        // 				  { x: 150 + 300, y: 150 + 300, text: '(X+)(Y+)', fontSize: '25', fontFamily: 'Avenir', fill: 'white' },
        // 				  { x: 0, y: 150 + 300, text: '(X-)(Y+)', fontSize: '25', fontFamily: 'Avenir', fill: 'white' },
        // 				  { x: 150 + 300, y: 150, text: '(X+)(Y-)', fontSize: '25', fontFamily: 'Avenir', fill: 'white' },
        // 				  { x: 0, y: 150, text: '(X-)(Y-)', fontSize: '25', fontFamily: 'Avenir', fill: 'white' },
      ],

      konvaAngleTextsP2: [
        {
          x: 0,
          y: 0,
          text: "0º / 360º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "30º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "60º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "90º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "120º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "150º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "180º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "210º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "240º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "270º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "300º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        },
        {
          x: 0,
          y: 0,
          text: "330º",
          fontSize: 20,
          fontFamily: "Avenir",
          fill: "white"
        }
      ],

      konvaImagesP1: [
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 }
      ],

      konvaImagesP2: [
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 },
        { x: 0, y: 0, image: null, width: 40, height: 40 }
      ],
      konvaSprite1: {
        x: 0,
        y: 0,
        image: null,
        animation: "standing",
        animations: {
          standing: [
            0,
            0,
            82,
            72,
            82,
            0,
            82,
            72,
            164,
            0,
            82,
            72,
            246,
            0,
            82,
            72,
            328,
            0,
            82,
            72,
            410,
            0,
            82,
            72,
            492,
            0,
            82,
            72,
            574,
            0,
            82,
            72
          ]
        },
        frameRate: 10,
        frameIndex: 1,
        width: 5,
        height: 5
      },
      window: { width: 0, height: 0 },
      map: [{}, {}],
      timeSprite: undefined
    };
  },
  mounted() {},
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    konvaLocation: function(
      radius,
      angle,
      imgWidth,
      imgHeight,
      konvaP1X,
      konvaP1Y
    ) {
      let posX = 0;
      let posY = 0;

      if (angle == 30 || angle == 150 || angle == 210 || angle == 330) {
        posX = posX30;
        posY = posY30;
      } else {
        if (angle == 60 || angle == 120 || angle == 240 || angle == 300) {
          posX = posX60;
          posY = posY60;
        } else {
          if (angle == 90 || angle == 270) {
            posX = posX90;
            posY = posY90;
          } else {
            posX = posX00;
            posY = posY00;
          }
        }
      }

      posX = posX * radius;
      posY = posY * radius;

      if (angle == 0 || angle == 30 || angle == 60 || angle == 90) {
        posX = konvaP1X + posX - imgWidth / 2;
        posY = konvaP1Y - posY - imgHeight / 2;
      } else {
        if (angle == 120 || angle == 150 || angle == 180) {
          posX = konvaP1X - posX - imgWidth / 2;
          posY = konvaP1Y - posY - imgHeight / 2;
        } else {
          if (angle == 210 || angle == 240) {
            posX = konvaP1X - posX - imgWidth / 2;
            posY = konvaP1Y + posY - imgHeight / 2;
          } else {
            posX = konvaP1X + posX - imgWidth / 2;
            posY = konvaP1Y + posY - imgHeight / 2;
          }
        }
      }

      return { x: posX, y: posY };
    },
    updateMap: function(map) {
      this.map = map;
      const imgShip1 = document.getElementById("ship1");
      const imgShip2 = document.getElementById("ship2");
      const imgShip3 = document.getElementById("ship3");
      const imgShip4 = document.getElementById("ship4");
      const imgShip5 = document.getElementById("ship5");
      const imgShip6 = document.getElementById("ship6");
      const imgShip7 = document.getElementById("ship7");
      const imgShip8 = document.getElementById("ship8");
      const imgMeteor = document.getElementById("meteor");
      const imgExplosion = document.getElementById("fx");

      this.konvaSprite1.image = imgExplosion;
      const spriteExplosion = this.$refs.sprite.getNode();
      spriteExplosion.hide();
      spriteExplosion.stop();

      const canvasHP1 = this.konvaCircles[0].y;
      const canvasWP1 = this.konvaCircles[0].x;

      const canvasHP2 = this.konvaCircles[4].y;
      const canvasWP2 = this.konvaCircles[4].x;

      //PLAYER 1
      this.konvaImagesP1.forEach((konvaImage, index) => {
        if (index < map[0].length) {
          const radius = this.konvaCircles[map[0][index].circle].radius;
          const angle = map[0][index].angle;
          const type = map[0][index].type;
          const alive = map[0][index].alive;
          const imgWidth = konvaImage.width;
          const imgHeight = konvaImage.height;

          const imgCoordinate = this.konvaLocation(
            radius,
            angle,
            imgWidth,
            imgHeight,
            canvasWP1,
            canvasHP1
          );

          this.konvaImagesP1[index].x = imgCoordinate.x;
          this.konvaImagesP1[index].y = imgCoordinate.y;

          if (
            (this.konvaImagesP1[index].image == imgShip1 && !alive) ||
            (this.konvaImagesP1[index].image == imgShip2 && !alive) ||
            (this.konvaImagesP1[index].image == imgShip3 && !alive) ||
            (this.konvaImagesP1[index].image == imgShip4 && !alive)
          ) {
            this.konvaSprite1.x = imgCoordinate.x;
            this.konvaSprite1.y = imgCoordinate.y;
            spriteExplosion.show();
            spriteExplosion.start();
            document.getElementById("sparklinLabsDeath").play();

            this.timeSprite = setTimeout(() => {
              this.$refs.sprite.getNode().hide();
              //this.$refs.sprite.getNode().stop();
              //console.log("setTimeout");

              clearTimeout(this.timeSprite);
            }, 2000);
          }

          switch (type) {
            case 1:
              if (alive) {
                this.konvaImagesP1[index].image = imgShip1;
              } else {
                this.konvaImagesP1[index].image = imgShip5;
              }
              break;
            case 2:
              if (alive) {
                this.konvaImagesP1[index].image = imgShip2;
              } else {
                this.konvaImagesP1[index].image = imgShip6;
              }
              break;
            case 3:
              if (alive) {
                this.konvaImagesP1[index].image = imgShip3;
              } else {
                this.konvaImagesP1[index].image = imgShip7;
              }
              break;
            case 4:
              if (alive) {
                this.konvaImagesP1[index].image = imgShip4;
              } else {
                this.konvaImagesP1[index].image = imgShip8;
              }
              break;
          }
        }
      });

      //PLAYER 2
      this.konvaImagesP2.forEach((item, index) => {
        if (index < map[1].length) {
          map[1][index].circle;

          //RADIUS / ANGLE (X, Y) / TYPE
          const radius = this.konvaCircles[map[1][index].circle].radius;
          const angle = map[1][index].angle;
          const type = map[1][index].type;
          const alive = map[1][index].alive;
          const imgWidth = this.konvaImagesP2[index].width;
          const imgHeight = this.konvaImagesP2[index].height;

          const imgCoordinate = this.konvaLocation(
            radius,
            angle,
            imgWidth,
            imgHeight,
            canvasWP2,
            canvasHP2
          );

          this.konvaImagesP2[index].x = imgCoordinate.x;
          this.konvaImagesP2[index].y = imgCoordinate.y;

          switch (type) {
            case 1:
              if (!alive) {
                if (this.konvaImagesP2[index].image == null) {
                  document.getElementById("sparklinLabsShooDarkShoot").play();
                }
                this.konvaImagesP2[index].image = imgShip5;
              }
              break;
            case 2:
              if (!alive) {
                if (this.konvaImagesP2[index].image == null) {
                  document.getElementById("sparklinLabsShooDarkShoot").play();
                }
                this.konvaImagesP2[index].image = imgShip6;
              }
              break;
            case 3:
              if (!alive) {
                if (this.konvaImagesP2[index].image == null) {
                  document.getElementById("sparklinLabsShooDarkShoot").play();
                }
                this.konvaImagesP2[index].image = imgShip7;
              }
              break;
            case 4:
              if (!alive) {
                if (this.konvaImagesP2[index].image == null) {
                  document.getElementById("sparklinLabsShooDarkShoot").play();
                }
                this.konvaImagesP2[index].image = imgShip8;
              }
              break;

            default:
              if (this.konvaImagesP2[index].image == null) {
                document.getElementById("sparklinLabsShootDestroy3").play();
              }

              this.konvaImagesP2[index].image = imgMeteor;
              break;
          }
        }
      });
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      this.configKonva.width = this.window.width * 1;
      this.configKonva.height = this.window.height * 0.6;

      let canvasWP1 = this.configKonva.width * 0.2;
      let canvasHP1 = this.configKonva.height / 2;
      let canvasWP2 = this.configKonva.width * 0.7;
      let canvasHP2 = this.configKonva.height / 2;
      let lineW = canvasHP1 * 0.7666666667;

      this.konvaCircles[0].radius = this.configKonva.height * 0.0132;
      this.konvaCircles[1].radius = this.configKonva.height * 0.099;
      this.konvaCircles[2].radius = this.configKonva.height * 0.198;
      this.konvaCircles[3].radius = this.configKonva.height * 0.297;

      this.konvaCircles[4].radius = this.configKonva.height * 0.0132;
      this.konvaCircles[5].radius = this.configKonva.height * 0.099;
      this.konvaCircles[6].radius = this.configKonva.height * 0.198;
      this.konvaCircles[7].radius = this.configKonva.height * 0.297;

      this.konvaSprite1.scaleX = (this.configKonva.height * 0.068799) / 82;
      this.konvaSprite1.scaleY = (this.configKonva.height * 0.068799) / 72;

      this.konvaImagesP1.forEach((item, index) => {
        this.konvaImagesP1[index].width = this.configKonva.height * 0.068799;
        this.konvaImagesP1[index].height = this.configKonva.height * 0.068799;
      });

      this.konvaImagesP2.forEach((item, index) => {
        this.konvaImagesP2[index].width = this.configKonva.height * 0.068799;
        this.konvaImagesP2[index].height = this.configKonva.height * 0.068799;
      });

      this.konvaCircles.forEach((item, index) => {
        if (index <= 3) {
          this.konvaCircles[index].x = canvasWP1;
          this.konvaCircles[index].y = canvasHP1;
        } else {
          this.konvaCircles[index].x = canvasWP2;
          this.konvaCircles[index].y = canvasHP2;
        }
      });

      this.konvaMainLines.forEach((item, index) => {
        if (index <= 5) {
          this.konvaMainLines[index].x = canvasWP1;
          this.konvaMainLines[index].y = canvasHP1;
        } else {
          this.konvaMainLines[index].x = canvasWP2;
          this.konvaMainLines[index].y = canvasHP2;
        }
      });

      let newCanvasWP1 = 300 - 50;
      let newCanvasHP1 = 300 - 50;
      let newCanvasWP2 = 300 - 50;
      let newCanvasHP2 = 300 - 50;

      // this.konvaMainLines[0].points = [newCanvasWP1 * -1, 0, newCanvasWP1, 0];
      // this.konvaMainLines[1].points = [0, newCanvasHP1 * -1, 0, newCanvasHP1];

      const myTrigonometricTable = new TrigonometricTable();

      let newPosX00 = posX00 * lineW;
      let newPosX30 = posX30 * lineW;
      let newPosX60 = posX60 * lineW;
      let newPosY00 = posY00 * lineW;
      let newPosY30 = posY30 * lineW;
      let newPosY60 = posY60 * lineW;

      this.konvaMainLines[0].points = [newPosX00 * -1, 0, newPosX00, 0];
      this.konvaMainLines[1].points = [0, newPosX00 * -1, 0, newPosX00];
      this.konvaMainLines[2].points = [
        newPosX30,
        newPosY30 * -1,
        newPosX30 * -1,
        newPosY30
      ];
      this.konvaMainLines[3].points = [
        newPosX60,
        newPosY60 * -1,
        newPosX60 * -1,
        newPosY60
      ];
      this.konvaMainLines[4].points = [
        newPosX30 * -1,
        newPosY30 * -1,
        newPosX30,
        newPosY30
      ];
      this.konvaMainLines[5].points = [
        newPosX60 * -1,
        newPosY60 * -1,
        newPosX60,
        newPosY60
      ];

      this.konvaMainLines[6].points = [newPosX00 * -1, 0, newPosX00, 0];
      this.konvaMainLines[7].points = [0, newPosX00 * -1, 0, newPosX00];

      this.konvaMainLines[8].points = [
        newPosX30,
        newPosY30 * -1,
        newPosX30 * -1,
        newPosY30
      ];
      this.konvaMainLines[9].points = [
        newPosX60,
        newPosY60 * -1,
        newPosX60 * -1,
        newPosY60
      ];
      this.konvaMainLines[10].points = [
        newPosX30 * -1,
        newPosY30 * -1,
        newPosX30,
        newPosY30
      ];
      this.konvaMainLines[11].points = [
        newPosX60 * -1,
        newPosY60 * -1,
        newPosX60,
        newPosY60
      ];

      this.konvaAngleTextsP1.forEach((item, index) => {
        //RADIUS / ANGLE (X, Y) / TYPE
        let radius = canvasHP1 * 0.85;
        let angle = this.konvaAngleTextsP1[index].text;
        let posX = 0;
        let posY = 0;

        // '0º / 360º' - '180º'
        if (
          angle == "30º" ||
          angle == "150º" ||
          angle == "210º" ||
          angle == "330º"
        ) {
          posX = posX30;
          posY = posY30;
        } else {
          if (
            angle == "60º" ||
            angle == "120º" ||
            angle == "240º" ||
            angle == "300º"
          ) {
            posX = posX60;
            posY = posY60;
          } else {
            if (angle == "90º" || angle == "270º") {
              posX = posX90;
              posY = posY90;
            } else {
              posX = posX00;
              posY = posY00;
            }
          }
        }

        posX = posX * radius;
        posY = posY * radius;

        if (
          angle == "0º / 360º" ||
          angle == "30º" ||
          angle == "60º" ||
          angle == "90º"
        ) {
          posX = canvasWP1 + posX - 20;
          posY = canvasHP1 - posY - 20;
        } else {
          if (angle == "120º" || angle == "150º" || angle == "180º") {
            posX = canvasWP1 - posX - 20;
            posY = canvasHP1 - posY - 20;
          } else {
            if (angle == "210º" || angle == "240º") {
              posX = canvasWP1 - posX - 20;
              posY = canvasHP1 + posY - 20;
            } else {
              posX = canvasWP1 + posX - 20;
              posY = canvasHP1 + posY - 20;
            }
          }
        }

        this.konvaAngleTextsP1[index].x = posX;
        this.konvaAngleTextsP1[index].y = posY;
      });

      this.konvaAngleTextsP2.forEach((item, index) => {
        //RADIUS / ANGLE (X, Y) / TYPE
        let radius = canvasHP1 * 0.85;
        let angle = this.konvaAngleTextsP2[index].text;
        let posX = 0;
        let posY = 0;

        // '0º / 360º' - '180º'
        if (
          angle == "30º" ||
          angle == "150º" ||
          angle == "210º" ||
          angle == "330º"
        ) {
          posX = posX30;
          posY = posY30;
        } else {
          if (
            angle == "60º" ||
            angle == "120º" ||
            angle == "240º" ||
            angle == "300º"
          ) {
            posX = posX60;
            posY = posY60;
          } else {
            if (angle == "90º" || angle == "270º") {
              posX = posX90;
              posY = posY90;
            } else {
              posX = posX00;
              posY = posY00;
            }
          }
        }

        posX = posX * radius;
        posY = posY * radius;

        if (
          angle == "0º / 360º" ||
          angle == "30º" ||
          angle == "60º" ||
          angle == "90º"
        ) {
          posX = canvasWP2 + posX - 20;
          posY = canvasHP2 - posY - 20;
        } else {
          if (angle == "120º" || angle == "150º" || angle == "180º") {
            posX = canvasWP2 - posX - 20;
            posY = canvasHP2 - posY - 20;
          } else {
            if (angle == "210º" || angle == "240º") {
              posX = canvasWP2 - posX - 20;
              posY = canvasHP2 + posY - 20;
            } else {
              posX = canvasWP2 + posX - 20;
              posY = canvasHP2 + posY - 20;
            }
          }
        }

        this.konvaAngleTextsP2[index].x = posX;
        this.konvaAngleTextsP2[index].y = posY;
      });

      this.updateMap(this.map);
    },
    reset: function() {
      //PLAYER 1
      this.konvaImagesP1.forEach((item, index) => {
        this.konvaImagesP1[index].x = 0;
        this.konvaImagesP1[index].y = 0;
        this.konvaImagesP1[index].image = null;
      });

      //PLAYER 2
      this.konvaImagesP2.forEach((item, index) => {
        this.konvaImagesP2[index].x = 0;
        this.konvaImagesP2[index].y = 0;
        this.konvaImagesP2[index].image = null;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.konva {
  border: 1px solid #c9d1db;
}
</style>
