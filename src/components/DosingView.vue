<template>
  <div class="container">
    <div class="nav">
      <router-link to="/" class="home-link">Retour à la page d'accueil</router-link>
    </div>
    <h2>Dosages</h2>
    <div class="add-sections">
      <AddDosing class="form-section"/>
    </div>
  </div>
</template>

<script>
import AddDosing from './AddDosing.vue';

export default {
  name: 'DosingView',
  components: {
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
