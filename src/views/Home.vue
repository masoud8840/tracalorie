<template>
  <Suspense>
    <template #default>
      <Home />
    </template>
    <template #fallback>
      <section class="loading_screen container">
        <LoadingSpinner />
      </section>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import Home from "../components/layout/Home.vue";
import LoadingSpinner from "../components/UI/LoadingSpinner.vue";
</script>
