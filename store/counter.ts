import { defineStore } from "pinia"
import { reactive, ref } from "vue"

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0)
  const details = reactive({
    name: "Counter App",
    version: "1.0",
  })
  const increment = () => {
    count.value++
  }

  const decrement = () => {
    count.value--
  }
  const updateName = (newName: string) => {
    details.name = newName
  }
  return { count, details, increment, decrement, updateName }
})
