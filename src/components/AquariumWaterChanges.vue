<template>
  <div class="water-changes-container">
    <div class="button-container">
      <button @click="toggleForm" class="full-width-button">
        <i class="fas fa-plus"></i> Add Water Change
      </button>
    </div>

    <!-- Utilisation de <transition> pour les animations -->
    <transition name="slide-fade">
      <section v-if="showAddWaterChangeForm" class="add-water-change-section">
        <!-- Utilisation de AddWaterChange comme composant -->
        <AddWaterChange
          :aquariumId="aquariumId"
          @waterchange-added="handleWaterChangeAdded"
        />
      </section>
    </transition>

    <h3>Liste des Changements d'Eau</h3>
    <ul>
      <li v-for="change in waterChanges" :key="change.WATERCHANGE_ID">
        {{ change.DATE_WATERCHANGE }} : {{ change.QUANTITY_IN }}L in, {{ change.QUANTITY_OUT }}L out
      </li>
    </ul>
  </div>
</template>

<script>
// Import du composant AddWaterChange
import AddWaterChange from './AddWaterChange.vue';

export default {
  props: {
    aquariumId: {
      type: Number,
      required: true
    }
  },
  components: {
    AddWaterChange
  },
  data() {
    return {
      waterChanges: [],
      showAddWaterChangeForm: false // Contrôle l'affichage du formulaire d'ajout
    };
  },
  created() {
    this.fetchWaterChanges();
  },
  methods: {
    toggleForm() {
      this.showAddWaterChangeForm = !this.showAddWaterChangeForm;
    },
    async fetchWaterChanges() {
      try {
        const response = await fetch(`http://localhost:5000/waterchanges/${this.aquariumId}`);
        if (response.ok) {
          this.waterChanges = await response.json();
        } else {
          console.error('Erreur lors de la récupération des changements d\'eau:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching water changes:', error);
      }
    },
    handleWaterChangeAdded() {
      // Ferme le formulaire et rafraîchit la liste après un ajout
      this.showAddWaterChangeForm = false;
      this.fetchWaterChanges();
    }
  }
};
</script>

<style scoped>
/* Animation de transition */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}

.slide-fade-enter {
  opacity: 0;
  transform: translateY(20px);
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Styles pour les changements d'eau */
.water-changes-container {
  padding: 20px;
  color: #ffffff;
}

.full-width-button {
  display: block;
  width: 60%;
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
