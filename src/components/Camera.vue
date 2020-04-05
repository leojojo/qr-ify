<template>
  <div class="hoge">
    <h2>{{ msg }}</h2>
    <p>{{ msg }}</p>
    <div class="container">
      <div class="video-container">
        <video id="video" ref="video" autoplay></video>
      </div>
      <button id="snap" v-on:click="capture()">写</button>
      <canvas id="canvas" ref="canvas" width="150px" height="150px"></canvas>
      <ul>
        <li v-for="c in captures" :key="c">
          <img v-bind:src="c" />
        </li>
      </ul>
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
  margin: calc(#{$button-size} / 5);
  font-weight: bold;
}
ul {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: calc(#{$video-size} / 10);
  width: 90vw;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  margin: 0;
  padding: 0;
  li {
    list-style: none;
    scroll-snap-align: start;
    img {
      width: $image-size;
      height: $image-size;
    }
  }
}
</style>
