<template>
  <div>
    <h1>Parent Component</h1>
    <p>Current Value: {{ dynamicProp }}</p>
    <button @click="updateValue">Change Prop</button>
    <!-- Pass the dynamic prop to the child -->
    <child-component :value="dynamicProp" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue"

const dynamicProp = ref("Initial Value")

// Watcher to monitor prop changes in the parent
watch(dynamicProp, (newValue, oldValue) => {
  console.log(`Prop changed in Parent: ${oldValue} -> ${newValue}`)
})

// Function to update the prop
const updateValue = () => {
  dynamicProp.value = "Updated Value at " + new Date().toLocaleTimeString()
}
</script>
