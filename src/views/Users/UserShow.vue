<template>
  <div class="profile">
    <h1>{{ message }}</h1>

    <img :src="user.profile_pic" alt="Profile Pic" />
    <h1>{{ user.first_name }} {{ user.last_name }}</h1>

    <!-- Account Info / Edit & Delete -->
    <div>
      <h3 v-if="!edit">Account Info</h3>
      <h3 v-if="edit">Edit Account Info</h3>
      <span v-if="!edit">
        <p>
          <strong>First name: </strong> {{ user.first_name }} <br />
          <strong>Last name: </strong> {{ user.last_name }} <br />
          <strong>Email: </strong> {{ user.email }} <br />
        </p>
      </span>
      <span v-if="edit">
        <p>
          <strong>First name: </strong>
          <input
            type="text"
            v-model="editUserParams.first_name"
            :placeholder="user.first_name"
          />
        </p>
        <p>
          <strong>Last name: </strong>
          <input
            type="text"
            v-model="editUserParams.last_name"
            :placeholder="user.last_name"
          />
        </p>
        <p>
          <strong>Email: </strong>
          <input
            type="text"
            v-model="editUserParams.email"
            :placeholder="user.email"
          />
        </p>
        <p>
          <strong>Profile picture: </strong>
          <input type="text" v-model="editUserParams.profile_pic" />
        </p>
      </span>
      <button v-if="!edit" v-on:click="editUser()">Edit/Delete</button>
      <button v-if="edit" v-on:click="userUpdate(user.id)">Update</button>
      <button v-if="edit" v-on:click="userDestroy(user.id)">Delete</button>
      <button v-if="edit" v-on:click="editUser()">Cancel</button>
    </div>

    <!-- Route Records on Profile -->
    <div class="container">
      <h3>Route Records:</h3>
      <router-link to="/records"
        ><input class="btn btn-primary" type="button" value="See All"
      /></router-link>
      <div
        v-for="record in orderBy(user.records, 'date', -1).slice(0, 3)"
        v-bind:key="record.id"
      >
        <p>
          <strong>Date: </strong>{{ record.date }} <br />
          <strong>Route: </strong>{{ record.route.name }} <br />
          <strong>Location: </strong>{{ record.route.location }} <br />
          <strong>Grade: </strong>{{ record.grade }} <br />
          <strong>Result: </strong>{{ record.result }} <br />
          <!-- replace this link with a small MP logo -->
          <a :href="record.route.mp_url" target="_blank">MP URL</a>
        </p>
      </div>
    </div>

    <!-- Collection on Profile -->
    <div class="container">
      <h3>Collections:</h3>
      <router-link to="/collections"
        ><input class="btn btn-primary" type="button" value="See All"
      /></router-link>
      <div
        v-for="collection in user.collections.slice(0, 3)"
        v-bind:key="collection.id"
      >
        <p>
          <strong>Name: </strong>{{ collection.name }} <br />
          <strong>Partners: </strong>{{ collection.partners }} <br />
          <strong>Highlights: </strong>{{ collection.highlights }} <br />
        </p>
      </div>
    </div>
  </div>
</template>

<style>
img {
  border-radius: 50%;
  width: 100px;
  height: auto;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      message: "Welcome to your profile page!",
      user: { collections: [], records: [] },
      editUserParams: {},
      edit: false,
    };
  },
  created: function () {
    axios.get(`/users/${localStorage.getItem("user_id")}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
      this.collections = response.data.collections;
      this.records = response.data.records;
    });
  },
  methods: {
    userUpdate: function (user_id) {
      console.log(this.editUserParams);
      axios
        .patch(`/users/${user_id}`, this.editUserParams)
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
          this.editUser();
          this.editUserParams = {};
        })
        .catch((error) => {
          this.editErrors = error.response.data.errors;
        });
    },
    userDestroy: function (user_id) {
      if (confirm("Are you sure you want to delete your account?")) {
        axios.delete(`/users/${user_id}`).then((response) => {
          console.log(response.data);
          localStorage.removeItem("jwt");
          localStorage.removeItem("user_id");
          this.$router.push("/login");
        });
      }
    },
    editUser: function () {
      this.edit = !this.edit;
    },
  },
};
</script>
