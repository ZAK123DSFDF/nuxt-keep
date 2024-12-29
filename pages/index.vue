<script setup></script>

<template>
  <Suspense>
    <!-- Loading slot -->
    <template #loading>
      <div class="loading">Loading a dad joke...</div>
    </template>

    <!-- Default slot -->
    <template #default>
      <Joke />
    </template>
  </Suspense>
  <NuxtLink to="/joke">joke</NuxtLink>
</template>

<style scoped>
.loading {
  font-size: 1.2rem;
  color: gray;
  text-align: center;
  margin: 20px;
}
</style>
