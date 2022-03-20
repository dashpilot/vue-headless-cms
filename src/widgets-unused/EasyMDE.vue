<template>
<textarea :id="editorId"></textarea>
</template>

<script>
import EasyMDE from 'easymde'
import "easymde/dist/easymde.min.css";
export default {
  components: {},

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
      editorId: false,
    }
  },

  methods: {},

  /*
    watch: {
      modelValue(value) {
        console.log(value);
        const isSame = this.editor.value() === value
        if (isSame) {
          return
        }
        this.editor.value(value)
        // this.editorId = "editor-" + Math.floor(Math.random() * 999999999);
      },
    },
    */


  mounted() {
    console.log('mounted')
    this.editor = new EasyMDE({
      spellChecker: false,
      autoDownloadFontAwesome: false
    });

    /*
    var myapp = this;
    setTimeout(() => {
      myapp.editor.value(this.modelValue)
    }, 10)
    */

  },

  beforeUnmount() {
    // this.editor.destroy()
  },
}
</script>
