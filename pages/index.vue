<template>
  <div>
    <h1>Nuxt KeepAlive Modal Example</h1>
    <button @click="openModal(123)">Go to ID 123</button>
    <keep-alive>
      <Modal v-show="showModal" @close="closeModal">
        <h2>Modal Content for ID {{ modalId }}</h2>
      </Modal>
    </keep-alive>
  </div>
  <NuxtLink to="/scroll">go to scroll</NuxtLink>
</template>

<script setup lang="ts">
const showModal = ref(false)
const modalId = ref(null)
const openModal = (id) => {
  modalId.value = id
  showModal.value = true
  window.history.pushState({ id }, "", `/${id}`)
}
const closeModal = () => {
  showModal.value = false
  modalId.value = null
  window.history.pushState({}, "", "/")
}
const handlePopState = (event) => {
  if (event.state && event.state.id) {
    modalId.value = event.state.id
    showModal.value = true
  } else {
    showModal.value = false
  }
}
if (import.meta.server) {
  console.log("this is server")
}
if (import.meta.client) {
  console.log("this is browser")
}
onMounted(() => {
  const route = useRoute()
  const initialId = route.path.slice(1)
  if (initialId) {
    modalId.value = initialId
    showModal.value = true
  }

  window.addEventListener("popstate", handlePopState)
})
onUnmounted(() => {
  window.removeEventListener("popstate", handlePopState)
})
</script>
