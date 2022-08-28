import { createRouter, createWebHistory } from "vue-router";
import listMovie from "@/views/listMovie.vue";
import detailMovie from "@/views/detailMovie.vue";

const routes = [
  {
    path: "/",
    component: listMovie,
  },
  {
    path: "/detail/:id",
    component: detailMovie,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
