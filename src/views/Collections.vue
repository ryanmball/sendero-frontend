<template>
  <div class="collections-index">
    <!-- BEGIN Title -->
    <br /><br /><br /><br /><br />
    <div class="section py-5">
      <div
        class="section-bg"
        style="background-image: url(/assets/img/corporate/mtn3.jpeg)"
      ></div>
      <div class="section-bg bg-gray-800 opacity-3"></div>
      <div class="container position-relative text-white text-center">
        <div class="display-6 fw-bolder">Collections</div>
      </div>
    </div>
    <!-- END Title -->

    <!-- BEGIN section -->
    <div class="section pt-5">
      <!-- BEGIN container -->
      <div class="container">
        <!-- BEGIN row -->
        <div class="row">
          <div class="col-lg-1"></div>
          <div class="col-lg-10">
            <div class="news">
              <!-- BEGIN row -->
              <div
                class="row align-items-center mb-5"
                v-for="collection in collections"
                v-bind:key="collection.id"
              >
                <!-- BEGIN col-5 -->
                <div class="col-sm-5 mb-3 mb-sm-0">
                  <div class="news-media mb-0">
                    <div>
                      <img
                        style="background-image"
                        :src="collection.images[0].url"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <!-- END col-5 -->
                <!-- BEGIN col-7 -->
                <div class="col-sm-7">
                  <div class="news-content">
                    <div class="news-title mb-2">
                      {{ collection.name }}
                      <router-link :to="`/collections/${collection.id}`"
                        ><span class="text-end"
                          ><i
                            class="ps-3 fas fa-external-link-alt h-40px"
                          ></i></span
                      ></router-link>
                    </div>
                    <div class="mb-4 fw-bold fs-16px text-gray-600">
                      {{ collection.highlights }}
                    </div>
                    <div class="fw-bold fs-16px text-blue-700">Partners:</div>
                    <div class="news-date text-blue-700">
                      {{ collection.partners }}{{ collection.id }}
                    </div>
                  </div>
                </div>
                <!-- END col-7 -->
              </div>
              <!-- END row -->
            </div>
          </div>
          <div class="col-lg-1"></div>
        </div>
        <!-- END row -->
      </div>
      <!-- END container -->
    </div>
    <!-- END section -->

    <div class="container">
      <!-- Collection Create -->
      <div>
        <form v-on:submit.prevent="collectionCreate()">
          <ul style="list-style-type: none">
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <strong>Create collection</strong><br />
          <small class="text-danger">This will be in a modal</small>
          <div class="form-group">
            <label>Name:</label>
            <input
              type="text"
              class="form-control"
              v-model="newCollectionParams.name"
            />
          </div>
          <div class="form-group">
            <label>Partners:</label>
            <input
              type="text"
              class="form-control"
              v-model="newCollectionParams.partners"
            />
          </div>
          <div class="form-group">
            <label>Highlights:</label>
            <input
              type="text"
              class="form-control"
              v-model="newCollectionParams.highlights"
            />
          </div>
          <input type="submit" class="btn btn-primary" value="Create" />
          <br />
        </form>
        <br />
      </div>

      <!-- Collection Index -->
      <!-- <div>
        <h3>Collections:</h3>
        <div v-for="collection in collections" v-bind:key="collection.id">
          <p>
            <strong>Name: </strong>{{ collection.name }} <br />
            <strong>Partners: </strong>{{ collection.partners }} <br />
            <strong>Highlights: </strong>{{ collection.highlights }} <br />
            <router-link :to="`/collections/${collection.id}`">
              <button>More</button>
            </router-link>
          </p>
        </div>
      </div> -->
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

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      collections: [],
      newCollectionParams: {},
      errors: [],
      collection: {},
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
  },
};
</script>
