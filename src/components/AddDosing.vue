<template>
  <div>
    <h2>Ajouter un dosage</h2>
    <form @submit.prevent="addDosing">
      <div>
        <label>Aquarium ID:</label>
        <input v-model="aquarium_id" required>
      </div>
      <div>
        <label>Product ID:</label>
        <input v-model="product_id" required>
      </div>
      <div>
        <label>Dosage Amount:</label>
        <input v-model="dosage_amount" required>
      </div>
      <div>
        <label>Dosage Date:</label>
        <input v-model="dosage_date" type="datetime-local" required>
      </div>
      <button type="submit">Ajouter</button>
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
      dosage_date: ''
    }
  },
  methods: {
    async addDosing() {
      const response = await fetch('http://localhost:5000/add_dosing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          aquarium_id: this.aquarium_id,
          product_id: this.product_id,
          dosage_amount: this.dosage_amount,
          dosage_date: this.dosage_date
        })
      });
      const result = await response.json();
      alert(result.message);
    }
  }
}
</script>
