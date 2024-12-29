<script setup>
import { ref } from "vue"

// Ref to store streamed data
const streamedData = ref("")

// Fetch and process the stream
const fetchStream = async () => {
  streamedData.value = "" // Clear previous data

  const response = await fetch("/api/stream")
  const reader = response.body?.getReader()
  const decoder = new TextDecoder("utf-8")

  if (!reader) {
    console.error("No reader found for the stream")
    return
  }

  // Read the stream chunks
  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      console.log("Stream complete")
      break
    }

    // Decode and append chunk
    streamedData.value += decoder.decode(value)
  }
}

// Trigger fetchStream when the component is mounted
fetchStream()
</script>

<template>
  <div>
    <h1>Streaming Data</h1>
    <pre>{{ streamedData }}</pre>
  </div>
</template>
