<template>
<div class="btn-group mt-1 w-100">
  <button class="btn btn-outline-secondary" @click="editor.chain().focus().toggleBold().run()"><i class="fas fa-bold"></i></button>
  <button class="btn btn-outline-secondary" @click="editor.chain().focus().toggleItalic().run()"><i class="fas fa-italic"></i></button>

  <button @click="setLink" class="btn btn-outline-secondary">
    <i class="fas fa-link"></i>
  </button>
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
import Link from '@tiptap/extension-link'

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

  methods: {
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()

        return
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({
          href: url
        })
        .run()
    },
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
        Link.configure({
          openOnClick: false,
        }),
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
