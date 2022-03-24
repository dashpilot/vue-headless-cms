<template>
<div id="launch" class="loading" :class="{'loaded': !loading}">
  <div id="loading" class="text-center">
    <img :src="loaderIcon" />
    <div class="clear"></div>
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</div>

<template v-if="data.categories">
  <div class="row g-0">
    <div class="col-2 col1">

      <div class="settings">

        <div class="btn-group">
          <template v-if="curCat && data.ui_settings.add_category">
            <button @click="showAddCat = true" class="btn btn-outline-light"><i class="fa fa-plus"></i></button>
          </template>
          <template v-if="curCat && data.ui_settings.delete_category">
            <button @click="showCatSettings = true" class="btn btn-outline-light"><i class="fa fa-cog"></i></button>
          </template>
        </div>

      </div>

      <template v-for="cat in data.categories">
        <a @click="setCurCat(cat.slug)" class="tab" :class="{ 'active': curCat == cat.slug, 'sub': cat.sub == true }">{{cat.title}}</a>
      </template>

      <div id="settings">
        <div class="btn-group">
          <button @click="showSettings = true" class="btn btn-outline-light"><i class="fa fa-wrench"></i></button>


          <template v-if="data.ui_settings.edit_content_types">
            <button @click="showTypes = true" class="btn btn-outline-light"><i class="far fa-check-square"></i></button>
          </template>

          <template v-if="config.sign_out_url">
            <a :href="config.sign_out_url" class="btn btn-outline-light"><i class="fas fa-sign-out-alt"></i></a>
          </template>
        </div>
      </div>

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

        <div class="title">{{data.settings.site_title}}</div>

        <div class="buttons">
          <button class="btn btn-primary mt-1" @click="save()">
            <template v-if="saving">
              <i class="fas fa-spinner fa-spin"></i> &nbsp; Publishing...
            </template>
            <template v-if="!saving">
              Save
            </template>
          </button>

          <template v-if="data.settings.preview_url">
            &nbsp;
            <a class="btn btn-outline-dark mt-1 btn-preview" :href="data.settings.preview_url" target="_blank">View Site</a>
          </template>
        </div>

      </div>


      <div class="post-editor">


        <button @click="slugify('some text')">slug</button>

        <template v-if="curItem">
          <template v-for="(key, val) in Object.keys(data.content_types[curType])">

            <template v-if="data.content_types[curType][key] == 'text' && key == 'title'">
              <label>{{key.replaceAll('_', ' ')}}</label>
              <input type="text" class="form-control" v-model="curItem[key]" @keyup="setSlug">
            </template>

            <template v-if="data.content_types[curType][key] == 'text' && key !== 'title'">
              <label>{{key.replaceAll('_', ' ')}}</label>
              <input type="text" class="form-control" v-model="curItem[key]">
            </template>

            <template v-if="data.content_types[curType][key] == 'text-disabled'">
              <label>{{key.replaceAll('_', ' ')}}</label>
              <input type="text" class="form-control" v-model="curItem[key]" disabled>
            </template>

            <!--
            <template v-if="data.content_types[curType][key] == 'richtext'">
              <label>{{key.replaceAll('_', ' ')}}</label>
              <Editor v-model="curItem[key]" />
            </template>
          -->

            <template v-if="data.content_types[curType][key] == 'richtext'">
              <label>{{key.replaceAll('_', ' ')}}</label>
              <Editor v-model="curItem[key]" :settings="data.ui_settings" />
            </template>


            <template v-if="data.content_types[curType][key] == 'markdown'">
              <label>{{key.replaceAll('_', ' ')}}</label>
              <Markdown v-model="curItem[key]" />
            </template>

            <!--


            <template v-if="data.content_types[curType][key] == 'richtext'">
              <label>{{key.replace('_', ' ')}}</label>
              <RichText v-model="curItem[key]" :key="key" />
            </template>
          -->

            <template v-if="data.content_types[curType][key] == 'textarea'">
              <label>{{key.replaceAll('_', ' ')}}</label>
              <textarea class="form-control" v-model="curItem[key]"></textarea>
            </template>


            <template v-if="data.content_types[curType][key] == 'image'">
              <label>{{key.replaceAll('_', ' ')}}</label>
              <Image v-model="curItem[key]" :config="config" :image_width="data.settings.image_width" />
            </template>

            <template v-if="data.content_types[curType][key] == 'gallery'">
              <label>{{key.replaceAll('_', ' ')}}</label>
              <Gallery v-model:gallery="curItem[key]" :id="curItem.id" :config="config" :image_width="data.settings.gallery_image_width" :image_title="data.ui_settings.image_title" @update="addToGallery" />
            </template>

            <template v-if="data.content_types[curType][key] == 'switch'">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="curItem[key]">
                <label class="form-check-label" for="flexSwitchCheckChecked">{{key.replaceAll('_', ' ')}}</label>
              </div>
            </template>

            <template v-if="data.content_types[curType][key].includes('dropdown')">
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
    <SortableList v-model:items="data.categories" v-model:data="data" v-model:show="showCatSettings" title="Categories" type="categories" />
</template>

<template v-if="showPostSettings">
<SortableList v-model:items="catItems" v-model:data="data" v-model:show="showPostSettings" v-model:curItem="curItem" title="Posts" type="posts" />
</template>

<div v-show="showAddCat">
  <AddCategory v-model:data="data" v-model:config="data" v-model:curpost="curItem" v-model:show="showAddCat" />
</div>

<div v-show="showSettings">
  <Settings v-model:settings="data.settings" v-model:show="showSettings" />
</div>

<div v-show="showTypes">
  <ContentTypes v-model:types="data.content_types" v-model:show="showTypes" />
</div>

</template>

</template>

<script>
import loaderIcon from './rocket-planet.png'
import Editor from './widgets/Editor.vue'
import Markdown from './widgets/Markdown.vue'
import Image from './widgets/Image.vue'
import Gallery from './widgets/Gallery.vue'
import SortableList from './components/SortableList.vue'
import PostList from './components/PostList.vue'
import AddCategory from './components/AddCategory.vue'
import Settings from './components/Settings.vue'
import ContentTypes from './components/ContentTypes.vue'


export default {
  components: {
    Editor,
    Markdown,
    Image,
    Gallery,
    SortableList,
    PostList,
    AddCategory,
    Settings,
    ContentTypes,
  },
  data() {
    return {
      loaderIcon,
      loading: true,
      curCat: false,
      catData: false,
      curType: 'default',
      catItems: false,
      curItem: false,
      saving: false,
      showAddCat: false,
      showPostSettings: false,
      showCatSettings: false,
      showSettings: false,
      showTypes: false,
      drag: false,
      data: {},
      config: {},
    }
  },
  created: function() {

    fetch('app-config.json', {
        cache: "no-store"
      })
      .then(r => r.json())
      .then(cfg => {
        this.config = cfg;

        fetch(this.config.data_url, {
            cache: "no-store"
          })
          .then(r => r.json())
          .then(data => {
            this.data = data;
            console.log(data);

            // select the first elements
            var defaultCat = data.categories[0].slug;
            this.curCat = defaultCat;
            this.setCurCat(defaultCat)

            var myapp = this;
            setTimeout(() => {
              myapp.loading = false;
            }, 500)

          });

      });

  },
  methods: {
    setCurCat(cat) {
      this.curCat = cat;
      this.catData = this.data.categories.filter(x => x.slug == cat)[0];
      this.curType = this.catData.type;
      this.catItems = this.catData.posts;
      this.curItem = this.catData.posts[0];
    },
    addItem() {

      let fields = this.data.content_types[this.curType];

      var newItem = {};
      newItem.id = "item-" + Math.floor(Math.random() * 999999999);
      Object.keys(fields).forEach((x) => {
        if (x == 'gallery') {
          newItem[x] = [];
        } else {
          newItem[x] = "";
        }
      })
      newItem.slug = "item-" + newItem.id.replace('posts-', '');
      newItem.category = this.curCat;
      console.log(newItem)
      this.catData.posts.unshift(newItem);
      // this.setCurCat(this.curCat);
      this.curItem = newItem;

    },
    changeCat(cat) {
      console.log(cat);
      this.curCat = cat;
      this.catItems = this.categories.filter(x => x.slug == cat).posts;
    },
    addToGallery(filename, id) {
      this.curItem.gallery.push({
        filename: filename,
        title: ''
      });
    },
    setSlug(e) {
      var slug = this.slugify(e.target.value) + "-" + this.curItem.id.toString().replace('item-', '');
      this.curItem.slug = slug;
    },
    save() {
      console.log(this.data);
      this.saving = true;

      let params = {}
      params.type = 'json';
      params.path = 'data.json';
      params.content = this.data;

      var myapp = this;
      postData(this.config.save_url, params)
        .then(data => {
          if (data.ok) {
            console.log(data);
          } else {
            console.log(data);
            alert("Error: " + data.message)
          }
        })

      setTimeout(() => {
        this.saving = false;
      }, this.data.ui_settings.saving_duration)
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

#launch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #F8F8F8;
  z-index: 999;

}

.loading {
  opacity: 1;
  left: 0;
  transition: opacity 0.5s linear;
}

.loaded {
  opacity: 0;
  left: -100%;
  animation: away 0.5s normal forwards;
  animation-iteration-count: 1;
  animation-delay: 0.5s;
}

@keyframes away {
  from {
    left: 0px;
  }

  to {
    left: -100%;
  }
}

#loading {
  width: 250px;
  margin: 0 auto;
  padding-top: 100px;
  text-align: center;
}

#loading img {
  max-width: 60%;
  margin-bottom: 10px;
}

#loading .spinner-border {
  color: #5679FE;
}

.row {
  height: 100%;
}

.col1 {
  height: 100%;
  background-color: #333;
}

.col1 a.tab {
  color: white !important;
  display: block;
  padding: 13px 20px;
  text-transform: capitalize;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col1 a.tab:hover {
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
  height: 90px;
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
  font-size: 14px;
  line-height: 14px;
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
  left: calc(50% - 350px);
  width: 700px;
  height: auto;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  max-height: 75%;
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

  position: fixed;
  width: 59%;
  height: 64px;
  z-index: 9999999;
}

.savebar .title {
  float: left;
  padding-top: 13px;
  font-weight: 600;
  display: none;
}

.savebar .buttons {
  float: right;
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

.fa-sort {
  margin-left: 3px;
  margin-right: 3px;
}

#settings {
  padding: 15px;
  position: fixed;
  bottom: 0;
  background-color: #333;
}
</style>
