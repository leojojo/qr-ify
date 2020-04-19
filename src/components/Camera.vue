<template>
  <div class="container">
    <div class="video-container">
      <video id="video" ref="video" autoplay></video>
    </div>
    <canvas id="canvas" ref="canvas" width="150px" height="150px"></canvas>
    <ul id="image-list" ref="imageList">
      <li v-for="c in captures" :key="c">
        <img v-bind:src="c" />
      </li>
      <li v-for="i in placehold()" :key="i">
        <div class="blank"></div>
      </li>
    </ul>
    <button id="snap" v-on:click="capture()">写</button>
    <button id="snap" v-on:click="getPhotos()">雲</button>
  </div>
</template>

<script>
import { Storage } from "aws-amplify";
export default {
  name: "Camera",
  props: {
    msg: String
  },
  data() {
    return {
      video: {},
      canvas: {},
      captures: [],
      unsent: false,
      s3DAta: []
    };
  },
  mounted() {
    this.video = this.$refs.video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream;
        this.video.play();
      });
    }
  },
  methods: {
    placehold() {
      const c = Object.keys(this.captures);
      const n = 6;
      if (c === undefined) {
        return n;
      } else if (c.length >= n) {
        return 0;
      } else {
        return n - c.length;
      }
    },
    capture() {
      const videoSize = this.video.videoHeight;
      const imageSize = 150;
      this.canvas = this.$refs.canvas;
      this.canvas
        .getContext("2d")
        .drawImage(
          this.video,
          (videoSize - imageSize) / 2,
          0,
          videoSize,
          videoSize,
          0,
          0,
          imageSize,
          imageSize
        );
      this.captures.push(this.canvas.toDataURL("image/png"));
      this.unsent = true;
    },
    uploadPhotos() {
      if (this.captures.length !== 0) {
        this.$refs.imageList.children.forEach((li, i) => {
          const filename = Date.now() + i;
          const imageData = li.firstElementChild.src;
          const access = { level: "protected", contentType: "image/png" };
          Storage.put(filename, imageData, access)
            .then(result => {
              console.log("key: " + result.key);
              this.clearPhotos();
            })
            .catch(err => console.error("uploadPhotos error: ", err));
        });
      }
    },
    clearPhotos() {
      this.captures = [];
      this.unsent = false;
    },
    getPhotos() {
      Storage.list("", { level: "protected" })
        .then(imgs => {
          imgs.forEach(img => {
            Storage.get(img.key, { level: "protected", download: true })
              .then(result => {
                console.log(result);
                const link = document.createElement("a");
                link.href = result.Body;
                link.download = img.key;
                link.click();
              })
              .catch(err => console.error(err));
          });
        })
        .catch(err => console.error("getPhotos error: ", err));
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 30px;
}
.video-container {
  justify-self: center;
  display: flex;
  justify-content: center;
  width: $video-size;
  height: $video-size;
  object-fit: cover;
  overflow: hidden;
  background-color: #000000;
}
#canvas {
  display: none;
}
button {
  justify-self: center;
  width: $button-size;
  height: $button-size;
  border-radius: 50%;
  margin: ($button-size / 5);
  font-weight: bold;
}
#image-list {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: $image-gap;
  width: ($video-size - ($video-size % $image-size));
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  margin: 15px 0;
  padding: 0;
  li {
    list-style: none;
    scroll-snap-align: center;
    &:first-child {
      width: ($image-size + $image-gap / 2);
      text-align: right;
    }
    &:last-child {
      width: ($image-size + $image-gap / 2);
      text-align: left;
    }
    img,
    div {
      display: inline-block;
      width: $image-size;
      height: $image-size;
    }
    .blank {
      background-color: #777;
    }
  }
}
</style>
