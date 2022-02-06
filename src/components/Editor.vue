<template>
<div class="btn-group mt-1 w-100">
  <button class="btn btn-outline-secondary" @click="editor.chain().focus().toggleBold().run()">Bold</button>
  <button class="btn btn-outline-secondary" @click="editor.chain().focus().toggleItalic().run()">Italic</button>
  <button class="btn btn btn-outline-secondary w-75" disabled></button>
</div>

<editor-content :editor="editor" class="mb-3" />
</template>

<script>
import {
  Editor,
  EditorContent
} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
      ],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>
