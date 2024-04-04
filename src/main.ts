import { createApp } from "vue";
import "./assets/Styles.scss";
import App from "./App.vue";
// Router
import router from "./router";
import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).mount("#app");
