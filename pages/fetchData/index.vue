<template>
  <div>
    <!-- Trigger Fetch Data with Button -->
    <button @click="mutate(body)" :disabled="isLoading">Fetch Data</button>

    <!-- Show Loading -->
    <div v-if="isLoading" style="color: gray">Loading...</div>

    <!-- Show Error -->
    <div v-if="isError" style="color: red">{{ errorMessage }}</div>

    <!-- Show Data -->
    <div v-if="isSuccess" style="color: black">Data: {{ data?.message }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useFetchData } from "~/composables/useFetchData"
const body = ref({ key: "value" })
const data = ref<any>(null)
const errorMessage = ref<any>("")
const isLoading = ref<boolean>(false)
const isError = ref<boolean>(false)
const isSuccess = ref<boolean>(false)
const mutate = async (body: any) => {
  isLoading.value = true
  isError.value = false
  isSuccess.value = false

  try {
    const response = await useFetchData(body)
    data.value = response
    isSuccess.value = true
  } catch (error: any) {
    errorMessage.value = error?.data?.statusMessage || "An error occurred."
    isError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>
