<template>
<div class="backdrop">
  <div class="modal-screen">
    <h3 class="float-start">Add Category</h3>
    <button type="button" class="btn-close float-end" aria-label="Close" @click="closeWindow()"></button>
    <div class="clear mt-5"></div>
    <label>Title</label>
    <input type="text" class="form-control" v-model="newTitle">

    <label>Content Type</label>

    <select class="form-select" v-model="newType">
      <template v-for="field in Object.keys(config.content_types)">
        <option :value="field">{{field}}</option>
      </template>
    </select>

    <button class="btn btn-primary mt-3" @click="addCat()">Add</button>

  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      newTitle: '',
      newType: 'default'
    }
  },
  props: ['data', 'config', 'curpost'],
  methods: {
    addCat() {


      var slug = this.slugify(this.newTitle);

      // check if this slug is unique
      this.data.categories.forEach((x) => {
        if (x.slug == slug) {
          slug = slug + "-" + Math.floor(Math.random() * 9999);
        }
      })

      if (slug.length < 3) {
        alert('Title should be at least three characters long (excluding special characters)')
      } else {


        var newItem = {};
        newItem.id = "categories-" + Math.floor(Math.random() * 999999999);
        newItem.title = this.newTitle;
        newItem.slug = slug;
        newItem.type = this.newType;
        newItem.sub = false;
        newItem.description = "";

        this.data.categories.push(newItem);

        this.$emit('update:data', this.data)
        this.$emit('update:curpost', newItem)
        this.$emit('update:show', false)

        console.log(newItem);

      }

    },
    closeWindow() {
      this.$emit('update:show', false);
    },
    slugify(text) {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
    }
  }
}
</script>

<style scoped>
.modal-screen {
  width: 500px;
  left: calc(50% - 250px);
}
</style>
