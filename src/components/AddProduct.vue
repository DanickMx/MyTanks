<template>
  <div class="container">
    <h2>Ajouter un produit</h2>
    <form @submit.prevent="addProduct">
      <div>
        <label>Nom du produit:</label>
        <input v-model="product_name" required>
      </div>
      <div>
        <label>Description:</label>
        <input v-model="description" required>
      </div>
      <div>
        <label>Nom de l'entreprise:</label>
        <select v-model="company_id" required>
          <option v-for="company in companies" :key="company.COMPANY_ID" :value="company.COMPANY_ID">{{ company.COMPANY_NAME }}</option>
        </select>
      </div>
      <button type="submit">Ajouter</button>
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
      companies: [] // Liste des entreprises
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
  background-color: #000000; /* Assurer que le fond est noir */
  color: #E0E0E0;
}
</style>
