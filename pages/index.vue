<script setup>
import { storeToRefs } from "pinia"
import { useCounterStore } from "~/store/counter"
const counterStore = useCounterStore()

const { count, details } = storeToRefs(counterStore)

const { increment, decrement, updateName } = counterStore

const changeAppName = () => {
  updateName("Updated Counter App")
}
</script>

<template>
  <NuxtLink to="/query">query</NuxtLink>
  <NuxtLink to="/joke">joke</NuxtLink>
  <Joke />
  <h1>{{ details.name }} (v{{ details.version }})</h1>
  <h2>Counter: {{ count }}</h2>
  <button @click="increment()">Increment</button>
  <button @click="decrement()">Decrement</button>
  <button @click="changeAppName">Change App Name</button>
  <NuxtLink to="/joke">joke</NuxtLink>
</template>

<style scoped>
.loading {
  font-size: 1.2rem;
  color: gray;
  text-align: center;
  margin: 20px;
}
</style>
