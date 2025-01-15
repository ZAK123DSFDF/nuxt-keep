<template>
  <div>
    <NuxtLink to="/">home</NuxtLink>
    <div v-if="isPending">Loading...</div>
    <div v-else-if="isError">Error: {{ error?.message }}</div>
    <div v-else>
      <p>{{ data?.joke }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"

// Add an artificial delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetcher function with delay
const fetcher = async () => {
  await delay(1000) // Add a 1-second delay
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  })
  if (!response.ok) {
    throw new Error("Failed to fetch joke")
  }
  return response.json()
}

// Use the query with suspense
const { data, isPending, isError, error } = useQuery({
  queryKey: ["dadJoke"],
  queryFn: fetcher,
  suspense: false,
  initialData: "this is the data",
})
</script>
