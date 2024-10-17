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
      paginationPageSize="10"
      :paginationPageSizeSelector="false">
    </ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

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
        { headerName: 'Description', field: 'DESCRIPTION' },
        { headerName: 'Mesure', field: 'MESURE' },
        { headerName: 'Date Mesure', field: 'DATEMESURE' },
        { headerName: 'Note Mesure', field: 'NOTEMESURE' }
      ]
    };
  },
  created() {
    this.fetchWaterParameters();
  },
  methods: {
    async fetchWaterParameters() {
      try {
        const response = await fetch('http://127.0.0.1:5000/waterparameters');
        const data = await response.json();
        this.waterParameters = data.map(param => ({
          ...param,
          aquarium_display: `${param.ID_AQUARIUM} - ${param.NOM_AQUARIUM}`
        }));
        console.log(this.waterParameters); // Vérifie les données récupérées
      } catch (error) {
        console.error('Error fetching water parameters:', error);
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
