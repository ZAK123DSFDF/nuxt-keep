<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useAsyncData, useFetch } from "nuxt/app"
const message = ref<string>("")
const { data, status, error } = useFetch("/api/getData")
const setCookie = async () => {
  try {
    const response = await $fetch("/api/setCookie", {
      method: "POST",
    })
    message.value = response as string
    console.log("message", message.value)
  } catch (err) {
    console.error("Error setting cookie:", err)
    message.value = "Failed to set cookie."
  }
}
const deleteCookie = async () => {
  try {
    const response = await $fetch("/api/deleteCookie", {
      method: "POST",
    })
    message.value = response as string
    console.log("message", message.value)
  } catch (err) {
    console.error("Error deleting cookie:", err)
    message.value = "Failed to delete cookie."
  }
}
</script>

<template>
  <div>
    <button @click="setCookie">Set Cookie</button>
    <button @click="deleteCookie">Delete Cookie</button>
    <p v-if="message">{{ message }}</p>
    <p v-else-if="status === 'pending'">Loading...</p>
    <p v-else-if="error">{{ error.data?.message }}</p>
    <p v-else>{{ data.message }}</p>
  </div>
</template>
