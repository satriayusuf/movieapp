<template>
  <header-list-movie />
  <div class="w-full mt-20 mb-16">
    <i class="bi-search text-white"></i>
    <span class="text-white font-bold"> Search Popular Movie</span>
    <input
      v-model="searchValue"
      type="text"
      placeholder="Search Popular Movie"
      class="mt-4 input input-bordered w-full input-ghost"
      @keyup.enter="submitSearch()"
    />
  </div>
  <template v-if="!loadingListMovie">
    <card-list-movie
      :list-movie="listMovie"
      @movieId="handleMovieIdForDetailMovie"
    />
  </template>
  <template v-else>
    <skeleton-card-list-movie />
  </template>
  <ui-pagination
    class="justify-center"
    :total-pages="pagination.total_pages"
    :page="pagination.page"
    @change="handlePagination"
  />
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import headerListMovie from "@/components/app/list-movie/header-list-movie.vue";
import cardListMovie from "@/components/app/list-movie/card-list-movie.vue";
import uiPagination from "@/components/ui/ui-pagination.vue";
import skeletonCardListMovie from "@/components/skeleton/skeleton-card-list-movie.vue";

const listMovie = ref([]);
const searchValue = ref("");
const api_key = "400eb560bdbb9604bd0cc4883ba5c299";

const loadingListMovie = ref(true);

const pagination = reactive({
  total_pages: 1,
  page: 1,
});

const router = useRouter();

function getListMovie() {
  loadingListMovie.value = true;
  axios
    .get(`https://api.themoviedb.org/3/movie/popular`, {
      params: {
        api_key,
        page: pagination.page,
      },
    })
    .then((response) => {
      listMovie.value = response.data.results;
      pagination.total_pages = response.data.total_pages;
      pagination.page = response.data.page;
      loadingListMovie.value = false;
    });
}

function submitSearch() {
  if (searchValue.value) {
    axios
      .get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key,
          query: searchValue.value,
        },
      })
      .then((response) => {
        listMovie.value = response.data.results;
      });
  } else {
    getListMovie();
  }
}

function handlePagination(page) {
  pagination.page = page;
  getListMovie();
}

function handleMovieIdForDetailMovie(id) {
  router.push("/detail/" + id);
}

onMounted(() => {
  getListMovie();
});
</script>

<style></style>
