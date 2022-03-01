<script setup>
import Editor from './Editor.vue'
import Image from './Image.vue'
</script>

<template>
<template v-for="(key, val) in Object.keys(config.fields.posts)">

  <template v-if="config.fields.posts[key] == 'text'">
    <label>{{key}}</label>
    <input type="text" class="form-control" v-model="curItem[key]">
  </template>

  <template v-if="config.fields.posts[key] == 'text-disabled'">
    <label>{{key}}</label>
    <input type="text" class="form-control" v-model="curItem[key]" disabled>
  </template>

  <template v-if="config.fields.posts[key] == 'richtext'">
    <label>{{key}}</label>
    <Editor v-model="curItem[key]" />
  </template>

  <template v-if="config.fields.posts[key] == 'textarea'">
    <label>{{key}}</label>
    <textarea class="form-control" v-model="curItem[key]"></textarea>
  </template>

  <template v-if="config.fields.posts[key] == 'image'">
    <label>{{key}}</label>
    <Image v-model:image="curItem[key]" :save_url="config.settings.image_save_url" />
  </template>

  <template v-if="config.fields.posts[key].includes('dropdown')">
    <label>{{key}}</label>
    <select class="form-select w-25" v-model="curItem[key]" @change="changeCat(curItem[key]);">
      <template v-for="item in data.categories">
        <option :value="item.slug">{{item.title}}</option>
      </template>
    </select>
  </template>
</template>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    config: {
      type: Object,
      default: {}
    },
    curItem: {
      type: Object,
      default: {}
    },
    curCat: {
      type: String,
      default: ''
    },
    catItems: {
      type: Array,
      default: []
    }
  },
  methods: {
    changeCat(cat) {
      this.$emit('update:curCat', cat);
      this.$emit('update:catItems', this.data.posts.filter(x => x.category == cat));
    }
  }
}
</script>
