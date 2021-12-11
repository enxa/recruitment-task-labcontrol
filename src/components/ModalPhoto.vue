<script setup>
  import { defineProps, toRefs, defineEmits } from 'vue'

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
      <div class="btn-close-modal" @click.self="closeModal">
        ×
      </div>
      <br>
      <div class="image" :style="{ backgroundImage: 'url(' + image + ')' }">
        <div class="loader">Loading...</div>
      </div>
      <div class="tags">
        <p class="tag" v-for="tag in tags">{{ tag.title }}</p>
      </div>
      <h5>{{ user }}</h5>
      <p>{{ location }}</p>
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
      .btn-close-modal {
        font-size: 3rem;
        float: right;
        cursor: pointer;
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
    
      .tag {
        border: 1px solid #000;
        padding: .25vh .5vw;
        margin: 2.5vh .5vw;
      }
      .tag:first-child {
        margin-left: 0;
      }
      .tag:last-child {
        margin-right: 0;
      }
      .modal > p:first-letter {
        text-transform:capitalize;
      }
</style>