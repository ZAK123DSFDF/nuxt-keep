import { defineEventHandler, deleteCookie } from "h3"
export default defineEventHandler((event: any) => {
  deleteCookie(event, "check")
  return { message: "Cookie has been deleted" }
})
