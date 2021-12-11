<script setup>
  import { defineProps, defineEmits, toRefs } from 'vue'

  const props = defineProps({
    image: String,
    tags: Array,
    user: String,
    location: String
  })

  let { image, tags, user, location } = toRefs(props)

  const emit = defineEmits(['closeModal'])

  const closeModal = () => emit('closeModal')
</script>

<template scoped>
  <section @click.self="closeModal">
    <div class="modal">
      <div class="image" :style="{ backgroundImage: 'url(' + image + ')' }">
        <div class="loader">Loading...</div>
      </div>
      <div class="tags">
        <div v-for="tag in tags">{{ tag.title }}</div>
      </div>
      <h1>{{ user }}</h1>
      <h4>{{ location }}</h4>
    </div>
  </section>
</template>

<style scoped>
  section {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    display: grid;
    place-items: center;
  }
    .modal {
      background: #fff;
      padding: 2vw;
    }
      .image {
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: contain;
        height: 100%;
        min-height: 60vh;
        width: 60vw;
        min-width: 400px;
        margin: 2vw 0;
        display: grid;
        place-items: center;
        z-index: 1;
      }
        .loader {
          z-index: -1;
        }

    .tags {
      display: inline-flex;
    }
    
      .tags > * {
        border: 1px solid #000;
        padding: .5vw;
        margin: .5vw;
      }
</style>