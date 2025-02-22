import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
// VIEWS
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
] as RouteRecordRaw[];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
