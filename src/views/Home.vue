<script setup>
  import { ref, watchEffect } from 'vue'

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
</script>

<template>
  <form v-on:submit.prevent="">
      <input type="text" placeholder="Type something..." v-model.trim="searchPhrase">
      <div v-for="tag in tags">
        <router-link :to="{ name: 'photos', params: {searchPhrase: tag } }">{{ tag }}</router-link>
      </div>
  </form>

  <hr>
  {{searchPhrase}}
  {{tags}}
</template>

