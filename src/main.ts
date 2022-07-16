// Router
import router from "@/router";
import { createPinia } from "pinia";

// TailwindCSS
import "./assets/styles/index.css";

import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

/******************************************************************************
 *
 * Vue Router helps link between the browser's URL/History and Vue's components
 * https://vueschool.io/articles/vuejs-tutorials/how-to-use-vue-router-a-complete-tutorial/
 *
 *****************************************************************************/
// Router
app.use(router);

/******************************************************************************
 *
 * Pinia is the successor of Vuex. Pinia manages state across your app.
 *
 *****************************************************************************/
// State management
app.use(createPinia());

// mount
app.mount("#app");
