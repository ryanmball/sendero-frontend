<template>
  <div class="login">
    <div class="login login-with-news-feed">
      <div class="news-feed">
        <div class="news-image" style="background-image: url(/assets_admin/img/login-bg/yosemite.jpeg)"></div>
        <div class="news-caption">
          <h4 class="caption-title"><b>Sendero</b></h4>
          <p>
            Look back on the
            <b>path</b>
            you have taken during your climbing journey
            <br />
            Blaze a
            <b>trail</b>
            forward to your next adventure
          </p>
        </div>
      </div>

      <div class="login-container">
        <div class="login-header mb-30px">
          <div class="brand">
            <div class="d-flex align-items-center">
              <span><img src="/assets/img/icon/mountain3.png" alt="" /></span>
              <span class="ms-2"><b>Sendero</b></span>
            </div>
          </div>
        </div>
        <div class="register-header mb-25px h1">
          <div class="mb-1">Sign In</div>
        </div>
        <p>
          <b><u>Demo Account</u></b>
          <br />
          <b>Email:</b>
          sendero_demo@gmail.com
          <br />
          <b>Password:</b>
          demoaccount1
        </p>

        <div class="login-content">
          <div class="alert alert-danger alert-dismissible fade show" v-if="error">
            {{ error }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" @click="closeAlert"></button>
          </div>
          <form v-on:submit.prevent="submit()">
            <div class="form-floating mb-15px">
              <input
                type="text"
                class="form-control h-45px fs-13px"
                placeholder="Email Address"
                id="emailAddress"
                v-model="email"
              />
              <label for="emailAddress" class="d-flex align-items-center fs-13px text-gray-600">Email Address</label>
            </div>
            <div class="form-floating mb-15px">
              <input
                type="password"
                class="form-control h-45px fs-13px"
                placeholder="Password"
                id="password"
                v-model="password"
              />
              <label for="password" class="d-flex align-items-center fs-13px text-gray-600">Password</label>
            </div>
            <!-- <div class="form-check mb-30px">
              <input
                class="form-check-input"
                type="checkbox"
                value="1"
                id="rememberMe"
              />
              <label class="form-check-label" for="rememberMe">
                Remember Me
              </label>
            </div> -->
            <div class="mb-15px">
              <button type="submit" class="btn btn-success d-block h-45px w-100 btn-lg fs-14px">Sign In</button>
            </div>
            <div class="mb-40px pb-40px text-inverse">
              Don't have an account yet? Click
              <router-link to="/signup" class="text-primary">here</router-link>
              to register.
            </div>
            <hr class="bg-gray-600 opacity-2" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      this.error = "";
      axios
        .post("/sessions", params)
        .then((response) => {
          console.log(response.data);
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push(`/users/${response.data.user_id}`);
        })
        .catch((error) => {
          console.log(error.response);
          this.error = "Invalid email or password. Please enter your login information again.";
          this.email = "";
          this.password = "";
        });
    },
    closeAlert: function () {
      this.error = "";
    },
  },
};
</script>
