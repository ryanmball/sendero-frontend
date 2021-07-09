<template>
  <div class="login">
    <!-- BEGIN login -->
    <div class="login login-with-news-feed">
      <!-- BEGIN news-feed -->
      <div class="news-feed">
        <div
          class="news-image"
          style="background-image: url(/assets/img/login-bg/login-bg-11.jpg)"
        ></div>
        <div class="news-caption">
          <h4 class="caption-title"><b>Sendero</b></h4>
          <p>
            Look back on the <b>path</b> you have taken in your climbing journey
            <br />
            Blaze a <b>trail</b> forward to your next adventure
          </p>
        </div>
      </div>
      <!-- END news-feed -->

      <!-- BEGIN login-container -->
      <div class="login-container">
        <!-- BEGIN login-header -->
        <div class="login-header mb-30px">
          <div class="brand">
            <div class="d-flex align-items-center">
              <span class="logo"></span>

              <b>Color</b> Admin
            </div>
            <small>Bootstrap 5 Responsive Admin Template</small>
          </div>
          <div class="icon">
            <i class="fa fa-sign-in-alt"></i>
          </div>
        </div>
        <!-- END login-header -->

        <!-- BEGIN login-content -->
        <div class="login-content">
          <form v-on:submit.prevent="submit()">
            <div class="form-floating mb-15px">
              <input
                type="text"
                class="form-control h-45px fs-13px"
                placeholder="Email Address"
                id="emailAddress"
                v-model="email"
              />
              <label
                for="emailAddress"
                class="d-flex align-items-center fs-13px text-gray-600"
                >Email Address</label
              >
            </div>
            <div class="form-floating mb-15px">
              <input
                type="password"
                class="form-control h-45px fs-13px"
                placeholder="Password"
                id="password"
                v-model="password"
              />
              <label
                for="password"
                class="d-flex align-items-center fs-13px text-gray-600"
                >Password</label
              >
            </div>
            <div class="form-check mb-30px">
              <input
                class="form-check-input"
                type="checkbox"
                value="1"
                id="rememberMe"
              />
              <label class="form-check-label" for="rememberMe">
                Remember Me
              </label>
            </div>
            <div class="mb-15px">
              <button
                type="submit"
                class="btn btn-success d-block h-45px w-100 btn-lg fs-14px"
              >
                Sign me in
              </button>
            </div>
            <div class="mb-40px pb-40px text-inverse">
              Not a member yet? Click
              <a href="register_v3.html" class="text-primary">here</a> to
              register.
            </div>
            <hr class="bg-gray-600 opacity-2" />
            <div class="text-gray-600 text-center text-gray-500-darker mb-0">
              &copy; Color Admin All Right Reserved 2021
            </div>
          </form>
        </div>
        <!-- END login-content -->
      </div>
      <!-- END login-container -->
    </div>
    <!-- END login -->
  </div>
</template>

<style>
.text-danger {
  color: red;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/sessions", params)
        .then((response) => {
          console.log(response.data);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push(`/users/${response.data.user_id}`);
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password"];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
