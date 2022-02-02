<script setup>
import Editor from './components/Editor.vue'
import Image from './components/Image.vue'
</script>

<template>
<div class="row g-0">
<div class="col-2 col1">

  <!-- <img src="img/rocketlogo.png" class="img-fluid rocket" /> -->

  <template v-for="key in Object.keys(data)">
    <template v-if="!key.includes('_')">
      <a @click="setCurKey(key)" :class="{ 'active': curKey == key }">{{key}}</a>
    </template>
  </template>

</div>
<div class="col-3 col2">

  <div class="filter">
    <a @click="addItem()" class="btn btn-outline-dark"><i class="fa fa-plus"></i></a>

<template v-if="curKey !== 'pages' && curKey !== 'categories'">
    <select class="form-select mb-0 w-50 float-end" @change="filter($event.target.value)">
      <option value="all">Show: all</option>
      <template v-for="item in data.pages">
        <option :value="item.id">{{item.title}}</option>
      </template>
    </select>
  </template>

  </div>

  <template v-if="curKey">
    <ul class="list-group">
    <template v-for="(item, i) in data[curKey]">
      <li class="list-group-item" @click="setCurItem(i)" :class="[{'active2': curItem.id == item.id}, item.page]">
        <b>{{item.title}}</b><br>
        <span v-html="shorten(stripTags(item.body), 60)"></span>
      </li>
    </template>
  </ul>
  </template>

</div>
<div class="col-7 p-4 col3">

  <template v-if="curItem">
      <template v-for="(key, val) in Object.keys(config.fields[curKey])">


      <template v-if="config.fields[curKey][key] == 'text'">
          <label>{{key}}</label>
          <input type="text" class="form-control" v-model="curItem[key]">
      </template>

      <template v-if="config.fields[curKey][key] == 'richtext'">
          <label>{{key}}</label>
          <Editor v-model="curItem[key]" />
      </template>

      <template v-if="config.fields[curKey][key] == 'textarea'">
        <label>{{key}}</label>
        <textarea class="form-control" v-model="curItem[key]"></textarea>
      </template>

      <template v-if="config.fields[curKey][key] == 'image'">
        <label>{{key}}</label>
        <Image v-model:image="curItem[key]" :save_url="config.settings.image_save_url" />
      </template>

      <template v-if="config.fields[curKey][key].includes('dropdown')">
        <label>{{key}}</label>

        <select class="form-select w-25">
          <template v-for="item in data[getTable(config.fields[curKey][key])]">
            <option :value="item.id">{{item.title}}</option>
          </template>
        </select>

      </template>

      <template v-else>

      </template>

    </template>

    <button class="btn btn-primary mt-1" @click="save()">Save</button>
  </template>

</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      curKey: false,
      curItem: false,
      data: {},
      config: {}
    }
  },
  created: function () {

    fetch("/config.json")
      .then(r => r.json())
      .then(config => {

      console.log('config loaded');
      this.config = config;

    fetch(config.settings.data_url)
      .then(r => r.json())
      .then(data => {
        this.data=data;
        console.log(data);
        console.log('data loaded');

        // select the first elements
        var defaultKey = Object.keys(data)[0];
        this.curKey = defaultKey;
        this.curItem = data[defaultKey][0];

      });

      });

  },
  methods: {
    setCurKey(key){
      this.curKey = key;
      this.curItem = this.data[key][0];
    },
    setCurItem(i){
      let key = this.curKey;
      this.curItem = this.data[key][i];
    },
    getTable(key){
      return key.split('_')[1];
    },
    addItem(){
      let key = this.curKey;
      let fields = this.config.fields[key];
      console.log(fields)
      var newItem = {};
      newItem.id = key+"-"+Math.floor(Math.random() * 999999999);
      Object.keys(fields).forEach((x) => {
        if(x=='title'){
          newItem[x] = "Untitled";
        }else if(x=='body'){
          newItem[x] = "Lorem ipsum dolor site amet";
        }else{
          newItem[x] = "";
        }
      })
      this.data[key].unshift(newItem);
      this.curItem = newItem;
    },
    save(){
      console.log(this.data);

      postData(this.config.settings.save_url, this.data)
        .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
        });
    },
    shorten(text, max) {
      if(text){
      return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') : text
      }else{
        return "&nbsp;";
      }
    },
    stripTags(text) {
      if(text){
      let regex = /(<([^>]+)>)/ig;
      return text.replace(regex, "");
      }else{
        return "&nbsp;";
      }
    },
    filter(value){
      if(value=='all'){
        document.querySelectorAll('.col2 .list-group-item').forEach((el) => {
          el.style.display = 'block';
        })
      }else{
        document.querySelectorAll('.col2 .list-group-item').forEach((el) => {
          el.style.display = 'none';
        })
        document.querySelectorAll('.'+value).forEach((el) => {
          el.style.display = 'block';
        })
      }
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
html, body{
  height: 100%;
}

body{
  background-color: #F8F8F8;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.row{
  height: 100%;
}

.col1{
  padding-top: 64px;
  height: 100%;
  background-color: #333;
}

.col1 a{
  color: white !important;
  display: block;
  padding: 13px 20px;
  text-transform: capitalize;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.col1 a:hover{
  background-color: #656BF7;
  user-select: none;
  cursor: pointer;
}

.active{
  background-color: #656BF7;
}

.col2{
  background-color: white;
  border-right: 1px solid #DDD;
}

.col2 .list-group-item{
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

.list-group-item:hover{
  background-color: #F8F8F8;
  user-select: none;
  cursor: pointer;
}

.col2 .active2{
  background-color: #F8F8F8;
  width: 100.5%;
  border-left: 5px solid #656BF7;
}

.col2{
  overflow-x: hidden;
  overflow-y: auto;
}

.form-control, .form-select{
  margin-bottom: 15px;
}

label{
  text-transform: uppercase;
  font-size: 15px;
  line-height: 15px;
  letter-spacing: 0.05em;
  margin-bottom: 5px;
}

.rocket{
  width: 100px;
  margin-bottom: 10px;
  padding: 20px;
}

.btn-primary{
  border: 2px solid #666BEF;
  background-color: #666BEF;
  color: white;
  border-radius: 4px;
  padding-left: 30px;
  padding-right: 30px;
  transition: 0.3s;
}

.btn-primary:hover{
  border: 2px solid #8287f9;
  background-color: #8287f9;
  color: white;
}

textarea{
  height: 100px;
  resize: none;
}

.rte{
  height: 200px;
}

.ProseMirror{
  min-height: 190px !important;
  border: 1px solid #DDD;
  padding: 15px;
  background-color: white;
  border-radius: 6px;
  outline: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.btn-outline-secondary{
  border: 1px solid #DDD;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 0;
}

.btn-outline-secondary:hover{
  background-color: #EEEEEE;
  border: 1px solid #DDD;
  border-bottom: 0;
  color: black;
}

.btn-outline-dark{
  border: 1px solid #DDD;
}

.btn-outline-dark:hover{
  border: 1px solid #DDD;
  background-color: #EEEEEE;
  color: black;
}

.filter{
  padding: 10px 10px;
  border-bottom: 6px solid #333;
  background-color: white;
  position: fixed;
  z-index: 999;
  width: 25%;
  border-right: 1px solid #DDD;
}

.col1{
  position: fixed;
  left: 0;
}

.col2{
  position: fixed;
  left: 16.67%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

.col2 .list-group:nth-child(2) .list-group-item{
  top: 63px;
}

.col3{
  position: fixed;
  right: 0;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

</style>
