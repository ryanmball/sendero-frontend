<template>
  <div class="collections-index">
    <div class="container">
      <h3>Collections:</h3>
      <div v-for="collection in collections" v-bind:key="collection.id">
        <p>
          {{ collection.name }} <br />
          {{ collection.partners }} <br />
          {{ collection.highlights }} <br />
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
      collections: [],
    };
  },
  created: function () {
    axios.get("/collections").then((response) => {
      console.log(response.data);
      this.collections = response.data;
    });
  },
  methods: {},
};
</script>
