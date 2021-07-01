<template>
  <div class="collections-show">
    <div class="container">
      <!-- Collection Show -->
      <div v-if="!edit">
        <h3>{{ collection.name }} Collection</h3>
        <p><strong>Partners</strong><br />{{ collection.partners }}</p>
        <p><strong>Highlights</strong><br />{{ collection.highlights }}</p>
        <button @click="editToggle()">Edit Collection</button>
      </div>

      <!-- Collection Edit/Delete -->
      <div v-if="edit">
        <h3>Edit {{ collection.name }} Collection</h3>
        <ul style="list-style-type: none">
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
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
        <button v-on:click="collectionDestroy()">Delete</button> <br />
        <button @click="editToggle()">Cancel</button>
      </div>

      <!-- Collection Records (Routes) -->
      <div>
        <h3>Routes</h3>
        <div
          v-for="record in orderBy(collection.records, 'date', -1)"
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
      </div>

      <!-- Collection Images -->
      <div>
        <form v-on:submit.prevent="imageCreate()">
          <h3>Photos</h3>
          <input type="file" v-on:change="setFile($event)" ref="fileInput" />
          <br />
          <input type="submit" value="Upload Photo" />
        </form>
        <div v-for="image in collection.images" v-bind:key="image.id">
          <br />
          <img class="image" :src="image.url" alt="photo" />
          <button @click="imageDestroy(image)">Delete Photo</button>
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
        .patch(
          `/collections/${this.$route.params.id}`,
          this.editCollectionParams
        )
        .then((response) => {
          console.log(response.data);
          this.edit = !this.edit;
          this.collection = Object.assign(
            this.collection,
            this.editCollectionParams
          );
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    collectionDestroy: function () {
      if (
        confirm(
          "Are you sure you want to delete this collection? \r\nAll associated photos will also be deleted."
        )
      ) {
        axios
          .delete(`/collections/${this.$route.params.id}`)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/collections");
          });
      }
    },
    editToggle: function () {
      this.edit = !this.edit;
      this.editCollectionParams = Object.assign(
        this.editCollectionParams,
        this.collection
      );
    },
  },
};
</script>
