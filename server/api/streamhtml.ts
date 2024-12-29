import { defineEventHandler } from "h3"

// /server/api/html-stream.js
export default defineEventHandler((event) => {
  const stream = new ReadableStream({
    start(controller) {
      // Simulate sending HTML chunks progressively
      controller.enqueue("<div><h1>Streaming HTML</h1>")

      let count = 0
      const interval = setInterval(() => {
        if (count >= 5) {
          controller.enqueue(`<p>Final chunk ${count}</p></div>`)
          controller.close()
          clearInterval(interval)
        } else {
          controller.enqueue(`<p>Chunk ${count}</p>`)
          count++
        }
      }, 1000)
    },
  })

  // Set headers for HTML content
  event.res.setHeader("Content-Type", "text/html; charset=utf-8")
  return stream
})
