<template>
  <section>
    <form @submit.prevent="submitForm" class="form-container">
      <!-- Aquarium selection shown only if aquariumId is not provided -->
      <div class="form-group" v-if="!aquariumId">
        <label for="aquarium_id" class="form-label">Aquarium:</label>
        <select v-model="form.aquarium_id" class="input-text" id="aquarium_id" required>
          <option v-for="aquarium in aquariums" :key="aquarium.AQUARIUM_ID" :value="aquarium.AQUARIUM_ID">
            {{ aquarium.AQUARIUM_NAME }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="parameter_id" class="form-label">Paramètre:</label>
        <select v-model="form.parameter_id" required class="input-text" id="parameter_id">
          <option v-for="parameter in parameters" :key="parameter.PARAMETER_ID" :value="parameter.PARAMETER_ID">
            {{ parameter.PARAMETER_NAME }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="mesure" class="form-label">Mesure:</label>
        <input v-model="form.mesure" required class="input-text" id="mesure" />
      </div>
      <div class="form-group">
        <label for="useCurrentDate" class="form-label">Date et heure actuelle:</label>
        <input type="checkbox" v-model="useCurrentDate" checked id="useCurrentDate" />
      </div>
      <div class="form-group" v-if="!useCurrentDate">
        <label for="dateMesure" class="form-label">Date de mesure:</label>
        <input v-model="form.dateMesure" type="datetime-local" required class="input-text" id="dateMesure" />
      </div>
      <div class="form-group">
        <button type="submit" class="full-width-button">Save</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'AddWaterParameter',
  props: {
    aquariumId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
        parameter_id: '',
        mesure: '',
        dateMesure: '',
        aquarium_id: this.aquariumId || ''
      },
      parameters: [],
      aquariums: [],
      useCurrentDate: true
    };
  },
  created() {
    this.fetchParameters();
    this.fetchAquariums();
    this.setCurrentDateTime();
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
    setCurrentDateTime() {
      const now = new Date();
      const tzOffset = now.getTimezoneOffset() * 60000;
      this.form.dateMesure = new Date(now.getTime() - tzOffset).toISOString().slice(0, 16);
    },
    async submitForm() {
      try {
        let formattedDate;

        if (this.useCurrentDate) {
          const now = new Date();
          formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
        } else {
          const selectedDate = new Date(this.form.dateMesure);
          formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")} ${String(selectedDate.getHours()).padStart(2, "0")}:${String(selectedDate.getMinutes()).padStart(2, "0")}:${String(selectedDate.getSeconds()).padStart(2, "0")}`;
        }

        const payload = {
          parameter_id: this.form.parameter_id,
          mesure: this.form.mesure,
          dateMesure: formattedDate,
          aquarium_id: this.form.aquarium_id
        };

        const response = await fetch('http://127.0.0.1:5000/add_waterparameter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        alert("Water parameter added successfully!");

        this.$emit('parameterAdded');
        this.resetForm();
      } catch (error) {
        console.error('Error adding water parameter:', error);
        alert("Une erreur est survenue lors de l'ajout du paramètre d'eau. Veuillez réessayer.");
      }
    },
    resetForm() {
      this.form.parameter_id = '';
      this.form.mesure = '';
      this.setCurrentDateTime();
      this.useCurrentDate = true;
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
/* Structure du formulaire */
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5em;
  border-radius: 2px;
  color: #FFFFFF;

}

/* Espacement des éléments de formulaire */
div {
  margin-bottom: 1em;
}

/* Style des labels */
label {
  margin-bottom: 0.5em;
  color: #FFFFFF;
}

/* Style des champs d'entrée */
input, select {
  padding: 0.5em;
  font-size: 1em;
  background-color: #333;
  color: white;
  border: 1px solid #FFFFFF;
  border-radius: 2px;
}

/* Style du bouton 'Enregistré' pour correspondre aux autres boutons */
button {
  display: block;
  width: 60%;
  background-color: black;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  padding: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 1em auto; /* Ajout d'une marge de 1em en haut et en bas */
}

button:hover {
  background-color: #1E90FF; /* Couleur au survol */
}
</style>

