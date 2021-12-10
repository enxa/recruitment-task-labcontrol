<script setup>
  import { ref, defineProps, toRefs, onMounted } from 'vue'

  const clientId = 'uYB88IY7UH3wsQFu9t3lWf5jM01GiTA8l441NSk0r8k'
  const props = defineProps({
    searchPhrase: String
  })

  let { searchPhrase } = toRefs(props)
  let photos = ref([])

  onMounted(async () => {
    const data = await fetch(`https://api.unsplash.com/search/photos?query=${searchPhrase.value}&client_id=${clientId}`)
    const json = await data.json()

    json.results.forEach(result => {
      photos.value.push(result.urls.small)
    })
  })
</script>

<template>
  <div class="gallery">
    <img v-for="(photo, i) in photos" :src="photo" :alt="i">
  </div>
</template>

<style scoped>
  .gallery {
    display: flex;
    flex-flow: column wrap;
    max-height: 150vh;
    max-width: 1260px;
    margin: auto;
    overflow: hidden;
  }
    .gallery img {
      width: 100%;
      max-width: 400px;
      margin: 10px;
    }
    
</style>