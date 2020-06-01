<template>
  <section>
    <article v-for="box in boxes" :key="box.id">
      <p>{{ box.name }}</p>
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BoxList",
  computed: {
    ...mapGetters({ boxes: "getBoxes" })
  }
};
</script>

<style scoped lang="scss"></style>
