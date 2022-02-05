<template>
  <template v-for="item in catItems">
  <li class="list-group-item" @click="setCurItem(item.id)" :class="{'active2': curItem.id == item.id}">
    <b>{{item.title}}</b><br>
    <span v-html="shorten(stripTags(item.body), 60)"></span>
  </li>
</template>
</template>

<script>
  export default {
    props: {
      catItems: {
        type: Array,
        default: []
      },
      curItem: {
        type: Object,
        default: {}
      }
    },
    methods: {
      setCurItem(id){
        // this.curItem = this.$props.catItems.filter(x => x.id == id)[0];
        this.$emit('update:curItem', this.$props.catItems.filter(x => x.id == id)[0])
      },
      shorten(text, max) {
        if(text){
        return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') : text
        }else{
          return "&nbsp;";
        }
      },
      stripTags(text) {

        if(text){
        let regex = /(<([^>]+)>)/ig;
        return text.replace(regex, "");
        }else{
          return "&nbsp;";
        }

      }
    }
  }
</script>
