<template>
  <div class="records-index">
    <div class="container">
      <h3>Route Records:</h3>
      <div
        v-for="record in orderBy(records, 'date', -1)"
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
      records: [],
    };
  },
  created: function () {
    axios.get("/records").then((response) => {
      console.log(response.data);
      this.records = response.data;
    });
  },
  methods: {},
};
</script>
