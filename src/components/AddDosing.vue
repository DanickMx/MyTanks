<template>
  <div class="container">
    <form @submit.prevent="addDosing" class="form-container">
      <!-- Sélection de l'aquarium (affiché uniquement si aquariumId n'est pas fourni) -->
      <div class="form-group" v-if="!aquariumId">
        <label for="aquarium_id" class="form-label">Aquarium:</label>
        <select v-model="form.aquarium_id" required class="input-text" id="aquarium_id">
          <option v-for="aquarium in aquariums" :key="aquarium.AQUARIUM_ID" :value="aquarium.AQUARIUM_ID">
            {{ aquarium.AQUARIUM_NAME }}
          </option>
        </select>
      </div>

      <!-- Sélection du produit -->
      <div class="form-group">
        <label for="product_id" class="form-label">Produit:</label>
        <select v-model="form.product_id" @change="updateSelectedUnit" required class="input-text" id="product_id">
          <option v-for="product in products" :key="product.PRODUCT_ID" :value="product.PRODUCT_ID">
            {{ product.PRODUCT_NAME }}
          </option>
        </select>
      </div>

      <!-- Quantité de dosage -->
      <div class="form-group">
        <label for="dosage_amount" class="form-label">Quantité:</label>
        <input v-model="form.dosage_amount" required class="input-text" id="dosage_amount" />
        <span class="unit-display">{{ selectedUnit }}</span>
      </div>

      <!-- Option pour la date actuelle -->
      <div class="form-group">
        <label for="useCurrentDate" class="form-label">Date et heure actuelle:</label>
        <input type="checkbox" v-model="useCurrentDate" checked id="useCurrentDate" />
      </div>

      <!-- Champ pour la date personnalisée (visible uniquement si useCurrentDate est désactivé) -->
      <div class="form-group" v-if="!useCurrentDate">
        <label for="dosage_date" class="form-label">Dosage Date:</label>
        <input v-model="form.dosage_date" type="datetime-local" required class="input-text" id="dosage_date" />
      </div>

      <button type="submit" class="add-button">Save</button>
    </form>
  </div>
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
      form: {
        aquarium_id: this.aquariumId || '',
        product_id: '',
        dosage_amount: '',
        dosage_date: ''
      },
      aquariums: [],
      products: [],
      useCurrentDate: true,
      selectedUnit: ''
    };
  },
  async created() {
    await this.fetchAquariums();
    await this.fetchProducts();
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
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    },
    setCurrentDateTime() {
      const now = new Date();
      const tzOffset = now.getTimezoneOffset() * 60000;
      this.form.dosage_date = new Date(now - tzOffset).toISOString().slice(0, 16); // Format en UTC sans secondes
    },
    updateSelectedUnit() {
      const selectedProduct = this.products.find(product => product.PRODUCT_ID === this.form.product_id);
      this.selectedUnit = selectedProduct ? selectedProduct.UNIT : '';
    },
    async addDosing() {
  let formattedDate;

  if (this.useCurrentDate) {
    // Date et heure actuelle en local sans conversion UTC
    const now = new Date();
    formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  } else {
    // Date sélectionnée, directement depuis `dateTime-local`, sans conversion UTC
    const selectedDate = new Date(this.form.dosage_date);
    formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")} ${String(selectedDate.getHours()).padStart(2, "0")}:${String(selectedDate.getMinutes()).padStart(2, "0")}:${String(selectedDate.getSeconds()).padStart(2, "0")}`;
  }

  const payload = {
    aquarium_id: this.form.aquarium_id,
    product_id: this.form.product_id,
    dosage_amount: this.form.dosage_amount,
    dosage_date: formattedDate // Envoie la date au format local
  };

  try {
    const response = await fetch("http://localhost:5000/add_dosing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (response.ok) {
      alert("Dosage ajouté avec succès!");
      this.resetForm(); // Réinitialise le formulaire après ajout
    } else {
      alert(`Erreur: ${result.error}`);
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du dosage:", error);
  }
},
resetForm() {
  // Réinitialisation des valeurs du formulaire
  this.form.product_id = '';
  this.form.dosage_amount = '';
  this.setCurrentDateTime(); // Remet la date actuelle par défaut
  this.useCurrentDate = true;
  this.selectedUnit = ''; // Réinitialise l'unité sélectionnée
}

  },
  watch: {
    useCurrentDate(newValue) {
      if (newValue) {
        this.setCurrentDateTime();
      }
    },
    product_id(newValue) {
      this.updateSelectedUnit(); // Appel à la mise à jour de l'unité sélectionnée
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