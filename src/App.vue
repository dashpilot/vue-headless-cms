<script setup>
import Editor from './components/Editor.vue'
import Image from './components/Image.vue'
</script>

<template>
<div class="row g-0">
<div class="col-2 col1">

  <img src="img/rocketlogo.png" class="img-fluid rocket" />

  <template v-for="key in Object.keys(data)">
    <template v-if="!key.includes('_')">
      <a @click="setCurKey(key)" :class="{ 'active': curKey == key }">{{key}}</a>
    </template>
  </template>



</div>
<div class="col-3 col2">


  <template v-if="curKey">
    <ul class="list-group">
    <template v-for="(item, i) in data[curKey]">
      <li class="list-group-item" @click="setCurItem(i)" :class="{ 'active2': curItem.id == item.id }">
        <b>{{item.title}}</b><br>
        {{item.subtitle}}
      </li>
    </template>
  </ul>
  </template>
</div>
<div class="col-7 p-4 col3">

  <template v-if="curItem">
      <template v-for="(key, val) in Object.keys(curItem)">

      <template v-if="data._fields[curKey][key] == 'txt'">
          <label>{{key}}</label>
          <input type="text" class="form-control" v-model="curItem[key]">
      </template>

      <template v-if="data._fields[curKey][key] == 'rte'">
          <label>{{key}}</label>
          <Editor v-model="curItem[key]" />
      </template>

      <template v-if="data._fields[curKey][key] == 'txta'">
        <label>{{key}}</label>
        <textarea class="form-control" v-model="curItem[key]"></textarea>
      </template>

      <template v-if="data._fields[curKey][key] == 'img'">
        <label>{{key}}</label>
        <Image :image="curItem[key]" />
      </template>

      <template v-else>

      </template>

    </template>

    <button class="btn btn-primary mt-1">Save</button>
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
      data: {}
    }
  },
  created: function () {

    fetch("/data.json")
      .then(r => r.json())
      .then(data => {
        this.data=data;
        console.log(data);

        // select the first elements
        var defaultKey = Object.keys(data)[0];
        this.curKey = defaultKey;
        this.curItem = data[defaultKey][0];

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
    }
  }

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
  height: 100%;
  background-color: #333;
}

.col1 a{
  color: white !important;
  display: block;
  padding: 10px 20px;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col2 .list-group-item:first-child{
  border-top: 6px solid #333;
}

.list-group-item:hover{
  background-color: #F8F8F8;
  user-select: none;
  cursor: pointer;
}

.col2 .active2{
  background-color: #F8F8F8;
  width: 100.5%;
}

.form-control{
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
  border-radius: 8px;
  padding-left: 30px;
  padding-right: 30px;
  transition: 0.3s;
}

.btn-primary:hover{
  border: 2px solid #8287f9;
  background-color: #8287f9;
  color: white;
}

textarea, .rte{
  height: 200px;
  resize: none;
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

</style>
