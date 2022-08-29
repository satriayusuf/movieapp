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
          <div>
            <a
              v-if="detailMovie.homepage"
              :href="detailMovie.homepage"
              class="btn btn-sm btn-warning"
              >Watch Now</a
            >
            <div
              class="form-data flex gap-4"
              :class="{ 'mt-5': rating.value < 10 }"
            >
              <div>
                <label class="label" v-if="rating.value > 10">
                  <span class="label-text text-error text-sm"
                    >Rating not more than 10</span
                  >
                </label>
                <input
                  v-if="showRating"
                  v-model="rating.value"
                  type="number"
                  :min="'1'"
                  :max="'10'"
                  class="input input-sm input-bordered input-ghost border-yellow-400"
                  :class="{ 'border-red-600': rating.value > 10 }"
                  placeholder="1 - 10"
                />
              </div>
              <button
                v-if="showRating && rating.value <= 10"
                class="btn btn-sm btn-outline btn-warning"
                @click="handleRating"
              >
                {{ rating.isLoaded ? "Loading.." : "Rating Now" }}
              </button>
            </div>
            <div
              v-if="rating.success"
              class="mt-4 alert alert-success shadow-lg"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Success Rating</span>
              </div>
            </div>
          </div>
          <button
            v-if="!showRating"
            class="btn btn-sm btn-outline btn-warning"
            @click="showRating = true"
          >
            Rating Now
          </button>
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
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
// import qs from "qs";

import axios from "axios";

const route = useRoute();
const api_key = "400eb560bdbb9604bd0cc4883ba5c299";
const detailMovie = ref({});
const showRating = ref(false);
const movieId = ref();

const rating = reactive({
  value: null,
  isActived: false,
  success: false,
  isLoaded: false,
});

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

function handleRating() {
  const guest_session = getGuestSessionFromLocalStorage();
  if (guest_session) {
    postRatingMovie(guest_session);
  } else {
    getGuestSession().then((data_guest_session_id) => {
      postRatingMovie(data_guest_session_id);
    });
  }
}

async function getGuestSession() {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/authentication/guest_session/new`,
    {
      params: {
        api_key,
      },
    }
  );
  setGuestSessionToLocalStorage(data.guest_session_id);
  return data.guest_session_id;
}

function getGuestSessionFromLocalStorage() {
  return localStorage.getItem("guest_session_id");
}

function setGuestSessionToLocalStorage(token) {
  localStorage.setItem("guest_session_id", token);
}

function postRatingMovie(guest_session_id) {
  rating.isLoaded = true;
  const formData = new FormData();
  formData.append("value", 10);
  axios
    .post(
      `https://api.themoviedb.org/3/movie/${movieId.value}/rating?api_key=${api_key}&guest_session_id=${guest_session_id}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      if (response.data.success) {
        rating.success = response.data.success;
      } else {
        alert("Error Rate Movie, Please Contact Admin");
      }
    });
  rating.isLoaded = false;
}

onMounted(() => {
  movieId.value = route.params.id;
  getDetailMovie();
});
</script>

<style></style>
