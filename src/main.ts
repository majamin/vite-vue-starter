import { createApp } from "vue";
import { routes } from "./router";
import { createRouter, createWebHistory } from "vue-router";
import "./assets/styles/index.css";

import App from "./App.vue";

const app = createApp(App);

/******************************************************************************
 *
 * Vue Router helps link between the browser's URL/History and Vue's components
 * https://vueschool.io/articles/vuejs-tutorials/how-to-use-vue-router-a-complete-tutorial/
 *
 *****************************************************************************/
// Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});
app.use(router);

// mount
app.mount("#app");
