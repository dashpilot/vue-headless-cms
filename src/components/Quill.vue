<template>
<div :id="editorId">
  <QuillEditor theme="snow" :options="options" v-model:content="modelValue" contentType="html" @textChange="updateContent" />
</div>
</template>

<script>
import {
  QuillEditor
} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    QuillEditor
  },
  props: ['modelValue'],
  methods: {
    updateContent() {
      var editor = document.querySelectorAll('#' + this.editorId + ' .ql-editor')[0];
      var content = editor.innerHTML;
      this.$emit('update:modelValue', content);
    }
  },
  watch: {
    modelValue(value) {

      console.log('watched')

      var editor = document.querySelectorAll('#' + this.editorId + ' .ql-editor')[0];
      var content = editor.innerHTML;
      // console.log(content)

      // HTML
      const isSame = content === value

      if (isSame) {
        return
      }

      editor.innerHTML = value;
      this.editorId = "editor-" + Math.floor(Math.random() * 999999999);

    },
  },
  data() {
    return {
      editorId: false,
      options: {
        modules: {
          toolbar: [{
            'header': [1, 2, 3, false]
          }, 'bold', 'italic', 'underline', 'link', {
            'list': 'ordered'
          }, {
            'list': 'bullet'
          }]
        },
        placeholder: '',
        theme: 'snow',
      }
    }
  },
}
</script>

<style>
.ql-toolbar {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.ql-editor {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  height: 100%;
  background-color: white;
  height: 200px;
}

.ql-container {
  margin-bottom: 20px;
}

button.ql-clean {
  display: none !important;
}

.ql-snow .ql-header,
.ql-snow .ql-link {
  margin-right: 25px !important;
}
</style>
