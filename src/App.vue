<template>
<template v-if="data.categories">

  <div class="row g-0">
    <div class="col-2 col1">

      <div class="settings">


        <div class="btn-group">
          <template v-if="curCat && config.settings.allow_add_category">
            <button @click="showAddCat = true" class="btn btn-outline-light"><i class="fa fa-plus"></i></button>
          </template>
          <template v-if="curCat && config.settings.allow_delete_category">
            <button @click="showCatSettings = true" class="btn btn-outline-light"><i class="fa fa-cog"></i></button>
          </template>
        </div>


      </div>

      <template v-for="cat in data.categories">
        <a @click="setCurCat(cat.slug)" :class="{ 'active': curCat == cat.slug, 'sub': cat.sub == true }">{{cat.title}}</a>
      </template>

    </div>
    <div class="col-3 col2">

      <div class="filter">

        <div class="btn-group">
          <a @click="addItem()" class="btn btn-outline-dark"><i class="fa fa-plus"></i></a>
          <a @click="showPostSettings = true" class="btn btn-outline-dark"><i class="fa fa-cog"></i></a>
        </div>

      </div>

      <PostList v-model:posts="catItems" v-model:curpost="curItem" />

    </div>
    <div class="col-7 col3">


      <div class="savebar">
        <button class="btn btn-primary mt-1" @click="save()">
          <template v-if="saving">
            <i class="fas fa-spinner fa-spin"></i> &nbsp;
          </template>
          Save</button>

        <template v-if="config.settings.preview_url">
          &nbsp;
          <a class="btn btn-outline-dark mt-1 btn-preview" :href="config.settings.preview_url" target="_blank">View Site</a>
        </template>
      </div>


      <div class="post-editor">


        <template v-if="curItem">
          <template v-for="(key, val) in Object.keys(config.fields[curType])">

            <template v-if="config.fields[curType][key] == 'text'">
              <label>{{key.replace('_', ' ')}}</label>
              <input type="text" class="form-control" v-model="curItem[key]">
            </template>

            <template v-if="config.fields[curType][key] == 'text-disabled'">
              <label>{{key.replace('_', ' ')}}</label>
              <input type="text" class="form-control" v-model="curItem[key]" disabled>
            </template>

            <template v-if="config.fields[curType][key] == 'richtext'">
              <label>{{key.replace('_', ' ')}}</label>
              <Editor v-model="curItem[key]" />
            </template>

            <template v-if="config.fields[curType][key] == 'textarea'">
              <label>{{key.replace('_', ' ')}}</label>
              <textarea class="form-control" v-model="curItem[key]"></textarea>
            </template>


            <template v-if="config.fields[curType][key] == 'image'">

              <div class="row">
                <div class="col-9">
                  <label>{{key.replace('_', ' ')}}</label>
                  <Image v-model="curItem[key]" :save_url="config.settings.image_save_url" :image_width="config.settings.image_width" />
                </div>
                <div class="col-3">

                  <template v-if="config.settings.image_url && curItem[key]">
                    <div class="preview" :style="{ backgroundImage: 'url('+ config.settings.image_url + curItem[key] + ')' }"></div>
                  </template>
                </div>

              </div>

            </template>

            <template v-if="config.fields[curType][key] == 'gallery'">

              <label>{{key.replace('_', ' ')}}</label>

              <Gallery v-model:gallery="curItem[key]" :id="curItem.id" :save_url="config.settings.image_save_url" :image_url="config.settings.image_url" :image_width="config.settings.image_width" @update="addToGallery" />

            </template>


            <template v-if="config.fields[curType][key].includes('dropdown')">
              <label>{{key.replace('_', ' ')}}</label>

              <select class="form-select w-25" v-model="curItem[key]" @change="changeCat(curItem[key]);">
                <template v-for="item in data.categories">
                  <option :value="item.slug">{{item.title}}</option>
                </template>
              </select>

            </template>

            <template v-else>

            </template>

          </template>


        </template>
      </div>

    </div>
  </div>


  <template v-if="showCatSettings">
    <SortableList v-model:items="data.categories" v-model:data="data" v-model:show="showCatSettings" title="Categories" />
</template>

<template v-if="showPostSettings">
<SortableList v-model:items="catItems" v-model:data="data" v-model:show="showPostSettings" title="Posts" />
</template>

<div v-show="showAddCat">
  <AddCategory v-model:data="data" v-model:config="config" v-model:curpost="curItem" v-model:show="showAddCat" />
</div>

</template>

</template>

<script>
import Editor from './components/Editor.vue'
import Image from './components/Image.vue'
import Gallery from './components/Gallery.vue'
import SortableList from './components/SortableList.vue'
import PostList from './components/PostList.vue'
import AddCategory from './components/AddCategory.vue'

export default {
  components: {
    Editor,
    Image,
    Gallery,
    SortableList,
    PostList,
    AddCategory,
  },
  data() {
    return {
      curCat: false,
      curType: 'default',
      catItems: false,
      curItem: false,
      saving: false,
      showAddCat: false,
      showPostSettings: false,
      showCatSettings: false,
      drag: false,
      data: {},
      config: {}
    }
  },
  created: function() {


    fetch("/config.json")
      .then(r => r.json())
      .then(config => {

        this.config = config;

        fetch(config.settings.data_url, {
            cache: "no-store"
          })
          .then(r => r.json())
          .then(data => {
            this.data = data;
            console.log(data);

            // select the first elements
            var defaultCat = data.categories[0].slug;
            this.curCat = defaultCat;
            this.catItems = this.data.posts.filter(x => x.category == defaultCat);
            this.curItem = this.data.posts.filter(x => x.category == defaultCat)[0];
          });

      });

  },
  methods: {
    setCurCat(cat) {
      this.curCat = cat;
      this.curType = this.data.categories.filter(x => x.slug == cat)[0].type;
      this.catItems = this.data.posts.filter(x => x.category == cat);
      this.curItem = this.data.posts.filter(x => x.category == cat)[0];
    },
    addItem() {

      let fields = this.config.fields[this.curType];

      var newItem = {};
      newItem.id = "posts-" + Math.floor(Math.random() * 999999999);
      Object.keys(fields).forEach((x) => {
        if (x == 'gallery') {
          newItem[x] = [];
        } else {
          newItem[x] = "";
        }
      })
      newItem.category = this.curCat;
      console.log(newItem)
      this.data.posts.unshift(newItem);
      this.catItems = this.data.posts.filter(x => x.category == this.curCat);
      this.curItem = newItem;

    },
    changeCat(cat) {
      console.log(cat);
      this.curCat = cat;
      this.catItems = this.data.posts.filter(x => x.category == cat);
    },
    addToGallery(filename, id) {
      let curIndex = this.data.posts.findIndex(x => x.id == id);
      console.log(curIndex)
      this.data.posts[curIndex].gallery.push(filename);

      //alert(filename + ' ' + id)

    },
    save() {
      console.log(this.data);
      this.saving = true;

      var myapp = this;
      postData(this.config.settings.save_url, this.data)
        .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
        });

      setTimeout(() => {
        this.saving = false;
      }, 2000)
    }
  }
}

async function postData(url = '', data = {}) {

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
</script>

<style>
html,
body {
  height: 100%;
}

body {
  background-color: #F8F8F8;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.row {
  height: 100%;
}

.col1 {
  height: 100%;
  background-color: #333;
}

.col1 a {
  color: white !important;
  display: block;
  padding: 13px 20px;
  text-transform: capitalize;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col1 a:hover {
  background-color: #656BF7;
  user-select: none;
  cursor: pointer;
}

a.sub {
  padding-left: 40px;
}

.active {
  background-color: #656BF7;
}

.col2 {
  background-color: white;
  border-right: 1px solid #DDD;
}

.col2 .list-group-item {
  padding: 20px;
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-left: 5px solid transparent;
}

.col2 .list-group-item:hover {
  background-color: #F8F8F8;
  user-select: none;
  cursor: pointer;
}

.col2 .active2 {
  background-color: #F8F8F8;
  width: 100.5%;
  border-left: 5px solid #656BF7;
}

.col2 {
  overflow-x: hidden;
  overflow-y: auto;
}

.form-control,
.form-select {
  margin-bottom: 15px;
}

label {
  text-transform: uppercase;
  font-size: 15px;
  line-height: 15px;
  letter-spacing: 0.05em;
  margin-bottom: 5px;
}

.rocket {
  width: 100px;
  margin-bottom: 10px;
  padding: 20px;
}

.btn-primary {
  border: 2px solid #666BEF;
  background-color: #666BEF;
  color: white;
  border-radius: 4px;
  padding-left: 30px;
  padding-right: 30px;
  transition: 0.3s;
}

.btn-primary:hover {
  border: 2px solid #8287f9;
  background-color: #8287f9;
  color: white;
}

.btn-preview {
  padding: 8px 15px;
}

textarea {
  height: 100px;
  resize: none;
}

.rte {
  height: 200px;
}

.ProseMirror {
  min-height: 190px !important;
  border: 1px solid #DDD;
  padding: 15px;
  background-color: white;
  border-radius: 6px;
  outline: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.btn-outline-secondary {
  border: 1px solid #DDD;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 0;
}

.btn-outline-secondary:hover {
  background-color: #EEEEEE;
  border: 1px solid #DDD;
  border-bottom: 0;
  color: black;
}

.btn-outline-dark {
  border: 1px solid #DDD;
}

.btn-outline-dark:hover {
  border: 1px solid #DDD;
  background-color: #EEEEEE;
  color: black;
}

.settings {
  padding: 11px 15px 15px 18px;
}

.filter {
  padding: 10px 20px;
  border-bottom: 6px solid #333;
  background-color: white;
  position: fixed;
  z-index: 999;
  width: 25%;
  border-right: 1px solid #DDD;
}

.col1 {
  position: fixed;
  left: 0;
}

.col2 {
  position: fixed;
  left: 16.67%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

.col2 .list-group:nth-child(2) .list-group-item {
  top: 63px;
}

.col3 {
  position: fixed;
  right: 0;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-screen {
  position: fixed;
  top: 15%;
  left: calc(50% - 300px);
  width: 600px;
  height: auto;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  max-height: 70%;
  overflow-x: hidden;
  overflow-y: auto;
}

.clear {
  clear: both;
}

.add-cat {
  margin: 11px 20px 15px 20px;
}

.savebar {
  background-color: white;
  padding: 4px 20px 8px;
  border-bottom: 6px solid black;
  text-align: right;
  position: fixed;
  width: 59%;
  z-index: 9999999;
}

.post-editor {
  padding: 20px;
  padding-top: 90px;
}

.preview {
  width: 63px;
  height: 63px;
  border: 1px solid #DDD;
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  display: inline-block;
  margin-left: 10px;
  float: right;
}
</style>
