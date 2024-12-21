import { defineEventHandler, createError } from "h3"

export default defineEventHandler((event) => {
  try {
    throw new Error("something went wrong")
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message || "Bad Request",
    })
  }
})
