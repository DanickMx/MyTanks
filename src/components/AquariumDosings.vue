<template>
  <div class="dosings-container">
    <div class="parameter-tiles"> <!-- Utiliser la même classe ici -->
      <div v-for="dosing in latestDosages" :key="dosing.PRODUCT_NAME" class="parameter-tile">
        <p>{{ dosing.PRODUCT_NAME }} {{ dosing.DOSAGE_AMOUNT }}</p>
        <small class="parameter-date">{{ dosing.DOSAGE_DATE }}</small>
      </div>
    </div>
    <div class="button-container">
      <button @click="showDosingForm = !showDosingForm" class="full-width-button">
        <i class="fas fa-plus"></i> Add Dosing
      </button>
    </div>
    <section v-if="showDosingForm" class="section">
      <form @submit.prevent="addDosing" class="form-container">
        <div class="form-group">
          <label for="product_id" class="form-label">Produit:</label>
          <select v-model="product_id" @change="updateUnit" required class="input-text" id="product_id">
            <option v-for="product in products" :key="product.PRODUCT_ID" :value="product.PRODUCT_ID">
              {{ product.PRODUCT_NAME }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="dosage_amount" class="form-label">Quantité:</label>
          <input v-model="dosage_amount" required class="input-text" id="dosage_amount">
          <span v-if="unit" class="unit-label">{{ unit }}</span>
        </div>
        <div class="form-group">
          <label for="useCurrentDate" class="form-label">Date et heure actuelle:</label>
          <input type="checkbox" v-model="useCurrentDate" checked id="useCurrentDate">
        </div>
        <div class="form-group" v-if="!useCurrentDate">
          <label for="dosage_date" class="form-label">Date du dosage:</label>
          <input v-model="dosage_date" type="datetime-local" required class="input-text" id="dosage_date">
        </div>
        <div class="form-group">
          <button type="submit" class="full-width-button">Enregistrer</button>
        </div>
      </form>
    </section>

    <ul>
      <li v-for="dosing in recentDosings" :key="dosing.DOSING_ID" class="table-row">
        <span class="table-cell">{{ dosing.PRODUCT_NAME }}</span>
        <span class="table-cell">{{ dosing.DOSAGE_AMOUNT }}</span>
        <span class="table-cell">{{ dosing.DOSAGE_DATE }}</span>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: 'AquariumDosings',
  data() {
    return {
      recentDosings: [],
      latestDosages: [],
      product_id: '',
      dosage_amount: '',
      dosage_date: '',
      unit: '',
      products: [],
      useCurrentDate: true,
      showDosingForm: false,
      aquariumId: this.$route.params.aquarium_id,
    };
  },
  created() {
    this.fetchProducts();
    this.fetchDosings();
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
    
    updateUnit() {
      const selectedProduct = this.products.find(product => product.PRODUCT_ID === this.product_id);
      this.unit = selectedProduct ? selectedProduct.UNIT : '';
    },
    
    async addDosing() {
      let formattedDate = new Date().toISOString().split('.')[0];
      if (!this.useCurrentDate) {
        formattedDate = new Date(this.dosage_date).toISOString().split('.')[0];
      }
      const payload = {
        aquarium_id: this.aquariumId,
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
        alert(result.message);
        this.showDosingForm = false;
        this.fetchDosings(); // Rafraîchir les dosages
      } catch (error) {
        console.error('Error adding dosing:', error);
      }
    },
    
    async fetchDosings() {
      try {
        const response = await fetch(`http://localhost:5000/dosings/${this.aquariumId}`);
        const data = await response.json();
        this.recentDosings = data
          .sort((a, b) => new Date(b.DOSAGE_DATE) - new Date(a.DOSAGE_DATE))
          .slice(0, 10);
        this.latestDosages = this.getLatestDosages(data);
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
    }
  }
};
</script>

<style scoped>
.dosings-container, .parameters-container {
  margin-top: 2em;
}

.dosings-container, .parameters-container {
  margin-top: 2em;
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
  width: 150px; /* Largeur fixe pour les tuiles carrées */
  height: 150px; /* Hauteur fixe pour les tuiles carrées */
  transition: background 0.3s, color 0.3s;
  border-radius: 2px; /* Arrondi léger des coins */
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

/* Ajoute ici d'autres styles si nécessaire */


.parameter-tiles, .dosage-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
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
  width: 150px; /* Largeur fixe pour les tuiles carrées */
  height: 150px; /* Hauteur fixe pour les tuiles carrées */
  transition: background 0.3s, color 0.3s;
}

.tile p {
  color: #FFFFFF;
  margin: 0 0 0.5em 0; /* Espace en bas */
}

.tile small {
  color: #A9A9A9; /* Couleur moins en évidence */
  font-size: 0.85em;
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

.full-width-button {
  display: block; /* Affiche le bouton en bloc pour occuper toute la largeur */
  width: 60%; /* Assure que le bouton prend toute la largeur disponible */
  background-color: black; /* Couleur de fond par défaut */
  color: white; /* Couleur du texte */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Bordure discrète */
  border-radius: 2px; /* Arrondi léger des coins */
  padding: 1em; /* Espacement intérieur du bouton */
  cursor: pointer; /* Change le curseur au survol */
  transition: background-color 0.3s; /* Transition douce pour la couleur de fond */
  margin: 0 auto; /* Centre le bouton */
}

.full-width-button:hover {
  background-color: #1E90FF; /* Couleur de fond au survol */
}

</style>
