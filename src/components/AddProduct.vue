<template>
  <div class="container">
    <h2>Ajouter un produit</h2>
    <form @submit.prevent="addProduct" class="form-container">
      <div class="form-group">
        <label>Product Name:</label>
        <input v-model="product_name" required class="input-text">
      </div>
      <div class="form-group">
        <label>Description:</label>
        <textarea v-model="description" required class="input-text"></textarea>
      </div>
      <div class="form-group">
        <label>Compagnie:</label>
        <select v-model="company_id" required class="input-text">
          <option v-for="company in companies" :key="company.COMPANY_ID" :value="company.COMPANY_ID">{{ company.COMPANY_NAME }}</option>
        </select>
      </div>
      <button type="submit" class="add-button">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product_name: '',
      description: '',
      company_id: '',
      companies: []
    }
  },
  async created() {
    await this.fetchCompanies();
  },
  methods: {
    async fetchCompanies() {
      try {
        const response = await fetch('http://localhost:5000/companies');
        const data = await response.json();
        this.companies = data;
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    },
    async addProduct() {
      const response = await fetch('http://localhost:5000/add_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_name: this.product_name,
          description: this.description,
          company_id: this.company_id
        })
      });
      const result = await response.json();
      alert(result.message);
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
  align-items: center;
  width: 400px;
  margin: auto;
  justify-content: space-between; /* Espace entre label et input */
}

label {
  flex: 1;
  margin-right: 1em; /* Espace entre label et input */
  text-align: left; /* Alignement du texte à gauche */
}

.input-text, textarea, select {
  flex: 2;
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
