<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-else>This is lazy</p>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue"
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(["update:modelValue"])
const loading = ref(props.modelValue)
onMounted(async () => {
  console.log("Component mounting: starting delay...")
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log("Component mounted after delay")
  loading.value = false
  emit("update:modelValue", false)
})
</script>
