export default defineEventHandler((event) => {
  setCookie(event, "check", "123", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return { message: "Cookie has been set" }
})
