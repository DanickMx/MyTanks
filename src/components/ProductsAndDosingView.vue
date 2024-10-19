<template>
  <div>
    <h2>Products and Dosing</h2>
    <AddProduct />
    <AddDosing />
  </div>
</template>

<script>
import AddProduct from './AddProduct.vue';
import AddDosing from './AddDosing.vue';

export default {
  name: 'ProductsAndDosingView',
  components: {
    AddProduct,
    AddDosing
  }
}
</script>
