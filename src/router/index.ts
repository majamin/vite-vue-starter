import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import { getCurrentUser } from "@/plugins/firebase";
import "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import NotFound from "@/views/NotFound.vue";
import Register from "@/views/Register.vue";
import SignIn from "@/views/SignIn.vue";

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
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  { path: "/:path(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach(async (to, _, next) => {
  const authStatus = await getCurrentUser();
  const requireAuth = to.matched.some((route) => route.meta.requireAuth);

  if (requireAuth && !authStatus) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
