<template>
  <div class="aquarium-view-container">
    <div class="nav">
      <router-link to="/" class="home-link">Retour à la page d'accueil</router-link>
    </div>
    <div class="aquarium-view">
      <h1>{{ aquariumName }}</h1>

      <!-- Section pour les dosages -->
      <section class="section">
        <h2>Derniers Dosages</h2>
        <ul>
          <li v-for="dosing in dosings" :key="dosing.DOSING_ID">{{ dosing.DOSAGE_AMOUNT }} - {{ dosing.DOSAGE_DATE }}</li>
        </ul>
        <router-link :to="`/add-dosing?aquarium_id=${aquariumId}`" class="add-button">Ajouter un dosage</router-link>
      </section>

      <!-- Section pour les paramètres d'eau -->
      <section class="section">
        <h2>Derniers Paramètres d'Eau</h2>
        <ul>
          <li v-for="parameter in waterParameters" :key="parameter.WATERPARAMETER_ID">{{ parameter.PARAMETER_NAME }} - {{ parameter.MESURE }} - {{ parameter.DATEMESURE }}</li>
        </ul>
        <router-link :to="`/add-waterparameter?aquarium_id=${aquariumId}`" class="add-button">Ajouter un paramètre</router-link>
      </section>
    </div>
  </div>
</template>


<script>
export default {
  name: 'AquariumView',
  data() {
    return {
      aquariumName: '',
      dosings: [],
      waterParameters: [],
      aquariumId: this.$route.params.aquarium_id
    };
  },
  created() {
    this.fetchAquariumDetails();
    this.fetchDosings();
    this.fetchWaterParameters();
  },
  methods: {
    async fetchAquariumDetails() {
      try {
        const response = await fetch(`http://localhost:5000/aquarium/${this.aquariumId}`);
        const data = await response.json();
        this.aquariumName = data.AQUARIUM_NAME; // Mise à jour du nom de l'aquarium
      } catch (error) {
        console.error('Error fetching aquarium details:', error);
      }
    },
    async fetchDosings() {
      try {
        const response = await fetch(`http://localhost:5000/dosings/${this.aquariumId}`);
        const data = await response.json();
        this.dosings = data;
      } catch (error) {
        console.error('Error fetching dosings:', error);
      }
    },
    async fetchWaterParameters() {
      try {
        const response = await fetch(`http://localhost:5000/waterparameters/${this.aquariumId}`);
        const data = await response.json();
        this.waterParameters = data;
      } catch (error) {
        console.error('Error fetching water parameters:', error);
      }
    }
  }
};
</script>


<style scoped>
.container {
  background-color: #000000;
  color: #E0E0E0;
  padding: 1em;
  display: flex;
  flex-direction: column;
}

.nav {
  margin-bottom: 1em;
}

.home-link {
  color: #1E90FF;
  text-decoration: none;
  font-size: 1.2em;
  font-family: 'Consolas', 'Courier New', monospace;
}

.home-link:hover {
  text-decoration: underline;
}

.aquarium-view {
  max-width: 1200px;
  margin: auto;
  padding: 2em;
}

.aquarium-view h1 {
  color: #FFFFFF;
  font-weight: 300;
  text-align: center;
  margin-bottom: 1em;
  text-shadow: 0 0 10px rgba(135, 206, 250, 0.5); /* Effet de lueur */
}

.section h2 {
  color: #FFFFFF;
  font-weight: 300;
  border-bottom: 2px solid #87CEFA;
  padding-bottom: 0.5em;
}

.section {
  margin-top: 2em;
}

.list {
  list-style-type: none;
  padding: 0;
}

.list-item {
  background-color: #2c2c2c;
  padding: 1em;
  border-radius: 5px;
  margin-bottom: 0.5em;
}

.button, .add-button {
  background-color: #1E90FF;
  color: #FFFFFF;
  border: none;
  padding: 0.75em 1.5em;
  font-family: 'Consolas', 'Courier New', monospace;
  cursor: pointer;
  align-self: center;
}

.button:hover, .add-button:hover {
  background-color: #4682B4;
}
</style>
