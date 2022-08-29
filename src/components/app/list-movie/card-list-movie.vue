<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="(movie, index) in listMovie"
      :key="index"
      class="card !rounded-md bg-gray-800 text-white mt-2"
    >
      <img
        :src="'https://image.tmdb.org/t/p/original/' + movie.backdrop_path"
        class="h-auto w-full"
        alt="Shoes"
      />
      <div class="card-body">
        <div class="h-full max-h-96 mb-2">
          <h2 class="card-title">{{ movie.title }}</h2>
          <div>
            <p class="text-sm line-clamp-3 break-words">{{ movie.overview }}</p>
          </div>
        </div>
        <div class="card-actions">
          <button
            class="btn btn-block btn-outline btn-warning hover:scale-95 hover:duration-300"
            @click="sendIdForDetailMovie(movie.id)"
          >
            View Detail
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  listMovie: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["movieId"]);

function sendIdForDetailMovie(movieId) {
  emit("movieId", movieId);
}
</script>

<style></style>
