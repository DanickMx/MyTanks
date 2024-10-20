<template>
  <div class="container">
    <h2>Products and Dosing</h2>
    <div class="add-sections">
	  <AddDosing class="form-section"/>
      <AddProduct class="form-section"/>
    </div>
  </div>
</template>

<script>
import AddProduct from './AddProduct.vue';
import AddDosing from './AddDosing.vue';

export default {
  name: 'ProductsAndDosingView',
  components: {
    AddProduct,
    AddDosing
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
