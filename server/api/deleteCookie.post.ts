export default defineEventHandler((event) => {
  deleteCookie(event, "check")
  return { message: "Cookie has been deleted" }
})
