<script setup>
import { useFetch } from "#app"
import { onUnmounted } from "vue"
import { onMounted } from "vue"
const { data: joke, status } = useFetch("https://icanhazdadjoke.com/", {
  headers: {
    Accept: "application/json",
  },
})
</script>

<template>
  <div>
    <p v-if="status === 'pending'" class="loading">Fetching a dad joke...</p>
    <p v-else class="joke">{{ joke?.joke || "No joke found" }}</p>
  </div>
</template>

<style scoped>
.loading {
  font-size: 1.2rem;
  color: gray;
  text-align: center;
  margin: 20px;
}

.joke {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 20px;
}
</style>
