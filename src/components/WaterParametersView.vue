<template>
  <div>
     <div class="nav">
      <router-link to="/" class="home-link">Retour à la page d'accueil</router-link>
	 </div>
    <h2>Water Parameters</h2>
    <WaterParameters />
    <AddWaterParameter />
  </div>
</template>

<script>
import WaterParameters from './WaterParameters.vue';
import AddWaterParameter from './AddWaterParameter.vue';

export default {
  name: 'WaterParametersView',
  components: {
    WaterParameters,
    AddWaterParameter
  }
}
</script>
