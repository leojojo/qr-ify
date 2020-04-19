<template>
  <div class="about">
    <div class="btn-group">
      <button
        class="btn-open"
        v-for="tab in tabs"
        :key="tab"
        @click="
          currentTab = tab;
          openModal();
        "
      >
        {{ tab }}
      </button>
    </div>

    <Modal v-show="isModalVisible" @close="closeModal" @submit="submitChild">
      <template #body>
        <component ref="camera" :is="currentTab"></component>
      </template>
    </Modal>
  </div>
</template>

<script>
import Camera from "@/components/Camera.vue";
import QR from "@/components/QR.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "About",
  components: {
    Camera,
    QR,
    Modal
  },
  data() {
    return {
      isModalVisible: true,
      currentTab: "Camera",
      tabs: ["Camera", "QR"]
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.$refs.camera.clearPhotos();
    },
    submitChild() {
      this.$refs.camera.uploadPhotos();
      this.isModalVisible = false;
    }
  }
};
</script>

<style lang="scss">
.btn-group {
  display: grid;
  grid-auto-flow: column;
  justify-content: space-evenly;
}
</style>
