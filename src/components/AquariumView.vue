<template>
  <div class="aquarium-view-container">
    <div class="nav">
      <router-link to="/" class="home-link">Retour à la page d'accueil</router-link>
    </div>
    <div class="aquarium-view">
      <h1>{{ aquariumName }}</h1>
      
      <!-- Section pour les derniers paramètres d'eau -->
      <section class="section">
        <h2>Water Parameters</h2>
        <div class="parameter-tiles">
          <div v-for="measurement in latestMeasurements" :key="measurement.PARAMETER_ID" class="parameter-tile">
            <p>{{ measurement.PARAMETER_NAME }} {{ measurement.MESURE }}</p>
            <small class="parameter-date">{{ measurement.DATEMESURE }}</small>
          </div>
        </div>
        <div>
          <button @click="showForm = !showForm" class="add-button">Ajouter un paramètre</button>
        </div>
        <section v-if="showForm" class="section">
          <form @submit.prevent="submitForm">
            <div>
              <label for="parameters_id">Nom du paramètre :</label>
              <select v-model="form.parameters_id" required>
                <option v-for="param in parameters" :value="param.PARAMETER_ID" :key="param.PARAMETER_ID">
                  {{ param.PARAMETER_NAME }}
                </option>
              </select>
            </div>
            <div>
              <label for="mesure">Mesure :</label>
              <input type="number" v-model="form.mesure" step="0.01" min="0" required>
            </div>
            <div>
              <label for="useCurrentDate">Date et heure actuelle :</label>
              <input type="checkbox" v-model="useCurrentDate" checked>
            </div>
            <div v-if="!useCurrentDate">
              <label for="dateMesure">Date Mesure :</label>
              <input type="datetime-local" v-model="form.dateMesure">
            </div>
            <button type="submit">Enregistrer</button>
          </form>
        </section>
        <ul>
          <li v-for="parameter in recentWaterParameters" :key="parameter.WATERPARAMETER_ID" class="table-row">
            <span class="table-cell">{{ parameter.PARAMETER_NAME }}</span>
            <span class="table-cell">{{ parameter.MESURE }}</span>
            <span class="table-cell">{{ parameter.DATEMESURE }}</span>
          </li>
          <li v-if="hasMoreThan10Results" class="more-data">...</li>
        </ul>
      </section>
      
      <!-- Section pour les paramètres d'eau pour une journée -->
      <section class="section">
        <h3>Daily Water Parameters</h3>
        <div class="date-picker-container">
          <input type="date" v-model="selectedDate" @change="filterWaterParameters" class="date-picker"/>
        </div>
        <ul v-if="filteredWaterParameters.length">
          <li v-for="parameter in filteredWaterParameters" :key="parameter.WATERPARAMETER_ID" class="table-row">
            <span class="table-cell">{{ parameter.PARAMETER_NAME }}</span>
            <span class="table-cell">{{ parameter.MESURE }}</span>
            <span class="table-cell">{{ parameter.DATEMESURE }}</span>
          </li>
        </ul>
        <p v-else class="no-data">*** Aucune données saisies selon les critères sélectionnés.</p>
      </section>

      <!-- Section pour les dosages -->
      <section class="section">
        <h2>Dosings</h2>
        <div class="parameter-tiles">
          <div v-for="dosing in latestDosages" :key="dosing.PRODUCT_NAME" class="parameter-tile">
            <p>{{ dosing.PRODUCT_NAME }} {{ dosing.DOSAGE_AMOUNT }}</p>
            <small class="parameter-date">{{ dosing.DOSAGE_DATE }}</small>
          </div>
        </div>
		
		<button @click="showDosingForm = !showDosingForm" class="add-button">Ajouter un dosage</button>

        <section v-if="showDosingForm" class="section">
          <h3>Ajouter un dosage</h3>
          <form @submit.prevent="addDosing" class="form-container">
            <div class="form-group">
              <label for="product_id" class="form-label">Produit:</label>
              <select v-model="product_id" required class="input-text" id="product_id">
                <option v-for="product in products" :key="product.PRODUCT_ID" :value="product.PRODUCT_ID">{{ product.PRODUCT_NAME }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="dosage_amount" class="form-label">Quantité:</label>
              <input v-model="dosage_amount" required class="input-text" id="dosage_amount">
            </div>
            <div class="form-group">
              <label for="useCurrentDate" class="form-label">Date et heure actuelle:</label>
              <input type="checkbox" v-model="useCurrentDate" checked id="useCurrentDate">
            </div>
            <div class="form-group" v-if="!useCurrentDate">
              <label for="dosage_date" class="form-label">Date du dosage:</label>
              <input v-model="dosage_date" type="datetime-local" required class="input-text" id="dosage_date">
            </div>
            <button type="submit" class="add-button">Ajouter</button>
          </form>
        </section>
        <ul>
          <li v-for="dosing in recentDosings" :key="dosing.DOSING_ID" class="table-row">
            <span class="table-cell">{{ dosing.PRODUCT_NAME }}</span>
            <span class="table-cell">{{ dosing.DOSAGE_AMOUNT }}</span>
            <span class="table-cell">{{ dosing.DOSAGE_DATE }}</span>
          </li>
        </ul>
        
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
      parameters: [],
      filteredWaterParameters: [],
      recentWaterParameters: [],
      recentDosings: [],
      latestMeasurements: [],
      latestDosages: [],
	  product_id: '',
      dosage_amount: '',
      dosage_date: '',
      products: [],
      useCurrentDate: true,
      showDosingForm: false,
      aquariumId: this.$route.params.aquarium_id,
      form: {
        parameters_id: '',
        mesure: '',
        dateMesure: '',
        aquarium_id: this.$route.params.aquarium_id // On utilise l'ID de l'aquarium actuel
      },
      useCurrentDate: true,
      showForm: false,
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
    this.fetchParameters();
	this.fetchProducts(); // Charger les produits pour le dosage
    this.setCurrentDateTime();
  },
  methods: {
  
  async fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async addDosing() {
      let formattedDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('.')[0];
      if (!this.useCurrentDate) {
        formattedDate = new Date(this.dosage_date).toISOString().split('.')[0];
      }
      const payload = {
        aquarium_id: this.aquariumId, // Utiliser l'ID de l'aquarium courant
        product_id: this.product_id,
        dosage_amount: this.dosage_amount,
        dosage_date: formattedDate
      };
      try {
        const response = await fetch('http://localhost:5000/add_dosing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        alert(result.message); // Afficher un message de succès
        this.showDosingForm = false; // Fermer le formulaire après ajout
        this.fetchDosings(); // Rafraîchir les dosages pour afficher le nouveau
      } catch (error) {
        console.error('Error adding dosing:', error);
      }
    },
	
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
    async fetchParameters() {
      try {
        const response = await fetch('http://127.0.0.1:5000/parameters');
        const data = await response.json();
        this.parameters = data;
      } catch (error) {
        console.error('Error fetching parameters:', error);
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
        this.latestDosages = this.getLatestDosages(data);
        this.hasMoreThan10Dosings = data.length > 10; // Mettre à jour l'indicateur
      } catch (error) {
        console.error('Error fetching dosings:', error);
      }
    },
    getLatestDosages(dosages) {
      const latestMap = new Map();
      dosages.forEach(dose => {
        if (!latestMap.has(dose.PRODUCT_NAME) || new Date(dose.DOSAGE_DATE) > new Date(latestMap.get(dose.PRODUCT_NAME).DOSAGE_DATE)) {
          latestMap.set(dose.PRODUCT_NAME, dose);
        }
      });
      return Array.from(latestMap.values());
    },
    setCurrentDateTime() {
      const now = new Date();
      const localDateTime = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
      this.form.dateMesure = localDateTime;
    },
    async submitForm() {
      try {
        let formattedDate = new Date().toISOString().split('.')[0];
        if (!this.useCurrentDate) {
          formattedDate = new Date(this.form.dateMesure).toISOString().split('.')[0];
        }
        const payload = {
          ...this.form,
          dateMesure: formattedDate
        };
        console.log("Payload:", payload); // Vérifie les données envoyées
        const response = await fetch('http://127.0.0.1:5000/add_waterparameter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        console.log(data);
        alert("Water parameter added successfully!");
        window.location.reload();
      } catch (error) {
        console.error('Error adding water parameter:', error);
      }
    }
  },
  watch: {
    useCurrentDate(newValue) {
      if (newValue) {
        this.setCurrentDateTime();
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

.parameter-tiles, .dosage-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
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
  margin: 0 0 0.5em 0; /* Ajouter un espace en bas */
}

.parameter-tile small, .dosage-tile small {
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
  color: #E0E0E0; /* Même couleur que le reste du texte */
  font-weight: bold;
}

.more-data {
  list-style-type: none;
  text-align: left;
}
</style>
