<template>
  <div class="aquarium-view-container">
    <div class="aquarium-view">
      <h1>{{ aquariumName }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AquariumView',
  data() {
    return {
      aquariumName: ''
    };
  },
  created() {
    // Récupérer le nom de l'aquarium à partir des paramètres de la route
    this.aquariumName = this.$route.params.name;
  }
}
</script>

<style scoped>
body {
  background-color: #000000; /* Fond noir */
  color: #E0E0E0; /* Texte blanc doux */
  font-family: 'Arial', sans-serif; /* Typographie moderne */
  margin: 0;
  padding: 0;
}

.aquarium-view-container {
  background-color: #000000; /* Fond noir */
  color: #E0E0E0; /* Texte blanc doux */
  font-family: 'Arial', sans-serif; /* Typographie moderne */
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.aquarium-view {
  max-width: 1200px;
  margin: auto;
  padding: 2em;
}

.aquarium-view h1 {
  color: #FFFFFF; /* Titre en blanc */
  font-weight: 300;
  text-align: center;
  margin-bottom: 1em;
  text-shadow: 0 0 10px rgba(135, 206, 250, 0.5); /* Effet de lueur */
}
</style>
