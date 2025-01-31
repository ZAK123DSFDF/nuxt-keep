export const useFetchData = async (body: any) => {
  try {
    return await $fetch("/api/postData", {
      method: "POST",
      body: body,
    })
  } catch (error: any) {
    throw error
  }
}
