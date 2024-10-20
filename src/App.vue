<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
/* Styles globaux */
html, body, #app {
  background-color: #000000; /* Fond noir partout */
  color: #E0E0E0;
  font-family: 'Consolas', 'Courier New', monospace; /* Police informatique */
  margin: 0;
  padding: 0;
  min-height: 100vh;
  box-sizing: border-box;
}


</style>
