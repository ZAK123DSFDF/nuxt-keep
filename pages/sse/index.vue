<script setup>
import { ref, onMounted, onUnmounted } from "vue"

// Reactive reference to store SSE updates
const sseData = ref([])
let eventSource = null

// Connect to the SSE endpoint
const connectSSE = () => {
  eventSource = new EventSource("/api/sse")

  // Listen for messages from the server
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log("Received SSE event:", data)

    // Add the new message to the array
    sseData.value.push(data)
  }

  // Handle errors
  eventSource.onerror = (error) => {
    console.error("SSE connection error:", error)
    eventSource.close()
  }
}

// Clean up on component unmount
onMounted(connectSSE)
onUnmounted(() => {
  if (eventSource) {
    eventSource.close()
  }
})
</script>

<template>
  <div>
    <h1>Server-Sent Events Example</h1>
    <ul>
      <li v-for="(event, index) in sseData" :key="index">
        {{ event.message }} (Count: {{ event.count }})
      </li>
    </ul>
  </div>
</template>
