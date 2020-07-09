<template>
	<v-row v-if="visible" class="d-flex align-center justify-center position index">
		<v-col class="end-game-style" lg="7">
			<span class="font-weight-black display-3 white--text">
				O jogo já vai começar em {{ time }} segundos
			</span>
		</v-col>
	</v-row>
</template>

<script>
export default {
	props: ["visible", "time"],
	data() {
	return {
		
	};
	},
	methods: {
	newGame: function() {
		alert("To aqui");
	}
	}
};
</script>

<style lang="scss" scoped>
.end-game-style {
	background-color: #202225;
	border-radius: 50px;
}

.index {
	z-index: 5;
}
</style>
