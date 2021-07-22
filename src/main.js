import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import VueGoogleCharts from "vue-google-charts";

// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "pikaday";

Vue.use(VueGoogleCharts);

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://blooming-peak-28194.herokuapp.com";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
