<template>
  <div class="collections-show">
    <!-- BEGIN Title -->
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="section py-5">
      <div class="section-bg" style="background-image: url(/assets/img/corporate/mtn3.jpeg)"></div>
      <div class="section-bg bg-gray-800 opacity-3"></div>
      <div class="container position-relative text-white text-center">
        <div class="display-6 fw-bolder">{{ collection.name }}</div>
      </div>
    </div>
    <!-- END Title -->

    <div class="section pt-5">
      <div class="container">
        <div class="row">
          <!-- BEGIN Collection Show & Edit -->
          <div class="col-lg-4">
            <div class="card shadow border-0">
              <div class="card-body p-4">
                <div class="news p-0 mb-3">
                  <div class="news-label p-0 m-0">
                    <span class="bg-blue-200 text-blue-800 fs-18px">Collection Details</span>
                    <div>
                      <a href="#" @click="editToggle()" data-bs-toggle="modal" data-bs-target="#modalDetail">
                        <i class="ps-3 far fa-edit"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div v-if="edit">
                  <div class="h5 ms-2">Highlights</div>
                  <div class="p-2">
                    <textarea class="form-control" rows="7" v-model="editCollectionParams.highlights"></textarea>
                  </div>
                  <hr class="my-3" />
                  <div class="h5 ms-2">Partners</div>
                  <div class="p-2">
                    <textarea class="form-control" rows="2" v-model="editCollectionParams.partners"></textarea>
                  </div>
                  <div class="row">
                    <div class="col-1"></div>
                    <div class="col-5">
                      <button
                        @click="collectionUpdate()"
                        type="button"
                        class="btn btn-xs btn-primary d-block w-100 fw-bold rounded-2 height-50px"
                        data-bs-dismiss="modal"
                      >
                        Update
                      </button>
                    </div>
                    <div class="col-5">
                      <button
                        @click="collectionDestroy()"
                        type="button"
                        class="btn btn-xs btn-danger d-block w-100 fw-bold rounded-2 height-50px"
                        data-bs-dismiss="modal"
                      >
                        Delete
                      </button>
                    </div>
                    <div class="col-1"></div>
                  </div>
                </div>
                <div v-if="!edit">
                  <div class="h5 ms-2">Highlights</div>
                  <div class="p-2">{{ collection.highlights }}</div>
                  <hr class="my-3" />
                  <div class="h5 ms-2">Partners</div>
                  <div class="p-2">{{ collection.partners }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- END Collection Show & Edit -->

          <!-- BEGIN Collection Route Records -->
          <div class="col-lg-8">
            <div class="card shadow border-0">
              <div class="card-body p-4">
                <div class="news p-0 mb-3">
                  <div class="news-label p-0 m-0">
                    <span class="bg-blue-200 text-blue-800 fs-18px">Routes</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-2"><div class="h5">Date</div></div>
                  <div class="col-4"><div class="h5">Route</div></div>
                  <div class="col-2"><div class="h5">Grade</div></div>
                  <div class="col-4"><div class="h5">Crag</div></div>
                </div>
                <div class="row" v-for="record in orderBy(collection.records, 'date', -1)" v-bind:key="record.id">
                  <div class="col-2">
                    {{ recordDate(record.date) }}
                  </div>
                  <div class="col-4">
                    {{ record.route.name }}
                  </div>
                  <div class="col-2">
                    {{ record.grade }}
                  </div>
                  <div class="col-4">
                    {{ record.route.crag }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End Route Records -->
        </div>

        <!-- BEGIN Images Index & Upload/Delete -->
        <div>
          <div class="container pt-5">
            <div class="row gx-3">
              <div class="col-sm-6 col-md-4 col-lg-3" v-for="image in collection.images" v-bind:key="image.id">
                <div class="news mb-3">
                  <div class="news-media mb-2">
                    <div>
                      <img style="background-image" :src="image.url" alt="" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3"></div>
                    <div class="col-6">
                      <button
                        @click="imageDestroy(image)"
                        type="button"
                        class="btn btn-xs btn-secondary d-block w-100 fw-bold rounded-2 height-50px"
                        data-bs-dismiss="modal"
                      >
                        Delete
                      </button>
                    </div>
                    <div class="col-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form v-on:submit.prevent="imageCreate()">
            <label class="form-label col-form-label col-md-12">Add New Photo</label>
            <div class="col-md-3">
              <input type="file" class="form-control mb-5px" v-on:change="setFile($event)" ref="fileInput" />
              <button type="submit" class="btn btn-sm btn-primary d-block w-50 fw-bold rounded-2 height-50px">
                Upload Photo
              </button>
            </div>
          </form>
        </div>
        <!-- END Images Index & Upload/Delete -->
      </div>
    </div>
  </div>
</template>

<style>
.text-danger {
  color: red;
}
.image {
  width: 350px;
  height: auto;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import moment from "moment";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      editCollectionParams: {},
      errors: [],
      collection: {},
      edit: false,
      image: "",
    };
  },
  created: function () {
    axios.get(`/collections/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.collection = response.data;
    });
  },
  methods: {
    recordDate: (date) => {
      return moment(date).format("l");
    },
    setFile: function (event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    imageCreate: function () {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("collection_id", this.$route.params.id);
      axios
        .post("/images", formData)
        .then((response) => {
          console.log(response.data);
          this.collection.images.push(response.data);
          this.image = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    imageDestroy: function (image) {
      if (confirm("Are you sure you want to delete this photo?")) {
        axios.delete(`/images/${image.id}`).then((response) => {
          console.log(response.data);
          var index = this.collection.images.indexOf(image);
          this.collection.images.splice(index, 1);
        });
      }
    },
    collectionUpdate: function () {
      axios
        .patch(`/collections/${this.$route.params.id}`, this.editCollectionParams)
        .then((response) => {
          console.log(response.data);
          this.edit = !this.edit;
          this.collection = Object.assign(this.collection, this.editCollectionParams);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    collectionDestroy: function () {
      if (confirm("Are you sure you want to delete this collection? \r\nAll associated photos will also be deleted.")) {
        axios.delete(`/collections/${this.$route.params.id}`).then((response) => {
          console.log(response.data);
          this.$router.push("/collections");
        });
      }
    },
    editToggle: function () {
      this.edit = !this.edit;
      this.editCollectionParams = Object.assign(this.editCollectionParams, this.collection);
    },
  },
};
</script>
