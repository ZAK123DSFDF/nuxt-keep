<template>
  <div>
    <button @click="loadComponent">Show component</button>
    <LazyMyLazyComponent v-if="show" v-model="loading" />
  </div>
</template>
<script setup>
import { ref } from "vue"
const show = ref(false)
const loading = ref(false)
const loadComponent = () => {
  loading.value = true
  show.value = true
}
</script>
