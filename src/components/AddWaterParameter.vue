<template>
  <div>
    <h2>Add Water Parameter</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="id_aquarium">Select Aquarium:</label>
        <select v-model="form.id_aquarium" required>
          <option v-for="aquarium in aquariums" :value="aquarium.id" :key="aquarium.id">
            {{ aquarium.nom }}
          </option>
        </select>
      </div>
      <div>
        <label for="idparameters">Parameter:</label>
        <select v-model="form.idparameters" required>
          <option v-for="param in parameters" :value="param.IDPARAMETERS" :key="param.IDPARAMETERS">
            {{ param.DESCRIPTION }}
          </option>
        </select>
      </div>
      <div>
        <label for="mesure">Mesure:</label>
        <input type="number" v-model="form.mesure" step="0.01" min="0" required>
      </div>
      <div>
        <button type="button" @click="toggleNoteInput">Ajouter une note</button>
      </div>
      <div v-if="showNoteInput">
        <textarea v-model="form.noteMesure" rows="3"></textarea>
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
        idparameters: '',
        mesure: '',
        dateMesure: new Date().toISOString().slice(0, 16),
        noteMesure: '',
        id_aquarium: ''
      },
      parameters: [],
      aquariums: [],
      useCurrentDate: true,
      showNoteInput: false // Variable pour contrôler l'affichage du champ note
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
      } catch (error) {
        console.error('Error fetching aquariums:', error);
      }
    },
    toggleNoteInput() {
      this.showNoteInput = !this.showNoteInput;
    },
    async submitForm() {
      try {
        let formattedDate = new Date().toISOString().split('.')[0];
        if (!this.useCurrentDate) {
          formattedDate = new Date(this.form.dateMesure).toISOString().split('.')[0];
        }
        const payload = {
          ...this.form,
          dateMesure: formattedDate,
          noteMesure: this.form.noteMesure || ''
        };
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
