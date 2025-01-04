<script setup>
import { useAsyncData } from "nuxt/app"
import { onMounted } from "vue"
import { ref } from "vue"
import { useCounter } from "~/composables/useCounter"
const title = ref("Hello World")
const ogDescription = ref("Check out this awesome dad joke!")

const { data, status } = useAsyncData("dadjoke", async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return $fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  })
})
const { count, increment, decrement } = useCounter()
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
    <Meta property="og:title" :content="title" />
    <Meta property="og:description" :content="ogDescription" />
  </Head>
  <div>
    <input v-model="title" />
    <div v-if="status === 'pending'" class="loading">Loading...</div>
    <div v-else-if="status === 'error'">Error: {{ error?.message }}</div>
    <div v-else-if="data">
      <div class="joke">{{ data.joke }}</div>
    </div>
    <div v-else class="loading">Loading...</div>
    <h1>Counter</h1>
    <p>Current Count: {{ count }}</p>
    <button @click="increment">Add</button>
    <button @click="decrement">Minus</button>
    <button @click="clear">clear</button>
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
