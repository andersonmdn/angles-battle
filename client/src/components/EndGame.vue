<template>
	<v-container v-if="visible" fluid class="position d-flex align-center justify-center index">
		<v-row class="d-flex align-center justify-center">
			<v-col class="d-flex align-center justify-center" md="2">
				<v-icon class="display-4" :class="color" large>mdi-{{ icon }}</v-icon>
				<span class="font-weight-black display-3" :class="color"> {{ text }} </span>
			</v-col>
			<v-col md="12">
				<v-btn large @click="newGame" class="title">Jogar Novamente</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: ["visible", "text", "icon", "color"],
	data() {
		return {
			
		};
	},
	methods: {
		newGame: function() {
			this.$emit("click");
		}
	}
};
</script>

<style lang="scss" scoped>
.index {
	z-index: 5;
}
</style>
