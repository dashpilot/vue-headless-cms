<template>
<h4 class="mb-3">Template Editor</h4>


<prism-editor class="my-editor" v-model="settings.template" :highlight="highlighter" line-numbers></prism-editor>
</template>



<script>
// import Prism Editor
import {
  PrismEditor
} from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import {
  highlight,
  languages
} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

export default {
  components: {
    PrismEditor,
  },
  props: ['settings', 'show'],
  /*
  data: () => ({
    code: "console.log('hello world')"
  }),
  */
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
  },
};
</script>

<style>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  height: 600px;
  overflow: hidden;
  overflow-y: auto;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
