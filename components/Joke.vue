<script setup>
import { useFetch } from "#app"

// Fetch data using `useFetch` with proper options for SSR
const { data: joke, pending } = useFetch("https://icanhazdadjoke.com/", {
  headers: {
    Accept: "application/json",
  },
  // Ensure the result is included in the SSR payload
  initialCache: true,
})
</script>

<template>
  <div>
    <!-- Loading state -->
    <p v-if="pending" class="loading">Fetching a dad joke...</p>
    <!-- Joke content -->
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
