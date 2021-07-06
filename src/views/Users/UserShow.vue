<template>
  <div id="show" class="profile">
    <h1>{{ message }}</h1>

    <img class="profile-pic" :src="user.profile_pic" alt="Profile Pic" />
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
          <strong>Password: </strong>
          <input type="password" v-model="editUserParams.password" />
        </p>
        <p>
          <strong>Confirm password: </strong>
          <input
            type="password"
            v-model="editUserParams.password_confirmation"
          />
        </p>
        <p>
          <strong>Profile picture: </strong>
          <input
            type="text"
            v-model="editUserParams.profile_pic"
            placeholder="ADD CLOUDINARY"
          />
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

    <div>
      <h1>Graphs</h1>
      <strong>All climbs by grade</strong>
      <GChart
        :settings="{ packages: ['bar'] }"
        :data="allClimbs"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
      />
      <br />
      <strong>Sent climbs by grade</strong>
      <GChart
        :settings="{ packages: ['bar'] }"
        :data="sentClimbs"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
      />
    </div>
  </div>
</template>

<style>
.profile-pic {
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
      allClimbs: [],
      sentClimbs: [],
      chartOptions: {
        legend: { position: "none" },
        hAxis: { position: "none" },
      },
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
    });
    axios.get("/grades_all").then((response) => {
      console.log("All grades array", response.data);
      this.allClimbs = response.data;
    });
    axios.get("/grades_sent").then((response) => {
      console.log("Sent grades array", response.data);
      this.sentClimbs = response.data;
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
