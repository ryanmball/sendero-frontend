<template>
  <div class="collections-index">
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
        <div class="display-6 fw-bolder">Collections</div>
      </div>
    </div>
    <!-- END Title -->

    <!-- BEGIN Collection Index -->
    <div class="section pt-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-1"></div>
          <div class="col-lg-10">
            <div class="news">
              <div class="row align-items-center mb-5" v-for="collection in collections" v-bind:key="collection.id">
                <div class="col-sm-5 mb-3 mb-sm-0">
                  <div class="news-media mb-0">
                    <div>
                      <img
                        style="background-image"
                        :src="collection.images[0].url"
                        alt="Cover Photo"
                        v-if="collection.images[0]"
                      />
                      <img
                        style="background-image"
                        src="/assets/img/corporate/default_collection_pic.jpeg"
                        alt="Cover Photo"
                        v-if="!collection.images[0]"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-sm-7">
                  <div class="news-content">
                    <div class="news-title mb-2">
                      {{ collection.name }}
                      <router-link :to="`/collections/${collection.id}`">
                        <span class="text-end"><i class="ps-3 fas fa-external-link-alt h-40px"></i></span>
                      </router-link>
                    </div>
                    <div class="mb-4 fw-bold fs-16px text-gray-600">
                      {{ collection.highlights }}
                    </div>
                    <div class="fw-bold fs-16px text-blue-700">Partners:</div>
                    <div class="news-date text-blue-700">
                      {{ collection.partners }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-1"></div>
          <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-3">
              <button
                data-bs-toggle="modal"
                data-bs-target="#modalCreate"
                type="button"
                class="btn btn-md btn-primary d-block w-100 fw-bold rounded-2 height-50px"
              >
                Create New Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END Collection Index -->

    <!-- BEGIN Collection Create Modal -->
    <div class="modal fade" id="modalCreate">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header px-4">
            <div class="fs-24px fw-bolder">New Collection</div>
            <a href="#" class="btn-close" data-bs-dismiss="modal" @click="clearNewParams()"></a>
          </div>
          <div class="modal-body p-0">
            <div class="row gx-0">
              <div class="col-md-12 p-4 border-end fs-14px line-h-16">
                <form v-on:submit.prevent="collectionCreate()">
                  <div class="row gx-3 mb-2">
                    <label class="form-label col-form-label col-md-2">Name</label>
                    <div class="col-lg-7 mb-2">
                      <input
                        type="text"
                        class="form-control form-control-lg rounded-2"
                        v-model="newCollectionParams.name"
                      />
                    </div>
                    <div class="col-lg-3">
                      <button
                        @click="clearNewParams()"
                        type="button"
                        class="btn btn-lg btn-secondary d-block w-100 fw-bold rounded-2 height-50px"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                  <div class="row gx-3 mb-2">
                    <label class="form-label col-form-label col-md-2">Partners</label>
                    <div class="col-lg-10 mb-2">
                      <input
                        type="text"
                        class="form-control form-control-lg rounded-2"
                        v-model="newCollectionParams.partners"
                      />
                    </div>
                  </div>
                  <div class="row gx-3 mb-2">
                    <label class="form-label col-form-label col-md-2">Highlights</label>
                    <div class="col-lg-10 mb-2">
                      <textarea class="form-control" rows="7" v-model="newCollectionParams.highlights"></textarea>
                    </div>
                  </div>
                  <button
                    class="btn btn-lg d-block w-100 btn-outline-success rounded-2 fw-bold fs-16px py-3"
                    data-bs-dismiss="modal"
                  >
                    Create Collection
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END Collection Create Modal -->
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

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      collections: [],
      newCollectionParams: {},
      errors: [],
      image: "",
    };
  },
  created: function () {
    axios.get("/collections").then((response) => {
      console.log(response.data);
      this.collections = response.data;
    });
  },
  methods: {
    collectionCreate: function () {
      axios
        .post("/collections", this.newCollectionParams)
        .then((response) => {
          console.log(response.data);
          this.collections.push(response.data);
          this.newCollectionParams = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    clearNewParams: function () {
      this.newCollectionParams = {};
    },
  },
};
</script>
