<template>
  <div class="backdrop">
    <div class="modal">
      <header>
        <slot name="header">
        <button type="button" class="btn-close" @click="close">x</button>
        <button type="button" class="btn-close" @click="close">Done</button>
        </slot>
      </header>
      <section>
        <slot name="body"></slot>
      </section>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="scss">
.backdrop {
  display: grid;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.modal {
  display: grid;
  background: $white;
  box-shadow: 2px 2px 20px 1px;
}
header,
footer {
  display: flex;
  justify-content: space-between;
  padding: 30px;
}
section {
  padding: 20px 10px;
}
</style>
