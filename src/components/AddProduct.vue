<template>
  <div>
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
        <label>Company ID:</label>
        <input v-model="company_id" required>
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
      company_id: ''
    }
  },
  methods: {
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
