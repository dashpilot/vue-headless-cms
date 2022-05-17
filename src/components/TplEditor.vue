<template>
<div class="backdrop">
  <div class="modal-screen">

    <div class="row mb-3">
      <div class="col-9">
        <h4 class="float-start">Edit Template</h4>
      </div>
      <div class="col-3">
        <button type="button" class="btn-close float-end" aria-label="Close" @click="closeWindow()"></button>
      </div>
    </div>

    <div id="modal-content">
      <textarea class="form-control" v-model="settings.template"></textarea>
    </div>

  </div>
</div>
</template>

<script>
export default {
  props: ['settings', 'show'],
}
</script>

<style scoped>
textarea {
  height: 450px;
}
</style>
