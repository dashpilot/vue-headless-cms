<template>
  <div>
    <button class="btn btn-outline-dark mb-3" @click="chooseImage()">Upload Image</button>
    <input type="file" id="fileInput" accept="image/*" @change="uploadImage" style="display: none;">

<!-- {{image}} -->

  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: '',
    },
  },
  methods: {
     chooseImage(){
       document.getElementById('fileInput').click();
     },
     uploadImage(e){
       // document.getElementById('fileInput').addEventListener('change', function(e) {

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

           // document.getElementById('image').src = base64Image;


         }
         imgUpload.src = URL.createObjectURL(e.target.files[0]);
       // });


    }
  }

}
</script>
