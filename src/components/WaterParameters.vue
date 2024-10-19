<template>
  <div class="water-parameters-table">
    <h2>Water Parameters</h2>
    <ag-grid-vue
      style="width: 100%; height: 500px;"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="waterParameters"
      :defaultColDef="{ sortable: true, filter: true, resizable: true }"
      pagination
      :paginationPageSize="10">
    </ag-grid-vue>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  name: 'WaterParameters',
  components: {
    'ag-grid-vue': AgGridVue
  },
  data() {
    return {
      waterParameters: [],
      columnDefs: [
        { headerName: 'Aquarium', field: 'aquarium_display' },
        { headerName: 'Paramètres', field: 'PARAMETER_NAME' },
        { headerName: 'Mesure', field: 'MESURE' },
        { headerName: 'Date Mesure', field: 'DATEMESURE' }
      ],
      error: null
    };
  },
  created() {
    this.fetchWaterParameters();
  },
  methods: {
    async fetchWaterParameters() {
      try {
        const response = await fetch('http://127.0.0.1:5000/waterparameters');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.waterParameters = data.map(param => ({
          ...param,
          aquarium_display: `${param.AQUARIUM_ID} - ${param.AQUARIUM_NAME}`
        }));
        console.log(this.waterParameters); // Vérifie les données récupérées
      } catch (error) {
        console.error('Error fetching water parameters:', error);
        this.error = 'Error fetching water parameters: ' + error.message;
      }
    }
  }
};
</script>

<style scoped>
.water-parameters-table {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.ag-theme-alpine {
  margin-top: 20px;
}
</style>
