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
          <select v-model="newRecordParams.result">
            <option value=""></option>
            <option value="onsight">onsight</option>
            <option value="flash">flash</option>
            <option value="redpoint">redpoint</option>
            <option value="1 fall">1 fall</option>
            <option value="2 falls">2 falls</option>
            <option value="beta">beta</option>
          </select>
        </div>
        <div
          class="form-group"
          v-if="
            newRecordParams.result === '1 fall' ||
            newRecordParams.result === '2 falls' ||
            newRecordParams.result === 'beta'
          "
        >
          <label>In progress:</label>
          <select v-model="newRecordParams.in_progress">
            <option value="false"></option>
            <option value="true">true</option>
          </select>
        </div>
        <div
          class="form-group"
          v-if="
            newRecordParams.result === 'onsight' ||
            newRecordParams.result === 'flash' ||
            newRecordParams.result === 'redpoint'
          "
        >
          <label>Rating:</label>
          <select v-model="newRecordParams.rating">
            <option value=""></option>
            <option value="0.0">0.0</option>
            <option value="0.5">0.5</option>
            <option value="1.0">1.0</option>
            <option value="1.5">1.5</option>
            <option value="2.0">2.0</option>
            <option value="2.5">2.5</option>
            <option value="3.0">3.0</option>
            <option value="3.5">3.5</option>
            <option value="4.0">4.0</option>
          </select>
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
          <select v-model="newRecordParams.collection_id">
            <option value=""></option>
            <option
              v-for="collection in collections"
              v-bind:key="collection.id"
              :value="collection.id"
            >
              {{ collection.name }}
            </option>
          </select>
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </form>
      <button @click="clearNewParams()">Clear</button>

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
        <!-- Filters -->
        <div>
          <br />
          Grade:
          <select v-model="gradeFilter">
            <option value=""></option>
            <option v-for="grade in grades" v-bind:key="grade">
              {{ grade }}
            </option>
          </select>
          Result:
          <select v-model="resultFilter">
            <option value=""></option>
            <option value="onsight">onsight</option>
            <option value="flash">flash</option>
            <option value="redpoint">redpoint</option>
            <option value="1 fall">1 fall</option>
            <option value="2 falls">2 falls</option>
            <option value="beta">beta</option>
          </select>
          Rating:
          <select v-model="ratingFilter">
            <option value=""></option>
            <option value="0.0">0.0</option>
            <option value="0.5">0.5</option>
            <option value="1.0">1.0</option>
            <option value="1.5">1.5</option>
            <option value="2.0">2.0</option>
            <option value="2.5">2.5</option>
            <option value="3.0">3.0</option>
            <option value="3.5">3.5</option>
            <option value="4.0">4.0</option>
          </select>
          Partner:
          <select v-model="partnerFilter">
            <option value=""></option>
            <option v-for="partner in partners" v-bind:key="partner">
              {{ partner }}
            </option>
          </select>
          In progress:
          <input
            type="checkbox"
            name="inProgress"
            @click="changeProgressFilter()"
          />
          <br />
          Crag:
          <select v-model="cragFilter">
            <option value=""></option>
            <option v-for="crag in crags" v-bind:key="crag">
              {{ crag }}
            </option>
          </select>
          Area:
          <select v-model="areaFilter">
            <option value=""></option>
            <option v-for="area in areas" v-bind:key="area">
              {{ area }}
            </option>
          </select>
          <br />
          <button @click="clearFilters">Clear Filters</button>
        </div>

        <!-- Records Index -->
        <div
          v-for="record in orderBy(
            filterBy(
              filterBy(
                filterBy(
                  filterBy(
                    filterBy(
                      filterBy(
                        filterBy(records, areaFilter, 'route'),
                        cragFilter,
                        'route'
                      ),
                      progressFilter,
                      'in_progress'
                    ),
                    partnerFilter,
                    'partner'
                  ),
                  ratingFilter,
                  'rating'
                ),
                resultFilter,
                'result'
              ),
              gradeFilter,
              'grade'
            ),
            'date',
            -1
          )"
          v-bind:key="record.id"
        >
          <p>
            <strong>Date: </strong>{{ record.date }} <br />
            <strong>Route: </strong>{{ record.route.name }} <br />
            <strong>Location: </strong>{{ record.route.location }}
            <br />
            <strong>Grade: </strong>{{ record.grade }} <br />
            <strong>Result: </strong>{{ record.result }} <br />
            <span v-if="record.in_progress">
              <strong>In progress: </strong>{{ record.in_progress }} <br />
            </span>
            <span v-if="record.rating">
              <strong>Rating: </strong>{{ record.rating }} <br />
            </span>
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
                <select v-model="editRecordParams.result">
                  <option value=""></option>
                  <option value="onsight">onsight</option>
                  <option value="flash">flash</option>
                  <option value="redpoint">redpoint</option>
                  <option value="1 fall">1 fall</option>
                  <option value="2 falls">2 falls</option>
                  <option value="beta">beta</option>
                </select>
              </p>
              <p>
                In progress:
                <select v-model="editRecordParams.in_progress">
                  <option value="false"></option>
                  <option value="true">true</option>
                </select>
              </p>
              <p>
                Rating:
                <select v-model="editRecordParams.rating">
                  <option value=""></option>
                  <option value="0.0">0.0</option>
                  <option value="0.5">0.5</option>
                  <option value="1.0">1.0</option>
                  <option value="1.5">1.5</option>
                  <option value="2.0">2.0</option>
                  <option value="2.5">2.5</option>
                  <option value="3.0">3.0</option>
                  <option value="3.5">3.5</option>
                  <option value="4.0">4.0</option>
                </select>
              </p>
              <p>
                Partner:
                <input type="text" v-model="editRecordParams.partner" />
              </p>
              <p>
                Comments:
                <input type="text" v-model="editRecordParams.comments" />
              </p>
              <p v-if="!currentRecord.collection">
                <button @click="addCollection()" v-if="!addToCollection">
                  Add to collection
                </button>
                <span v-if="addToCollection">
                  Collection:
                  <select v-model="newRecordParams.collection_id">
                    <option value=""></option>
                    <option
                      v-for="collection in collections"
                      v-bind:key="collection.id"
                      :value="collection.id"
                    >
                      {{ collection.name }}
                    </option>
                  </select>
                </span>
              </p>
              <button v-on:click="recordUpdate()">Update</button>
              <button v-on:click="recordDestroy()">Delete</button>
              <button @click="clearEditParams()">Close</button>
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
      filter: "",
      gradeFilter: "",
      resultFilter: "",
      ratingFilter: null,
      partnerFilter: "",
      progressFilter: null,
      cragFilter: "",
      areaFilter: "",
      grades: [],
      partners: [],
      crags: [],
      areas: [],
      collections: [],
      currentRecord: {},
      addToCollection: false,
      index: 0,
    };
  },
  created: function () {
    axios.get("/records").then((response) => {
      console.log("Records", response.data);
      this.records = response.data;
    });
    axios.get("/grades").then((response) => {
      console.log("Grades", response.data);
      this.grades = response.data;
    });
    axios.get("/partners").then((response) => {
      console.log("Partners", response.data);
      this.partners = response.data;
    });
    axios.get("/crags").then((response) => {
      console.log("Crags", response.data);
      this.crags = response.data;
    });
    axios.get("/areas").then((response) => {
      console.log("Areas", response.data);
      this.areas = response.data;
    });
    axios.get("/collections").then((response) => {
      console.log("Collections", response.data);
      this.collections = response.data;
    });
  },
  computed: {
    filteredRecords: function () {
      return this.records;
    },
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
      this.currentRecord = Object.assign(this.currentRecord, record);
      this.editRecordParams = this.currentRecord;
      this.index = this.records.indexOf(record);
      console.log(this.index);
      document.querySelector("#record-details").showModal();
    },
    recordUpdate: function () {
      axios
        .patch(`/records/${this.editRecordParams.id}`, this.editRecordParams)
        .then((response) => {
          console.log(response.data);
          this.records.splice(this.index, 1, response.data);
          this.editRecordParams = {};
          this.addToCollection = false;
        })
        .catch((error) => {
          this.editErrors = error.response.data.errors;
        });
    },
    recordDestroy: function () {
      if (confirm("Are you sure you want to delete this record?")) {
        axios.delete(`/records/${this.currentRecord.id}`).then((response) => {
          console.log(response.data);
          this.records.splice(this.index, 1);
        });
      }
    },
    clearFilters: function () {
      this.gradeFilter = "";
      this.resultFilter = "";
      this.ratingFilter = null;
      this.partnerFilter = "";
      this.progressFilter = null;
      this.cragFilter = "";
      this.areaFilter = "";
      var inputs = document.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "checkbox") {
          inputs[i].checked = false;
        }
      }
    },
    clearNewParams: function () {
      this.newRecordParams = {};
    },
    clearEditParams: function () {
      this.editRecordParams = {};
    },
    addCollection: function () {
      this.addToCollection = true;
    },
    changeProgressFilter: function () {
      if (this.progressFilter === null) {
        this.progressFilter = true;
      } else {
        this.progressFilter = null;
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
