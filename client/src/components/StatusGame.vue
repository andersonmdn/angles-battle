<template>
	<v-row v-if="visible" align="center" justify="center" class="status-game-style">
		<v-col cols="12" sm="3">
			<v-card class="d-flex align-center justify-center" color="transparent" outlined tile>
				<v-icon v-if="round == 'planning'" class="display-1 white--text" large >mdi-bullseye</v-icon>
				<span v-if="round == 'planning'" class="font-weight-black headline white--text"> Planejamento </span>
				
				<v-icon v-if="round == 'your round'" class="display-1 red--text" large>mdi-sword-cross</v-icon>
				<span v-if="round == 'your round'" class="font-weight-black headline red--text"> Atacar </span>

				<v-icon v-if="round == 'enemy round'" class="display-1 white--text" large>mdi-shield</v-icon>
				<span v-if="round == 'enemy round'" class="font-weight-black headline white--text"> Defendendo </span>
			</v-card>
		</v-col>
		<v-col cols="12" sm="1" class="d-flex align-center justify-center" align="center">
			<v-card class="d-flex align-center justify-center" color="transparent" outlined tile>
				<v-icon v-if="round == 'planning'" class="display-1 white--text" large>mdi-infinity</v-icon>
				<v-progress-circular v-if="round !== 'planning'" :value="time * (100 / 50)" color="white" :size="50" :width="8">{{ time }}</v-progress-circular>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
	props: ["visible", "round", "time"],
	data() {
		return {
			
		};
	},
	methods: {
		
	}
};
</script>

<style lang="scss">
.status-game-style {
	background-color: transparent;
	border-radius: 50px;
}

.status-game-card-style {
	background-color: transparent;
}
</style>
