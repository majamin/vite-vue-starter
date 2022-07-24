import { useAuthStore } from "@/stores";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ForumView from "@/views/ForumView.vue";
import PostView from "@/views/PostView.vue";
import NotFound from "@/views/NotFound.vue";
import Register from "@/views/RegisterEmailPassword.vue";
import SignIn from "@/views/SignIn.vue";
import UserProfile from "@/views/UserProfile.vue";

const authCheck = (to: any, _: any, next: any) => {
  const store = useAuthStore();
  // console.log("authCheck", store.isLoggedIn);
  if (store.isLoggedIn) {
    if (to.name === "SignIn") {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    if (to.name === "SignIn") {
      next();
    } else {
      next({ name: "SignIn" });
    }
  }
};

// https://router.vuejs.org/guide/advanced/meta.html#typescript
declare module "vue-router" {
  interface RouteMeta {
    title: string;
    mainNav?: boolean;
    requireAuth?: boolean;
  }
}

// For child routes, see https://router.vuejs.org/guide/advanced/meta.html#route-meta-fields
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    meta: { title: "Home", mainNav: true },
    component: HomeView,
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
    ],
  },
  {
    path: "/forum",
    name: "Forum",
    meta: { title: "Forum", mainNav: true, requireAuth: true },
    component: ForumView,
    beforeEnter: authCheck,
  },
  {
    path: "/forum/post/:postid",
    name: "PostDetails",
    meta: { title: "Post Details", mainNav: false, requireAuth: true },
    component: PostView,
    beforeEnter: authCheck,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: "Register", mainNav: false },
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
    meta: { title: "Sign In", mainNav: false },
  },
  {
    path: "/user-profile",
    name: "UserProfile",
    meta: { title: "User Profile", mainNav: false, requireAuth: true },
    component: UserProfile,
    beforeEnter: authCheck,
  },
  { path: "/:path(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

// Re-direct non-authorized users attempting to access
// authorization-required routes to sign-in page
router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();
  const authStatus = await authStore.initializeAuthListener();
  const requireAuth = to.matched.some((route) => route.meta.requireAuth);

  if (requireAuth && !authStatus) {
    next({ name: "SignIn" });
  } else {
    next();
  }
});

export default router;
