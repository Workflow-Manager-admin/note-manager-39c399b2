<script setup lang="ts">
</script>

<template>
  <router-view />
</template>

<style scoped>
/* Center whole app for SPA */
:global(body) {
  margin: 0;
  padding: 0;
  font-family: inherit;
  background: #f8fafd;
}
#app {
  min-height: 100vh;
}
</style>
