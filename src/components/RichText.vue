<template>
<textarea class="form-control rich-text-editor" :id="'rte-'+key" v-model="modelValue"></textarea>
</template>
<script>
  export default {
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      key:{
        type: String,
        default: '',
      }
    },

    data() {
      return {

      }
    },

    methods: {
      handleKeyUp(e){
        let value = document.querySelector('.rich-text-editor-view').innerHTML;
        // html = value;
      }
    },


    watch: {
      modelValue(value) {

      },
    },

    mounted() {

      console.log('mounted')

      const config = {
          classes: ['rich-text-editor'],
          tools: ['b', 'i', 'u', 'a', 'x'], // visible tool(s)
          text: {
            b: ['Bold', 'B', '⌘+B'],
            i: ['Italic', 'I', '⌘+I'],
            u: ['Underline', 'U', '⌘+U'],
            a: ['Link', 'A', '⌘+L'],
            x: ['Source', '&#x22ef;', '⌘+⇧+X']
          },
          tidy: true, // tidy HTML output?
          enter: true, // set to `false` to automatically submit the closest form on enter key press
          x: function(e, node) {}, // on mode change (view/source); set to `false` to disable the source view
          update: function(e, node) {} // on view/source update
        };
        new RTE(document.getElementById('rte-'+this.key), config);
        document.querySelector('.rich-text-editor-view').addEventListener('keyup', function(e){
          this.handleKeyUp(e);
        })

    },
  }

  </script>

  <style>

  /* --- Rich Text Editor --- */

.rich-text-editor,
.rich-text-editor-tools,
.rich-text-editor-view,
.rich-text-editor-source {
    display: block;
    margin: 0;
    padding: 0;
    background: none;
    font: inherit;
    color: inherit;
    border: 0;
    outline: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.rich-text-editor ::-webkit-input-placeholder {
    opacity: 0.5;
    color: inherit;
}

.rich-text-editor ::-moz-placeholder {
    opacity: 0.5;
    color: inherit;
}

.rich-text-editor ::placeholder {
    opacity: 0.5;
    color: inherit;
}

.rich-text-editor {
    border: 1px solid #ced4da;
    background: #fff;
    color: #000;
    line-height: 1.5em;
    position: relative;
    border-radius: 4px;
    margin-bottom: 25px !important;
}

.rich-text-editor-tools {
    font: normal normal 100%/2em "Times New Roman", Times, serif;
    text-align: center;
    -webkit-transition: all 0.25s ease-out 0.25s;
    -moz-transition: all 0.25s ease-out 0.25s;
    transition: all 0.25s ease-out 0.25s;
    opacity: 0;
    visibility: hidden;
}

.rich-text-editor-tools::after {
    content: "";
    display: table;
    clear: both;
}

.rich-text-editor-tools a {
    display: block;
    float: left;
    width: 2em;
    height: 2em;
    color: black !important;
    text-decoration: none;
}

.rich-text-editor-tools svg {
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    line-height: 1em;
    font-weight: normal;
    font-style: normal;
    text-decoration: none;
    fill: currentColor;
}

.rich-text-editor-tools a:focus,
.rich-text-editor-tools a:hover {
    background: #eff;
}

.rich-text-editor-view {
    display: block;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    padding: 1em;
    min-height: 1.5em;
    overflow: auto;
    cursor: text;
}

.rich-text-editor.expand .rich-text-editor-view {
    min-height: 250px;
    max-height: 250px;
    overflow-y: auto;
}

.rich-text-editor:hover .rich-text-editor-tools,
.rich-text-editor-view:focus+.rich-text-editor-source+.rich-text-editor-tools,
.rich-text-editor-source:focus+.rich-text-editor-tools {
    -webkit-transition-delay: 0.125s;
    -moz-transition-delay: 0.125s;
    transition-delay: 0.125s;
    opacity: 1;
    visibility: visible;
}

.rich-text-editor.source .rich-text-editor-tools a {
    display: none;
}

.rich-text-editor.source .rich-text-editor-tools .rich-text-editor-t\:x {
    display: block;
}

.rich-text-editor-source {
    width: 100%;
    min-height: 8em;
    background: #def;
    font: inherit;
    font-family: "Courier New", Courier, "Nimbus Mono L", Monospace;
    padding: 0.25em 0.5em;
    overflow: auto;
    resize: none;
    display: block;
}


/* hide object but maintain focus state */

.rich-text-editor.view .rich-text-editor-source {
    width: 0 !important;
    height: 0 !important;
    min-width: 0 !important;
    min-height: 0 !important;
    border: 0 !important;
    overflow: hidden !important;
    position: absolute !important;
    top: 1em;
    /* same with `padding-top` of `.rich-text-editor-view` */
    left: 1em;
    /* same with `padding-left` of `.rich-text-editor-view` */
    margin: 0 !important;
    padding: 0 !important;
    background: none !important;
    color: transparent !important;
    box-shadow: none !important;
    opacity: 0 !important;
}

.rich-text-editor.source .rich-text-editor-view {
    display: none;
}


/* dialog */

.rich-text-editor-dialog {
    background: inherit;
    border: inherit;
    border-width: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 2em;
    left: 0;
    padding: 1em;
    display: none;
}

.rich-text-editor-dialog input {
    display: inline-block;
    vertical-align: middle;
    width: 12em;
    background: none;
    border: 0;
    outline: 0;
    border-bottom: 2px solid;
    border-color: inherit;
    font: inherit;
    color: #00f;
    margin: 0;
    padding: 0 0 0.25em;
}

.rich-text-editor.dialog .rich-text-editor-dialog {
    display: block;
}


/* error state */

.rich-text-editor.error {
    border-color: #f00;
}


/* editor placeholder */

.rich-text-editor-view:empty::before {
    content: attr(placeholder);
    opacity: 0.4;
}

.rich-text-editor-view:focus::before {
    display: none;
}


/* editor content */

.rich-text-editor-view a {
    color: #00f;
    text-decoration: underline;
}

.rich-text-editor-view mark {
    background: #ff0;
    color: inherit;
}

.rich-text-editor-view abbr {
    text-decoration: none;
    border-bottom: 1px dotted;
}

.rich-text-editor-view b,
.rich-text-editor-view strong {
    font-weight: bold;
}

.rich-text-editor-view i,
.rich-text-editor-view em,
.rich-text-editor-view dfn,
.rich-text-editor-view var {
    font-style: italic;
}

.rich-text-editor-view u,
.rich-text-editor-view ins {
    text-decoration: underline;
}

</style>
