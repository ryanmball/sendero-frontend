import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import VueGoogleCharts from "vue-google-charts";

Vue.use(VueGoogleCharts);

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://sendero-backend.herokuapp.com";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
