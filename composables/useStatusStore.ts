import { reactive } from "vue"

export function useStatusStore() {
  const status = reactive<{ [key: string]: { [key: string]: boolean } }>({})

  const setStatus = (id: string, action: string, value: boolean) => {
    if (!status[id]) {
      status[id] = {}
    }
    status[id][action] = value
  }

  const getStatus = (id: string, action: string) => {
    return status[id]?.[action] || false
  }

  return { status, setStatus, getStatus }
}
