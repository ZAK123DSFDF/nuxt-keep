export const useFetchData = async (body: any) => {
  try {
    const response = await $fetch("/api/postData", {
      method: "POST",
      body: body,
    })
    return response
  } catch (error: any) {
    throw error
  }
}
