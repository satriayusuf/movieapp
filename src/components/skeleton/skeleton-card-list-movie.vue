<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
    <div
      v-for="index in 4"
      :key="index"
      class="!rounded-md bg-gray-600 mt-2 animate-pulse py-44 px-14"
    ></div>
  </div>
</template>
