<template>
  <div class="result">
    <h1>Result</h1>
    <h2>{{ $route.query.value }}</h2>
    <vue-qrcode ref="qr" :value="$route.query.value" tag="img"></vue-qrcode>
    <div>
      <input type="button" @click="dl" value="save qr code" class="btn-open" />
      <router-link to="/">
        <input type="button" value="back to home" class="btn-open" />
      </router-link>
    </div>
  </div>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  name: "Result",
  components: {
    VueQrcode
  },
  methods: {
    dl() {
      const a = document.createElement("a");
      a.href = this.$refs.qr.href;
      a.download = this.$route.query.value + ".png";
      a.click();
    }
  }
};
</script>

<style scoped lang="scss">
img {
  width: 90%;
}
.btn-open {
  white-space: normal;
}
</style>
