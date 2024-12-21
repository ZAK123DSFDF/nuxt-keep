<script setup lang="ts">
import { ref, watch } from "vue"
import { useAsyncData } from "nuxt/app"
const message = ref<string>("")
const { data, status, error } = useAsyncData("getData", () =>
  $fetch("http://localhost:4000", {
    method: "GET",
    credentials: "include",
  })
)
const setCookie = async () => {
  try {
    const response = await $fetch("http://localhost:4000/setCookie", {
      method: "POST",
      credentials: "include",
    })
    message.value = response
    console.log("message", message.value)
  } catch (err) {
    console.error("Error setting cookie:", err)
    message.value = "Failed to set cookie."
  }
}
const deleteCookie = async () => {
  try {
    const response = await $fetch("http://localhost:4000/deleteCookie", {
      method: "POST",
      credentials: "include",
    })
    message.value = response
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
    <p v-else>{{ data?.message }}</p>
  </div>
</template>
