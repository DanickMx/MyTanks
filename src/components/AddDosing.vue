<template>
  <div class="container">
    <h2>Ajouter un dosage</h2>
    <form @submit.prevent="addDosing" class="form-container">
      <div class="form-group">
        <label>Aquarium ID:</label>
        <input v-model="aquarium_id" required class="input-text">
      </div>
      <div class="form-group">
        <label>Product ID:</label>
        <input v-model="product_id" required class="input-text">
      </div>
      <div class="form-group">
        <label>Dosage Amount:</label>
        <input v-model="dosage_amount" required class="input-text">
      </div>
      <div class="form-group">
        <label>Dosage Date:</label>
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
