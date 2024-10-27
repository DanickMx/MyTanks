<template>
  <div class="container">
    <div class="nav">
      <router-link to="/" class="home-link">Retour à la page d'accueil</router-link>
    </div>
    <h2>Dosings</h2>
	<h3>Ajouter un dosage</h3>
    <div class="add-sections">
      <AddDosing class="form-section"/>
    </div>
  </div>
</template>

<script>
import AddDosing from './AddDosing.vue';

export default {
  name: 'DosingView',
  components: {
    AddDosing
  }
}
</script>

<style scoped>
.container {
  background-color: #000000;
  color: #E0E0E0;
  padding: 1em;
  display: flex;
  flex-direction: column;
}

.nav {
  margin-bottom: 1em;
}

.home-link {
  color: #1E90FF;
  text-decoration: none;
  font-size: 1.2em;
  font-family: 'Consolas', 'Courier New', monospace;
}

.home-link:hover {
  text-decoration: underline;
}

.aquarium-view h1 {
  color: #FFFFFF;
  font-weight: 300;
  text-align: center;
  margin-bottom: 1em;
  text-shadow: 0 0 10px rgba(135, 206, 250, 0.5); /* Effet de lueur */
}

.section {
  margin-top: 2em;
}

.date-picker-container {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.date-picker {
  margin-right: 1em;
  padding: 0.5em;
  font-family: 'Consolas', 'Courier New', monospace;
}

ul {
  list-style: none;
  padding: 0;
}

ul li::before {
  content: ">";
  color: #E0E0E0; /* Même couleur que le texte */
  margin-right: 0.5em;
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

.list-item {
  background-color: #2c2c2c;
  padding: 1em;
  border-radius: 5px;
  margin-bottom: 0.5em;
}

.button, .add-button {
  background-color: #1E90FF;
  color: #FFFFFF;
  border: none;
  padding: 0.75em 1.5em;
  font-family: 'Consolas', 'Courier New', monospace;
  cursor: pointer;
  align-self: center;
}

.button:hover, .add-button:hover {
  background-color: #4682B4;
}

.no-data {
  color: #E0E0E0; /* Même couleur que le reste du texte */
  font-weight: bold;
}

.more-data {
  list-style-type: none;
  text-align: left;
}

.button-container {
  display: flex;
  justify-content: center; /* Centre horizontalement */
  margin-top: 1em; /* Ajouter un espace au-dessus des boutons */
}

.form-container {
  display: flex;
  flex-direction: column; /* Dispose les éléments en colonne */
  align-items: center; /* Centre les éléments horizontalement */
  margin-top: 1em; /* Ajouter un espacement au-dessus du formulaire */
}

.form-group {
  display: flex;
  flex-direction: column; /* Dispose les labels et champs en colonne */
  margin: 0.5em 0; /* Ajouter un espacement vertical entre les lignes */
  width: 100%; /* S'assurer que les champs utilisent toute la largeur disponible */
  max-width: 400px; /* Limite la largeur maximale des champs */
}

.form-label {
  margin-bottom: 0.2em; /* Espace entre le label et le champ */
}

.submit-button, .add-button {
  align-self: center; /* Centre les boutons */
}



.add-button {
  display: block; /* S'assure que le bouton prend toute la largeur */
  width: 100%; /* Prend 100% de la largeur du conteneur */
  background-color: black; /* Couleur de fond noire */
  color: white; /* Couleur du texte blanche */
  border: none; /* Supprime la bordure */
  padding: 15px; /* Ajoute de l'espace intérieur */
  text-align: center; /* Centre le texte */
  font-size: 16px; /* Ajuste la taille de la police */
  transition: background-color 0.3s; /* Ajoute une transition pour le changement de couleur */
}

.add-button:hover {
  background-color: #3498db; /* Couleur de fond bleu au survol */
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
  margin: 20px;
}

</style>
