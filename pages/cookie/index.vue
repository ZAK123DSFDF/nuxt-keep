<script setup lang="ts">
import { ref } from "vue"

const message = ref("")

const setCookie = async () => {
  try {
    const response = await $fetch("/api/setCookie", {
      method: "POST",
    })
    message.value = response.message
  } catch (error) {
    console.error("Error setting cookie:", error)
    message.value = "Failed to set cookie."
  }
}
const deleteCookie = async () => {
  try {
    const response = await $fetch("/api/deleteCookie", {
      method: "POST",
    })
    message.value = response.message
  } catch (error) {
    console.error("Error deleting cookie:", error)
    message.value = "Failed to delete cookie."
  }
}
</script>

<template>
  <div>
    <button @click="setCookie">Set Cookie</button>
    <button @click="deleteCookie">delete Cookie</button>
    <p>{{ message }}</p>
  </div>
</template>
