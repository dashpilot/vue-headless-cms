<template>
  <div id="sortable">
<ul class="list-group">
  <template v-for="(item, i) in catItems">
    <li class="list-group-item text-truncate" :class="{ 'sorting': sorting == item.id }">
      <div class="row g-0 d-flex">
        <div class="col-1">
          <div>
            <i class="fas fa-chevron-up" @click="moveUp(item.id, i)"></i>
          </div>
          <div>
          <i class="fas fa-chevron-down" @click="moveDown(item.id, i)"></i>
          </div>
        </div>
        <div class="col-10 text-truncate justify-content-center align-self-center">
          {{item.title}}
        </div>
        <div class="col-1 mt-1 justify-content-center align-self-center">
          <i class="fas fa-trash float-end" @click="deleteItem(item.id)"></i>
        </div>
      </div>
    </li>
  </template>
</ul>
</div>
</template>

<script>
  export default {
    created: function () {
      // this.enableSortable()
    },
    props: {
      catItems: {
        type: Array,
        default: [],
      }
    },
    data() {
      return {
        sorting: false
      }
    },
    methods: {
      deleteItem(id){
        if(confirm('Are you sure you want to delete this item?')){
          this.catItems.splice(this.catItems.findIndex(function(x){
              return x.id === id;
          }), 1);
          console.log(this.catItems)
        }
      },
      moveUp(id, i){
        this.sorting = id;

        setTimeout(() => {
          let newIndex = i-1;
          if(i > 0){
          this.array_move(this.catItems, i, newIndex)
          }
        }, 200);
      },
      moveDown(id, i){
        this.sorting = id;

        setTimeout(() => {
          let newIndex = i+1;
          if(this.catItems.length-1 !== i){
          this.array_move(this.catItems, i, newIndex)
          }
        }, 200);
      },
      array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
      }
    }
  }
</script>

<style scoped>
.margin-right{
  margin-right: 15px;
  margin-top: 5px;
}

.list-group-item{
  transition: all 0.4s ease-out;
}

.sorting{
  background-color: #FDF3D1;
}

.fas:hover{
  color: #777;
  cursor: pointer;
}

.fa-trash:hover{
  color: #CF5543;
  cursor: pointer;
}

#sortable{
  height: 90%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
