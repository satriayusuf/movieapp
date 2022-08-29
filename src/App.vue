<template>
  <div class="h-full max-h-max bg-slate-800 px-10 md:px-28 py-12">
    <navbar class="mb-10" />
    <router-view />
  </div>
</template>

<script setup>
import navbar from "@/components/layouts/navbar-list-movie.vue";
</script>
