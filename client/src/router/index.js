import Vue from 'vue';
import VueRouter from 'vue-router';
import Game from '../views/Game.vue';
import Ranking from '../views/Ranking.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'game',
		component: Game,
	},
	{
		path: '/ranking',
		name: 'ranking',
		component: Ranking,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
