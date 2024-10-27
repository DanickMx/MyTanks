<template>
  <section class="section">
    <!-- Lien pour revenir à la HomePage -->
    <router-link to="/" class="nav-link">Retour à la page d'accueil</router-link>
	
	    <!-- Lien pour revenir à l'Aquarium -->
    <router-link :to="{ name: 'AquariumView', params: { aquarium_id: localAquariumId } }" class="nav-link">
      Retour à l'aquarium
    </router-link>

    <h3>Daily Water Parameters</h3>
    <div class="date-picker-container">
      <input type="date" v-model="selectedDate" @change="filterWaterParameters" class="date-picker" />
    </div>

    <ul v-if="filteredWaterParameters.length">
      <li v-for="parameter in filteredWaterParameters" :key="parameter.WATERPARAMETER_ID" class="table-row">
        <span class="table-cell">{{ parameter.PARAMETER_NAME }}</span>
        <span class="table-cell">{{ parameter.MESURE }}</span>
        <span class="table-cell">{{ parameter.DATEMESURE }}</span>
      </li>
    </ul>
    <p v-else class="no-data">*** Aucune donnée saisie selon les critères sélectionnés.</p>


  </section>
</template>

<script>
export default {
  name: 'AquariumDetails',
  props: {
    aquariumId: {
      type: Number,
      required: false // Modifiez pour que ce ne soit pas strictement obligatoire
    }
  },
  data() {
    return {
      localAquariumId: this.aquariumId || null, // Variable locale pour stocker aquariumId
      filteredWaterParameters: [],
      selectedDate: new Date().toISOString().split('T')[0],
      waterParameters: [],
    };
  },
  created() {
    // Si `localAquariumId` est null, essayez de le récupérer depuis `this.$route.params`
    if (!this.localAquariumId && this.$route.params.aquarium_id) {
      this.localAquariumId = parseInt(this.$route.params.aquarium_id, 10);
    }
    
    // Appelez `fetchWaterParameters` si `localAquariumId` est maintenant défini
    if (this.localAquariumId) {
      this.fetchWaterParameters();
    } else {
      console.error("Aucun `aquariumId` n'a été trouvé");
    }
  },
  methods: {
    async fetchWaterParameters() {
      try {
        const response = await fetch(`http://localhost:5000/waterparameters/${this.localAquariumId}`);
        
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        this.waterParameters = data;
        this.filterWaterParameters();
      } catch (error) {
        console.error('Error fetching water parameters:', error);
      }
    },
    filterWaterParameters() {
      this.filteredWaterParameters = this.waterParameters.filter(param =>
        param.DATEMESURE.startsWith(this.selectedDate)
      );
    }
  }
};
</script>

<style scoped>
.section {
  padding: 20px;
  color: #fff;
}

.nav-link {
  display: block;
  margin: 1em 0;
  color: #1E90FF;
  text-decoration: underline;
  cursor: pointer;
}

.nav-link:hover {
  color: #87CEFA;
}

.date-picker-container {
  margin-bottom: 1em;
}

.date-picker {
  padding: 0.5em;
  background-color: #333;
  color: white;
  border: 1px solid #fff;
  border-radius: 2px;
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

.no-data {
  color: #A9A9A9;
  font-style: italic;
}
</style>
