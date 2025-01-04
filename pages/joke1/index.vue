<script lang="ts" setup>
import { defineAsyncComponent } from "vue"
const AsyncComponent = defineAsyncComponent(
  () => import("~/components/Joke.vue")
)
</script>
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading component...</div>
    </template>
  </Suspense>
</template>
