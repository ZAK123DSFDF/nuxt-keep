import { defineEventHandler, createError } from "h3"

export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch("http://localhost:4000/deleteCookie", {
      method: "POST",
      credentials: "include",
    })
    return response
  } catch (err) {
    console.error("Error deleting cookie:", err)
  }
})
