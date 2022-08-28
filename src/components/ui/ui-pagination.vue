<template>
  <div class="btn-group">
    <div
      v-for="(pageNumber, index) in pages()"
      :key="index"
      class="btn border border-slate-700 text-white"
      :class="pageNumber === page ? 'btn-warning text-slate-800' : 'btn-ghost'"
      @click="toPage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  totalPages: {
    type: Number,
    default: null,
  },
  page: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["change"]);

async function toPage(page) {
  if (page) {
    emit("change", page);
  }
}

function pages() {
  const page = props.page;
  const totalPages = props.totalPages;
  if (page === 1) {
    return [page, page + 1, page + 2, page + 3, page + 4];
  } else if (page === 2) {
    return [page - 1, page, page + 1, page + 2, page + 3];
  } else if (page === totalPages) {
    return [page - 4, page - 3, page - 2, page - 1, page];
  } else if (page === totalPages - 1) {
    return [page - 3, page - 2, page - 1, page, page + 1];
  } else {
    return [page - 2, page - 1, page, page + 1, page + 2];
  }
}
</script>

<style></style>
