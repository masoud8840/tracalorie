<template>
  <Suspense>
    <template #default>
      <Home />
    </template>
    <template #fallback>
      <section class="loading_screen container">
        <scale-loader color="#599f3d"></scale-loader>
      </section>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import Home from "../components/layout/Home.vue";
import ScaleLoader from "vue-spinner/src/PulseLoader.vue";
</script>
