<template>
  <div>
    <h2>Water Parameters</h2>
    <ag-grid-vue
      style="width: 100%; height: 500px;"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="waterParameters">
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
        { headerName: 'ID', field: 'ID' },
        { headerName: 'ID_AQUARIUM', field: 'ID_AQUARIUM' },
        { headerName: 'DESCRIPTION', field: 'DESCRIPTION' },
        { headerName: 'MESURE', field: 'MESURE' },
        { headerName: 'DATEMESURE', field: 'DATEMESURE' },
        { headerName: 'NOTEMESURE', field: 'NOTEMESURE' }
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
        this.waterParameters = data;
      } catch (error) {
        console.error('Error fetching water parameters:', error);
      }
    }
  }
};
</script>

<style scoped>
.ag-theme-alpine {
  width: 100%;
  height: 500px;
  margin: 20px 0; /* Add some spacing around the grid */
}
</style>

