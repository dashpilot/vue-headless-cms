<template>
<div class="backdrop">
  <div class="modal-screen">

    <div class="row mb-3">
      <div class="col-9">
        <h4 class="float-start">Settings</h4>
      </div>
      <div class="col-3">
        <button type="button" class="btn-close float-end" aria-label="Close" @click="closeWindow()"></button>
      </div>
    </div>

    <div id="modal-content">
      <template v-for="key in Object.keys(settings)">

        <label>{{key.replaceAll('_', ' ')}}</label>
        <input type="text" class="form-control" v-model="settings[key]" />

      </template>
    </div>

  </div>
</div>
</template>

<script>
export default {
  props: ['settings', 'show'],
}
</script>
