<template>
  <div class="about">
    <button type="button" class="btn-open" @click="openModal">［ ◉" ］</button>
    <Modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:body>
        <Camera />
      </template>
    </Modal>
  </div>
</template>

<script>
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
    }
  }
};
</script>
