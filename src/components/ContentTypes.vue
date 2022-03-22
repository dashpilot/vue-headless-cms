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

        <label class="mt-4">Add Content Type</label>

        <ul class="list-group">
          <li class="list-group-item">

            <div class="row">
              <div class="col-6">
                <input type="text" class="form-control" placeholder="Content Type Name" v-model="newType">
              </div>
              <div class="col-6 text-end">
                <button class="btn btn-outline-dark" @click="addType"><i class="fas fa-plus"></i></button>
              </div>
            </div>

          </li>
        </ul>

      </template>

      <template v-if="activeType">
        <ul class="list-group">
          <template v-for="key in Object.keys(types[activeType])">
            <li class="list-group-item">

              <div class="row">
                <div class="col-6">

                  <template v-if="key == 'title' | key == 'body'">
                    <div class="pt-2  pb-2"><strong>{{key}}</strong></div>
                  </template>
                  <template v-else>
                    <div class="pt-2"><strong>{{key}}</strong></div>
                  </template>

                </div>
                <div class="col-4">
                  <div class="pt-2 pb-2">
                    {{types[activeType][key]}}
                  </div>

                </div>
                <div class="col-2 text-end">
                  <template v-if="key !== 'title' && key !== 'body'">
                    <button class="btn btn-outline-dark" @click="removeField(key)"><i class="fas fa-trash-alt"></i></button>
                  </template>
                </div>
              </div>
            </li>
          </template>
        </ul>


        <label class="mt-4">Add Field</label>

        <ul class="list-group">
          <li class="list-group-item">

            <div class="row">
              <div class="col-6">
                <input type="text" class="form-control" placeholder="Field Name" v-model="newKey">
              </div>

              <div class="col-4">
                <select class="form-select w-100" v-model="newVal">
                  <option value="text">text</option>
                  <option value="textarea">textarea</option>
                  <option value="richtext">rich text editor</option>
                  <option value="markdown">markdown editor</option>
                  <option value="image">image</option>
                  <option value="gallery">gallery</option>
                  <option value="switch">switch</option>
                </select>
              </div>

              <div class="col-2 text-end">
                <button class="btn btn-outline-dark" @click="addField"><i class="fas fa-plus"></i></button>

              </div>
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
      newType: '',
    }
  },
  methods: {
    addField() {
      if (this.newKey.length < 3) {
        alert('Field name should be at least 3 characters long')
      } else {
        let slug = this.slugifyFieldTitle(this.newKey);

        let slugs = Object.keys(this.types[this.activeType]);
        if (slugs.includes(slug)) {

          alert(`Error: field name '${slug}' already exists`);
        } else {
          console.log(slugs);


          this.types[this.activeType][slug] = this.newVal;
          this.newKey = '';
          this.newVal = 'text';
        }
      }
    },
    addType() {
      if (this.newType.length < 3) {
        alert('Content type name should be at least 3 characters long')
      } else {
        let slug = this.slugifyFieldTitle(this.newType);

        let slugs = Object.keys(this.types);
        if (slugs.includes(slug)) {
          alert(`Error: content type name '${slug}' already exists`);
        } else {
          this.types[slug] = {
            'title': 'text',
            'body': 'richtext'
          }
          this.activeType = slug;
        }
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

.w-35 {
  width: 35%;
}

.w-30 {
  width: 30%;
}

.btn {
  background-color: white;
}
</style>
