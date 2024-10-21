<template>
  <div class="aquarium-view-container">
    <div class="nav">
      <router-link to="/" class="home-link">Retour à la page d'accueil</router-link>
    </div>
    <div class="aquarium-view">
      <h1>{{ aquariumName }}</h1>
  
      <!-- Section pour les derniers paramètres d'eau -->
      <section class="section">
        <h2>Derniers Paramètres d'Eau</h2>
        <div class="parameter-tiles">
          <div v-for="measurement in latestMeasurements" :key="measurement.PARAMETER_ID" class="parameter-tile">
            <p>{{ measurement.PARAMETER_NAME }} {{ measurement.MESURE }}</p>
            <small class="parameter-date">{{ measurement.DATEMESURE }}</small>
          </div>
        </div>
        <ul>
          <li v-for="parameter in recentWaterParameters" :key="parameter.WATERPARAMETER_ID">
            {{ parameter.PARAMETER_NAME }}
            <span style="margin-left: 1em;">{{ parameter.MESURE }} - {{ parameter.DATEMESURE }}</span>
          </li>
          <li v-if="hasMoreThan10Results" class="more-data">...</li>
        </ul>
        <router-link :to="`/add-waterparameter?aquarium_id=${aquariumId}`" class="add-button">Ajouter un paramètre</router-link>
      </section>
    
      <!-- Section pour les paramètres d'eau pour une journée -->
      <section class="section">
        <h2>Paramètres d'Eau pour une Journée</h2>
        <div class="date-picker-container">
          <input type="date" v-model="selectedDate" @change="filterWaterParameters" class="date-picker"/>
        </div>
        <ul v-if="filteredWaterParameters.length">
          <li v-for="parameter in filteredWaterParameters" :key="parameter.WATERPARAMETER_ID">{{ parameter.PARAMETER_NAME }} - {{ parameter.MESURE }} - {{ parameter.DATEMESURE }}</li>
        </ul>
        <p v-else class="no-data">*** Aucune données saisies selon les critères sélectionnés.</p>
      </section>
      
      <!-- Section pour les dosages -->
      <section class="section">
        <h2>Derniers Dosages</h2>
        <ul>
          <li v-for="dosing in recentDosings" :key="dosing.DOSING_ID">{{ dosing.DOSAGE_AMOUNT }} - {{ dosing.DOSAGE_DATE }}</li>
          <li v-if="hasMoreThan10Dosings" class="more-data">...</li>
        </ul>
        <router-link :to="`/add-dosing?aquarium_id=${aquariumId}`" class="add-button">Ajouter un dosage</router-link>
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
      waterParameters: [],
      filteredWaterParameters: [],
      recentWaterParameters: [],
      recentDosings: [],
      latestMeasurements: [],
      selectedDate: new Date().toISOString().split('T')[0],
      aquariumId: this.$route.params.aquarium_id,
      hasMoreThan10Results: false,
      hasMoreThan10Dosings: false
    };
  },
  created() {
    this.fetchAquariumDetails();
    this.fetchWaterParameters();
    this.fetchDosings();
  },
  methods: {
    async fetchAquariumDetails() {
      try {
        const response = await fetch(`http://localhost:5000/aquarium/${this.aquariumId}`);
        const data = await response.json();
        this.aquariumName = data.AQUARIUM_NAME;
      } catch (error) {
        console.error('Error fetching aquarium details:', error);
      }
    },
    async fetchWaterParameters() {
      try {
        const response = await fetch(`http://localhost:5000/waterparameters/${this.aquariumId}`);
        const data = await response.json();
        this.waterParameters = data;
        this.filterWaterParameters(); // Appliquer le filtre initialement
        this.getRecentWaterParameters(); // Charger les derniers paramètres d'eau
        this.getLatestMeasurements(); // Charger les dernières mesures
      } catch (error) {
        console.error('Error fetching water parameters:', error);
      }
    },
    filterWaterParameters() {
      if (this.selectedDate) {
        this.filteredWaterParameters = this.waterParameters.filter(param =>
          param.DATEMESURE.startsWith(this.selectedDate)
        );
      } else {
        this.filteredWaterParameters = [];
      }
    },
    getRecentWaterParameters() {
      this.recentWaterParameters = this.waterParameters
        .sort((a, b) => new Date(b.DATEMESURE) - new Date(a.DATEMESURE)) // Trier par date décroissante
        .slice(0, 10); // Limiter à 10 résultats

      this.hasMoreThan10Results = this.waterParameters.length > 10; // Mettre à jour l'indicateur
    },
    getLatestMeasurements() {
      const latestMap = new Map();
      this.waterParameters.forEach(param => {
        if (!latestMap.has(param.PARAMETER_NAME) || new Date(param.DATEMESURE) > new Date(latestMap.get(param.PARAMETER_NAME).DATEMESURE)) {
          latestMap.set(param.PARAMETER_NAME, param);
        }
      });
      this.latestMeasurements = Array.from(latestMap.values());
    },
    async fetchDosings() {
      try {
        const response = await fetch(`http://localhost:5000/dosings/${this.aquariumId}`);
        const data = await response.json();
        this.recentDosings = data
          .sort((a, b) => new Date(b.DOSAGE_DATE) - new Date(a.DOSAGE_DATE)) // Trier par date décroissante
          .slice(0, 10); // Limiter à 10 résultats

        this.hasMoreThan10Dosings = data.length > 10; // Mettre à jour l'indicateur
      } catch (error) {
        console.error('Error fetching dosings:', error);
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

.section {
  margin-top: 2em;
}

.section h2 {
  color: #FFFFFF;
  font-weight: 300;
  border-bottom: 2px solid #87CEFA;
  padding-bottom: 0.5em;
}

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
  gap: 20px;
}

.parameter-tile {
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

.parameter-tile p {
  color: #FFFFFF;
  margin: 0 0 0.5em 0; /* Ajouter un espace en bas */
}

.parameter-tile small {
  color: #A9A9A9; /* Couleur moins en évidence */
  font-size: 0.85em;
}

ul {
  list-style: none;
  padding: 0;
}

ul li::before {
  content: ">";
  color: #E0E0E0; /* Même couleur que le texte */
  margin-right: 0.5em;
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
  color: #E0E0E0; /* Même couleur que le reste du texte */
  font-weight: bold;
}

.more-data {
  list-style-type: none;
  text-align: left;
}
</style>
