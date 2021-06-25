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
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                New Route Record
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-4">
                    <div class="input-group mb-3">
                      <!-- <input type="text" id="datepicker" name="prevent_autofill" /> ADD DATE PICKER -->
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                        >Date</span
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="newRecordParams.date"
                      />
                    </div>
                  </div>
                  <div class="col-md-4 ms-auto">
                    <div class="input-group mb-3">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                        >Partner</span
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="newRecordParams.partner"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8">
                    <div class="input-group mb-3">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                        >Route</span
                      >
                      <!-- ADD AUTOCOMPLETE FROM FULL ROUTE LISTING IN DATABASE -->
                      <input
                        type="text"
                        class="form-control"
                        v-model="newRecordParams.route_id"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                        >Crag</span
                      >
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                        >Area</span
                      >
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="input-group mb-3">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                        >Grade</span
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="newRecordParams.grade"
                      />
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="input-group mb-3">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                        >Result</span
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="newRecordParams.result"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="input-group mb-3">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                        >In Progress</span
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="newRecordParams.in_progress"
                      />
                    </div>
                    <div class="input-group mb-3">
                      <span
                        class="input-group-text"
                        id="inputGroup-sizing-default"
                        >Rating</span
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="newRecordParams.rating"
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="input-group">
                      <span class="input-group-text">Comments</span>
                      <textarea
                        class="form-control"
                        v-model="newRecordParams.comments"
                      ></textarea>
                    </div>
                  </div>
                  <!-- CREATE ADD TO COLLECTION OPTION -->
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="recordCreate()"
              >
                Save
              </button>
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
      newRecordParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/records").then((response) => {
      console.log(response.data);
      this.records = response.data;
    });
  },
  methods: {
    recordCreate: function () {
      axios
        .post("/records", this.newRecordParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
