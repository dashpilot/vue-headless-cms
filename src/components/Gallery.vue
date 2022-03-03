<template>
<div>

  <input type="file" :id="'fileInput-'+rand" accept="image/*" @change="uploadImage" style="display: none;">


  <div class="input-group">
    <div class="btn-group">
      <button class="btn btn-outline-dark mb-3" @click="chooseImage()">Upload Image</button>
    </div>
  </div>



  <ul class="list-group mb-3">
    <template v-for="img in gallery">
      <li class="list-group-item">
        <div class="row">
          <div class="col-4">

            <div class="image-box" :style="{ backgroundImage: 'url('+ image_url + img + ')' }"></div>

          </div>
          <div class="col-6">

          </div>
          <div class="col-2 text-end">

            <i class="fas fa-trash-alt" @click="deleteImage(img)"></i>
          </div>
        </div>
      </li>
    </template>
  </ul>


</div>
</template>

<script>
export default {
  data() {
    return {
      rand: Math.floor(Math.random() * 99999999999999999) + 1,
    }
  },
  props: {
    gallery: {
      type: Array,
      default: [],
    },
    id: {
      type: Number,
    },
    save_url: {
      type: String,
    },
    image_url: {
      type: String,
    },
    image_width: {
      type: Number,
      default: 800,
    }
  },
  methods: {
    chooseImage() {
      document.getElementById('fileInput-' + this.rand).click();
    },
    uploadImage(e) {

      const date = new Date().toJSON().slice(0, 10).replaceAll('-', '');
      const filename = date + "-" + Math.floor(Math.random() * 999999999) + ".jpg";


      this.$emit('update', filename, this.id);

      var myapp = this;

      var width = this.image_width;
      var imgUpload = new Image();
      imgUpload.onload = function() {
        var canvas = document.createElement('canvas'),
          ctx = canvas.getContext("2d"),
          oc = document.createElement('canvas'),
          octx = oc.getContext('2d');
        canvas.width = width; // destination canvas size
        canvas.height = canvas.width * imgUpload.height / imgUpload.width;
        var cur = {
          width: Math.floor(imgUpload.width * 0.5),
          height: Math.floor(imgUpload.height * 0.5)
        }
        oc.width = cur.width;
        oc.height = cur.height;
        octx.drawImage(imgUpload, 0, 0, cur.width, cur.height);
        while (cur.width * 0.5 > width) {
          cur = {
            width: Math.floor(cur.width * 0.5),
            height: Math.floor(cur.height * 0.5)
          };
          octx.drawImage(oc, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
        }
        ctx.drawImage(oc, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas.height);
        var base64Image = canvas.toDataURL('image/jpeg')

        console.log(base64Image);


        postData(myapp.save_url, {
            "filename": filename,
            "file": base64Image
          })
          .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call

          });


      }
      imgUpload.src = URL.createObjectURL(e.target.files[0]);

    },
    deleteImage(value) {
      if (confirm("Are you sure you want to delete this image?")) {
        let arr = this.gallery;
        arr = arr.filter(x => x !== value)
        this.$emit('update:gallery', arr);
      }
    }
  }

}

async function postData(url = '', data = {}) {

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
</script>

<style scoped>
.image-box {
  width: 40px;
  height: 40px;
  border: 1px solid #DDD;
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  display: block;
}

.fa-trash-alt {
  margin-top: 10px;
}
</style>
