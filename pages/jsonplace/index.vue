<script setup>
import { clearNuxtData, refreshNuxtData, useAsyncData } from "nuxt/app"
import { onUnmounted, onMounted, ref } from "vue"
import { useCounter } from "~/composables/useCounter"

const title = ref("Hello World")
const ogDescription = ref("Check out this awesome post!")

const { data, status } = useAsyncData("post", async () => {
  // Simulate a 2-second delay

  // Fetch a post from JSONPlaceholder API
  return $fetch("https://jsonplaceholder.typicode.com/posts/1")
})

const { count, increment, decrement } = useCounter()

onMounted(() => {
  const handleBeforeUnload = () => {
    refreshNuxtData("post")
  }
  window.addEventListener("beforeunload", handleBeforeUnload)
  onUnmounted(() => {
    window.removeEventListener("beforeunload", handleBeforeUnload)
  })
})
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
    <Meta property="og:title" :content="title" />
    <Meta property="og:description" :content="ogDescription" />
  </Head>
  <div>
    <NuxtLink to="/">home</NuxtLink>
    <input v-model="title" />
    <div v-if="status === 'pending'" class="loading">Loading...</div>
    <div v-else-if="status === 'error'">Error: {{ error?.message }}</div>
    <div v-else-if="data">
      <div class="post">
        <h3>{{ data.title }}</h3>
        <p>{{ data.body }}</p>
      </div>
    </div>
    <div v-else class="loading">Loading...</div>
    <h1>Counter</h1>
    <p>Current Count: {{ count }}</p>
    <button @click="increment">Add</button>
    <button @click="decrement">Minus</button>
    <button @click="clear">clear</button>
    <NuxtLink to="/">home</NuxtLink>
    <UButton color="primary" variant="outline">Button</UButton>
  </div>
</template>

<style scoped>
.loading {
  font-size: 1.2rem;
  color: gray;
  text-align: center;
  margin: 20px;
}

.post {
  font-size: 1.2rem;
  color: #333;
  text-align: center;
  margin: 20px;
}

.post h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
