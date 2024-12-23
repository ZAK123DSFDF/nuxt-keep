import { defineEventHandler, readBody, createError } from "h3"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const response = await $fetch("http://localhost:4000/fetchData", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    return response
  } catch (error: any) {
    throw createError({
      statusCode: error.data.statusCode || 500,
      statusMessage: error.data.message || "Failed to fetch data.",
    })
  }
})
