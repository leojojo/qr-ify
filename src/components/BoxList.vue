<template>
  <section class="box">
    <article v-for="box in boxes" :key="box.id" class="box-item">
      <p>{{ box.name }}</p>
      <p>
        <time :datetime="box.createdAt">{{ box.createdAt | MDhm }}</time>
      </p>
    </article>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BoxList",
  computed: {
    ...mapGetters({ boxes: "getBoxes" })
  },
  methods: {
    ...mapActions(["initBoxes"])
  },
  mounted() {
    this.initBoxes();
  }
};
</script>

<style scoped lang="scss">
.box {
  &-item {
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 30%;
    p {
      word-break: break-word;
    }
  }
}
</style>
