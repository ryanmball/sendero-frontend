<template>
  <div id="app">
    <div id="page-container">
      <!-- BEGIN header -->
      <div class="header header-float">
        <div class="container d-flex">
          <div class="header-logo">
              <router-link :to="`/users/${userID()}`" class="logo-link"><span class="logo"></span><b>Sendero</b></router-link>
          </div>
          <div class="header-nav">
            <div class="container">
              <div class="header-nav-item">
                <a href="about.html" class="header-nav-link">Who We Are</a>
              </div>
              <div class="header-nav-item">
                <a href="products.html" class="header-nav-link">Our Products</a>
              </div>
              <div class="header-nav-item">
                <a href="newsroom.html" class="header-nav-link">Newsroom</a>
              </div>
              <div class="header-nav-item">
                <a href="careers.html" class="header-nav-link">Our Careers</a>
              </div>
              <div class="header-nav-item">
                <a href="contact_us.html" class="header-nav-link">Contact Us</a>
              </div>
            </div>
          </div>
          <div class="header-btn">
            <a href="#" class="btn btn-primary fw-bold rounded-pill"
              >Get started <i class="fa fa-arrow-right ms-1 opacity-5"></i
            ></a>
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
      <!-- END header -->
      <!-- <div id="nav">
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
      </div> -->
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
