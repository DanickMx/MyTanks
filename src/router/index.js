import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AquariumView from '../components/AquariumView.vue';
import WaterParametersView from '../components/WaterParametersView.vue';
import DosingView from '../components/DosingView.vue';
import ItemsView from '../components/ItemsView.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/waterparameters', component: WaterParametersView },
  { path: '/dosing', component: DosingView },
  { path: '/aquarium/:aquarium_id', component: AquariumView },
  { path: '/items', name: 'ItemsView', component: ItemsView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
