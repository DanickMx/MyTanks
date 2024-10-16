<template>
  <div id="app">
    <WaterParameters />
    <AddWaterParameter />
  </div>
</template>

<script>
import WaterParameters from './components/WaterParameters.vue';
import AddWaterParameter from './components/AddWaterParameter.vue';

export default {
  name: 'App',
  components: {
    WaterParameters,
    AddWaterParameter
  }
};
</script>

<style scoped>
/* Styles globaux ici */
</style>
