<template>
  <div class="hoge">
    <h2>{{ msg }}</h2>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Camera",
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss">
.hoge {
  h2 {
    color: lighten($primary, 10%);
  }
}
</style>
