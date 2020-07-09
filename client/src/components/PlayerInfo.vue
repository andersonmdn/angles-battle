<template>
	<v-container v-if="visible" fluid class="position d-flex align-center justify-center">
		<v-row align="end" justify="center">
			<v-col md="3">
				<p class="display-3 font-weight-black white--text">BATALHA DOS ÂNGULOS</p>
				<v-text-field v-model="playerName" label="Nickname" color="#ea4949" required dark outlined :hint="hint" persistent-hint :error="error"></v-text-field>
				<v-btn class="mr-1 display-1 font-weight-black white--text" @click="click" text x-large> JOGAR </v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: ["visible"],
	data() {
		return {
			hint: "",
			error: false,
			playerName: "",
		};
	},
	methods: {
		click: function() {
			if (this.playerName !== "") {
				this.error = false;
				const emitPlayerName = this.playerName;
				this.$emit("click", emitPlayerName);
			}else{
				this.error = true;
				this.hint = "Deve ser informado o seu nome de jogador";
			}
		}
	}
};
</script>

<style lang="scss">
.my-btn {
	//background-color:#e86a17 !important;
	color: #e86a17;
}

.my-btn:hover{
	background-color:#297032 !important;
	color: white;
}
</style>

<style lang="scss" scoped>

</style>
