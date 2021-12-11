<script setup>
  import { ref, watchEffect } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const clientId = 'uYB88IY7UH3wsQFu9t3lWf5jM01GiTA8l441NSk0r8k'
  let searchPhrase = ref('')
  let tags = ref([])

  watchEffect(async () => {
    if (searchPhrase.value.length > 3) {
      tags.value = []

      const data = await fetch(`https://api.unsplash.com/search/photos?query=${searchPhrase.value}&client_id=${clientId}`)
      const json = await data.json()

      json.results.forEach(result => {
        result.tags.forEach(tag => {
          tags.value.push(tag.title)
        })
      })

      tags.value = Array.from(new Set(tags.value))
      if (!tags.value.length) tags.value.push('No results')
    } else {
      tags.value = []
    }
  })

  const findPhotos = phrase => {
    router.push({ name: 'photos', params: { searchPhrase: phrase } })
    searchPhrase.value = ''
  }
</script>

<template>
  <section>
    <form>
      <input type="text" placeholder="Type something..." v-model.trim="searchPhrase" @keydown.enter="findPhotos(searchPhrase)">
      <div class="tags">
        <a class="tag" href="#" v-for="tag in tags" @click="findPhotos(tag)">{{ tag }}</a>
      </div>
    </form>
  </section>
</template>

<style scoped>
    form {
      position: relative;
    }
      input {
        width: 100%;
        width: 50vw; 
        padding: 1vw;
      }
      .tags {
        position: absolute;
        display: flex;
        flex-flow: column nowrap;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        width: 100%;
      }
        .tag {
          padding: 1vh 1vw;
          text-decoration: none;
        }
        .tag:first-child {
          padding-top: 2vh 1vw;
        }
        .tag:last-child {
          padding-bottom: 2vh 1vw;
        }
</style>
