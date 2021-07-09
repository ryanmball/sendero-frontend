<template>
  <div id="app" class="app app-sidebar-fixed app-header-fixed">
    <!-- BEGIN #header -->
    <div id="header" class="app-header app-header-inverse" v-if="isLoggedIn()">
      <!-- BEGIN navbar-header -->
      <div class="navbar-header" v-if="isLoggedIn()">
        <router-link :to="`/users/${userID()}`" class="navbar-brand">
          <span class="navbar-logo"></span> <b>Sendero</b>
        </router-link>
        <button
          type="button"
          class="navbar-mobile-toggler"
          data-toggle="app-sidebar-mobile"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <!-- END navbar-header -->
      <!-- BEGIN header-nav -->
      <div class="navbar-nav" v-if="isLoggedIn()">
        <div class="navbar-item navbar-user dropdown">
          <a
            href="#"
            class="navbar-link dropdown-toggle d-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            <img :src="user.profile_pic" alt="Profile Pic" />
            <span>
              <span class="d-none d-md-inline">
                {{ user.first_name }} {{ user.last_name }}
              </span>
              <b class="caret"></b>
            </span>
          </a>
          <div class="dropdown-menu dropdown-menu-end me-1">
            <a href="" class="dropdown-item">Edit Profile</a>
            <a href="" class="dropdown-item">Edit Profile</a>
            <a href="" class="dropdown-item">Edit Profile</a>
            <div class="dropdown-divider"></div>
            <router-link to="/logout" class="dropdown-item">
              Log Out
            </router-link>
          </div>
        </div>
      </div>
      <!-- END header-nav -->
    </div>
    <!-- END #header -->
    <!-- BEGIN #sidebar -->
    <div id="sidebar" class="app-sidebar" v-if="isLoggedIn()">
      <!-- BEGIN scrollbar -->
      <div
        class="app-sidebar-content"
        data-scrollbar="true"
        data-height="100%"
        style="height: 100%; overflow-x: none"
      >
        <!-- BEGIN menu -->
        <div class="menu">
          <div class="menu-profile">
            <a
              href="javascript:;"
              class="menu-profile-link"
              data-toggle="app-sidebar-profile"
              data-target="#appSidebarProfileMenu"
            >
              <div class="menu-profile-cover with-shadow"></div>
              <div class="menu-profile-image">
                <img :src="user.profile_pic" alt="Profile Pic" />
              </div>
              <div class="menu-profile-info">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1">
                    {{ user.first_name }} {{ user.last_name }}
                  </div>
                  <div class="menu-caret ms-auto"></div>
                </div>
              </div>
            </a>
          </div>
          <div id="appSidebarProfileMenu" class="collapse">
            <div class="menu-item pt-5px">
              <a href="javascript:;" class="menu-link">
                <div class="menu-icon"><i class="fa fa-cog"></i></div>
                <div class="menu-text">Settings</div>
              </a>
            </div>
            <div class="menu-item">
              <a href="javascript:;" class="menu-link">
                <div class="menu-icon"><i class="fa fa-pencil-alt"></i></div>
                <div class="menu-text">Send Feedback</div>
              </a>
            </div>
            <div class="menu-item pb-5px">
              <a href="javascript:;" class="menu-link">
                <div class="menu-icon">
                  <i class="fa fa-question-circle"></i>
                </div>
                <div class="menu-text">Helps</div>
              </a>
            </div>
            <div class="menu-divider m-0"></div>
          </div>
          <div class="menu-item">
            <router-link :to="`/users/${userID()}`" class="menu-link">
              <div class="menu-icon">
                <i class="fab fa-simplybuilt"></i>
              </div>
              <div class="menu-text">Profile</div>
            </router-link>
          </div>
          <div class="menu-item">
            <router-link to="/records" class="menu-link">
              <div class="menu-icon">
                <i class="fab fa-simplybuilt"></i>
              </div>
              <div class="menu-text">Records</div>
            </router-link>
          </div>
          <div class="menu-item">
            <router-link to="/collections" class="menu-link">
              <div class="menu-icon">
                <i class="fab fa-simplybuilt"></i>
              </div>
              <div class="menu-text">Collections</div>
            </router-link>
          </div>

          <!-- BEGIN minify-button -->
          <div class="menu-item d-flex">
            <a
              href="javascript:;"
              class="app-sidebar-minify-btn ms-auto"
              data-toggle="app-sidebar-minify"
              ><i class="fa fa-angle-double-left"></i
            ></a>
          </div>
          <!-- END minify-button -->
        </div>
        <!-- END menu -->
      </div>
      <!-- END scrollbar -->
    </div>
    <div class="app-sidebar-bg" v-if="isLoggedIn()"></div>
    <div class="app-sidebar-mobile-backdrop" v-if="isLoggedIn()">
      <a href="#" data-dismiss="app-sidebar-mobile" class="stretched-link"></a>
    </div>
    <!-- END #sidebar -->

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
    <div v-if="!isLoggedIn()">
      <router-view />
    </div>
    <div id="content" class="app-content" v-if="isLoggedIn()">
      <router-view />
      <!-- BEGIN scroll-top-btn -->
      <a
        href="javascript:;"
        class="btn btn-icon btn-circle btn-success btn-scroll-to-top"
        data-toggle="scroll-to-top"
        ><i class="fa fa-angle-up"></i
      ></a>
      <!-- END scroll-top-btn -->
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
