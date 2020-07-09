<template>
  <v-container fluid class="position d-flex align-end justify-center index">
      <v-row class="d-flex align-end justify-center mb-12">
        <v-col v-if="wasDestroyed" cols="12" sm="12">
          <span class="red--text title">
             Você já atirou nessa coordenada. Atire em outra coordenada
          </span>
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="12" sm="1">
          <!-- <v-card class="" outlined tile> -->
            <v-select class="my-hide-text" v-model="selectedCircle" label="Círculo" :items="circlesItems" :rules="circleRules" hide-details="false" dense solo required></v-select>
          <!-- </v-card> -->
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="12" sm="1">
          <!-- <v-card class="" outlined tile> -->
            <v-select class="my-hide-text" v-model="selectedAngle" label="Ângulo" :items="anglesItems" :rules="circleAngles" hide-details="false" dense solo required></v-select>
          <!-- </v-card> -->
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="12" sm="1">
          <!-- <v-card class="" outlined> -->
            <v-btn color="red" @click="validate" dark block class="">
              <v-icon>mdi-sword</v-icon> Atacar
            </v-btn>
          <!-- </v-card> -->
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["wasDestroyed"],
  data() {
    return {
      selectedCircle: undefined,
      selectedAngle: undefined,
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
  methods: {
    validate: function() {
      let vm = this;
      let fireLocation = {
        circle: this.selectedCircle,
        angle: this.selectedAngle
      };

      if (fireLocation.circle > 0 && fireLocation.angle > -1) {
        vm.$emit("fire", fireLocation);
      }
    }
  }
};
</script>

<style lang="scss">
.my-hide-text .v-text-field__details {
  display: none !important;;
}
</style>

<style lang="scss" scoped>

</style>