import { createApp } from "vue";
import App from "./App.vue";
import routes from "@/routes/index";
import axios from "axios";
import tailwindCss from "@/style/tailwind.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(routes, axios, tailwindCss).mount("#app");
