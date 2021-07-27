import Vue from "vue";
import VueRouter from "vue-router";
import UserShow from "../views/Users/UserShow.vue";
import Signup from "../views/Users/Signup.vue";
import Login from "../views/Users/Login.vue";
import Logout from "../views/Users/Logout.vue";
import Collections from "../views/Collections.vue";
import CollectionsShow from "../views/CollectionsShow.vue";
import Records from "../views/Records.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/users/:id",
    name: "user-show",
    component: UserShow,
  },
  {
    // it's a common pattern to make these consts so they can be shared and prevent typos
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
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/collections",
    name: "collections-index",
    component: Collections,
  },
  {
    path: "/collections/:id",
    name: "collections-show",
    component: CollectionsShow,
  },
  {
    path: "/records",
    name: "records-index",
    component: Records,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
