<template>
  <div class="collections-index">
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

      <!-- Image Upload (after collection create) -->
      <div>
        <small class="text-danger">This will be in a second modal</small>
        <br />
        <form v-on:submit.prevent="imageCreate(collection)">
          <strong>Upload images</strong> <br />
          <input type="file" v-on:change="setFile($event)" ref="fileInput" />
          <br />
          <select v-model="collection">
            <option
              v-for="collection in collections"
              v-bind:key="collection.id"
              :value="collection"
            >
              {{ collection.name }}
            </option>
          </select>
          <br />
          <input type="submit" value="Upload Photo" />
        </form>
        <small class="text-danger">
          After creating a collection it will open another modal where the user
          <br />
          will upload images. This will use the collection id from the
          collection
          <br />
          create response data. Dropdown is temporary
        </small>
      </div>

      <!-- Collection Index -->
      <div>
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

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      collections: [],
      newCollectionParams: {},
      errors: [],
      image: "",
      collection: {},
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
    setFile: function (event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    imageCreate: function (collection) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("collection_id", collection.id);
      axios
        .post("/images", formData)
        .then((response) => {
          console.log(response.data);
          this.collection = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
