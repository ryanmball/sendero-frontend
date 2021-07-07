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
  border-radius: 5%;
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
      places: [
        {
          lat: 48.7596128,
          lng: -113.7870225,
          description: "Glacier National Park",
        },
        { lat: 37.8651, lng: -119.5383, description: "Yosemite National Park" },
        {
          lat: 37.75,
          lng: -105.5,
          description: "Great Sand Dunes National Park",
        },
        {
          lat: 40.3428,
          lng: -105.6836,
          description: "Rocky Mountain National Park",
        },
      ],
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
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
    var ceuse = [5.937, 44.499];
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: ceuse, // starting position [lng, lat]
      zoom: 10, // starting zoom
    });
    // create the popup
    var popup = new mapboxgl.Popup({ offset: 25 }).setText(
      "Ceuse is a beautiful climbing area in Southern France. The second ever 5.15d/9c route was established here by Alex Megos."
    );

    // create DOM element for the marker
    var el = document.createElement("div");
    el.id = "marker";

    // Create a default Marker and add it to the map.
    var marker1 = new mapboxgl.Marker()
      .setLngLat(ceuse)
      .setPopup(popup)
      .addTo(map);
    console.log(marker1);

    // Create a default Marker, colored black, rotated 45 degrees.
    var marker2 = new mapboxgl.Marker({ color: "black", rotation: 45 })
      .setLngLat([2.697, 48.402])
      .addTo(map);
    console.log(marker2);

    this.places.forEach((place) => {
      var popup = new mapboxgl.Popup({ offset: 25 }).setText(place.description);
      new mapboxgl.Marker()
        .setLngLat([place.lng, place.lat])
        .setPopup(popup)
        .addTo(map);
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
