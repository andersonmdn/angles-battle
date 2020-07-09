<template>
  <v-container fluid>
    <my-end-game :visible="victory" text="Vitória" icon="crown" color="green--text" @click="reset"></my-end-game>
    <my-end-game :visible="defeat" text="Derrota" icon="skull" color="red--text" @click="reset"></my-end-game>
    <my-count-down :visible="countDown" :time.sync="time"></my-count-down>
    <my-player-info :visible="playerName == ''" counter="20" @click="playerInfo"></my-player-info>
    <my-positions-ships-1
      :visible="round == ROUND_PLANNING && !ready"
      :ships="ships"
      v-on:updateMap=" ships => { updateMap([ships, []]); }"
      v-on:save=" () => { ready = true; saveMap(); }"
    ></my-positions-ships-1>

    <v-row justify="center" class="d-flex align-center justify-start">
      <v-col md="3" class="transparent" v-if="playerName !== ''">
        <v-row class="justify-center">
          <span class="green--text title">{{ playerName }} - Naves Aliadas</span>
        </v-row>
        <v-row>
          <v-col>
            <img id="img1" src="../assets/Kenney/Spaceship/1.png" height="40" width="40" />
            <span class="white--text">X {{ mapCount[0][0] }}</span>
          </v-col>

          <v-col>
            <img id="img1" src="../assets/Kenney/Spaceship/2.png" height="40" width="40" />
            <span class="white--text">X {{ mapCount[0][1] }}</span>
          </v-col>

          <v-col>
            <img id="img1" src="../assets/Kenney/Spaceship/3.png" height="40" width="40" />
            <span class="white--text">X {{ mapCount[0][2] }}</span>
          </v-col>

          <v-col>
            <img id="img1" src="../assets/Kenney/Spaceship/4.png" height="40" width="40" />
            <span class="white--text">X {{ mapCount[0][3] }}</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="6" class="transparent">
        <my-status-game :visible="playerName !== ''" :round="round" :time.sync="time"></my-status-game>
      </v-col>
      <v-col md="3" class="transparent" v-if="playerName !== ''">
        <v-row class="justify-center">
          <span class="red--text title">{{ enemyName }} - Naves Inimigas</span>
        </v-row>
        <v-row>
          <v-col>
            <img id="img1" src="../assets/Kenney/Spaceship/1.png" height="40" width="40" />
            <span class="white--text">X {{ mapCount[1][0] }}</span>
          </v-col>

          <v-col>
            <img id="img1" src="../assets/Kenney/Spaceship/2.png" height="40" width="40" />
            <span class="white--text">X {{ mapCount[1][1] }}</span>
          </v-col>

          <v-col>
            <img id="img1" src="../assets/Kenney/Spaceship/3.png" height="40" width="40" />
            <span class="white--text">X {{ mapCount[1][2] }}</span>
          </v-col>

          <v-col>
            <img id="img1" src="../assets/Kenney/Spaceship/4.png" height="40" width="40" />
            <span class="white--text">X {{ mapCount[1][3] }}</span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col>
        <my-konva-map v-if="playerName !== ''" ref="konvaMap"></my-konva-map>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-expand-x-transition>
          <my-attack-location
            v-bind:wasDestroyed="wasDestroyed"
            v-if="round == 'your round'"
            v-on:fire=" fireLocation => { attackLocation(fireLocation); }"
          ></my-attack-location>
        </v-expand-x-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */

// @ is an alias to /src
import io from "socket.io-client";
import axios from "axios";

import Ship from "./Ship.js";
import PositionShips1 from "../components/PositionsShips1.vue";
import AttackLocation from "../components/AttackLocation.vue";
import EndGame from "../components/EndGame.vue";
import CountDown from "../components/CountDown.vue";
import StatusGame from "../components/StatusGame.vue";
import PlayerInfo from "../components/PlayerInfo.vue";
import KonvaMap from "../components/KonvaMap.vue";

//queue = fila
export default {
  components: {
    "my-positions-ships-1": PositionShips1,
    "my-konva-map": KonvaMap,
    "my-attack-location": AttackLocation,
    "my-end-game": EndGame,
    "my-count-down": CountDown,
    "my-status-game": StatusGame,
    "my-player-info": PlayerInfo
  },
  data() {
    return {
      ROUND_PLANNING: "planning",
      ROUND_YOUR_ROUND: "your round",
      ROUND_ENEMY_ROUND: "enemy round",
      playerId: "",
      playerName: "",
      enemyName: "",
      playerRanking: [],
      round: "", //planning, your round, enemy round
      ready: false,
      time: 10,
      myInterval: {},
      socket: {},
      victory: false,
      defeat: false,
      countDown: false,
      wasDestroyed: false,
      fired: false,
      ships: [],
      rounds: 0,
      mapCount: [
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    };
  },
  created() {
    this.socket = io(`${process.env.VUE_APP_GAME_SERVER}`);
    this.socket.on("connect", () => {
      this.playerId = this.socket.id;

      this.ships = [
        new Ship(this.playerId, { type: 1, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 1, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 1, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 1, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 1, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 2, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 2, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 2, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 2, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 3, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 3, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 3, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 4, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 4, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 4, circle: 0, angle: 0 }),
        new Ship(this.playerId, { type: 4, circle: 0, angle: 0 })
      ];
    });
  },
  mounted() {
    this.socket.on("updateMap", this.updateMap);
    this.socket.on("updateShiftPlayer", this.updateShiftPlayer);
    this.socket.on("updateTime", this.updateTime);
    this.socket.on("winner", this.winner);
    this.socket.on("loser", this.loser);
    this.socket.on("interruptedGame", this.interruptedGame);
    this.socket.on("countDown", countDown => {
      this.countDown = countDown;
    });
    this.socket.on("attackReturn", this.attackReturn);
    this.socket.on("enemyName", enemy => {
      this.enemyName = enemy;
    });
  },
  beforeDestroy() {
    this.socket.close();
  },
  methods: {
    interruptedGame: function(players) {
      console.log(players.loser);
      console.log(players.winner);

      this.loserDB(players.loser);
      this.winnerDB(players.winner);

      this.defeat = false;
    },
    winner: function() {
      this.winnerDB(this.playerName);
    },
    loser: function() {
      this.loserDB(this.playerName);
    },
    winnerDB: function(playerName) {
      this.victory = true;
      this.round = this.ROUND_PLANNING;
      console.log("winnerDB", playerName);
      axios
        .get(`${process.env.VUE_APP_GAME_DB}/api/ranking/${playerName}`)
        .then(response => {
          if (response.data) {
            this.playerRanking = response.data;
            this.playerRanking.victories++;
            if (
              this.rounds <= this.playerRanking.rounds ||
              this.playerRanking.rounds < 16
            ) {
              if (this.rounds < 16) {
                this.playerRanking.rounds = this.playerRanking.rounds;
              } else {
                this.playerRanking.rounds = this.rounds;
              }
            }
            axios
              .put(
                `${process.env.VUE_APP_GAME_DB}/api/ranking/${playerName}`,
                this.playerRanking
              )
              .then(function(response) {
                console.log(response);
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            console.log("Unregistered player");
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    loserDB: function(playerName) {
      this.defeat = true;
      this.round = this.ROUND_PLANNING;
      console.log("loserDB", playerName);

      axios
        .get(`${process.env.VUE_APP_GAME_DB}/api/ranking/${playerName}`)
        .then(response => {
          if (response.data) {
            this.playerRanking = response.data;
            this.playerRanking.defeats++;
            axios
              .put(
                `${process.env.VUE_APP_GAME_DB}/api/ranking/${playerName}`,
                this.playerRanking
              )
              .then(function(response) {
                console.log(response);
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            console.log("Unregistered player");
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    attackReturn: function(status) {
      var x = {};
      this.wasDestroyed = false;

      if (status == "not destroyed") {
        this.fired = true;
      }

      if (status == "destroyed") {
        this.fired = true;
      }

      if (status == "was destroyed") {
        this.wasDestroyed = true;
      }
    },
    playerInfo: function(playerName) {
      this.playerName = playerName;
      this.round = this.ROUND_PLANNING;

      if (this.playerName == "Anderson") {
        this.ships = [
          new Ship(this.playerId, { type: 1, circle: 3, angle: 210 }),
          new Ship(this.playerId, { type: 1, circle: 2, angle: 240 }),
          new Ship(this.playerId, { type: 1, circle: 2, angle: 300 }),
          new Ship(this.playerId, { type: 1, circle: 3, angle: 330 }),
          new Ship(this.playerId, { type: 1, circle: 3, angle: 270 }),

          new Ship(this.playerId, { type: 2, circle: 2, angle: 90 }),
          new Ship(this.playerId, { type: 2, circle: 1, angle: 90 }),
          new Ship(this.playerId, { type: 2, circle: 2, angle: 0 }),
          new Ship(this.playerId, { type: 2, circle: 2, angle: 30 }),

          new Ship(this.playerId, { type: 3, circle: 1, angle: 210 }),
          new Ship(this.playerId, { type: 3, circle: 1, angle: 240 }),
          new Ship(this.playerId, { type: 3, circle: 1, angle: 270 }),

          new Ship(this.playerId, { type: 4, circle: 3, angle: 60 }),
          new Ship(this.playerId, { type: 4, circle: 3, angle: 90 }),
          new Ship(this.playerId, { type: 4, circle: 3, angle: 120 }),
          new Ship(this.playerId, { type: 4, circle: 3, angle: 150 })
        ];
      }

      if (this.playerName == "Talles") {
        this.ships = [
          new Ship(this.playerId, { type: 1, circle: 1, angle: 0 }),
          new Ship(this.playerId, { type: 1, circle: 1, angle: 30 }),
          new Ship(this.playerId, { type: 1, circle: 1, angle: 60 }),
          new Ship(this.playerId, { type: 1, circle: 1, angle: 90 }),
          new Ship(this.playerId, { type: 1, circle: 1, angle: 120 }),

          new Ship(this.playerId, { type: 2, circle: 1, angle: 210 }),
          new Ship(this.playerId, { type: 2, circle: 1, angle: 240 }),
          new Ship(this.playerId, { type: 2, circle: 1, angle: 270 }),
          new Ship(this.playerId, { type: 2, circle: 1, angle: 300 }),

          new Ship(this.playerId, { type: 3, circle: 2, angle: 0 }),
          new Ship(this.playerId, { type: 3, circle: 2, angle: 30 }),
          new Ship(this.playerId, { type: 3, circle: 2, angle: 60 }),

          new Ship(this.playerId, { type: 4, circle: 3, angle: 60 }),
          new Ship(this.playerId, { type: 4, circle: 3, angle: 90 }),
          new Ship(this.playerId, { type: 4, circle: 3, angle: 120 }),
          new Ship(this.playerId, { type: 4, circle: 3, angle: 150 })
        ];
      }

      this.socket.emit("playerName", this.playerName);

      axios
        .get(`${process.env.VUE_APP_GAME_DB}/api/ranking/${playerName}`)
        .then(response => {
          if (response.data) {
            this.playerRanking = response.data;
          } else {
            axios
              .post(`${process.env.VUE_APP_GAME_DB}/api/ranking`, {
                player: playerName,
                victories: 0,
                rounds: 0
              })
              .then(function(response) {
                this.playerRanking = response.data.data;
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    reset: function() {
      this.victory = false;
      this.defeat = false;
      this.wasDestroyed = false;
      this.round = this.ROUND_PLANNING;
      this.ready = false;
      this.fired = false;
      this.rounds = 0;

      this.$refs.konvaMap.reset();
    },
    attackLocation: function(fireLocation) {
      this.socket.emit("attack", fireLocation);
    },
    saveMap: function() {
      this.socket.emit("saveMap", this.ships);
    },
    updateTime: function(time) {
      this.time = time;

      this.$emit("update:time", this.time);
    },
    newShip: function(shipLocation) {
      this.socket.emit("newShip", shipLocation);
    },
    updateMap: function(map) {
      this.$refs.konvaMap.updateMap(map);

      this.mapCount = [
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];

      map[0].forEach(ship => {
        if (ship.alive) {
          switch (ship.type) {
            case 1:
              this.mapCount[0][0]++;
              break;
            case 2:
              this.mapCount[0][1]++;
              break;
            case 3:
              this.mapCount[0][2]++;
              break;
            case 4:
              this.mapCount[0][3]++;
              break;
          }
        }
      });

      map[1].forEach(ship => {
        if (ship.alive) {
          switch (ship.type) {
            case 1:
              this.mapCount[1][0]++;
              break;
            case 2:
              this.mapCount[1][1]++;
              break;
            case 3:
              this.mapCount[1][2]++;
              break;
            case 4:
              this.mapCount[1][3]++;
              break;
          }
        }
      });
    },
    updateShiftPlayer: function(player) {
      this.fired = false;
      this.wasDestroyed = false;

      if (player == "") {
        this.round = this.ROUND_PLANNING;
      } else {
        if (player == this.playerId) {
          this.round = this.ROUND_YOUR_ROUND;
          this.rounds++;
        } else {
          this.round = this.ROUND_ENEMY_ROUND;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.position {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  padding: 0px;
}

.invisible {
  display: none;
}
</style>
