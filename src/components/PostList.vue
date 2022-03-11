<template>
<ul class="list-group">
  <template v-for="item in posts">
    <li class="list-group-item" @click="setCurItem(item.id)" :class="{'active2': curpost.id == item.id}">
      <template v-if="!item.draft">
        <template v-if="item.title !== ''">
          <b>{{item.title}}</b><br>
          <span v-html="stripShorten(item.body, 60)"></span>
        </template>
        <template v-if="item.title == ''">
          <b class="grey">Untitled</b><br>
          <span class="grey">(No content)</span>
        </template>
      </template>
      <template v-else>
        <b class="grey">{{item.title}}</b><br>
        <span class="grey">(draft)</span>
      </template>
    </li>
  </template>
</ul>
</template>

<script>
export default {
  props: ['posts', 'curpost'],
  methods: {
    setCurItem(id) {

      let curPost = this.$props.posts.filter(x => x.id == id)[0];
      // let curIndex = this.$props.posts.findIndex(x => x.id == id);
      // console.log('index ' + curIndex)
      this.$emit('update:curpost', curPost)
    },
    stripShorten(text, max) {

      if (text) {
        text = text && text.length > max ? text.slice(0, max).split(' ').slice(0, -1).join(' ') : text
        let regex = /(<([^>]+)>)/ig;
        return text.replace(regex, "");
      } else {
        return "&nbsp;";
      }

    }
  }
}
</script>

<style scoped>
.grey {
  color: #777;
}
</style>
