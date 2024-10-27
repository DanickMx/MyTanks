<template>
  <div class="aquarium-view-container">
    <div class="nav">
      <router-link to="/" class="home-link">Retour à la page d'accueil</router-link>
    </div>
    <div class="aquarium-view">
      <h1>{{ aquariumName }}</h1>


      <!-- Onglets de navigation -->
      <div class="tabs">
        <button
          :class="{ active: currentTab === 'summary' }"
          @click="currentTab = 'summary'"
        >
          Summary
        </button>
        <button
          :class="{ active: currentTab === 'details' }"
          @click="currentTab = 'details'"
        >
          Détails
        </button>
      </div>

      <!-- Contenu de l'onglet 'Summary' -->
      <div v-if="currentTab === 'summary'">
      <!-- Intégration de la section Water Parameters -->
      <div class="section">
        <h2>Water Parameters</h2>
        <AquariumWaterParameters :aquariumId="aquariumId" />
      </div>

      <!-- Intégration de la section Dosings -->
      <div class="section">
        <h2>Dosings</h2>
        <AquariumDosings :aquariumId="aquariumId" />
      </div>
	  
	  <!-- Intégration de la section Water Changes -->
      <div class="section">
        <h2>Water Changes</h2>
        <AquariumWaterChanges :aquariumId="aquariumId" />
      </div>
	  </div>
	  
	  <!-- Contenu de l'onglet 'Détails' -->
<div v-else-if="currentTab === 'details'">
        <AquariumDetails :aquariumId="aquariumId" />
      </div>
	  
    </div>
	
  </div>
</template>


<script>
import AquariumWaterParameters from './AquariumWaterParameters.vue';
import AquariumDosings from './AquariumDosings.vue';
import AquariumWaterChanges from './AquariumWaterChanges.vue';
import AquariumDetails from './AquariumDetails.vue';

export default {
  name: 'AquariumView',
  components: {
    AquariumWaterParameters,
    AquariumDosings,
	AquariumWaterChanges,
	AquariumDetails,
  },
  data() {
    return {
      aquariumName: '',
      aquariumId: this.$route.params.aquarium_id,
	  currentTab: 'summary', // Onglet par défaut
    };
  },
  created() {
    this.fetchAquariumDetails();
  },
  methods: {
    async fetchAquariumDetails() {
      try {
        const response = await fetch(
          `http://localhost:5000/aquarium/${this.aquariumId}`
        );
        const data = await response.json();
        this.aquariumName = data.AQUARIUM_NAME;
      } catch (error) {
        console.error('Error fetching aquarium details:', error);
      }
    },
  }
};
</script>



<style scoped>
/* Styles des onglets */
.tabs {
  display: flex;
  justify-content: flex-start; /* Aligne les onglets à gauche */
  margin-top: 20px;
  border-bottom: 1px solid #fff; /* Ligne blanche moins large sous les onglets */
}

.tabs button {
  background-color: #000; /* Fond noir */
  color: #E0E0E0; /* Couleur du texte */
  padding: 10px 20px;
  margin: 0;
  border: 1px solid #fff; /* Bordure blanche */
  border-bottom: none;
  border-radius: 2px 2px 0 0; /* Coins légèrement arrondis */
  cursor: pointer;
  font-size: 16px;
  font-family: 'Consolas', 'Courier New', monospace; /* Police uniforme */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tabs button.active {
  background-color: #1E90FF; /* Couleur pour l'onglet actif */
  color: #fff;
}

.tabs button:not(.active):hover {
  background-color: #333; /* Couleur de survol pour les onglets inactifs */
}

/* Autres styles pour l'interface */
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

.section {
  margin-top: 2em;
}

.section h2 {
  color: #FFFFFF;
  font-weight: 300;
  border-bottom: 2px solid #87CEFA; /* Barre bleue en haut */
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
}

/* Autres styles (inchangés) */
.date-picker-container {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.date-picker {
  margin-right: 1em;
  padding: 0.5em;
  font-family: 'Consolas', 'Courier New', monospace;
}

.parameter-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 30px; /* Augmentez la valeur pour plus d'espace entre les tuiles */
  padding: 20px;
}


.parameter-tile, .dosage-tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  text-align: center;
  background-color: #000;
  border: 1px solid #E0E0E0;
  color: #FFFFFF;
  text-decoration: none;
  transition: background 0.3s, color 0.3s;
  width: 125px;
  height: 125px;
}

.parameter-tile p, .dosage-tile p {
  color: #FFFFFF;
  margin: 0 0 0.5em 0;
  
}

.parameter-tile small, .dosage-tile small {
  color: #A9A9A9;
  font-size: 0.85em;
}

ul {
  list-style: none;
  padding: 0;
}

ul li::before {
  content: ">";
  color: #E0E0E0;
  margin-right: 0.5em;
}

.table-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.5em 0;
}

.table-cell {
  flex: 1;
  text-align: left;
  padding: 0 1em;
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

.no-data {
  color: #E0E0E0;
  font-weight: bold;
}

.more-data {
  list-style-type: none;
  text-align: left;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1em;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;
  width: 100%;
  max-width: 400px;
}

.form-label {
  margin-bottom: 0.2em;
}

.submit-button, .add-button {
  align-self: center;
}

.add-button {
  display: block;
  width: 100%;
  background-color: black;
  color: white;
  border: none;
  padding: 15px;
  text-align: center;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #3498db;
}

.tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  text-align: center;
  background-color: #000;
  border: 1px solid #E0E0E0;
  color: #FFFFFF;
  width: 150px;
  height: 150px;
  transition: background 0.3s, color 0.3s;
  margin: 20px;
}
</style>


