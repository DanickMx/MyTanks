import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AquariumView from '../components/AquariumView.vue'; // Importer le nouveau composant
import WaterParametersView from '../components/WaterParametersView.vue';
import ProductsAndDosingView from '../components/ProductsAndDosingView.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/waterparameters', component: WaterParametersView },
  { path: '/products-and-dosing', component: ProductsAndDosingView },
  { path: '/aquarium/:name', component: AquariumView } // Nouvelle route avec paramètre de nom
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
