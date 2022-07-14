<template>
<template v-if="editor">

  <div class="btn-group mt-1 w-100">

    <template v-if="settings.rte_buttons.includes('bold')">
      <button class="btn btn-outline-secondary" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"><i class="fas fa-bold"></i></button>
</template>

<template v-if="settings.rte_buttons.includes('italic')">
<button class="btn btn-outline-secondary" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }"><i class=" fas fa-italic"></i></button>
</template>

<template v-if="settings.rte_buttons.includes('link')">
<button @click="setLink" class="btn btn-outline-secondary" :class="{ 'is-active': editor.isActive('link') }">
  <i class=" fas fa-link"></i>
</button>
</template>

<template v-if="settings.rte_buttons.includes('list')">
<button class="btn btn-outline-secondary" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
  <i class=" fas fa-list-ul"></i>
</button>
</template>

<template v-if="settings.rte_buttons.includes('h1')">
<button class="btn btn-outline-secondary" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
  <strong>H1</strong>
</button>
</template>

<template v-if="settings.rte_buttons.includes('h2')">
<button class="btn btn-outline-secondary" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
  <strong>H2</strong>
</button>
</template>

<template v-if="settings.rte_buttons.includes('h3')">
<button class="btn btn-outline-secondary" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
  <strong>H3</strong>
</button>
</template>

    <button class="btn btn btn-outline-secondary w-50" disabled></button>
  </div>

  <editor-content :editor="editor" class="mb-3" />
</template>
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
    settings: {
      type: Object,
    }
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

<style>
.is-active {
  background-color: #EEE;
}

blockquote {
  border-left: 5px solid #8391F1;
  padding-left: 10px;
}</style>
