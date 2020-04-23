<template>
  <div class="about">
    <button type="button" class="btn-open" @click="openModal">［ ◉" ］</button>
    <Modal v-show="isModalVisible" @close="closeModal" @submit="submitChild">
      <template v-slot:body>
        <Camera ref="camera" />
      </template>
    </Modal>
  </div>
</template>

<script>
import router from "../router/index.js";
import Camera from "@/components/Camera.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "About",
  components: {
    Camera,
    Modal
  },
  data() {
    return {
      isModalVisible: true
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
      this.isModalVisible = false;
      setTimeout(
        () =>
          router.push({ path: "result", query: { value: "hoge" } }, () =>
            this.$refs.camera.uploadPhotos()
          ),
        500
      );
    }
  }
};
</script>
