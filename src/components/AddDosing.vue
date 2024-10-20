<template>
  <div class="container">
    <h2>Ajouter un dosage</h2>
    <form @submit.prevent="addDosing" class="form-container">
      <div class="form-group">
        <label>Aquarium ID:</label>
        <select v-model="aquarium_id" required class="input-text">
          <option v-for="aquarium in aquariums" :key="aquarium.AQUARIUM_ID" :value="aquarium.AQUARIUM_ID">{{ aquarium.AQUARIUM_NAME }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Product ID:</label>
        <select v-model="product_id" required class="input-text">
          <option v-for="product in products" :key="product.PRODUCT_ID" :value="product.PRODUCT_ID">{{ product.PRODUCT_NAME }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Dosage Amount:</label>
        <input v-model="dosage_amount" required class="input-text">
      </div>
      <div class="form-group">
        <label for="useCurrentDate">Date et heure actuelle:</label>
        <input type="checkbox" v-model="useCurrentDate" checked>
      </div>
      <div class="form-group" v-if="!useCurrentDate">
        <label for="dosage_date">Dosage Date:</label>
        <input v-model="dosage_date" type="datetime-local" required class="input-text">
      </div>
      <button type="submit" class="add-button">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aquarium_id: '',
      product_id: '',
      dosage_amount: '',
      dosage_date: '',
      aquariums: [],
      products: [],
      useCurrentDate: true
    }
  },
  async created() {
    await this.fetchAquariums();
    await this.fetchProducts();
    this.setCurrentDateTime(); // Initialise la date et l'heure actuelles
  },
  methods: {
    async fetchAquariums() {
      try {
        const response = await fetch('http://localhost:5000/aquariums');
        const data = await response.json();
        this.aquariums = data;
      } catch (error) {
        console.error('Error fetching aquariums:', error);
      }
    },
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    setCurrentDateTime() {
      const now = new Date();
      const tzOffset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
      const localISOTime = new Date(now - tzOffset).toISOString().slice(0, 16);
      this.dosage_date = localISOTime;
    },
    async addDosing() {
      let formattedDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('.')[0];
      if (!this.useCurrentDate) {
        formattedDate = new Date(this.dosage_date).toISOString().split('.')[0];
      }
      const payload = {
        aquarium_id: this.aquarium_id,
        product_id: this.product_id,
        dosage_amount: this.dosage_amount,
        dosage_date: formattedDate
      };
      const response = await fetch('http://localhost:5000/add_dosing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      alert(result.message);
    }
  },
  watch: {
    useCurrentDate(newValue) {
      if (newValue) {
        this.setCurrentDateTime();
      }
    }
  }
}
</script>


<style scoped>
.container {
  background-color: #000000;
  color: #E0E0E0;
  padding: 1em;
  display: flex;
  flex-direction: column;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 80%; /* Limite à 80% de l'écran */
  max-width: calc(80% * 1280px); /* Limite à 80% de 1280px */
  margin: auto; /* Centrer le formulaire */
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
}

/* Champs de texte */
.input-text, textarea, select {
  padding: 1em; /* Augmente la hauteur des champs */
  font-size: 1em !important; /* Assure une taille de police cohérente */
  background-color: #FFFFFF; /* Blanc opaque */
  color: #000000; /* Texte noir */
  border: 1px solid #E0E0E0;
}

/* En-têtes des sections */
h2 {
  color: #FFFFFF;
  font-weight: 300;
  border-bottom: 2px solid #87CEFA;
  padding-bottom: 0.5em;
}

.add-button {
  background-color: #1E90FF; /* Couleur du bouton */
  color: #FFFFFF;
  border: none;
  padding: 0.75em 1.5em;
  font-family: 'Consolas', 'Courier New', monospace;
  cursor: pointer;
  align-self: center; /* Centre le bouton */
}

.add-button:hover {
  background-color: #4682B4; /* Couleur au survol */
}
</style>
