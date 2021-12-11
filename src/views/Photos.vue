<script setup>
  import SearchPhotos from '../components/SearchPhotos.vue';
  import ModalPhoto from '../components/ModalPhoto.vue'
  import { clientId } from '../main'
  import { ref, defineProps, toRefs, watchEffect } from 'vue'

  const props = defineProps({
    searchPhrase: String
  })

  let { searchPhrase } = toRefs(props)
  let photos = ref([])
  let selectedPhoto = ref({})
  let modalIsOpen = ref(false)
  let error = ref(null)

  watchEffect(async () => {
    if (searchPhrase.value) {
      photos.value = []
      try {
        const data = await fetch(`https://api.unsplash.com/search/photos?query=${searchPhrase.value}&client_id=${clientId}`)
        const json = await data.json()

        json.results.forEach(result => {
          photos.value.push({
            smallImg: result.urls.small,
            fullImg: result.urls.full,
            tags: result.tags,
            user: result.user.name,
            location: result.user.location
          })
        })
      } catch(err) {
        error.value = err.message
      }
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
    <h4 class="search-phrase">Results for: '{{ searchPhrase }}'</h4>
  </section>
  <section class="gallery">
    <p class="error" v-if="error">Something get wrong...</p>
    <img v-else v-for="(photo, i) in photos" :src="photo.smallImg" :alt="i" @click="openModal(photo)">
  </section>
  <section class="modal-photo">
    <ModalPhoto :image="selectedPhoto.fullImg" :tags="selectedPhoto.tags" :user="selectedPhoto.user" :location="selectedPhoto.location" v-if="modalIsOpen" @closeModal="closeModal"/>
  </section>
</template>

<style scoped>
  section.search-photos {
    display: grid;
    place-items: center;
    width: 100%;
    height: 30vh;
  }
  section.gallery {
    display: flex;
    flex-flow: column wrap;
    max-height: 150vh;
    max-width: 1260px;
    margin: auto;
    overflow: hidden;
  }
    section.gallery img {
      width: 100%;
      max-width: 400px;
      padding: 1vw;
      cursor: pointer;
    }  
</style>