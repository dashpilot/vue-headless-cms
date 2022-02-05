<template>

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
      stripTags(text, max) {

        if(text){
        text = text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') : text
        let regex = /(<([^>]+)>)/ig;
        return text.replace(regex, "");
        }else{
          return "&nbsp;";
        }

      }
    }
  }
</script>
