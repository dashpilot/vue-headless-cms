<template>
<div class="backdrop">
  <div class="modal-screen">


    <div id="modal-content">

      <div class="row">

        <div class="col-3 line">


          <a @click="activeTab = 'settings'" class="tab" :class="{ 'active': activeTab == 'settings'}">Settings</a>

          <template v-if="data.ui_settings.edit_content_types">
            <a @click="activeTab = 'types'" class="tab" :class="{ 'active': activeTab == 'types'}">Content Types</a>
          </template>
          <template v-if="data.ui_settings.edit_template">
            <a @click="activeTab = 'template'" class="tab" :class="{ 'active': activeTab == 'template'}">Template Editor</a>
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

          <template v-if="activeTab == 'template'">
            <TplEditor v-model:settings="data.settings" v-model:show="showTpl" />
          </template>

        </div>
      </div>


    </div>

  </div>
</div>
</template>

<script>
import ContentTypes from './ContentTypes.vue'
import TplEditor from './TplEditor.vue'

export default {
  components: {
    ContentTypes,
    TplEditor
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
.col-3,
.col-9 {
  min-height: 500px;
}
</style>
