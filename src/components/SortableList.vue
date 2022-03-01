<template>
<div class="backdrop">
  <div class="modal-screen">

    <h4 class="float-start">Manage {{title}}</h4>
    <button type="button" class="btn-close float-end" aria-label="Close" @click="closeWindow()"></button>
    <div class="clear mt-5"></div>

    <div id="sortable">
      <ul class="list-group">
        <template v-for="(item, i) in items">
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

  </div>
</div>
</template>

<script>
export default {
  created: function() {
    // this.enableSortable()
  },
  props: ['items', 'data', 'show', 'title'],
  data() {
    return {
      sorting: false
    }
  },
  methods: {
    deleteItem(id) {

      if (confirm('Are you sure you want to delete this item?')) {
        this.items.splice(this.items.findIndex(function(x) {
          return x.id === id;
        }), 1);
        console.log(this.items)

        if (this.title == 'Posts') {
          // propagate to the master data
          this.data.posts.splice(this.data.posts.findIndex(function(x) {
            return x.id === id;
          }), 1);
        }
      }

    },
    moveUp(id, i) {
      this.sorting = id;

      setTimeout(() => {
        let newIndex = i - 1;
        if (i > 0) {
          this.array_move(this.items, i, newIndex)
        }
      }, 200);


      /*
            if (this.title == 'Posts') {
              setTimeout(() => {
                let newIndex = i - 1;
                if (i > 0) {
                  this.array_move(this.data.posts, i, newIndex)
                }
              }, 200);
            }
            */

    },
    moveDown(id, i) {
      this.sorting = id;

      setTimeout(() => {
        let newIndex = i + 1;
        if (this.items.length - 1 !== i) {
          this.array_move(this.items, i, newIndex)
        }
      }, 200);

      /*
            if (this.title == 'Posts') {
              setTimeout(() => {
                let newIndex = i + 1;
                if (this.data.posts.length - 1 !== i) {
                  this.array_move(this.data.posts, i, newIndex)
                }
              }, 200);
            }
            */

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
    },
    closeWindow() {
      this.$emit('update:show', false);
    }
  }
}
</script>

<style scoped>
.margin-right {
  margin-right: 15px;
  margin-top: 5px;
}

.list-group-item {
  transition: all 0.4s ease-out;
}

.sorting {
  background-color: #FDF3D1;
}

.fas:hover {
  color: #777;
  cursor: pointer;
}

.fa-trash:hover {
  color: #CF5543;
  cursor: pointer;
}

#sortable {
  height: 90%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
