<template>
  <div id="app" class="app app-sidebar-fixed app-header-fixed">
    <div id="nav" v-if="isLoggedIn()">
      <span v-if="isLoggedIn()">
        <router-link :to="`/users/${userID()}`">Profile</router-link> |
        <router-link to="/records">Records</router-link> |
        <router-link to="/collections">Collections</router-link> |
        <router-link to="/logout">Logout</router-link>
      </span>
      <span v-else>
        <router-link to="/signup">Signup</router-link> |
        <router-link to="/login">Login</router-link>
      </span>
    </div>
    <div v-if="!isLoggedIn()">
      <router-view />
    </div>
    <div id="content" class="app-content" v-if="isLoggedIn()">
      <router-view />
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
    };
  },
  created: function () {
    axios.get(`/users/${localStorage.getItem("user_id")}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    userID: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
