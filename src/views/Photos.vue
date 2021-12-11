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
          smallImg: result.urls.small,
          fullImg: result.urls.full,
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
  <section class="search-photos">
    <SearchPhotos />
  </section>
  <div class="gallery">
    <img  v-for="(photo, i) in photos" :src="photo.smallImg" :alt="i" @click="openModal(photo)">
    <ModalPhoto :image="selectedPhoto.fullImg" :tags="selectedPhoto.tags" :user="selectedPhoto.user" :location="selectedPhoto.location" v-if="modalIsOpen" @closeModal="closeModal"/>
  </div>
</template>

<style scoped>
  section.search-photos {
    display: grid;
    place-items: center;
    width: 100%;
    height: 20vh;
  }
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
        padding: 1vw;
      }
</style>