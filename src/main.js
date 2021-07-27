import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

import VueGoogleCharts from "vue-google-charts";

Vue.use(VueGoogleCharts);

axios.defaults.baseURL =
  // when this goes to prod these should be env variables
  "https://sendero-backend.herokuapp.com";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  // I see most people doing this with template strings these days `Bearer ${jwt}`
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
