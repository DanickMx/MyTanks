<template>
  <div class="container">
    <h2>Ajouter un changement d'eau</h2>
    <form @submit.prevent="addWaterChange" class="form-container">
      <div class="form-group">
        <label for="aquarium_id" class="form-label">Aquarium:</label>
        <select v-model="aquarium_id" required class="input-text" id="aquarium_id">
          <option v-for="aquarium in aquariums" :key="aquarium.AQUARIUM_ID" :value="aquarium.AQUARIUM_ID">{{ aquarium.AQUARIUM_NAME }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="quantity_out" class="form-label">Quantité d'eau retirée:</label>
        <input v-model="quantity_out" type="number" step="0.01" min="0" required class="input-text" id="quantity_out">
      </div>
      <div class="form-group">
        <label for="quantity_in" class="form-label">Quantité d'eau ajoutée:</label>
        <input v-model="quantity_in" type="number" step="0.01" min="0" class="input-text" id="quantity_in">
      </div>
      <div class="form-group">
        <label for="useCurrentDate" class="form-label">Date et heure actuelle:</label>
        <input type="checkbox" v-model="useCurrentDate" checked id="useCurrentDate">
      </div>
      <div class="form-group" v-if="!useCurrentDate">
        <label for="dateWaterChange" class="form-label">Date de changement d'eau:</label>
        <input v-model="dateWaterChange" type="datetime-local" required class="input-text" id="dateWaterChange">
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
      quantity_out: '',
      quantity_in: '',
      dateWaterChange: '',
      aquariums: [],
      useCurrentDate: true
    };
  },
  async created() {
    await this.fetchAquariums();
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
    setCurrentDateTime() {
      const now = new Date();
      const tzOffset = now.getTimezoneOffset() * 60000;
      const localISOTime = new Date(now - tzOffset).toISOString().slice(0, 16);
      this.dateWaterChange = localISOTime;
    },
    async addWaterChange() {
      let formattedDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('.')[0];
      if (!this.useCurrentDate) {
        formattedDate = new Date(this.dateWaterChange).toISOString().split('.')[0];
      }
      const payload = {
        aquarium_id: this.aquarium_id,
        quantity_out: this.quantity_out,
        quantity_in: this.quantity_in,
        dateWaterChange: formattedDate
      };
      const response = await fetch('http://localhost:5000/add_waterchange', {
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

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 80%;
  margin: auto;
}

.form-group {
  display: flex;
  align-items: center;
  width: 400px;
  margin: auto;
  justify-content: space-between;
}

label {
  flex: 1;
  margin-right: 1em;
  text-align: left;
}

.input-text, textarea, select {
  flex: 2;
  padding: 1em;
  font-size: 1em;
  background-color: #FFFFFF;
  color: #000000;
  border: 1px solid #E0E0E0;
}

h2 {
  color: #FFFFFF;
  font-weight: 300;
  border-bottom: 2px solid #87CEFA;
  padding-bottom: 0.5em;
}

.add-button {
  background-color: #1E90FF;
  color: #FFFFFF;
  border: none;
  padding: 0.75em 1.5em;
  font-family: 'Consolas', 'Courier New', monospace;
  cursor: pointer;
  align-self: center;
}

.add-button:hover {
  background-color: #4682B4;
}
</style>
