import { defineEventHandler, setCookie } from "h3"

export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch("http://localhost:4000/setCookie", {
      method: "POST",
      credentials: "include",
    })
    return response
  } catch (err) {
    console.error("Error setting cookie:", err)
  }
})
