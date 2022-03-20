<template>
<div class="container">
  <markdown-editor :options="options"></markdown-editor>
</div>
</template>


<script>
export default {

  data() {
    return {
      // default options, see more options at: http://codemirror.net/doc/manual.html#config
      options: {
        // lineNumbers: true,
        // styleActiveLine: true,
        // styleSelectedText: true,
        // lineWrapping: true,
        // indentWithTabs: true,
        // tabSize: 2,
        // indentUnit: 2
      }

    }

  }

}
</script>
