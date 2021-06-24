<template>
  <div class="records-index">
    <div class="container">
      <h3>Route Records:</h3>
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Create New
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                New Route Record
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
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
