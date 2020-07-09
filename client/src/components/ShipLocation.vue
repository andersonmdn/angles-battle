<template>
	<!-- <v-container fluid> -->
		<v-card
          class="pa-2"
          outlined
          tile
        >
		<v-row class="d-flex align-center justify-center">
			<v-col class="d-flex" cols="12" sm="5">
				<v-select dark class="select-adjustment" v-model="selectedCircle" v-on:change="$emit('change', selectedCircle, selectedAngle)" label="Círculo" :items="circlesItems" :rules="circleRules" dense outlined required></v-select>
			</v-col>
			<v-col class="d-flex" cols="12" sm="5">
				<v-select dark class="select-adjustment" v-model="selectedAngle" v-on:change="$emit('change', selectedCircle, selectedAngle)" label="Ângulo" :items="anglesItems" :rules="circleAngles" dense outlined required></v-select>
			</v-col>
		</v-row>
		</v-card>
	<!-- </v-container> -->
</template>

<script>
export default {
  props: [],
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
  }
};
</script>

<style lang="scss">
.adjustment .v-text-field__details {
	display: none !important;
}
</style>
