<template>
  <section class="section">


    <!-- Section pour les Daily Water Parameters -->
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

    <!-- Section pour la console AI avec choix de type de question -->
    <h3>Console d'Analyse</h3>
    <div class="query-console">
      <select v-model="questionType" class="query-type-select">
        <option value="general">Questions générales</option>
        <option value="data">Questions sur les données</option>
      </select>
      <textarea
        v-model="query"
        placeholder="Posez une question sur votre aquarium..."
        class="query-textarea"
        rows="4"
      ></textarea>
      <button @click="sendQuery" class="query-button">Envoyer</button>
    </div>
    <div v-if="queryResult" class="query-result">
      <h4>Résultat :</h4>
      <pre>{{ queryResult }}</pre>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AquariumDetails',
  props: {
    aquariumId: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      localAquariumId: this.aquariumId || null,
      filteredWaterParameters: [],
      selectedDate: new Date().toISOString().split('T')[0],
      waterParameters: [],
      query: '',           
      queryResult: null,
      questionType: 'general'  // Type de question sélectionné
    };
  },
  created() {
    if (!this.localAquariumId && this.$route.params.aquarium_id) {
      this.localAquariumId = parseInt(this.$route.params.aquarium_id, 10);
    }
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
    },
    async sendQuery() {
    try {
      const endpoint = this.questionType === 'data'
        ? 'http://localhost:5000/api/full_aquarium_data'
        : 'http://localhost:5000/api/query';
        
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: this.query, aquarium_id: this.localAquariumId })
      });
      
      let result = await response.json();
      let answer = result.data || result.error;

      // Vérification de termes indiquant un accès aux données
      if (
        this.questionType === 'general' &&
        /access data|retrieve|calculate|average|data points|specific values/.test(answer.toLowerCase())
      ) {
        answer += "\n\nPour répondre aux questions sur les données, veuillez sélectionner 'Questions sur les données' pour accéder directement aux informations de la base de données.";
      }
      this.queryResult = answer;
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
      this.queryResult = "Une erreur est survenue lors de la requête.";
    }
  }
  }
};
</script>

<style scoped>
/* Styles ajoutés pour le choix de type de question */
.query-type-select {
  width: 100%;
  margin-bottom: 10px;
  padding: 0.5em;
  background-color: #333;
  color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}


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

.query-console {
  margin-top: 20px;
}

.query-textarea {
  padding: 0.5em;
  width: 100%;
  background-color: #333;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: both; /* Permet à l'utilisateur de redimensionner */
  margin-bottom: 10px;
}

.query-button {
  padding: 0.5em 1em;
  background-color: #1E90FF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.query-button:hover {
  background-color: #1C86EE;
}

.query-result {
  margin-top: 20px;
  background-color: #222;
  padding: 10px;
  border-radius: 4px;
  color: #fff;
  max-width: 100%;
  max-height: 200px; /* Hauteur maximale de la boîte de résultat */
  overflow-y: auto;  /* Ajoute un défilement vertical si le contenu dépasse la hauteur */
  white-space: pre-wrap; /* Garde le texte à l'intérieur de la boîte */
  overflow-wrap: break-word;
}
</style>
