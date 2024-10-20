<template>
  <div class="container">
    <h2>Products and Dosing</h2>
    <div class="add-sections">
      <AddProduct />
      <AddDosing />
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
  padding: 1em; /* Ajoute du padding pour une mise en page plus agréable */
  display: flex;
  flex-direction: column;
}

.add-sections {
  margin-top: 1em; /* Ajoute un petit espace en haut */
  display: flex;
  flex-direction: column;
  gap: 0.5em; /* Réduire l'espacement entre les sections */
  flex-grow: 1;
}
</style>

