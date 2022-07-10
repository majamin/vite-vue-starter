// import { afterEach } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import NotFound from "@/views/NotFound.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: "/", name: "Home", meta: { title: "Home" }, component: HomeView },
  {
    path: "/about",
    name: "About",
    meta: { title: "About" },
    component: AboutView,
  },
  { path: "/:path(.*)", component: NotFound },
];
