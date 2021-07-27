<template>
  <div id="app">
    <div id="page-container">
      <div
        class="header header-float"
        style="background-color: #000000"
        v-if="isLoggedIn()"
      >
        <div class="container d-flex">
          <div class="header-logo">
            <router-link :to="`/users/${userID()}`" class="logo-link"
              ><span><img src="/assets/img/icon/mountain3.png" alt="" /></span
              ><span class="ms-2"><b>Sendero</b></span></router-link
            >
          </div>
          <div class="header-nav">
            <div class="container">
              <div class="header-nav-item">
                <router-link :to="`/users/${userID()}`" class="header-nav-link"
                  >Profile</router-link
                >
              </div>
              <div class="header-nav-item">
                <router-link to="/records" class="header-nav-link"
                  >Climbing Records</router-link
                >
              </div>
              <div class="header-nav-item">
                <router-link to="/collections" class="header-nav-link"
                  >Collections</router-link
                >
              </div>
            </div>
          </div>
          <div class="header-btn">
            <router-link
              to="/logout"
              class="btn btn-primary fw-bold rounded-pill"
              >Log Out <i class="fas fa-sign-out-alt ms-1"></i
            ></router-link>
          </div>
          <button
            class="header-mobile-nav-toggler"
            type="button"
            data-toggle="header-mobile-nav"
          >
            <span class="header-mobile-nav-toggler-icon"></span>
          </button>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  // most people will write this in es6 these days
  data: () => ({}),
  created: async () => {
    const response = await axios.get(
      `/users/${localStorage.getItem("user_id")}`
    );
    console.log(response.data);
    this.user = response.data;
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
