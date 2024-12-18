<template>
  <h1>{{ id }}</h1>
</template>
<script lang="ts" setup>
const { id } = useRoute().params
</script>
