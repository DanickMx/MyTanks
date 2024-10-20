<template>
  <div class="homepage-container">
    <div class="homepage">
      <h1>Projet MyTanks App</h1>
      <nav>
        <ul>
          <li><router-link to="/waterparameters" class="button">Water Parameters</router-link></li>
          <li><router-link to="/dosing" class="button">Dosing</router-link></li>
          <li><router-link to="/items" class="button">Admin Items</router-link></li>
        </ul>
      </nav>
      <section class="full-width">
        <h2>Your Aquariums</h2>
        <div class="aquarium-grid">
          <div v-for="aquarium in aquariums" :key="aquarium.AQUARIUM_ID" class="aquarium-tile">
            <router-link :to="`/aquarium/${aquarium.AQUARIUM_ID}`">{{ aquarium.AQUARIUM_NAME }}</router-link>
          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<script>
export default {
  name: 'HomePage',
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
        const data = await response.json();
        this.aquariums = data;
        console.log(this.aquariums); // Vérifie les données récupérées
      } catch (error) {
        console.error('Error fetching aquariums:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Styles globaux */
body {
  background-color: #000000;
  color: #E0E0E0;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

/* Conteneur de la page d'accueil */
.homepage-container {
  background-color: #000000;
  color: #E0E0E0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

/* Conteneur interne de la page d'accueil */
.homepage {
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 2em;
}

/* Largeur complète pour les sections */
.full-width {
  width: 100%;
  margin: 2em 0;
}

/* Conteneur des demi-largeurs */
.half-width-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2em;
}

/* Demi-largeur pour les sections */
.half-width {
  width: 48%;
}

/* Grille pour les aquariums */
.aquarium-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

/* Tuile des aquariums */
.aquarium-tile {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  text-align: center;
  background-color: #000; 
  border: 1px solid #E0E0E0; 
  color: #FFFFFF;
  text-decoration: none;
  transition: background 0.3s, color 0.3s;
  width: 125px; /* Fixer la largeur */
  height: 125px; /* Fixer la hauteur */
}

/* Lien des aquariums */
.aquarium-tile a {
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Hover effect for aquarium tiles */
.aquarium-tile:hover {
  background-color: #1E90FF; 
  color: #FFFFFF; /* Texte reste blanc */
}

/* En-têtes des sections */
h1, section h2, section h3 {
  color: #FFFFFF;
  font-weight: 300;
  border-bottom: 2px solid #87CEFA;
  padding-bottom: 0.5em;
}

section h2 {
  font-size: 1.5em;
}

section h3 {
  font-size: 1.2em;
}

/* Liste des dosages et des produits */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0.5em 0;
  padding: 0.5em;
  border: none;
}

li a {
  color: inherit;
  text-decoration: none;
  display: block;
}

/* Styles des boutons */
.button {
  border: none;
  color: #E0E0E0;
  padding: 0.5em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  transition: background 0.3s;
}

.button:hover {
  background: #1E90FF;
}
</style>
