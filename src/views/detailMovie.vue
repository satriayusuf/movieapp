<template>
  <div>
    <div class="flex gap-6">
      <div class="flex-initial w-5/12 h-screen">
        <img
          :src="'https://image.tmdb.org/t/p/w500/' + detailMovie.poster_path"
          class="rounded w-full"
          alt=""
        />
      </div>
      <div class="flex-initial w-7/12">
        <div class="flex gap-4">
          <a
            v-if="detailMovie.homepage"
            :href="detailMovie.homepage"
            class="btn btn-sm btn-warning"
            >Watch Now</a
          >
          <!-- <button
            class="btn btn-sm btn-outline btn-warning"
            @click="handleRating"
          >
            Rating Now
          </button> -->
        </div>
        <div class="mt-8 text-white text-3xl font-bold">
          {{ detailMovie.title }}
        </div>
        <div class="mt-5 text-sm text-white">
          Release : {{ detailMovie.release_date }}
        </div>
        <div class="mt-2 text-white text-sm">
          Popularity:
          <span class="mt-3">
            {{ detailMovie.popularity }}
          </span>
        </div>
        <div class="mt-2 text-white text-sm">
          Genre:
          <span class="mt-3" v-for="genre in detailMovie.genres" :key="genre">
            {{ genre.name }} ,
          </span>
        </div>
        <div class="mt-5 text-white">
          <div class="text-lg">Overview:</div>
          <span class="text-sm mt-3">
            {{ detailMovie.overview }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import axios from "axios";

const route = useRoute();
const api_key = "400eb560bdbb9604bd0cc4883ba5c299";
const detailMovie = ref({});
const movieId = ref();

function getDetailMovie() {
  console.log(route);
  axios
    .get(`https://api.themoviedb.org/3/movie/${parseInt(movieId.value)}`, {
      params: {
        api_key,
      },
    })
    .then((response) => {
      console.log(response);
      detailMovie.value = response.data;
    });
}

// API Rating Movie nya kemungkinan ada eror atau saya nya yang belum solved problem //

// function handleRating() {
//   console.log(localStorage.getItem("guest_session_id"));
//   const guest_session = getGuestSessionFromLocalStorage();

//   if (guest_session) {
//     postRatingMovie(guest_session);
//   } else {
//     getGuestSession().then((data_guest_session_id) => {
//       postRatingMovie(data_guest_session_id);
//     });
//   }
// }

// async function getGuestSession() {
//   const { data } = await axios.get(
//     `https://api.themoviedb.org/3/authentication/guest_session/new`,
//     {
//       params: {
//         api_key,
//       },
//     }
//   );
//   setGuestSessionToLocalStorage(data.guest_session_id);
//   return data.guest_session_id;
// }

// function getGuestSessionFromLocalStorage() {
//   return localStorage.getItem("guest_session_id");
// }

// function setGuestSessionToLocalStorage(token) {
//   localStorage.setItem("guest_session_id", token);
// }

// function postRatingMovie(guest_session_id) {
//   console.log(guest_session_id);
//   axios.post(
//     `https://api.themoviedb.org/3/movie/${movieId.value}/rating?api_key=${api_key}`,
//     {
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       //   params: {
//       //     guest_session_id,
//       //   },
//       body: {
//         value: 10,
//       },
//     }
//   );
// }

onMounted(() => {
  movieId.value = route.params.id;
  getDetailMovie();
});
</script>

<style></style>
