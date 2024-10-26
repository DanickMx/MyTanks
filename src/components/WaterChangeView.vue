<template>
  <div class="water-change-view">
    <router-link to="/" class="home-link">Retour à la page d'accueil</router-link>
    <AddWaterChange :aquariums="aquariums" />
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
  },
};
</script>

<style scoped>
.water-change-view {
  padding: 20px;
  background-color: #222;
  color: #fff;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 10px;
}
input, select {
  margin-top: 5px;
}
button {
  margin-top: 15px;
  padding: 10px;
  background-color: #1E90FF;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0b7dda;
}
</style>
