<template>
  <div>
    <div id="page-container">
      <br /><br /><br /><br /><br />
      <!-- BEGIN Header -->
      <div class="section py-5">
        <div
          class="section-bg"
          style="background-image: url(/assets/img/corporate/mtn3.jpeg)"
        ></div>
        <div class="section-bg bg-gray-800 opacity-3"></div>

        <div class="container position-relative text-white text-center">
          <div class="display-6 fw-bolder">
            {{ user.first_name }}'s Profile Page
          </div>
        </div>
      </div>
      <!-- END Header -->

      <br /><br />
      <div class="section pt-0">
        <div class="container">
          <!-- BEGIN panel -->
          <!-- <div class="panel panel-inverse" data-sortable-id="ui-widget-1">
            <div class="panel-heading">
              <h2 class="panel-title"><b>All Climbs</b></h2>
              <select
                class="form-select form-select-sm w-80px"
                v-model="chartYear"
              >
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
              <div class="panel-heading-btn">
                <a
                  href="#"
                  class="btn btn-m btn-icon btn-primary"
                  data-toggle="panel-collapse"
                  ><i class="fa fa-minus"></i
                ></a>
              </div>
            </div>
            <div class="panel-body">
              <GChart
                    :settings="{ packages: ['bar'] }"
                    :data="allClimbs"
                    :options="chartOptions"
                    :createChart="(el, google) => new google.charts.Bar(el)"
                  />
            </div>
          </div> -->

          <!-- BEGIN user info and weather card -->
          <div class="row">
            <!-- BEGIN col-4 -->
            <div class="col-lg-4">
              <div class="card shadow border-0 mb-5">
                <div class="card-body p-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <h1>{{ user.first_name }} {{ user.last_name }}</h1>

                      <!-- Account Info / Edit & Delete -->
                      <div>
                        <h3 v-if="!edit">Account Info</h3>
                        <h3 v-if="edit">Edit Account Info</h3>
                        <span v-if="!edit">
                          <p>
                            <strong>First name: </strong> {{ user.first_name }}
                            <br />
                            <strong>Last name: </strong> {{ user.last_name }}
                            <br />
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
                            <input
                              type="password"
                              v-model="editUserParams.password"
                            />
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
                        <button v-if="!edit" v-on:click="editUser()">
                          Edit/Delete
                        </button>
                        <button v-if="edit" v-on:click="userUpdate(user.id)">
                          Update
                        </button>
                        <button v-if="edit" v-on:click="userDestroy(user.id)">
                          Delete
                        </button>
                        <button v-if="edit" v-on:click="editUser()">
                          Cancel
                        </button>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <img
                        class="profile-pic"
                        :src="user.profile_pic"
                        alt="Profile Pic"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END col-4 -->
            <!-- BEGIN col-4 -->
            <div class="col-lg-8">
              <!-- BEGIN nav-tabs -->
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a
                    href="#default-tab-1"
                    data-bs-toggle="tab"
                    class="nav-link active"
                  >
                    <span class="d-sm-none">Tab 1</span>
                    <span class="d-sm-block d-none">Estes Park</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#default-tab-2"
                    data-bs-toggle="tab"
                    class="nav-link"
                  >
                    <span class="d-sm-none">Tab 2</span>
                    <span class="d-sm-block d-none">Boulder</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="#default-tab-3"
                    data-bs-toggle="tab"
                    class="nav-link"
                  >
                    <span class="d-sm-none">Tab 3</span>
                    <span class="d-sm-block d-none">Red Rock Canyon</span>
                  </a>
                </li>
              </ul>
              <!-- END nav-tabs -->
              <!-- BEGIN tab-content -->
              <div class="tab-content bg-white p-3">
                <!-- BEGIN tab-pane -->
                <div class="tab-pane fade active show" id="default-tab-1">
                  <div
                    id="openweathermap-widget-1"
                    class="d-flex w-100 mb-3"
                  ></div>
                </div>
                <!-- END tab-pane -->
                <!-- BEGIN tab-pane -->
                <div class="tab-pane fade" id="default-tab-2">
                  <div
                    id="openweathermap-widget-2"
                    class="d-flex w-100 mb-3"
                  ></div>
                </div>
                <!-- END tab-pane -->
                <!-- BEGIN tab-pane -->
                <div class="tab-pane fade" id="default-tab-3">
                  <div
                    id="openweathermap-widget-3"
                    class="d-flex w-100 mb-3"
                  ></div>
                </div>
                <!-- END tab-pane -->
              </div>
              <!-- END tab-content -->
            </div>
            <!-- END col-4 -->
          </div>
          <!-- END user info and weather card -->

          <!-- BEGIN Graphs -->
          <div class="row">
            <div class="col-lg-12">
              <div class="card shadow border-0 mb-5">
                <div class="card-body p-4">
                  <div class="container text-center">
                    <div class="ms-5 fs-30px fw-bold text-black-400">
                      All Climbs
                    </div>
                  </div>
                  <GChart
                    :settings="{ packages: ['bar'] }"
                    :data="allClimbs"
                    :options="chartOptions"
                    :createChart="(el, google) => new google.charts.Bar(el)"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="card shadow border-0 mb-5">
                <div class="card-body p-4">
                  <div class="container text-center">
                    <div class="ms-5 fs-30px fw-bold text-black-400">
                      Sent Climbs
                    </div>
                  </div>
                  <GChart
                    :settings="{ packages: ['bar'] }"
                    :data="sentClimbs"
                    :options="chartOptions"
                    :createChart="(el, google) => new google.charts.Bar(el)"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="card shadow border-0 mb-5">
                <div class="card-body p-4">
                  <div class="row">
                    <div class="col-2"></div>
                    <div class="col-8">
                      <div class="container text-center">
                        <div class="ms-5 fs-30px fw-bold text-black-400">
                          Climbing Days Per Year
                          <div class="d-inline-block">
                            <div
                              class="
                                ms-2
                                w-65px
                                h-45px
                                rounded-2
                                bg-gray-400
                                text-gray-600
                                d-md-flex
                                align-items-center
                                justify-content-center
                              "
                            >
                              <div class="fw-bold text-gray-800 fs-16px">
                                {{ totalDays[chartYear] }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-2">
                      <div
                        class="
                          ms-auto
                          d-md-flex
                          align-items-center
                          justify-content-center
                        "
                      >
                        <select class="form-select w-80px" v-model="chartYear">
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                        </select>
                      </div>
                    </div>
                  </div>
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
              </div>
            </div>
          </div>
          <!-- END Graphs -->

          <!-- BEGIN Maps -->
          <div class="row">
            <div class="col-lg-12">
              <div class="card shadow border-0 mb-5">
                <div class="card-body p-4">
                  <div class="container text-center">
                    <div class="ms-5 fs-30px fw-bold text-black-400">
                      Map of Areas Climbed
                    </div>
                  </div>
                  <div id="map"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- END Maps -->
        </div>
      </div>
    </div>

    <!-- BEGIN section -->
    <div class="section pt-0">
      <!-- BEGIN container -->
      <div class="container">
        <!-- BEGIN row -->
        <div class="row">
          <!-- BEGIN col-4 -->
          <div class="col-lg-4">
            <!-- BEGIN card -->
            <div class="card shadow border-0 mb-5">
              <div class="card-body p-4">
                <div
                  class="
                    mb-3
                    w-50px
                    h-50px
                    rounded-3
                    bg-indigo
                    text-white
                    d-flex
                    align-items-center
                    justify-content-center
                    position-relative
                  "
                >
                  <i class="fab fa-bootstrap fs-28px"></i>
                  <span
                    class="
                      badge
                      position-absolute
                      mt-n5
                      me-n5
                      bg-indigo-700
                      rounded-1
                    "
                    >5.0</span
                  >
                </div>
                <h4>Bootstrap 5 Template</h4>
                <p class="fw-bold text-gray-600 mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <a href="#" class="stretched-link"></a>
              </div>
            </div>
            <!-- END card -->
          </div>
          <!-- END col-4 -->
          <!-- BEGIN col-4 -->
          <div class="col-lg-4">
            <!-- BEGIN card -->
            <div class="card shadow border-0 mb-5">
              <div class="card-body p-4">
                <div
                  class="
                    mb-3
                    w-50px
                    h-50px
                    rounded-3
                    bg-primary
                    text-white
                    d-flex
                    align-items-center
                    justify-content-center
                    position-relative
                  "
                >
                  <i class="fa fa-code-branch fs-28px"></i>
                </div>
                <h4>Cross Platform Ready</h4>
                <p class="fw-bold text-gray-600 mb-0">
                  Sed vehicula eu justo nec rutrum. Vivamus dignissim leo ac
                  quam iaculis rutrum.
                </p>
                <a href="#" class="stretched-link"></a>
              </div>
            </div>
            <!-- END card -->
          </div>
          <!-- END col-4 -->
          <!-- BEGIN col-4 -->
          <div class="col-lg-4">
            <!-- BEGIN card -->
            <div class="card shadow border-0 mb-5">
              <div class="card-body p-4">
                <div
                  class="
                    mb-3
                    w-50px
                    h-50px
                    rounded-3
                    bg-gray-500
                    text-white
                    d-flex
                    align-items-center
                    justify-content-center
                    position-relative
                  "
                >
                  <i class="fa fa-headset fs-28px"></i>
                </div>
                <h4>Continuous Support</h4>
                <p class="fw-bold text-gray-600 mb-0">
                  Cras lacus diam, rhoncus et iaculis nec, aliquam id mauris.
                </p>
                <a href="#" class="stretched-link"></a>
              </div>
            </div>
            <!-- END card -->
          </div>
          <!-- END col-4 -->
          <!-- BEGIN col-4 -->
          <div class="col-lg-4">
            <!-- BEGIN card -->
            <div class="card shadow border-0 mb-5">
              <div class="card-body p-4">
                <div
                  class="
                    mb-3
                    w-50px
                    h-50px
                    rounded-3
                    bg-teal
                    text-white
                    d-flex
                    align-items-center
                    justify-content-center
                    position-relative
                  "
                >
                  <i class="fa fa-pen fs-28px"></i>
                </div>
                <h4>Well documented</h4>
                <p class="fw-bold text-gray-600 mb-0">
                  Nulla faucibus, lorem eu placerat mollis, odio velit efficitur
                  lorem
                </p>
                <a href="#" class="stretched-link"></a>
              </div>
            </div>
            <!-- END card -->
          </div>
          <!-- END col-4 -->
          <!-- BEGIN col-4 -->
          <div class="col-lg-4">
            <!-- BEGIN card -->
            <div class="card shadow border-0 mb-5">
              <div class="card-body p-4">
                <div
                  class="
                    mb-3
                    w-50px
                    h-50px
                    rounded-3
                    bg-orange
                    text-white
                    d-flex
                    align-items-center
                    justify-content-center
                    position-relative
                  "
                >
                  <i class="fa fa-lightbulb fs-28px"></i>
                </div>
                <h4>Easy to Understand</h4>
                <p class="fw-bold text-gray-600 mb-0">
                  Sed porttitor odio eu mi sollicitudin scelerisque id sed
                  lacus.
                </p>
                <a href="#" class="stretched-link"></a>
              </div>
            </div>
            <!-- END card -->
          </div>
          <!-- END col-4 -->
          <!-- BEGIN col-4 -->
          <div class="col-lg-4">
            <!-- BEGIN card -->
            <div class="card shadow border-0 mb-5">
              <div class="card-body p-4">
                <div
                  class="
                    mb-3
                    w-50px
                    h-50px
                    rounded-3
                    bg-red
                    text-white
                    d-flex
                    align-items-center
                    justify-content-center
                    position-relative
                  "
                >
                  <i class="fa fa-bug fs-28px"></i>
                </div>
                <h4>Bugs Free</h4>
                <p class="fw-bold text-gray-600 mb-0">
                  Mauris vehicula ultrices arcu, vitae tristique massa egestas
                  vitae.
                </p>
                <a href="#" class="stretched-link"></a>
              </div>
            </div>
            <!-- END card -->
          </div>
          <!-- END col-4 -->
          <!-- BEGIN col-4 -->
          <div class="col-lg-4">
            <!-- BEGIN card -->
            <div class="card shadow border-0 mb-5">
              <div class="card-body p-4">
                <div
                  class="
                    mb-3
                    w-50px
                    h-50px
                    rounded-3
                    bg-info
                    text-white
                    d-flex
                    align-items-center
                    justify-content-center
                    position-relative
                  "
                >
                  <i class="fa fa-layer-group fs-28px"></i>
                </div>
                <h4>Unlimited Widget</h4>
                <p class="fw-bold text-gray-600 mb-0">
                  Suspendisse feugiat lectus ac nulla semper, in tincidunt odio
                  tempor.
                </p>
                <a href="#" class="stretched-link"></a>
              </div>
            </div>
            <!-- END card -->
          </div>
          <!-- END col-4 -->
          <!-- BEGIN col-4 -->
          <div class="col-lg-4">
            <!-- BEGIN card -->
            <div class="card shadow border-0 mb-5">
              <div class="card-body p-4">
                <div
                  class="
                    mb-3
                    w-50px
                    h-50px
                    rounded-3
                    bg-yellow
                    text-black
                    d-flex
                    align-items-center
                    justify-content-center
                    position-relative
                  "
                >
                  <i class="fa fa-check fs-28px"></i>
                </div>
                <h4>JSHint Valid</h4>
                <p class="fw-bold text-gray-600 mb-0">
                  Aenean interdum eros ligula, vitae ornare tortor sagittis in.
                </p>
                <a href="#" class="stretched-link"></a>
              </div>
            </div>
          </div>
          <!-- END col-4 -->
        </div>
        <!-- END row -->
      </div>
      <!-- END container -->
    </div>
    <!-- END section -->
  </div>
</template>

<style>
.profile-pic {
  border-radius: 50%;
  width: 100px;
  height: auto;
}
#map {
  width: 95%;
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
      user: {},
      editUserParams: {},
      edit: false,
      weatherAPI: process.env.VUE_APP_OPENWEATHER_ACCESS_TOKEN,
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
      console.log(this.weatherAPI);
    });
    axios.get("/climbing_days").then((response) => {
      console.log("Climbing days", response.data);
      this.days2019 = response.data.days_per_month["2019"];
      this.days2020 = response.data.days_per_month["2020"];
      this.days2021 = response.data.days_per_month["2021"];
      this.totalDays = response.data.days_per_year;
    });
    window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);
    window.myWidgetParam.push({
      id: 11,
      cityid: "5576882",
      appid: this.weatherAPI,
      units: "imperial",
      containerid: "openweathermap-widget-1",
    });
    window.myWidgetParam.push({
      id: 11,
      cityid: "5574999",
      appid: this.weatherAPI,
      units: "imperial",
      containerid: "openweathermap-widget-2",
    });
    window.myWidgetParam.push({
      id: 11,
      cityid: "5506956",
      appid: this.weatherAPI,
      units: "imperial",
      containerid: "openweathermap-widget-3",
    });
    (function () {
      var script = document.createElement("script");
      script.async = true;
      script.characterSet = "utf-8";
      script.src =
        "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(script, s);
    })();
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
      center: [-108.8048, 40.0875], // starting position [lng, lat]
      zoom: 4.2, // starting zoom
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
