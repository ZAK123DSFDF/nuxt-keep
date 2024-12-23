import { defineEventHandler, createError } from "h3"

export default defineEventHandler(async (event) => {
  try {
    console.log("Sending request to backend...")
    const data = await $fetch("http://localhost:4000", {
      method: "GET",
      credentials: "include",
    })
    console.log("Backend response:", data)
    return data
  } catch (error: any) {
    console.log("Error fetching data from backend:", error.data)
    throw createError({
      statusCode: error.data.statusCode || 500,
      statusMessage: error.data.message || "Internal Server Error",
    })
  }
})
