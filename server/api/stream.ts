import { defineEventHandler } from "h3"

export default defineEventHandler(async (event) => {
  const stream = new ReadableStream({
    start(controller) {
      let count = 0

      // Simulate streaming data every second
      const interval = setInterval(() => {
        if (count >= 5) {
          controller.close()
          clearInterval(interval)
        } else {
          controller.enqueue(`Chunk ${count}\n`)
          count++
        }
      }, 1000)
    },
  })

  // Set headers for streaming
  event.res.setHeader("Content-Type", "text/plain; charset=utf-8")
  return stream
})
