<template>
  <v-container v-if="visible" fluid class="position d-flex align-center justify-center index">
    <audio id="KenneyMouseRelease2" style="display: block;">
      <source src="../assets/audio/Kenney/UI/mouserelease1.ogg" type="audio/ogg" />
    </audio>
    <v-card max-width="500" color="#2f3136" class="white--text">
      <v-card-title class="d-flex align-start px-3 white--text my-card-color1">
        <span class="title font-weight-light">({{step}}/4) Posicione as naves no tabuleiro</span>
      </v-card-title>
      <v-card-subtitle class="white--text mt-1 mb-2">
        <p class="font-weight-black title">Naves de {{ assignments[step-1] }}</p>
        <img
          v-for="n in actives.length"
          :key="n"
          v-bind:src="require(`@/assets/Kenney/Spaceship/${step}.png`)"
          height="50"
          width="50"
        />
        <br />
        <span class="subtitle">
          {{ history[step - 1] }}
          <br />
        </span>
        <span class="title">Regras:</span>
        <span v-if="step == STEP_A" class="title">
          <b>Posicionadas individualmente.</b>
          <br />Em qualquer círculo e/ou ângulo.
        </span>
        <span v-if="step == STEP_B" class="title">
          <b>Posicionadas sempre em duplas.</b>
          <br />- Mesmo círculo ocupando ângulos vizinhos
          <br />- Mesmo ângulo em círculos vizinhos
        </span>
        <span v-if="step == STEP_C" class="title">
          <b>Posicionadas sempre em trios.</b>
          <br />- Em ângulos vizinhos
          <br />- Em círculos vizinhos
        </span>
        <span v-if="step == STEP_D" class="title">
          <b>Posicionadas todas no mesmo círculo com diferenças de 30º em cada posição.</b>
        </span>
      </v-card-subtitle>
      <div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row class="d-flex align-center justify-center" v-for="index in actives" :key="index">
            <v-col class="d-flex" cols="12" sm="5">
              <v-select
                dense
                outlined
                required
                dark
                class="select-adjustment"
                v-model="ships[index].circle"
                @change="selectChange"
                label="Círculo"
                :items="circlesItems"
                :rules="circleRules"
                :error="error.circle == ships[index].circle && error.angle == ships[index].angle ? true : false"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="5">
              <v-select
                dense
                outlined
                required
                dark
                class="select-adjustment"
                v-model="ships[index].angle"
                @change="selectChange"
                label="Ângulo"
                :items="anglesItems"
                :rules="circleAngles"
                :error="error.circle == ships[index].circle && error.angle == ships[index].angle ? true : false"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </div>
      <v-card-actions class="d-flex align-center justify-center my-card-color1">
        <v-btn
          class="mr-1 font-weight-black"
          color="#919191"
          text
          :disabled="step == STEP_A"
          @click="previous"
        >Anterior</v-btn>
        <v-btn
          class="mr-1 font-weight-black"
          color="#43b581"
          text
          @click="next"
        >{{ step == STEP_D ? 'Gravar' : 'Próximo' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import PositionShip from "./PositionShips.js";

export default {
  props: ["visible", "ships"],
  components: {},
  data() {
    return {
      STEP_A: 1,
      STEP_B: 2,
      STEP_C: 3,
      STEP_D: 4,
      ACTIVES_SHIPS_A: [0, 1, 2, 3, 4],
      ACTIVES_SHIPS_B: [5, 6, 7, 8],
      ACTIVES_SHIPS_C: [9, 10, 11],
      ACTIVES_SHIPS_D: [12, 13, 14, 15],
      valid: true,
      error: { visible: false, text: "", circle: undefined, angle: undefined },
      progress: 0,
      step: 0,
      actives: [],
      audios: [],
      history: [
        "Estas naves são espalhadas pelo mapa em busca de inimigos",
        "Agem em dupla para garantir uma maior eficiência nas missões",
        "Agem em trios para garantir um maior poder de combate",
        "A frota mais poderosa, sempre juntos"
      ],
      assignments: ["Patrulha", "Reconhecimento", "Multifunção ", "Combate"],

      circlesItems: [
        { text: "1º", value: 1 },
        { text: "2º", value: 2 },
        { text: "3º", value: 3 }
      ],
      anglesItems: [
        { text: "0°", value: 0 },
        { text: "30°", value: 30 },
        { text: "60°", value: 60 },
        { text: "90°", value: 90 },
        { text: "120°", value: 120 },
        { text: "150°", value: 150 },
        { text: "180°", value: 180 },
        { text: "210°", value: 210 },
        { text: "240°", value: 240 },
        { text: "270°", value: 270 },
        { text: "300°", value: 300 },
        { text: "330°", value: 330 },
        { text: "360°", value: 360 }
      ],
      circleRules: [v => !!v || "Selecione um Círculo"],
      circleAngles: [v => (v >= 0 && v <= 360) || "Selecione um Ângulo"]
    };
  },
  mounted() {
    this.audios[0] = document.getElementById("KenneyMouseRelease2");
  },
  created() {
    this.step = this.STEP_A;
    this.actives = this.ACTIVES_SHIPS_A;
  },
  methods: {
    mouseOver: function() {
      if (!this.audios[0]) {
        this.audios[0] = document.getElementById("KenneyMouseRelease2");
      }
      this.audios[0].play();
    },
    selectChange: function() {
      this.mouseOver();

      this.$emit("updateMap", this.ships);
    },
    chooseActives: function() {
      switch (this.step) {
        case this.STEP_A:
          this.actives = this.ACTIVES_SHIPS_A;
          break;

        case this.STEP_B:
          this.actives = this.ACTIVES_SHIPS_B;
          break;

        case this.STEP_C:
          this.actives = this.ACTIVES_SHIPS_C;
          break;

        case this.STEP_D:
          this.actives = this.ACTIVES_SHIPS_D;
          break;

        default:
          alert("Final");
          break;
      }
    },
    previous: function() {
      this.mouseOver();

      this.step--;
      this.chooseActives();
    },
    next: function() {
      this.mouseOver();

      let validations = new PositionShip();

      if (this.$refs.form.validate()) {
        this.error.visible = false;
        this.error.text = "Não podem existir duas naves na mesma posição!";

        this.actives.forEach(n => {
          if (!validations.occupiedPosition(this.ships, this.ships[n], n)) {
            this.error.visible = true;
            this.error.circle = this.ships[n].circle;
            this.error.angle = this.ships[n].angle;
          }
        });

        if (
          !this.error.visible &&
          (this.step == this.STEP_B || this.step == this.STEP_C)
        ) {
          this.error.text = "As naves desse tipo devem estar lado a lado!";
          this.actives.forEach(n => {
            if (
              !(
                validations.adjacentAngle(this.ships, this.ships[n], n) ||
                validations.adjacentCircle(this.ships, this.ships[n], n)
              )
            ) {
              this.error.visible = true;
              this.error.circle = this.ships[n].circle;
              this.error.angle = this.ships[n].angle;
            }
          });
        }

        if (!this.error.visible && this.step == this.STEP_D) {
          this.error.text = "As naves desse tipo devem estar lado a lado!";
          this.actives.forEach(n => {
            if (!validations.adjacentAngle(this.ships, this.ships[n], n)) {
              this.error.visible = true;
              this.error.circle = this.ships[n].circle;
              this.error.angle = this.ships[n].angle;
            }
          });
        }
      } else {
        this.error.visible = true;
        this.error.text =
          "Todas as naves devem ser posicionadas em uma coordenada";
      }

      if (this.error.visible == false) {
        if (this.step == this.STEP_D) {
          this.step = this.STEP_A;

          this.chooseActives();
          this.$emit("save", true);
        } else {
          this.step++;
          this.chooseActives();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.position {
  position: absolute;
}

.index {
  z-index: 5;
}

.flexcard {
  display: flex;
  flex-direction: column;
}

.my-card-color1 {
  background-color: #202225;
}
</style>