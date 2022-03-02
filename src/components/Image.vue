<template>
<div>

  <input type="file" :id="'fileInput-'+rand" accept="image/*" @change="uploadImage" style="display: none;">

  <div class="input-group mb-2">
    <div class="btn-group">
      <button class="btn btn-outline-dark mb-3" @click="chooseImage()">Upload Image</button>
      <template v-if="modelValue">
        <button class="btn btn-outline-dark mb-3" @click="$emit('update:modelValue', '')"><i class="fas fa-times"></i></button>
      </template>
    </div>
    <!-- <input type="text" class="form-control" v-model="image" @input="this.$emit('update:modelValue', $event.target.value)">-->
  </div>


  <!-- <img id="preview"> -->
</div>
</template>

<script>
export default {
  data() {
    return {
      rand: Math.floor(Math.random() * 99999999999999999) + 1
    }
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    save_url: {
      type: String,
    }
  },
  methods: {
    chooseImage() {
      document.getElementById('fileInput-' + this.rand).click();
    },
    uploadImage(e) {

      const date = new Date().toJSON().slice(0, 10).replaceAll('-', '');
      const filename = date + "-" + Math.floor(Math.random() * 999999999) + ".jpg";
      this.$emit('update:modelValue', filename);

      var myapp = this;

      var width = 800;
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


        // document.getElementById('preview').src=base64Image;

        // document.getElementById('image').src = base64Image;


        postData(myapp.save_url, {
            "filename": filename,
            "file": base64Image
          })
          .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call

          });


      }
      imgUpload.src = URL.createObjectURL(e.target.files[0]);

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
