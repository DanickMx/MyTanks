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

<style scoped>
.container {
  background-color: #000000; /* Arrière-plan noir pour toute la page */
  color: #E0E0E0;
  padding: 1em;
  display: flex;
  flex-direction: column;
}

</style>