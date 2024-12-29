import { defineEventHandler } from "h3"

// /server/api/sse.js
export default defineEventHandler((event) => {
  const { req, res } = event

  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")

  // Function to send an SSE event
  const sendEvent = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  let count = 0

  // Send an initial message
  sendEvent({ message: "Connection established", count })

  // Interval to send updates every second
  const interval = setInterval(() => {
    count++
    sendEvent({ message: `Update #${count}`, count })

    if (count >= 5) {
      clearInterval(interval)
      res.end() // Close the connection after 5 updates
    }
  }, 1000)

  // Handle client disconnection
  req.on("close", () => {
    clearInterval(interval)
    res.end()
  })
})
