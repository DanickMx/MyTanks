import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AquariumView from '../components/AquariumView.vue';
import WaterParametersView from '../components/WaterParametersView.vue';
import WaterChangeView from '../components/WaterChangeView.vue';  
import DosingView from '../components/DosingView.vue';
import ItemsView from '../components/ItemsView.vue';
import AquariumWaterParameters from '../components/AquariumWaterParameters.vue';  
import AquariumDetails from '../components/AquariumDetails.vue';  

const routes = [
  { path: '/', component: HomePage },
  { path: '/waterparameters', component: WaterParametersView },
  { path: '/dosing', component: DosingView },
  { path: '/waterchange', component: WaterChangeView },
  { 
    path: '/aquarium/:aquarium_id', 
    name: 'AquariumView',  // Ajout du nom pour cette route
    component: AquariumView,
    props: true
  },
  { path: '/items', name: 'ItemsView', component: ItemsView },
  { 
    path: '/aquarium/:aquarium_id/water-parameters', 
    name: 'AquariumWaterParameters', 
    component: AquariumWaterParameters,
    props: true 
  },
  {
    path: '/aquarium/:aquarium_id/details',
    name: 'AquariumDetails',
    component: AquariumDetails,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
