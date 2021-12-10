<script setup>
  import { defineProps, toRefs, onMounted } from 'vue'

  const props = defineProps({
    searchPhrase: String
  })

  const { searchPhrase } = toRefs(props)

  onMounted(() => {
    
  })
</script>

<template>
  <div>
    {{searchPhrase}}
  </div>
</template>