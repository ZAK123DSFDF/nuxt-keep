<script setup>
import { useFetch } from "#app"
const { data: joke, pending } = useFetch("https://icanhazdadjoke.com/", {
  headers: {
    Accept: "application/json",
  },
})
</script>

<template>
  <div>
    <p v-if="pending" class="loading">Fetching a dad joke...</p>
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
