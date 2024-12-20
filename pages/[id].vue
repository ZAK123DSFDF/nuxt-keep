<template>
  <h1>{{ id }}</h1>
</template>
<script lang="ts" setup>
import { useRoute } from "#app"

const { id } = useRoute().params
</script>
