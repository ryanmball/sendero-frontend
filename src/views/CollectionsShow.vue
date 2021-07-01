<template>
  <div class="collections-show">
    <div class="container">
      <br />
      <strong>Upload images</strong> <br />
      <input type="text" v-model="newImageParams.url" placeholder="Photo URL" />
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
      <button @click="imageCreate(collection)">Upload Photo</button> <br />
      <small class="text-danger">
        After creating a collection it will open another modal where the user
        <br />
        will upload images. This will use the collection id from the collection
        <br />
        create response data
      </small>

      <!-- Collection Records -->
      <dialog id="collection-records">
        <form method="dialog">
          <h3>{{ collection.name }} Routes</h3>
          <div
            v-for="record in orderBy(records, 'date', -1)"
            v-bind:key="record.id"
          >
            <p>
              <strong>Date: </strong>{{ record.date }} <br />
              <strong>Route: </strong>{{ record.route.name }} <br />
              <strong>Location: </strong>{{ record.route.location }}<br />
              <strong>Grade: </strong>{{ record.grade }} <br />
              <strong>Partner: </strong>{{ record.partner }} <br />
              <strong>Comments: </strong>{{ record.comments }} <br />

              <!-- replace this link with a small MP logo -->
              <a :href="record.route.mp_url" target="_blank">MP URL</a
              ><small class="text-danger">small MP logo for link</small> <br />
            </p>
          </div>
          <button>Close</button>
        </form>
      </dialog>

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
      newCollectionParams: {},
      errors: [],
      editCollectionParams: {},
      editErrors: [],
      images: [],
      newImageParams: {},
      collection: {},
      records: [],
    };
  },
  created: function () {
    axios.get(`/collections/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.collection = response.data;
    });
  },
  methods: {
    collectionShow: function (collection) {
      console.log(collection);
      this.editCollectionParams = collection;
      document.querySelector("#collection-details").showModal();
    },
    collectionRecords: function (collection) {
      console.log(collection);
      this.collection = collection;
      this.records = collection.records;
      document.querySelector("#collection-records").showModal();
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
          this.collection = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    imageDestroy: function (image) {
      if (confirm("Are you sure you want to delete this photo?")) {
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
      if (
        confirm(
          "Are you sure you want to delete this collection? \r\nAll associated photos will also be deleted."
        )
      ) {
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
