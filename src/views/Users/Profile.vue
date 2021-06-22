<template>
  <div class="profile">
    <h1>{{ message }}</h1>
    <h3>Collections:</h3>
    <div v-for="collection in collections" v-bind:key="collection.id">
      <p>
        {{ collection.name }} <br />
        {{ collection.partners }} <br />
        {{ collection.highlights }} <br />
      </p>
    </div>
    <h3>Route Records:</h3>
    <div v-for="record in records" v-bind:key="record.id">
      <p>
        {{ record.date }} <br />
        {{ record.route.name }} <br />
        {{ record.route.location }} <br />
        {{ record.grade }} <br />
        {{ record.result }} <br />
      </p>
      <a :href="record.route.mp_url" target="_blank">MP URL</a>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
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
