<template>
  <div class="profile">
    <h1>{{ message }}</h1>
    <div class="container">
      <h3>Collections:</h3>
      <router-link to="/collections"
        ><input class="btn btn-primary" type="button" value="See All"
      /></router-link>
      <div v-for="collection in collections" v-bind:key="collection.id">
        <p>
          {{ collection.name }} <br />
          {{ collection.partners }} <br />
          {{ collection.highlights }} <br />
        </p>
      </div>
    </div>
    <div class="container">
      <h3>Route Records:</h3>
      <router-link to="/records"
        ><input class="btn btn-primary" type="button" value="See All"
      /></router-link>
      <div
        v-for="record in orderBy(records, 'date', -1).slice(0, 3)"
        v-bind:key="record.id"
      >
        <p>
          {{ record.date }} <br />
          {{ record.route.name }} <br />
          {{ record.route.location }} <br />
          {{ record.grade }} <br />
          {{ record.result }} <br />
          <!-- replace this link with a small MP logo -->
          <a :href="record.route.mp_url" target="_blank">MP URL</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      message: "Welcome to your profile page!",
      collections: [],
      records: [],
      userID: 0,
    };
  },
  created: function () {
    this.userID = localStorage.getItem("user_id");
    axios.get(`/users/${this.userID}`).then((response) => {
      console.log(response.data);
      this.collections = response.data.collections;
      this.records = response.data.records;
    });
  },
  methods: {},
};
</script>
