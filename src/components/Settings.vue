<template>
<div class="backdrop">
  <div class="modal-screen-medium">


    <div id="modal-content">

      <div class="row">

        <div class="col-3 line">


          <a @click="activeTab = 'settings'" class="tab" :class="{ 'active': activeTab == 'settings'}">Settings</a>

          <template v-if="data.ui_settings.edit_content_types">
            <a @click="activeTab = 'types'" class="tab" :class="{ 'active': activeTab == 'types'}">Content Types</a>
          </template>


        </div>
        <div class="col-9">

          <button type="button" class="btn-close float-end" aria-label="Close" @click="closeWindow()"></button>

          <template v-if="activeTab == 'settings'">

            <h4 class="mb-3">Settings</h4>

            <template v-for="key in Object.keys(settings)">

              <template v-if="key !== 'template'">
                <label>{{key.replaceAll('_', ' ')}}</label>
                <input type="text" class="form-control" v-model="settings[key]" />
              </template>

            </template>

          </template>


          <template v-if="activeTab == 'types'">
            <ContentTypes v-model:types="data.content_types" v-model:show="showTypes" />
          </template>



          <div class="text-end">
            <button class="btn btn-primary mt-3" @click="closeWindow()">Ok</button>
          </div>

        </div>
      </div>


    </div>

  </div>
</div>
</template>

<script>
import ContentTypes from './ContentTypes.vue'

export default {
  components: {
    ContentTypes
  },
  props: ['data', 'settings', 'show'],
  data() {
    return {
      activeTab: 'settings'
    }
  }
}
</script>

<style scoped>
.tab {
  display: block;
  background-color: #F8F8F8;
  padding: 10px;
  color: black;
  margin-bottom: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
}

.tab.active {
  background-color: #EEE;
}

.line {
  border-right: 1px solid #EEE;
}

.row,
.col-2,
.col-10 {
  min-height: 400px;
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
</style>
