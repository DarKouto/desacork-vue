<script setup>
  console.log("Este é o components/AppBar.vue")
</script>

<template>
  <h2>
    App Bar Muito Bonita
    <v-btn to="/contactos" text="Contactos" color="primary"></v-btn>
  </h2>
  <hr/>
</template>

<style scoped>
  h2 {
    color: blue;
  }
</style>