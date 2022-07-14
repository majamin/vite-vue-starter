import { RouterOptions } from "vue-router";
import "vue-router";
import HomeView from "@/views/HomeView.vue";

import AboutView from "@/views/AboutView.vue";
import MoreView from "@/views/MoreView.vue";

import NotFound from "@/views/NotFound.vue";

// https://router.vuejs.org/guide/advanced/meta.html#typescript
declare module "vue-router" {
  interface RouteMeta {
    title: string;
    mainNav: boolean;
  }
}

// For child routes, see https://router.vuejs.org/guide/advanced/meta.html#route-meta-fields
export const routes: RouterOptions["routes"] = [
  {
    path: "/",
    name: "Home",
    meta: { title: "Home", mainNav: true },
    component: HomeView,
  },
  {
    path: "/about",
    name: "Public",
    meta: { title: "About", mainNav: true },
    component: AboutView,
    children: [
      {
        path: "nothing",
        name: "Nothing",
        component: NotFound,
      },
      {
        path: "nothing",
        name: "Nothing",
        component: NotFound,
      },
      {
        path: "nothing",
        name: "Nothing",
        component: NotFound,
      },
      {
        path: "nothing",
        name: "Nothing",
        component: NotFound,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    meta: { title: "About", mainNav: true },
    component: AboutView,
    children: [
      {
        path: "nothing",
        name: "Nothing",
        component: NotFound,
      },
      {
        path: "nothing",
        name: "Nothing",
        component: NotFound,
      },
      {
        path: "nothing",
        name: "Nothing",
        component: NotFound,
      },
      {
        path: "nothing",
        name: "Nothing",
        component: NotFound,
      },
    ],
  },
  { path: "/:path(.*)", component: NotFound },
];
