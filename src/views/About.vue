<template>
  <div class="about">
    <button type="button" class="btn-open" @click="openModal">［ ◉" ］</button>
    <button type="button" class="btn-open" @click="submit">Submit</button>
    <Modal v-show="isModalVisible" @close="closeModal" @done="doneModal">
      <template v-slot:body>
        <Camera ref="camera" />
      </template>
    </Modal>
  </div>
</template>

<script>
import Camera from "@/components/Camera.vue";
import Modal from "@/components/Modal.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

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
  computed: {
    ...mapGetters(["getCaptures"])
  },
  methods: {
    ...mapMutations(["clearCaptures"]),
    ...mapActions(["uploadPhotos"]),
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.clearCaptures();
    },
    doneModal() {
      this.isModalVisible = false;
    },
    submit() {
      this.uploadPhotos(this.getCaptures);
      this.clearCaptures();
    }
  }
};
</script>
