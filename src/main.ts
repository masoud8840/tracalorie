import { createApp } from "vue";
import "./assets/Styles.scss";
import App from "./App.vue";
// Router
import router from "./router";

createApp(App).use(router).mount("#app");
