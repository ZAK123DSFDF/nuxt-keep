<template>
  <div>
    <h2>Child Component</h2>
    <p>Received Value: {{ value }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
})
</script>
