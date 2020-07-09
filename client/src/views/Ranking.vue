<template>
	<v-container>
		<p class="display-2 font-weight-black white--text">RANKING</p>
		<v-simple-table fixed-header dark>
			<thead>
				<tr>
					<th class="text-center font-weight-black">POSIÇÃO</th>
					<th class="text-center font-weight-black">JOGADOR</th>
					<th class="text-center font-weight-black">TURNOS</th>
					<th class="text-center font-weight-black">
						<span class="blue--text font-weight-black"> VITORIAS </span> /
						<span class="red--text font-weight-black"> DERROTAS </span>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in ranking" :key="item.name">
					<td class="text-center body-1">
						<img src="../assets/Kenney/Ranking/rank044.png" height="40" width="40" v-bind:class="[item.imageIndex == 1 ? '' : 'hide']"/>
						<img src="../assets/Kenney/Ranking/rank043.png" height="40" width="40" v-bind:class="[item.imageIndex == 2 ? '' : 'hide']"/>
						<img src="../assets/Kenney/Ranking/rank042.png" height="40" width="40" v-bind:class="[item.imageIndex == 3 ? '' : 'hide']"/>
						{{ item.imageIndex > 3 ? item.visualIndex : null }}
					</td>
					<td class="text-center body-1" v-bind:class="[item.imageIndex == 1 ? 'kenney-gold--text' : [item.imageIndex == 2 ? 'kenney-silver--text' : [item.imageIndex == 3 ? 'kenney-bronze--text' : '']]]">{{ item.player }}</td>
					<td class="text-center body-1" v-bind:class="[item.imageIndex == 1 ? 'kenney-gold--text' : [item.imageIndex == 2 ? 'kenney-silver--text' : [item.imageIndex == 3 ? 'kenney-bronze--text' : '']]]">{{ item.rounds }}</td>
					<td class="text-center body-1">
						<span class="blue--text font-weight-black"> {{ item.victories }} </span> /
						<span class="red--text font-weight-black"> {{ item.defeats }} </span>
					</td>
				</tr>
			</tbody>
		</v-simple-table>
		<br>
		<ul v-if="errors && errors.length">
			<li v-for="error of errors" :key="error.id">
				{{ error.message }}
			</li>
		</ul>
	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			ranking: [],
			errors: [],
			gameDB: process.env.VUE_APP_GAME_DB
		}
	},
	created() {
		var originalRanking = undefined;
		var newRanking = undefined;

		axios.get(`${this.gameDB}/api/ranking`)
		.then(response => {
			originalRanking = response.data.data

			var previousPlayer = { player: "", victories: 0, defeats: 0, rounds: 0 };
			var imageIndex = 0;
			var visualIndex = 0;

			for (let index = 0; index < originalRanking.length; index++) {
				const currentPlayer = originalRanking[index];
				
				if (index > 0) {
					previousPlayer = originalRanking[index - 1]
					
					if (previousPlayer.victories == currentPlayer.victories && previousPlayer.defeats == currentPlayer.defeats && previousPlayer.rounds == currentPlayer.rounds) {
						visualIndex = null
					}else{
						visualIndex = index + 1
						imageIndex++
					}
				}else{
					visualIndex = visualIndex + 1
					imageIndex++
				}
				
				this.ranking[index] = {
					player: currentPlayer.player,
					victories: currentPlayer.victories,
					defeats: currentPlayer.defeats,
					rounds: currentPlayer.rounds,
					index: index + 1,
					visualIndex: visualIndex,
					imageIndex: imageIndex
				}
			}

			this.$forceUpdate();
		})
		.catch(e => {
			this.errors.push(e)
		})
	}
}
</script>

<style lang="scss" scoped>
.kenney-orange--text {
	color: #e86a17 !important;
    caret-color: #e86a17 !important;
}

.kenney-gold--text {
	color: #fca759 !important;
    caret-color: #fca759 !important;
}

.kenney-silver--text {
	color: #b2cfe9 !important;
    caret-color: #b2cfe9 !important;
}

.kenney-bronze--text {
	color: #b1613a !important;
    caret-color: #b1613a !important;
}

.kenney-table {
	border: 5px #9ea4ad solid !important;
	border-radius: 10px !important;
	background-color: #d6dde7 !important;
}

.kenney-table thead tr th{
	background-color: #d6dde7 !important;
}

.hide {
	display: none;
}

.theme--dark.v-data-table {
    background-color: #2f3136 !important;;
    color: #FFFFFF;
}

.theme--dark.v-data-table.v-data-table--fixed-header thead th {
    background: #202225 !important;;
}
</style>