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

    <!-- Graphs -->
    <div>
      <h1>Graphs</h1>
      <strong>All Climbs</strong>
      <GChart
        :settings="{ packages: ['bar'] }"
        :data="allClimbs"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
      />
      <br />
      <strong>Sent Climbs</strong>
      <GChart
        :settings="{ packages: ['bar'] }"
        :data="sentClimbs"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
      />
      <br />
      <strong>Climbing Days Per Year</strong> <br />
      <select v-model="chartYear">
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
      </select>
      {{ totalDays[chartYear] }} Days
      <GChart
        v-if="chartYear === '2019'"
        :settings="{ packages: ['bar'] }"
        :data="days2019"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
      />
      <GChart
        v-if="chartYear === '2020'"
        :settings="{ packages: ['bar'] }"
        :data="days2020"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
      />
      <GChart
        v-if="chartYear === '2021'"
        :settings="{ packages: ['bar'] }"
        :data="days2021"
        :options="chartOptions"
        :createChart="(el, google) => new google.charts.Bar(el)"
      />
    </div>

    <!-- Mapbox -->
    <br /><br />
    <h3>Map of Areas Climbed</h3>
    <div id="map"></div>
  </div>
</template>

<style>
.profile-pic {
  border-radius: 50%;
  width: 100px;
  height: auto;
}
#map {
  width: 80%;
  height: 650px;
  margin: 0 auto;
  border-radius: 2%;
  transition: 0ms;
}
#marker {
  /* background-size: cover; */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.mapboxgl-popup {
  max-width: 200px;
}
</style>

<script>
/* global MapboxGeocoder */
import axios from "axios";
import Vue2Filters from "vue2-filters";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      allClimbs: [],
      sentClimbs: [],
      days2019: [],
      days2020: [],
      days2021: [],
      totalDays: {},
      chartYear: "2021",
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
    axios.get("/climbing_days").then((response) => {
      console.log("Climbing days", response.data);
      this.days2019 = response.data.days_per_month["2019"];
      this.days2020 = response.data.days_per_month["2020"];
      this.days2021 = response.data.days_per_month["2021"];
      this.totalDays = response.data.days_per_year;
    });
  },
  mounted: function () {
    axios.get("/areas_climbed_map").then((response) => {
      console.log("Areas climbed", response.data);
      var places = response.data;
      places.forEach((place) => {
        var popup = new mapboxgl.Popup({ offset: 25 }).setText(
          place.description
        );
        new mapboxgl.Marker()
          .setLngLat([place.lng, place.lat])
          .setPopup(popup)
          .addTo(map);
      });
    });
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-104.9903, 39.7392], // starting position [lng, lat]
      zoom: 4, // starting zoom
    });

    // create DOM element for the marker
    var el = document.createElement("div");
    el.id = "marker";

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
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
