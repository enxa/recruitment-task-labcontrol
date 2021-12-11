<script setup>
  import SearchPhotos from '../components/SearchPhotos.vue';
</script>

<template>
  <section class="search-photos">
    <SearchPhotos />
  </section>
</template>

<style scoped>
  section.search-photos {
    display: grid;
    place-items: center;
    width: 100%;
    height: 80vh;
  }
</style>