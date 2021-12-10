<script setup>
  import { defineProps, defineEmits, toRefs } from 'vue'

  const props = defineProps({
    img: String,
    tags: Array,
    user: String,
    location: String
  })

  let { img, tags, user, location } = toRefs(props)

  const emit = defineEmits(['closeModal'])

  const closeModal = () => emit('closeModal')
</script>

<template scoped>
  <section @click.self="closeModal">
    <div class="modal">
      <img :src="img" :alt="location">
      <div v-for="tag in tags">{{ tag.title }}</div>
      <h1>{{ location }}</h1>
      <h4>{{ user }}</h4>
    </div>
  </section>
</template>

<style>
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
    }
</style>