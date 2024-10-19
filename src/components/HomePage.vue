<template>
  <div class="homepage-container">
    <div class="homepage">
      <h1>Projet MyTanks App</h1>
      <nav>
        <ul>
          <li><router-link to="/waterparameters">Water Parameters</router-link></li>
          <li><router-link to="/products-and-dosing">Products and Dosing</router-link></li>
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
      <div class="half-width-container">
        <section class="half-width">
          <h3>Recent Dosages</h3>
          <ul class="dosage-list">
            <li>Dosage 1</li>
            <li>Dosage 2</li>
          </ul>
        </section>
        <section class="half-width">
          <h3>Products</h3>
          <ul class="products-list">
            <li>Product 1</li>
            <li>Product 2</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage', // Nom du composant multi-mots
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
body {
  background-color: #000000; /* Fond noir */
  color: #E0E0E0; /* Texte blanc doux */
  font-family: 'Arial', sans-serif; /* Typographie moderne */
  margin: 0;
  padding: 0;
  min-height: 100vh; /* Assure que le fond noir couvre toute la hauteur de la page */
}

.homepage-container {
  background-color: #000000; /* Fond noir */
  color: #E0E0E0; /* Texte blanc doux */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh; /* Assure que le fond noir couvre toute la hauteur de la page */
}

.homepage {
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 2em;
}

.full-width {
  width: 100%;
  margin: 2em 0;
}

.half-width-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2em;
}

.half-width {
  width: 48%;
}

.aquarium-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px; /* Espacement uniforme entre les tuiles */
}

.aquarium-tile {
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  text-align: center;
  border-radius: 0; /* Carré avec 4 lignes équilatérales */
  transition: background 0.3s, box-shadow 0.3s, transform 0.3s;
  color: #FFFFFF; /* Couleur du texte des tuiles */
  text-decoration: none;
  position: relative;
  overflow: hidden;
  background-color: #1E90FF; /* Uniforme Dodger Blue */
}

.aquarium-tile a {
  color: inherit; /* Garder le texte blanc */
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.aquarium-tile:hover {
  color: #FFFFFF; /* Garder le texte blanc */
  box-shadow: 0 0 20px 10px rgba(135, 206, 250, 0.5); /* Effet de scintillement lumineux */
  transform: scale(1.05); /* Augmente la taille légèrement au survol */
}

.aquarium-tile::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: rgba(255, 255, 255, 0.2);
  opacity: 0;
  transform: rotate(45deg);
  transition: opacity 0.5s ease-in-out;
}

.aquarium-tile:hover::before {
  opacity: 1;
  animation: shimmer 1.5s infinite, flicker 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translate(-50%, -50%) rotate(45deg);
    opacity: 0;
  }
  50% {
    transform: translate(0, 0) rotate(45deg);
    opacity: 0.5;
  }
  100% {
    transform: translate(50%, 50%) rotate(45deg);
    opacity: 0;
  }
}

@keyframes flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    opacity: 0.99;
  }
  20%, 24%, 55% {
    opacity: 0.4;
  }
  22% {
    opacity: 0.2;
  }
}

section h2, section h3 {
  color: #FFFFFF; /* Sous-titres en blanc */
  font-weight: 300;
  border-bottom: 2px solid #87CEFA;
  padding-bottom: 0.5em;
}

section h2 {
  font-size: 1.5em; /* Taille du titre de la section "Your Aquariums" */
}

section h3 {
  font-size: 1.2em; /* Taille réduite des titres "Recent Dosages" et "Products" */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0.5em 0;
  padding: 0.5em;
  border: 1px solid #87CEFA;
  border-radius: 5px;
  transition: background 0.3s;
}

li:hover {
  background: #87CEFA;
  color: #000000; /* Texte noir au survol */
}

li a {
  color: inherit;
  text-decoration: none;
  display: block;
}
</style>
