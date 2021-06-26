<template>
  <div class="collections-index">
    <div class="container">
      <h3>Collections:</h3>

      <!-- Collection Create -->
      <form v-on:submit.prevent="collectionCreate()">
        <ul style="list-style-type: none">
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
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
        <strong>UPLOAD IMAGES</strong> <br />
        <input type="submit" class="btn btn-primary" value="Create" />
      </form>

      <!-- Collection Index -->
      <div v-for="collection in collections" v-bind:key="collection.id">
        <p>
          {{ collection.name }} <br />
          {{ collection.partners }} <br />
          {{ collection.highlights }} <br />
          <button v-on:click="collectionImages(collection)">Photos</button>
          <br />
          <button v-on:click="collectionShow(collection)">Edit/Delete</button>
        </p>
      </div>

      <!-- Collection Images -->
      <dialog id="collection-images">
        <form method="dialog">
          <h3>{{ collection.name }} Photos</h3>
          <input
            type="text"
            v-model="newImageParams.url"
            placeholder="Photo URL"
          />
          <button @click="imageCreate(collection)">Upload Photo</button>
          <div v-for="image in images" v-bind:key="image.id">
            <br />
            <img class="image" :src="image.url" alt="photo" />
            <button @click="imageDestroy(image)">Delete Photo</button>
          </div>
          <button>Close</button>
        </form>
      </dialog>

      <!-- Collection Edit/Delete -->
      <dialog id="collection-details">
        <form method="dialog">
          <h1>Edit Collection</h1>
          <ul style="list-style-type: none">
            <li
              class="text-danger"
              v-for="editError in editErrors"
              v-bind:key="editError"
            >
              {{ error }}
            </li>
          </ul>
          <p>Name: <input type="text" v-model="editCollectionParams.name" /></p>
          <p>
            Partners:
            <input type="text" v-model="editCollectionParams.partners" />
          </p>
          <p>
            Highlights:
            <input type="text" v-model="editCollectionParams.highlights" />
          </p>
          <button v-on:click="collectionUpdate()">Update</button>
          <button v-on:click="collectionDestroy()">Delete</button>
          <button>Close</button>
        </form>
      </dialog>
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
      editCollectionParams: {},
      editErrors: [],
      images: [],
      newImageParams: {},
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
    collectionShow: function (collection) {
      console.log(collection);
      this.editCollectionParams = collection;
      document.querySelector("#collection-details").showModal();
    },
    collectionImages: function (collection) {
      console.log(collection);
      this.collection = collection;
      this.images = collection.images;
      document.querySelector("#collection-images").showModal();
    },
    imageCreate: function (collection) {
      this.newImageParams.collection_id = collection.id;
      axios
        .post("/images", this.newImageParams)
        .then((response) => {
          console.log(response.data);
          this.images.push(response.data);
          this.newImageParams = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    imageDestroy: function (image) {
      if (confirm("Are you sure you want to delete this image?")) {
        axios.delete(`/images/${image.id}`).then((response) => {
          console.log(response.data);
          var index = this.images.indexOf(image);
          this.images.splice(index, 1);
        });
      }
    },
    collectionUpdate: function () {
      axios
        .patch(
          `/collections/${this.editCollectionParams.id}`,
          this.editCollectionParams
        )
        .then((response) => {
          console.log(response.data);
          var index = this.collections.indexOf(this.editCollectionParams);
          this.collections.splice(index, 1, response.data);
        })
        .catch((error) => {
          this.editErrors = error.response.data.errors;
        });
    },
    collectionDestroy: function () {
      if (confirm("Are you sure you want to delete this collection?")) {
        axios
          .delete(`/collections/${this.editCollectionParams.id}`)
          .then((response) => {
            console.log(response.data);
            var index = this.collections.indexOf(this.editCollectionParams);
            this.collections.splice(index, 1);
          });
      }
    },
  },
};
</script>
