<template>
  <div>
    <h2>Add Water Parameter</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="aquarium_id">Select Aquarium:</label>
        <select v-model="form.aquarium_id" required>
          <option v-for="aquarium in aquariums" :value="aquarium.AQUARIUM_ID" :key="aquarium.AQUARIUM_ID">
            {{ aquarium.AQUARIUM_NAME }}
          </option>
        </select>
      </div>
      <div>
        <label for="parameters_id">Parameter:</label>
        <select v-model="form.parameters_id" required>
          <option v-for="param in parameters" :value="param.PARAMETER_ID" :key="param.PARAMETER_ID">
            {{ param.PARAMETER_NAME }}
          </option>
        </select>
      </div>
      <div>
        <label for="mesure">Mesure:</label>
        <input type="number" v-model="form.mesure" step="0.01" min="0" required>
      </div>
      <div>
        <label for="useCurrentDate">Date et heure actuelle:</label>
        <input type="checkbox" v-model="useCurrentDate" checked>
      </div>
      <div v-if="!useCurrentDate">
        <label for="dateMesure">Date Mesure:</label>
        <input type="datetime-local" v-model="form.dateMesure">
      </div>
      <button type="submit">Add Parameter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddWaterParameter',
  data() {
    return {
      form: {
        parameters_id: '',
        mesure: '',
        dateMesure: new Date().toISOString().slice(0, 16),
        aquarium_id: ''
      },
      parameters: [],
      aquariums: [],
      useCurrentDate: true
    };
  },
  created() {
    this.fetchParameters();
    this.fetchAquariums();
  },
  methods: {
    async fetchParameters() {
      try {
        const response = await fetch('http://127.0.0.1:5000/parameters');
        const data = await response.json();
        this.parameters = data;
      } catch (error) {
        console.error('Error fetching parameters:', error);
      }
    },
    async fetchAquariums() {
      try {
        const response = await fetch('http://127.0.0.1:5000/aquariums');
        const data = await response.json();
        this.aquariums = data;
        console.log(this.aquariums); // Vérifie les données récupérées
      } catch (error) {
        console.error('Error fetching aquariums:', error);
      }
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
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
div {
  margin-bottom: 1em;
}
label {
  margin-bottom: 0.5em;
}
input, select {
  padding: 0.5em;
  font-size: 1em;
}
button {
  padding: 0.5em 1em;
  background-color: #009879;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
