<script setup>
  import SearchPhotos from '../components/SearchPhotos.vue';
  import ModalPhoto from '../components/ModalPhoto.vue'
  
  import { ref, defineProps, toRefs, watchEffect } from 'vue'

  const clientId = 'uYB88IY7UH3wsQFu9t3lWf5jM01GiTA8l441NSk0r8k'
  const props = defineProps({
    searchPhrase: String
  })

  let { searchPhrase } = toRefs(props)
  let photos = ref([])

  let selectedPhoto = ref({})
  let modalIsOpen = ref(false)

  watchEffect(async () => {
    if (searchPhrase.value) {
      photos.value = []
      const data = await fetch(`https://api.unsplash.com/search/photos?query=${searchPhrase.value}&client_id=${clientId}`)
      const json = await data.json()

      json.results.forEach(result => {
        console.log(result)
        photos.value.push({
          img: result.urls.small,
          tags: result.tags,
          user: result.user.name,
          location: result.user.location
        })
      })
    }
  })

  let openModal = photo => {
    selectedPhoto.value = photo
    modalIsOpen.value = true
  }

  let closeModal = () => {
    selectedPhoto.value = {}
    modalIsOpen.value = false
  }
</script>

<template>
  <SearchPhotos />
  <div class="gallery">
    <img  v-for="(photo, i) in photos" :src="photo.img" :alt="i" @click="openModal(photo)">
    <ModalPhoto :img="selectedPhoto.img" :tags="selectedPhoto.tags" :user="selectedPhoto.user" :location="selectedPhoto.location" v-if="modalIsOpen" @closeModal="closeModal"/>
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