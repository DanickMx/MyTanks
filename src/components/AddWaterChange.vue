<template>
  <section>
    <form @submit.prevent="addWaterChange" class="form-container">
      <!-- Sélection de l'aquarium (affiché uniquement si aquariumId n'est pas fourni) -->
      <div class="form-group" v-if="!aquariumId">
        <label for="aquarium_id" class="form-label">Aquarium:</label>
        <select v-model="aquarium_id" required class="input-text" id="aquarium_id">
          <option v-for="aquarium in aquariums" :key="aquarium.AQUARIUM_ID" :value="aquarium.AQUARIUM_ID">
            {{ aquarium.AQUARIUM_NAME }}
          </option>
        </select>
      </div>

      <!-- Quantité d'eau ajoutée -->
      <div class="form-group">
        <label for="quantity_in" class="form-label">Quantité d'eau ajoutée:</label>
        <input v-model="quantity_in" type="number" step="0.01" min="0" required class="input-text" id="quantity_in" />
      </div>

      <!-- Option "même quantité" et Quantité d'eau retirée -->
      <div class="form-group">
        <label for="sameQuantity" class="form-label">Même quantité:</label>
        <input type="checkbox" v-model="sameQuantity" id="sameQuantity" />
      </div>
      <div class="form-group">
        <label for="quantity_out" class="form-label">Quantité d'eau retirée:</label>
        <input v-model="quantity_out" type="number" step="0.01" min="0" :disabled="sameQuantity" class="input-text" id="quantity_out" />
      </div>

      <!-- Option pour la date actuelle -->
      <div class="form-group">
        <label for="useCurrentDate" class="form-label">Date et heure actuelle:</label>
        <input type="checkbox" v-model="useCurrentDate" checked id="useCurrentDate" />
      </div>

      <!-- Champ pour la date personnalisée (visible uniquement si useCurrentDate est désactivé) -->
      <div class="form-group" v-if="!useCurrentDate">
        <label for="dateWaterChange" class="form-label">Date de changement d'eau:</label>
        <input v-model="dateWaterChange" type="datetime-local" required class="input-text" id="dateWaterChange" />
      </div>

      <!-- Bouton d'ajout -->
      <div class="form-group">
        <button type="submit" class="full-width-button">Save</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    aquariumId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      aquarium_id: this.aquariumId || '',
      quantity_in: '',
      quantity_out: '',
      dateWaterChange: '',
      aquariums: [],
      useCurrentDate: true,
      sameQuantity: true // Case à cocher "même quantité", activée par défaut
    };
  },
  async created() {
    await this.fetchAquariums();
    this.setCurrentDateTime(); // Initialisation de la date actuelle
  },
  methods: {
    async fetchAquariums() {
      try {
        const response = await fetch('http://localhost:5000/aquariums');
        const data = await response.json();
        this.aquariums = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des aquariums:', error);
      }
    },
    setCurrentDateTime() {
      const now = new Date();
      const tzOffset = now.getTimezoneOffset() * 60000;
      this.dateWaterChange = new Date(now.getTime() - tzOffset).toISOString().slice(0, 16);
    },
    async addWaterChange() {
      let formattedDate;

      if (this.useCurrentDate) {
        // Date actuelle en UTC avec secondes
        const now = new Date();
        formattedDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 19).replace('T', ' ');
      } else {
        // Ajuste `dateWaterChange` pour UTC avec fuseau horaire
        const selectedDate = new Date(this.dateWaterChange);
        formattedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ');
      }

      const payload = {
        aquarium_id: this.aquarium_id,
        quantity_in: this.quantity_in,
        quantity_out: this.quantity_out,
        date_waterchange: formattedDate // Date avec secondes en UTC
      };

      try {
        const response = await fetch('http://localhost:5000/add_waterchange', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          this.$emit('waterchange-added');
          this.resetForm();
        } else {
          alert(`Erreur: ${result.error}`);
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout du changement d'eau:", error);
      }
    },
    resetForm() {
      this.quantity_in = '';
      this.quantity_out = '';
      this.sameQuantity = true;
      this.setCurrentDateTime(); // Remet la date à l'heure actuelle
      this.useCurrentDate = true;
    }
  },
  watch: {
    useCurrentDate(newValue) {
      if (newValue) {
        this.setCurrentDateTime();
      }
    },
    quantity_in(newValue) {
      // Si la case "même quantité" est cochée, synchronise quantity_out avec quantity_in
      if (this.sameQuantity) {
        this.quantity_out = newValue;
      }
    },
    sameQuantity(newValue) {
      // Si "même quantité" est cochée, copie quantity_in dans quantity_out
      if (newValue) {
        this.quantity_out = this.quantity_in;
      }
    }
  }
};
</script>



<style scoped>
/* Structure du formulaire */
.form-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5em;
  border-radius: 2px;
  color: #FFFFFF;
  background-color: #222;
}

/* Espacement des éléments de formulaire */
.form-group {
  margin-bottom: 1em;
}

/* Style des labels */
.form-label {
  margin-bottom: 0.5em;
  color: #FFFFFF;
}

/* Style des champs d'entrée */
.input-text, select {
  padding: 0.5em;
  font-size: 1em;
  background-color: #333;
  color: white;
  border: 1px solid #FFFFFF;
  border-radius: 2px;
}

/* Style du bouton */
.full-width-button {
  display: block;
  width: 100%;
  background-color: black;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  padding: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 1em auto;
}

.full-width-button:hover {
  background-color: #1E90FF;
}
</style>
