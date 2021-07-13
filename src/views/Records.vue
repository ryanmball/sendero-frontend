<template>
  <div class="records-index">
    <!-- BEGIN Title -->
    <br /><br /><br /><br /><br />
    <div class="section py-5">
      <div
        class="section-bg"
        style="background-image: url(/assets/img/corporate/mtn3.jpeg)"
      ></div>
      <div class="section-bg bg-gray-800 opacity-3"></div>

      <div class="container position-relative text-white text-center">
        <div class="display-6 fw-bolder">Climbing Records</div>
      </div>
    </div>
    <!-- END Title -->

    <!-- BEGIN Filters & Index -->
    <div class="section pt-5">
      <div class="container">
        <div class="row gx-5">
          <div class="col-lg-12 ps-lg-5">
            <!-- BEGIN Filters -->
            <div>
              <div class="row">
                <div class="col-xl-2">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#modalCreate"
                    type="button"
                    class="
                      btn btn-md btn-primary
                      d-block
                      w-100
                      fw-bold
                      rounded-2
                      height-50px
                    "
                  >
                    Create New
                  </button>
                </div>
                <div class="col-xl-4">
                  <input
                    type="text"
                    class="form-control mb-5px"
                    v-model="search"
                    placeholder="Search"
                  />
                </div>
                <div class="col-xl-2">
                  <select
                    class="form-select"
                    v-model="gradeFilter"
                    placeholder="Grade"
                  >
                    <option value="" disabled selected hidden>Grade</option>
                    <option v-for="grade in grades" v-bind:key="grade">
                      {{ grade }}
                    </option>
                  </select>
                </div>
                <div class="col-xl-2">
                  <select class="form-select" v-model="resultFilter">
                    <option value="" disabled selected hidden>Result</option>
                    <option value="onsight">onsight</option>
                    <option value="flash">flash</option>
                    <option value="redpoint">redpoint</option>
                    <option value="1 fall">1 fall</option>
                    <option value="2 falls">2 falls</option>
                    <option value="beta">beta</option>
                  </select>
                </div>
                <div class="col-xl-2">
                  <select class="form-select" v-model="ratingFilter">
                    <option value="null" disabled selected hidden>
                      Rating
                    </option>
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
              </div>
              <div class="row mt-3">
                <div class="col-xl-2">
                  <button
                    @click="clearFilters"
                    type="button"
                    class="
                      btn btn-md btn-secondary
                      d-block
                      w-100
                      fw-bold
                      rounded-2
                      height-50px
                    "
                  >
                    Clear Filters
                  </button>
                </div>
                <div class="col-xl-4">
                  <select
                    class="form-select"
                    v-model="cragFilter"
                    placeholder="Crag"
                  >
                    <option value="" disabled selected hidden>Crag</option>
                    <option v-for="crag in crags" v-bind:key="crag">
                      {{ crag }}
                    </option>
                  </select>
                </div>
                <div class="col-xl-4">
                  <select
                    class="form-select"
                    v-model="areaFilter"
                    placeholder="Area"
                  >
                    <option value="" disabled selected hidden>Area</option>
                    <option v-for="area in areas" v-bind:key="area">
                      {{ area }}
                    </option>
                  </select>
                </div>
                <div class="col-xl-2">
                  <select class="form-select" v-model="partnerFilter">
                    <option value="" disabled selected hidden>Partner</option>
                    <option v-for="partner in partners" v-bind:key="partner">
                      {{ partner }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <!-- END Filters -->

            <!-- BEGIN Records Index -->
            <br /><br />
            <div
              class="
                p-4
                bg-gray-200
                position-relative
                border-start border-5 border-info
                mb-2
              "
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
                          search,
                          'route',
                          'result',
                          'grade',
                          'partner'
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
              <div class="row">
                <div class="col-3">
                  <div class="d-flex align-items-center">
                    <div class="fs-18px mb-3 fw-bolder line-h-11">
                      {{ record.route.name }}
                    </div>
                  </div>
                </div>
                <div class="col-8">
                  <div class="d-flex align-items-center">
                    <div class="fs-14px mb-3 line-h-11">
                      {{ record.route.location }}
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  <div class="d-flex align-items-center">
                    <div class="fs-16px line-h-16">
                      <a
                        href="#"
                        @click="recordShow(record)"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDetail"
                        ><i class="ps-3 fas fa-external-link-alt h-40px"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-1">
                  <div class="d-flex align-items-center">
                    <div>
                      <div
                        class="
                          me-3
                          w-65px
                          h-45px
                          rounded-2
                          bg-gray-400
                          text-gray-600
                          d-md-flex d-none
                          align-items-center
                          justify-content-center
                        "
                      >
                        <div class="fw-bold text-gray-800 fs-16px">
                          {{ record.grade }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  <div class="d-flex align-items-center">
                    <div class="pt-2 ps-5 fs-18px">
                      {{ recordDate(record.date) }}
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-bold text-gray-600 fs-12px line-h-12">
                        Result
                      </div>
                      <div class="fw-bold text-gray-800 fs-16px">
                        {{ record.result }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-bold text-gray-600 fs-12px line-h-12">
                        In Progress
                      </div>
                      <div
                        v-if="record.in_progress"
                        class="fw-bold text-gray-800 fs-16px"
                      >
                        {{ record.in_progress }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-bold text-gray-600 fs-12px line-h-12">
                        Rating
                      </div>
                      <div
                        v-if="record.rating"
                        class="fw-bold text-gray-800 fs-16px"
                      >
                        {{ record.rating }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-bold text-gray-600 fs-12px line-h-12">
                        Partner
                      </div>
                      <div class="fw-bold text-gray-800 fs-16px">
                        {{ record.partner }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-3">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-bold text-gray-600 fs-12px line-h-12">
                        Collection
                      </div>
                      <div
                        v-if="record.collection"
                        class="fw-bold text-gray-800 fs-16px"
                      >
                        {{ record.collection.name }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-1">
                  <div class="fs-16px line-h-16">
                    <a :href="record.route.mp_url" target="_blank"
                      ><img
                        src="/assets_admin/img/logo/mtnproject.png"
                        class="ps-1 rounded h-40px"
                    /></a>
                  </div>
                </div>
              </div>
            </div>
            <!-- END Records Index -->
          </div>
        </div>
      </div>
    </div>
    <!-- END Filters & Index -->

    <!-- Record Show, Edit, Delete Modal -->
    <div class="modal fade" id="modalDetail">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header px-4">
            <div class="fs-24px fw-bolder">
              {{ currentRecord.route.name }}&nbsp;&nbsp;&nbsp;
            </div>
            <div
              class="
                me-3
                w-65px
                h-45px
                rounded-2
                bg-gray-400
                text-gray-600
                d-md-flex d-none
                align-items-center
                justify-content-center
              "
            >
              <div class="fw-bold text-gray-800 fs-16px">
                {{ currentRecord.grade }}
              </div>
            </div>
            <a
              href="#"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="editClose()"
            ></a>
          </div>
          <div class="modal-body p-0">
            <div class="row gx-0">
              <div
                class="col-md-8 p-4 border-end fs-14px line-h-16"
                v-if="!this.editToggle"
              >
                <div class="h5 mb-3">Comments:</div>
                {{ currentRecord.comments }}
                <hr class="my-4" />
                <div class="h5 mb-3">Result: {{ currentRecord.result }}</div>
                <div class="h5 mb-3" v-if="currentRecord.in_progress">
                  In Progress: {{ currentRecord.in_progress }}
                </div>
                <div class="h5 mb-3" v-if="currentRecord.rating">
                  Rating: {{ currentRecord.rating }}
                </div>
                <div class="h5 mb-3">Partner: {{ currentRecord.partner }}</div>
                <div class="h5 mb-3" v-if="currentRecord.collection">
                  Collection: {{ currentRecord.collection.name }}
                </div>
              </div>
              <div
                class="col-md-8 p-4 border-end fs-14px line-h-16"
                v-if="this.editToggle"
              >
                <div class="h5 mb-3">Comments:</div>
                <div class="mb-20px pb-4px">
                  <textarea
                    class="form-control"
                    rows="5"
                    v-model="editRecordParams.comments"
                    name="comments"
                    placeholder="Comments"
                  ></textarea>
                </div>
                <hr class="my-4" />
                <div class="h5 mb-3">
                  Result:
                  <div class="col-lg-3 mb-2">
                    <select
                      class="form-select"
                      v-model="editRecordParams.result"
                    >
                      <option value="onsight">onsight</option>
                      <option value="flash">flash</option>
                      <option value="redpoint">redpoint</option>
                      <option value="1 fall">1 fall</option>
                      <option value="2 falls">2 falls</option>
                      <option value="beta">beta</option>
                    </select>
                  </div>
                </div>
                <div class="h5 mb-3" v-if="editRecordParams.in_progress">
                  In Progress:
                  <div
                    class="col-lg-3 mb-2"
                    v-if="
                      editRecordParams.result === '1 fall' ||
                      editRecordParams.result === '2 falls' ||
                      editRecordParams.result === 'beta'
                    "
                  >
                    <select
                      class="form-select"
                      v-model="editRecordParams.in_progress"
                    >
                      <option value="" disabled selected hidden>
                        In Progress
                      </option>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  </div>
                </div>
                <div class="h5 mb-3" v-if="editRecordParams.rating">
                  Rating:
                  <div
                    class="col-lg-3 mb-2"
                    v-if="
                      editRecordParams.result === 'onsight' ||
                      editRecordParams.result === 'flash' ||
                      editRecordParams.result === 'redpoint'
                    "
                  >
                    <select
                      class="form-select"
                      v-model="editRecordParams.rating"
                    >
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
                </div>
                <div class="h5 mb-3">
                  Partner:
                  <div class="col-lg-3 mb-2">
                    <input
                      type="text"
                      v-model="editRecordParams.partner"
                      class="form-control form-control-lg rounded-2"
                      placeholder="Partner"
                      name="partner"
                    />
                  </div>
                </div>
                <div class="h5 mb-3" v-if="currentRecord.collection">
                  Collection: {{ currentRecord.collection.name }}
                </div>
              </div>
              <div class="col-md-8 p-4 border-end fs-14px line-h-16">
                <hr class="my-4" />
                <div class="row">
                  <div class="col-xl-4" v-if="!this.editToggle">
                    <button
                      @click="edit()"
                      type="button"
                      class="
                        btn btn-lg btn-primary
                        d-block
                        w-100
                        fw-bold
                        rounded-2
                        height-50px
                      "
                    >
                      Edit
                    </button>
                  </div>
                  <div class="col-xl-4" v-if="this.editToggle">
                    <button
                      type="button"
                      class="
                        btn btn-lg btn-primary
                        d-block
                        w-100
                        fw-bold
                        rounded-2
                        height-50px
                      "
                      @click="recordUpdate()"
                      data-bs-dismiss="modal"
                    >
                      Update
                    </button>
                  </div>
                  <div class="col-xl-4" v-if="!this.editToggle">
                    <button
                      @click="recordDestroy(currentRecord)"
                      type="button"
                      class="
                        btn btn-lg btn-secondary
                        d-block
                        w-100
                        fw-bold
                        rounded-2
                        height-50px
                      "
                      data-bs-dismiss="modal"
                    >
                      Delete
                    </button>
                  </div>
                  <div class="col-xl-4" v-if="this.editToggle">
                    <button
                      @click="edit()"
                      type="button"
                      class="
                        btn btn-lg btn-secondary
                        d-block
                        w-100
                        fw-bold
                        rounded-2
                        height-50px
                      "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 p-4">put a picture or icon here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Record Show, Edit, Delete Modal -->

    <!-- Record Create Modal -->
    <div class="modal fade" id="modalCreate">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header px-4">
            <div class="fs-24px fw-bolder">New Climbing Record</div>
            <a
              href="#"
              class="btn-close"
              data-bs-dismiss="modal"
              @click="clearNewParams()"
            ></a>
          </div>
          <div class="modal-body p-0">
            <div class="row gx-0">
              <div class="col-md-12 p-4 border-end fs-14px line-h-16">
                <form v-on:submit.prevent="recordCreate()">
                  <datalist id="routes">
                    <option v-for="route in routes" v-bind:key="route.id">
                      {{ route.name }}
                    </option>
                  </datalist>
                  <div class="row gx-3 mb-2">
                    <label class="form-label col-form-label col-md-1"
                      >Date</label
                    >
                    <div class="col-lg-3 mb-2">
                      <input
                        type="text"
                        class="form-control form-control-lg rounded-2"
                        placeholder="YYYY-MM-DD"
                        v-model="newRecordParams.date"
                      />
                    </div>
                    <div class="col-lg-5"></div>
                    <div class="col-lg-3">
                      <button
                        @click="clearNewParams()"
                        type="button"
                        class="
                          btn btn-lg btn-secondary
                          d-block
                          w-100
                          fw-bold
                          rounded-2
                          height-50px
                        "
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                  <div class="row gx-3 mb-2">
                    <label class="form-label col-form-label col-md-1"
                      >Route</label
                    >
                    <div class="col-lg-6 mb-2">
                      <input
                        type="text"
                        list="routes"
                        v-model="routeSelected"
                        @change="setSelectedObject()"
                        class="form-control form-control-lg rounded-2"
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-2">
                    <label class="form-label col-form-label col-md-1"
                      >Crag</label
                    >
                    <div class="col-lg-5 mb-2">
                      <input
                        type="text"
                        class="form-control form-control-lg rounded-2"
                        v-model="routeSelectedObject.crag"
                        readonly
                      />
                    </div>
                    <label class="form-label col-form-label col-md-1 text-end"
                      >Area</label
                    >
                    <div class="col-lg-5 mb-2">
                      <input
                        type="text"
                        class="form-control form-control-lg rounded-2"
                        v-model="routeSelectedObject.area"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-2">
                    <label class="form-label col-form-label col-md-1"
                      >Grade</label
                    >
                    <div class="col-lg-3 mb-2">
                      <input
                        type="text"
                        v-model="newRecordParams.grade"
                        class="form-control form-control-lg rounded-2"
                      />
                    </div>
                    <label class="form-label col-form-label col-md-1 text-end"
                      >Partner</label
                    >
                    <div class="col-lg-3 mb-2">
                      <input
                        type="text"
                        v-model="newRecordParams.partner"
                        class="form-control form-control-lg rounded-2"
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-2">
                    <label class="form-label col-form-label col-md-1"
                      >Result</label
                    >
                    <div class="col-lg-2 mb-2">
                      <select
                        searchable="search"
                        class="form-select"
                        v-model="newRecordParams.result"
                      >
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
                      class="col-lg-5"
                      v-if="
                        newRecordParams.result === '1 fall' ||
                        newRecordParams.result === '2 falls' ||
                        newRecordParams.result === 'beta'
                      "
                    >
                      <div class="row gx-3">
                        <label
                          class="form-label col-form-label col-md-4 text-end"
                          >In progress</label
                        >
                        <div class="col-lg-8">
                          <select
                            class="form-select"
                            v-model="newRecordParams.in_progress"
                          >
                            <option value="null"></option>
                            <option value="true">true</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-lg-5"
                      v-if="
                        newRecordParams.result === 'onsight' ||
                        newRecordParams.result === 'flash' ||
                        newRecordParams.result === 'redpoint'
                      "
                    >
                      <div class="row gx-3">
                        <label
                          class="form-label col-form-label col-md-4 text-end"
                          >Rating</label
                        >
                        <div class="col-lg-8">
                          <select
                            class="form-select"
                            v-model="newRecordParams.rating"
                          >
                            <option value="null"></option>
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
                      </div>
                    </div>
                  </div>
                  <div class="mb-20px pb-4px">
                    <textarea
                      class="form-control"
                      rows="5"
                      v-model="newRecordParams.comments"
                      name="comments"
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <button
                    class="
                      btn btn-lg
                      d-block
                      w-100
                      btn-outline-success
                      rounded-2
                      fw-bold
                      fs-16px
                      py-3
                    "
                    data-bs-dismiss="modal"
                  >
                    Create Climbing Record
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Record Create Modal -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import moment from "moment";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      records: [],
      newRecordParams: { result: "", in_progress: "", rating: "" },
      errors: [],
      editRecordParams: {},
      editToggle: false,
      editErrors: [],
      filter: "",
      gradeFilter: "",
      resultFilter: "",
      ratingFilter: null,
      partnerFilter: "",
      search: "",
      cragFilter: "",
      areaFilter: "",
      grades: [],
      partners: [],
      crags: [],
      areas: [],
      collections: [],
      currentRecord: { route: { name: "" }, collection: { name: "" } },
      addToCollection: false,
      index: 0,
      routes: [],
      routeSelected: "",
      routeSelectedObject: {},
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
    axios.get("/routes").then((response) => {
      console.log("Routes", response.data);
      this.routes = response.data;
    });
  },
  methods: {
    recordDate: (date) => {
      return moment(date).format("l");
    },
    recordCreate: function () {
      this.newRecordParams["route_id"] = this.routeSelectedObject.id;
      axios
        .post("/records", this.newRecordParams)
        .then((response) => {
          console.log(response.data);
          this.records.push(response.data);
          this.newRecordParams = { result: "", in_progress: false, rating: "" };
          this.routeSelected = "";
          this.routeSelectedObject = {};
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
      console.log(this.currentRecord);
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
    recordDestroy: function (record) {
      if (confirm("Are you sure you want to delete this record?")) {
        axios.delete(`/records/${record.id}`).then((response) => {
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
      this.serach = "";
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
      this.newRecordParams = { result: "", in_progress: false, rating: "" };
      this.routeSelected = "";
      this.routeSelectedObject = {};
    },
    clearEditParams: function () {
      this.editRecordParams = {};
      this.addToCollection = false;
    },
    edit: function () {
      this.editToggle = !this.editToggle;
    },
    editClose: function () {
      this.editToggle = false;
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
    setSelectedObject: function () {
      this.routeSelectedObject = this.routes.find(
        (route) => route.name === this.routeSelected
      );
      console.log(this.routeSelectedObject);
    },
  },
};
</script>
