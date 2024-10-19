<template>
  <div id="app">
    <WaterParameters />
    <AddWaterParameter />
    <AddProduct />
    <AddDosing />
  </div>
</template>

<script>
import WaterParameters from './components/WaterParameters.vue';
import AddWaterParameter from './components/AddWaterParameter.vue';
import AddProduct from './components/AddProduct.vue';
import AddDosing from './components/AddDosing.vue';

export default {
  name: 'App',
  components: {
    WaterParameters,
    AddWaterParameter,
    AddProduct,
    AddDosing
  }
};
</script>

<style scoped>
/* Styles globaux ici */
</style>
