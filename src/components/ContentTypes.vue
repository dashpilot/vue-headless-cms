<template>
<template v-if="!activeType">
  <h4 class="mb-3">Content Types</h4>
</template>
<template v-if="activeType">
<h4 class="mb-3"><a @click="activeType = false">Content Types</a> &raquo; {{activeType}}</h4>
</template>

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
  <template v-for="key, i in Object.keys(types[activeType])">
    <li class="list-group-item" :class="{ 'sorting': sorting == key }">

      <div class="row">
        <div class="col-1">
          <div>
            <i class="fas fa-caret-up" @click="moveUp(key, i)"></i>
          </div>
          <div>
            <i class="fas fa-caret-down" @click="moveDown(key, i)"></i>
          </div>
        </div>
        <div class="col-5">

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
          <template v-if="key !== 'title'">
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
          <option value="text-small">small text</option>
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
      sorting: false
    }
  },
  methods: {
    addField() {
      if (this.newKey.length < 3) {
        alert('Field name should be at least 3 characters long')
      } else {
        let slug = this.slugify(this.newKey);

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
        let slug = this.slugify(this.newType);

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
    removeField(key) {
      if (confirm('Are you sure you want to remove this field?')) {
        delete this.types[this.activeType][key]
      }
    },
    moveUp(id, i) {
      this.sorting = id;
      //console.log(Object.keys(this.types[this.activeType]));

      setTimeout(() => {
        let newIndex = i - 1;
        if (i > 0) {
          var res = this.array_move(Object.entries(this.types[this.activeType]), i, newIndex)
        }
        // console.log(res)
        this.types[this.activeType] = Object.fromEntries(res);

      }, 200);

    },
    moveDown(id, i) {

      this.sorting = id;
      //console.log(Object.keys(this.types[this.activeType]));

      setTimeout(() => {
        let newIndex = i + 1;
        if (Object.entries(this.types[this.activeType]).length - 1 !== i) {
          var res = this.array_move(Object.entries(this.types[this.activeType]), i, newIndex)
        }
        // console.log(res)
        this.types[this.activeType] = Object.fromEntries(res);

      }, 200);

    },
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

.sorting {
  background-color: #FDF3D1;
}
</style>
