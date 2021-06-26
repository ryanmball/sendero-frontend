<template>
  <div class="records-index">
    <div class="container">
      <h3>Route Records:</h3>

      <!-- Record Create -->
      <form v-on:submit.prevent="recordCreate()">
        <ul style="list-style-type: none">
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <small class="text-danger">This will be in a modal</small>
        <div class="form-group">
          <label>Date:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.date"
            placeholder="pikaday"
          />
        </div>
        <div class="form-group">
          <label>Route:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.route_id"
            placeholder="autocomplete"
          />
        </div>
        <div class="form-group">
          <label>Crag:</label>
          <input
            type="text"
            class="form-control"
            placeholder="autopopulate based on Route"
          />
        </div>
        <div class="form-group">
          <label>Area:</label>
          <input
            type="text"
            class="form-control"
            placeholder="autopopulate based on Route"
          />
        </div>
        <div class="form-group">
          <label>Grade:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.grade"
            placeholder="dropdown and autocomplete"
          />
        </div>
        <div class="form-group">
          <label>Result:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.result"
            placeholder="dropdown"
          />
        </div>
        <div class="form-group">
          <label>In progress:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.in_progress"
            placeholder="v-if (result) dropdown (T/F)"
          />
        </div>
        <div class="form-group">
          <label>Rating:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.rating"
            placeholder="v-if (result) dropdown (0.0-4.0)"
          />
        </div>
        <div class="form-group">
          <label>Partner:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.partner"
          />
        </div>
        <div class="form-group">
          <label>Comments:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.comments"
          />
        </div>
        <div class="form-group">
          <label>Collection:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.collection_id"
            placeholder="optional - dropdown"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </form>

      <!-- Bootstrap Button trigger modal -->
      <!-- <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Create New
      </button> -->

      <!-- Bootstrap Modal -->
      <!-- <div
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
                      <input type="text" id="datepicker" name="prevent_autofill" /> ADD DATE PICKER
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
                      ADD AUTOCOMPLETE FROM FULL ROUTE LISTING IN DATABASE
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
                  CREATE ADD TO COLLECTION OPTION
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
                @click="recordCreate(), showAlert()"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Records Index & Record Edit/Delete -->
      <div>
        <p class="text-danger">
          **sorting and filtering will go here** <br />
          <small>default will be date descending</small>
        </p>
        <small></small>
        <div
          v-for="record in orderBy(records, 'date', -1)"
          v-bind:key="record.id"
        >
          <p>
            <strong>Date: </strong>{{ record.date }}
            <small class="text-danger">pikaday</small> <br />
            <strong>Route: </strong>{{ record.route.name }}
            <small class="text-danger">autocomplete</small> <br />
            <strong>Location: </strong>{{ record.route.location }}
            <small class="text-danger"
              >populates from route selected - need to break into Crag and
              Area</small
            >
            <br />
            <strong>Grade: </strong>{{ record.grade }}
            <small class="text-danger">dropdown and autocomplete</small> <br />
            <strong>Result: </strong>{{ record.result }}
            <small class="text-danger">dropdown</small> <br />
            <strong>In progress: </strong>{{ record.in_progress }}
            <small class="text-danger">v-if (result) dropdown (T/F)</small>
            <br />
            <strong>Rating: </strong>{{ record.rating }}
            <small class="text-danger">v-if (result) dropdown (0.0-4.0)</small
            ><br />
            <strong>Partner: </strong>{{ record.partner }} <br />
            <strong>Comments: </strong>{{ record.comments }} <br />

            <a :href="record.route.mp_url" target="_blank">MP URL</a
            ><small class="text-danger">small MP logo for link</small> <br />
            <button v-on:click="recordShow(record)">Edit/Delete</button>
          </p>

          <!-- Record Edit/Delete -->
          <dialog id="record-details">
            <form method="dialog">
              <h1>Edit Route Record</h1>
              <ul style="list-style-type: none">
                <li
                  class="text-danger"
                  v-for="editError in editErrors"
                  v-bind:key="editError"
                >
                  {{ error }}
                </li>
              </ul>
              <p>Date: <input type="text" v-model="editRecordParams.date" /></p>
              <p>
                Route:
                <input type="text" v-model="editRecordParams.route_id" />
                <!-- NEED THIS TO SHOW ROUTE NAME, BUT PASS ROUTE_ID -->
              </p>
              <p>
                Grade: <input type="text" v-model="editRecordParams.grade" />
              </p>
              <p>
                Result:
                <input type="text" v-model="editRecordParams.result" />
              </p>
              <p>
                In progress:
                <input type="text" v-model="editRecordParams.in_progress" />
              </p>
              <p>
                Rating: <input type="text" v-model="editRecordParams.rating" />
              </p>
              <p>
                Partner:
                <input type="text" v-model="editRecordParams.partner" />
              </p>
              <p>
                Comments:
                <input type="text" v-model="editRecordParams.comments" />
              </p>
              <button v-on:click="recordUpdate()">Update</button>
              <button v-on:click="recordDestroy()">Delete</button>
              <button>Close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.text-danger {
  color: red;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
/* global Swal */
export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      records: [],
      newRecordParams: {},
      errors: [],
      editRecordParams: {},
      editErrors: [],
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
          this.records.push(response.data);
          this.newRecordParams = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    recordShow: function (record) {
      console.log(record);
      this.editRecordParams = record;
      document.querySelector("#record-details").showModal();
    },
    recordUpdate: function () {
      axios
        .patch(`/records/${this.editRecordParams.id}`, this.editRecordParams)
        .then((response) => {
          console.log(response.data);
          var index = this.records.indexOf(this.editRecordParams);
          this.records.splice(index, 1, response.data);
        })
        .catch((error) => {
          this.editErrors = error.response.data.errors;
        });
    },
    recordDestroy: function () {
      if (confirm("Are you sure you want to delete this record?")) {
        axios
          .delete(`/records/${this.editRecordParams.id}`)
          .then((response) => {
            console.log(response.data);
            var index = this.records.indexOf(this.editRecordParams);
            this.records.splice(index, 1);
          });
      }
    },
    showAlert() {
      Swal.fire({
        title: "Hello!",
        text: "Hello from SweetAlerts!",
        icon: "success",
        confirmButtonText: "Rad",
      });
    },
  },
};
</script>
