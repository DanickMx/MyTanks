<template>
  <div class="water-change-view">
    <router-link to="/" class="home-link">Retour à la page d'accueil</router-link>
    <AddWaterChange :aquariums="aquariums" @waterchange-added="handleWaterChangeAdded" />
  </div>
</template>

<script>
import AddWaterChange from './AddWaterChange.vue';

export default {
  name: 'WaterChangeView',
  components: { AddWaterChange },
  data() {
    return {
      aquariums: []
    };
  },
  async created() {
    await this.fetchAquariums();
  },
  methods: {
    async fetchAquariums() {
      try {
        const response = await fetch('http://127.0.0.1:5000/aquariums');
        this.aquariums = await response.json();
      } catch (error) {
        console.error('Error fetching aquariums:', error);
      }
    },
    handleWaterChangeAdded() {
      // Action que vous souhaitez réaliser après l’ajout
      this.fetchAquariums(); // Rafraîchit la liste des aquariums après l'ajout
    }
  },
};
</script>

<style scoped>
.container {
  background-color: #000000; /* Arrière-plan noir pour toute la page */
  color: #E0E0E0;
  padding: 1em;
  display: flex;
  flex-direction: column;
}

</style>
