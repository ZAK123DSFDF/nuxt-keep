import { useState } from "nuxt/app"

// composables/useCounter.ts
export const useCounter = () => {
  const count = useState("counter", () => 0)
  const increment = () => count.value++
  const decrement = () => count.value--

  return {
    count,
    increment,
    decrement,
  }
}
