<template>
<div class="backdrop">
  <div class="modal-screen">

    <div class="row mb-3">
      <div class="col-9">
        <template v-if="!activeType">
          <h4 class="float-start">Content Types</h4>
        </template>
        <template v-if="activeType">
          <h4 class="float-start"><a @click="activeType = false">Content Types</a> &raquo; {{activeType}}</h4>
        </template>
      </div>
      <div class="col-3">

        <button type="button" class="btn-close float-end" aria-label="Close" @click="closeWindow()"></button>

      </div>
    </div>

    <div id="modal-content">

      <template v-if="!activeType">
        <ul class="list-group">
          <template v-for="key in Object.keys(types)">
            <li class="list-group-item text-truncate">
              <div class="row g-0 d-flex pt-2 pb-2">
                <a @click="activeType = key">{{key}}</a>
              </div>
            </li>
          </template>
        </ul>
      </template>

      <template v-if="activeType">
        <ul class="list-group">

          <template v-for="key in Object.keys(types[activeType])">
            <li class="list-group-item text-truncate">
              <div class="row g-0 d-flex">
                <div class="col-5">

                  <div class="pt-2">{{key}}</div>
                </div>
                <div class="col-1"></div>
                <div class="col-4">


                  <select class="form-select w-100" v-model="types[activeType][key]">
                    <option value="text">text</option>
                    <option value="richtext">richtext</option>
                    <option value="image">image</option>
                    <option value="gallery">gallery</option>
                    <option value="switch">switch</option>
                  </select>

                </div>

                <div class="col-2 text-end"><button class="btn btn-outline-dark" @click="removeField(key)"><i class="fas fa-trash-alt"></i></button></div>
              </div>
            </li>
          </template>
          <li class="list-group-item">

            <div class="row g-0 d-flex">
              <div class="col-5">
                <input type="text" class="form-control" placeholder="Field title" v-model="newKey">
              </div>
              <div class="col-1"></div>
              <div class="col-4">
                <select class="form-select w-100" v-model="newVal">
                  <option value="text">text</option>
                  <option value="richtext">richtext</option>
                  <option value="image">image</option>
                  <option value="gallery">gallery</option>
                  <option value="switch">switch</option>
                </select>
              </div>

              <div class="col-2 text-end"><button class="btn btn-outline-dark" @click="addField"><i class="fas fa-plus"></i></button></div>
            </div>

          </li>
        </ul>
      </template>

    </div>

  </div>
</div>
</template>

<script>
export default {
  created: function() {
    // this.enableSortable()
  },
  props: ['types', 'show'],
  data() {
    return {
      activeType: false,
      newKey: '',
      newVal: 'text',
    }
  },
  methods: {
    addField() {
      if (this.newKey.length < 3) {
        alert('Field name should be at least 3 characters long')
      } else {
        let slug = this.slugifyFieldTitle(this.newKey);
        this.types[this.activeType][slug] = this.newVal;
        this.newKey = '';
        this.newVal = 'text';
      }
    },
    slugifyFieldTitle(title) {
      let slug = title.toString().toLowerCase()
        .replace(/\s+/g, '_') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '_') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
      return slug;
    },
    removeField(key) {
      if (confirm('Are you sure you want to remove this field?')) {
        delete this.types[this.activeType][key]
      }
    },
    closeWindow() {
      this.activeType = false;
      this.$emit('update:show', false);
    }
  }
}
</script>

<style scoped>
a {
  color: #5679FE !important;
  cursor: pointer;
  text-transform: capitalize;
}

a:hover {
  text-decoration: underline !important;
}

.form-select,
.form-control {
  margin-bottom: 0;
}

.fa-chevron-left {
  float: right;
  font-size: 23px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
