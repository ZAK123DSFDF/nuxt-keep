<script setup>
import { ref, onMounted } from "vue"

// Reference for the container to append HTML
const containerRef = ref(null)

// Fetch and render the streamed HTML
const fetchHtmlStream = async () => {
  const response = await fetch("/api/streamhtml")
  const reader = response.body?.getReader()
  const decoder = new TextDecoder("utf-8")

  if (!reader) {
    console.error("No reader found for the stream")
    return
  }

  // Read the streamed HTML chunks
  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      console.log("HTML stream complete")
      break
    }

    // Decode the HTML chunk and append it to the container
    const htmlChunk = decoder.decode(value)
    if (containerRef.value) {
      containerRef.value.innerHTML += htmlChunk
    }
  }
}

// Trigger the HTML stream when the component is mounted
onMounted(fetchHtmlStream)
</script>

<template>
  <div>
    <h1>HTML Streaming Example</h1>
    <!-- Container to display streamed HTML -->
    <div ref="containerRef"></div>
  </div>
</template>
