<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="newUserParams.name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input
          type="email"
          class="form-control"
          v-model="newUserParams.email"
        />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input
          type="password"
          class="form-control"
          v-model="newUserParams.password"
        />
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input
          type="password"
          class="form-control"
          v-model="newUserParams.password_confirmation"
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data: function () {
      return {
        newUserParams: {},
        errors: []
      };
    },
    methods: {
      submit: function () {
        axios
          .post("/users", this.newUserParams)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/login");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    }
  };
</script>
