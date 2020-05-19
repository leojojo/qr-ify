<template>
  <transition name="modal-slide">
    <div class="backdrop" @click="close">
      <div class="modal" @click.stop="">
        <header>
          <slot name="header" ref="header">
            <button type="button" class="btn-close" @click="close">x</button>
            <button type="button" class="btn-close" @click="done">Done</button>
          </slot>
        </header>
        <section>
          <slot name="body" ref="body"></slot>
        </section>
        <footer>
          <slot name="footer" ref="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Modal",
  computed: {
    ...mapState(["unsent"])
  },
  methods: {
    close() {
      const isCloseConfirm = this.unsent
        ? confirm("Close without sending?")
        : true;
      if (isCloseConfirm) {
        this.$emit("close");
      }
    },
    done() {
      this.$emit("done");
    }
  }
};
</script>

<style scoped lang="scss">
.backdrop {
  display: grid;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
}
.modal {
  display: grid;
  width: 100vw;
  background: $white;
  box-shadow: 0 5px 20px 1px;

  &-slide-enter,
  &-slide-leave-to {
    transform: translateY(100%);
  }
  &-slide-enter-active,
  &-slide-leave-active {
    transition: transform 0.5s ease;
  }
}
header,
footer {
  display: flex;
  justify-content: space-between;
  padding: 30px;
}
section {
  width: 100%;
  padding: 20px 0;
}
</style>
