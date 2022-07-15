<template>
<div class="mb-3">



  <v-md-editor v-model="modelValue" height="400px" left-toolbar="h bold italic strikethrough link quote" @change="updateText"></v-md-editor>


</div>
</template>


<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    }
  },
  methods: {
    updateText(text, html) {
      console.log(text)
      this.$emit('update:modelValue', text)
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
