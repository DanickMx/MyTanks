<template>
  <div class="dosings-container">
    <div class="parameter-tiles">
      <div v-for="dosing in latestDosages" :key="dosing.PRODUCT_NAME" class="parameter-tile">
        <p>{{ dosing.PRODUCT_NAME }} {{ dosing.DOSAGE_AMOUNT }}</p>
        <small class="parameter-date">{{ dosing.DOSAGE_DATE }}</small>
      </div>
    </div>
    <div class="button-container">
      <button @click="showDosingForm = !showDosingForm" class="full-width-button">
        <i class="fas fa-plus"></i> Add Dosing
      </button>
    </div>
    <section v-if="showDosingForm" class="section">
      <AddDosing :aquariumId="aquariumId" @dosingAdded="fetchDosings" />
    </section>

    <ul>
      <li v-for="dosing in recentDosings" :key="dosing.DOSING_ID" class="table-row">
        <span class="table-cell">{{ dosing.PRODUCT_NAME }}</span>
        <span class="table-cell">{{ dosing.DOSAGE_AMOUNT }}</span>
        <span class="table-cell">{{ dosing.DOSAGE_DATE }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import AddDosing from './AddDosing.vue'; // Assurez-vous que le chemin est correct

export default {
  name: 'AquariumDosings',
  components: {
    AddDosing
  },
  data() {
    return {
      recentDosings: [],
      latestDosages: [],
      showDosingForm: false,
      aquariumId: this.$route.params.aquarium_id,
    };
  },
  created() {
    this.fetchDosings();
  },
  methods: {
    async fetchDosings() {
      try {
        const response = await fetch(`http://localhost:5000/dosings/${this.aquariumId}`);
        const data = await response.json();
        this.recentDosings = data
          .sort((a, b) => new Date(b.DOSAGE_DATE) - new Date(a.DOSAGE_DATE))
          .slice(0, 10);
        this.latestDosages = this.getLatestDosages(data);
      } catch (error) {
        console.error('Error fetching dosings:', error);
      }
    },

    getLatestDosages(dosages) {
      const latestMap = new Map();
      dosages.forEach(dose => {
        if (!latestMap.has(dose.PRODUCT_NAME) || new Date(dose.DOSAGE_DATE) > new Date(latestMap.get(dose.PRODUCT_NAME).DOSAGE_DATE)) {
          latestMap.set(dose.PRODUCT_NAME, dose);
        }
      });
      return Array.from(latestMap.values());
    }
  }
};
</script>

<style scoped>
.dosings-container, .parameters-container {
  margin-top: 2em;
}

.dosings-container, .parameters-container {
  margin-top: 2em;
}

.parameter-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.parameter-tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  text-align: center;
  background-color: #000;
  border: 1px solid #E0E0E0;
  color: #FFFFFF;
  width: 150px; /* Largeur fixe pour les tuiles carrées */
  height: 150px; /* Hauteur fixe pour les tuiles carrées */
  transition: background 0.3s, color 0.3s;
  border-radius: 2px; /* Arrondi léger des coins */
}

.table-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.5em 0;
}

.table-cell {
  flex: 1;
  text-align: left;
  padding: 0 1em;
}

/* Ajoute ici d'autres styles si nécessaire */


.parameter-tiles, .dosage-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  text-align: center;
  background-color: #000;
  border: 1px solid #E0E0E0;
  color: #FFFFFF;
  width: 150px; /* Largeur fixe pour les tuiles carrées */
  height: 150px; /* Hauteur fixe pour les tuiles carrées */
  transition: background 0.3s, color 0.3s;
}

.tile p {
  color: #FFFFFF;
  margin: 0 0 0.5em 0; /* Espace en bas */
}

.tile small {
  color: #A9A9A9; /* Couleur moins en évidence */
  font-size: 0.85em;
}

.table-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.5em 0;
}

.table-cell {
  flex: 1;
  text-align: left;
  padding: 0 1em;
}

.full-width-button {
  display: block; /* Affiche le bouton en bloc pour occuper toute la largeur */
  width: 60%; /* Assure que le bouton prend toute la largeur disponible */
  background-color: black; /* Couleur de fond par défaut */
  color: white; /* Couleur du texte */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Bordure discrète */
  border-radius: 2px; /* Arrondi léger des coins */
  padding: 1em; /* Espacement intérieur du bouton */
  cursor: pointer; /* Change le curseur au survol */
  transition: background-color 0.3s; /* Transition douce pour la couleur de fond */
  margin: 0 auto; /* Centre le bouton */
}

.full-width-button:hover {
  background-color: #1E90FF; /* Couleur de fond au survol */
}

</style>
