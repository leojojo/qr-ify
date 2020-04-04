<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Camera msg="hogehoge" />
  </div>
</template>

<script>
import Camera from "@/components/Camera.vue";

export default {
  name: "About",
  components: {
    Camera
  }
};
</script>
