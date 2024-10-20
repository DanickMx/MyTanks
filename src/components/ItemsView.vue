<template>
  <div class="container">
    <div class="nav">
      <router-link to="/" class="home-link">Retour à la page d'accueil</router-link>
    </div>
    <h2>Admin Items</h2>
    <div class="add-sections">
      <AddProduct class="form-section"/>
    </div>
  </div>
</template>

<script>
import AddProduct from './AddProduct.vue';

export default {
  name: 'ItemsView',
  components: {
    AddProduct
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