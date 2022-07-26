import { createPinia } from "pinia";
import router from "@/router";

// TailwindCSS
import "./assets/styles/index.css";
// Carousel styles
import 'vue3-carousel/dist/carousel.css';

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

/******************************************************************************
 *
 * Pinia is the successor of Vuex. Pinia manages state across your app.
 *
 *****************************************************************************/
// State management
app.use(createPinia());

/******************************************************************************
 *
 * Vue Router helps link between the browser's URL/History and Vue's components
 * https://vueschool.io/articles/vuejs-tutorials/how-to-use-vue-router-a-complete-tutorial/
 *
 *****************************************************************************/
// Router
app.use(router);

// mount
app.mount("#app");
