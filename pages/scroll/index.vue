<script setup lang="ts">
import { useScroll } from "@vueuse/core"
import { onMounted, ref } from "vue"
const el = ref<HTMLElement | null>(null)
const { x, y } = useScroll(el)
const content = Array.from({ length: 50 }, (_, i) => `Hi ${i + 1}`)
onMounted(() => {
  x.value = 50
  y.value = 50
  console.log("scroll", x.value, y.value)
})
</script>
<template>
  <div ref="el" style="overflow: auto; height: 100vh">
    <div style="padding: 10px; font-size: 20px; background: blue">
      <div
        v-for="(item, index) in content"
        :key="index"
        style="padding: 10px; border-bottom: 1px solid #ddd; font-size: 16px"
      >
        {{ item }}
      </div>
      <button @click="x += 10">Scroll right 10px</button>
      <button @click="y += 10">Scroll down 10px</button>
      <NuxtLink to="/" style="display: block; margin-top: 10px">Home</NuxtLink>
    </div>
  </div>
</template>
<style>
body {
  overflow: hidden;
  margin: 0;
  height: 100vh;
  width: 100%;
}
</style>
