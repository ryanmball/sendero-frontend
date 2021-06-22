import Vue from "vue";
import VueRouter from "vue-router";
import Profile from "../views/Users/Profile.vue";
import Signup from "../views/Users/Signup.vue";
import Login from "../views/Users/Login.vue";
import Logout from "../views/Users/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "profile",
    component: Profile,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/Logout",
    name: "Logout",
    component: Logout,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
