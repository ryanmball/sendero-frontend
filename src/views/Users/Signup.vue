<template>
  <div class="signup">
    <div class="register register-with-news-feed">
      <div class="news-feed">
        <div
          class="news-image"
          style="
            background-image: url(/assets_admin/img/login-bg/dolomites.jpeg);
          "
        ></div>
        <div class="news-caption">
          <h4 class="caption-title"><b>Sendero</b></h4>
          <p>
            Look back on the <b>path</b> you have taken during your climbing
            journey
            <br />
            Blaze a <b>trail</b> forward to your next adventure
          </p>
        </div>
      </div>

      <div class="register-container">
        <div class="login-header mb-30px">
          <div class="brand">
            <div class="d-flex align-items-center">
              <span class="logo"></span>

              <b>Sendero</b>
            </div>
          </div>
          <div class="icon">
            <i class="fa fa-dragon"></i>
          </div>
        </div>
        <div class="register-header mb-25px h1">
          <div class="mb-1">Sign Up</div>
        </div>

        <div class="register-content">
          <div
            class="alert alert-danger alert-dismissible fade show"
            v-if="errors[0]"
          >
            <span v-for="error in errors" v-bind:key="error">
              {{ error }} <br />
            </span>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              @click="closeAlert"
            ></button>
          </div>
          <form v-on:submit.prevent="submit()">
            <div class="mb-3">
              <label class="mb-2"
                >Name <span class="text-danger">*</span></label
              >
              <div class="row gx-3">
                <div class="col-md-6 mb-2 mb-md-0">
                  <input
                    type="text"
                    class="form-control fs-13px"
                    placeholder="First name"
                    v-model="newUserParams.first_name"
                  />
                </div>
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control fs-13px"
                    placeholder="Last name"
                    v-model="newUserParams.last_name"
                  />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label class="mb-2"
                >Email <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control fs-13px"
                placeholder="Email address"
                v-model="newUserParams.email"
              />
            </div>
            <div class="mb-3">
              <label class="mb-2"
                >Password <span class="text-danger">*</span></label
              >
              <input
                type="password"
                class="form-control fs-13px"
                placeholder="Password"
                v-model="newUserParams.password"
              />
            </div>
            <div class="mb-4">
              <label class="mb-2"
                >Confirm Password <span class="text-danger">*</span></label
              >
              <input
                type="password"
                class="form-control fs-13px"
                placeholder="Confirm Password"
                v-model="newUserParams.password_confirmation"
              />
            </div>
            <div class="form-check mb-4">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="agreementCheckbox"
              />
              <label class="form-check-label" for="agreementCheckbox">
                I agree to the
                <a href="javascript:;">Terms and Conditions</a>
                and
                <a href="javascript:;">Privacy Policy</a>
              </label>
            </div>
            <div class="mb-4">
              <button
                type="submit"
                class="btn btn-primary d-block w-100 btn-lg h-45px fs-13px"
              >
                Sign Up
              </button>
            </div>
            <div class="mb-4 pb-5">
              Already have an account? Click
              <router-link to="/login" class="text-primary">here</router-link>
              to login.
            </div>
            <hr class="bg-gray-600 opacity-2" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      this.errors = [];
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    closeAlert: function () {
      this.errors = [];
    },
  },
};
</script>
