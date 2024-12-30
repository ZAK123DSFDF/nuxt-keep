<script setup>
import { useAsyncData } from "nuxt/app"
import { useCounter } from "~/composables/useCounter"
const { data, status } = useAsyncData("dadjoke", async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return $fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  })
})
const { count, increment, decrement } = useCounter()
</script>

<template>
  <div>
    <div v-if="status === 'pending'" class="loading">Loading...</div>
    <div v-else-if="status === 'error'">Error: {{ error?.message }}</div>
    <div v-else-if="data">
      <div class="joke">{{ data.joke }}</div>
    </div>
    <h1>Counter</h1>
    <p>Current Count: {{ count }}</p>
    <button @click="increment">Add</button>
    <button @click="decrement">Minus</button>
    <NuxtLink to="/">home</NuxtLink>
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
