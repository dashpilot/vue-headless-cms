<template>
<div>



  <v-md-editor v-model="modelValue" height="400px" left-toolbar="h bold italic strikethrough link quote"></v-md-editor>



</div>
</template>


<script>
// import Markdown from 'vue3-markdown-it';




export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.v-md-editor {
  box-shadow: none;
  border: 1px solid #ced4da;
}
</style>
