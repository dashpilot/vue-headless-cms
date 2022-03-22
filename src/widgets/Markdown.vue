<template>
<div>

  <div>
    <textarea class="form-control mb-0 text-main" v-model="modelValue"></textarea>

    <div class="row">
      <div class="col-6"></div>
      <div class="col-6 text-end">
        <button class="btn btn-outline-dark mb-3 md-button" @click="fullscreen=true"><i class="fas fa-expand"></i></button>
      </div>
    </div>
  </div>

  <template v-if="fullscreen">
    <div class="fullscreen">

      <div class="row" style="height: 45px;">
        <div class="col-md-6">
          <label class="mt-3">Markdown</label>
        </div>
        <div class="col-md-4">
          <label class="mt-3">Preview</label>
        </div>
        <div class="col-md-2 text-end">
          <button type="button" class="btn-close" aria-label="Close" @click="fullscreen=false"></button>
        </div>
      </div>


      <div class="row">
        <div class="col-md-6 md-editor">
          <textarea class="form-control" v-model="modelValue"></textarea>
        </div>
        <div class="col-md-6">
          <div class="markdown-preview">
            <Markdown :source="modelValue" />
          </div>
        </div>
      </div>
    </div>
</template>
</div>
</template>


<script>
import Markdown from 'vue3-markdown-it';

export default {
  components: {
    Markdown
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      fullscreen: false
    }
  }
}
</script>

<style scoped>
textarea.text-main {
  height: 250px;
  border-bottom-right-radius: 0;
}

.md-button,
.md-button:hover {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
}

.fullscreen textarea {
  height: 92%;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 999999999999999999;
  padding: 20px;
  padding-top: 10px;
  background-color: #F8F8F8;
}

.markdown-preview {
  background-color: white;
  height: 92%;
  border: 1px solid #DDD;
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 20px;
}
</style>
