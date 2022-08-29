<template>
  <div class="block lg:flex">
    <div class="lg:flex-initial lg:w-3/6">
      <div class="text-3xl md:text-5xl font-bold text-white">
        <span class="text-yellow-500"> The First </span>
        <span class="mt-2">Online</span>
        <div class="mt-2">List Popular Movie</div>
        <div class="mt-2">Search Engine</div>
      </div>
    </div>
    <div class="lg:flex-initial lg:w-3/6 text-white text-sm">
      <div class="mt-6 lg:mt-0 mb-8" v-for="desc in descHeader" :key="desc">
        <span>
          {{ desc }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const descHeader = ref([
  "Movie App is the first best popular movie search platform in Indonesia",
  "With the movie App, it is hoped that users can use it as best they can to find the best popular movies",
]);
</script>
