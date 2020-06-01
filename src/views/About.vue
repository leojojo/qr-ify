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
import { mapState, mapMutations, mapActions } from "vuex";

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
    ...mapState(["captures"])
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
      const captures = this.captures;
      const boxName = "hogeBox";
      const options = {};
      this.uploadPhotos({ captures, boxName, options });
      this.clearCaptures();
    }
  }
};
</script>
