<template>
  <div class="hoge">
    <h2>{{ msg }}</h2>
    <p>{{ msg }}</p>
    <div class="container">
      <div class="video-container">
        <video id="video" ref="video" autoplay></video>
      </div>
      <canvas id="canvas" ref="canvas" width="150px" height="150px"></canvas>
      <ul id="image-list">
        <li v-for="c in captures" :key="c">
          <img v-bind:src="c" />
        </li>
        <li v-for="i in placehold(captures)" :key="i">
          <div class="blank"></div>
        </li>
      </ul>
      <button id="snap" v-on:click="capture()">写</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Camera",
  props: {
    msg: String
  },
  data() {
    return {
      video: {},
      canvas: {},
      captures: []
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
    placehold(captures) {
      const c = Object.keys(captures);
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
    }
  }
};
</script>

<style scoped lang="scss">
.hoge {
  h2 {
    color: lighten($primary, 10%);
  }
}
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
