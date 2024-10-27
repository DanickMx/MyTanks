<template>
  <section class="section">
    <!-- Section pour les derniers paramètres d'eau -->
    <div class="parameter-tiles">
      <div v-for="measurement in latestMeasurements" :key="measurement.PARAMETER_ID" class="parameter-tile">
        <p>{{ measurement.PARAMETER_NAME }} {{ measurement.MESURE }}</p>
        <small class="parameter-date">{{ measurement.DATEMESURE }}</small>
      </div>
    </div>

    <!-- Bouton pour ajouter un paramètre d'eau -->
    <div class="button-container">
      <button @click="toggleForm" class="full-width-button">
        <i class="fas fa-plus"></i> Add Parameter
      </button>
    </div>

    <!-- Transition pour le formulaire d'ajout de paramètre d'eau -->
    <transition name="slide-fade">
      <section v-if="showAddWaterParameterForm" class="add-water-parameter-section">
        <AddWaterParameter
          @close="showAddWaterParameterForm = false"
          :aquariumId="aquariumId"
          @parameterAdded="fetchWaterParameters"
        />
      </section>
    </transition>

    <!-- Liste des paramètres d'eau récents -->
    <ul>
      <li v-for="parameter in recentWaterParameters" :key="parameter.WATERPARAMETER_ID" class="table-row">
        <span class="table-cell">{{ parameter.PARAMETER_NAME }}</span>
        <span class="table-cell">{{ parameter.MESURE }}</span>
        <span class="table-cell">{{ parameter.DATEMESURE }}</span>
      </li>
      <li v-if="hasMoreThan10Results" class="more-data">...</li>
    </ul>

    <!-- Bouton pour accéder aux détails quotidiens des paramètres d'eau -->
    <div class="button-container">
      <router-link :to="{ name: 'AquariumDetails', params: { aquarium_id: aquariumId } }" class="full-width-button">
  Aquarium Details
</router-link>

    </div>
  </section>
</template>

<script>
import AddWaterParameter from '@/components/AddWaterParameter.vue';

export default {
  name: 'AquariumWaterParameters',
  components: {
    AddWaterParameter,
  },
  data() {
    return {
      waterParameters: [],
      recentWaterParameters: [],
      latestMeasurements: [],
      hasMoreThan10Results: false,
      showAddWaterParameterForm: false,
      aquariumId: this.$route.params.aquarium_id,
    };
  },
  created() {
    this.fetchWaterParameters();
  },
  methods: {
    toggleForm() {
      this.showAddWaterParameterForm = !this.showAddWaterParameterForm;
    },
    async fetchWaterParameters() {
      try {
        const response = await fetch(`http://localhost:5000/waterparameters/${this.aquariumId}`);
        const data = await response.json();
        this.waterParameters = data;
        this.getRecentWaterParameters();
        this.getLatestMeasurements();
      } catch (error) {
        console.error('Error fetching water parameters:', error);
      }
    },
    getRecentWaterParameters() {
      this.recentWaterParameters = this.waterParameters
        .sort((a, b) => new Date(b.DATEMESURE) - new Date(a.DATEMESURE))
        .slice(0, 10);
      this.hasMoreThan10Results = this.waterParameters.length > 10;
    },
    getLatestMeasurements() {
      const latestMap = new Map();
      this.waterParameters.forEach(param => {
        if (!latestMap.has(param.PARAMETER_NAME) || new Date(param.DATEMESURE) > new Date(latestMap.get(param.PARAMETER_NAME).DATEMESURE)) {
          latestMap.set(param.PARAMETER_NAME, param);
        }
      });
      this.latestMeasurements = Array.from(latestMap.values());
    },
  }
};
</script>


<style scoped>
/* Styles pour la transition */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 1s ease, transform 1s ease; /* Durée de transition */
}

.slide-fade-enter {
  opacity: 0; /* Invisible au départ */
  transform: translateY(20px); /* Déplacement vers le haut lors de l'entrée */
}

.slide-fade-enter-to {
  opacity: 1; /* Visible à la fin de l'entrée */
  transform: translateY(0); /* Retour à la position d'origine */
}

.slide-fade-leave-to {
  opacity: 0; /* Invisible lors de la fermeture */
  transform: translateY(-20px); /* Déplacement vers le haut lors de la fermeture */
}

/* Styles existants */
.dosings-container, .parameters-container {
  margin-top: 2em;
}

.parameter-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 30px; /* Augmentez la valeur pour plus d'espace entre les tuiles */
  padding: 20px;
}



.dosings-container, .parameters-container {
  margin-top: 2em;
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
  gap: 30px; /* Augmentez la valeur pour plus d'espace entre les tuiles */
}


.parameter-tiles, .dosage-tiles {

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
  margin: 1em auto; /* Ajout d'une marge de 1em en haut et en bas */
}

.full-width-button:hover {
  background-color: #1E90FF; /* Couleur de fond au survol */
}

</style>
