import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";
import { Storage } from "aws-amplify";
import { uuid } from "vue-uuid";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    user: null,
    captures: [],
    boxes: []
  },
  getters: {
    getBoxes: state => state.boxes
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    pushToCaptures(state, dataUrl) {
      state.captures.push(dataUrl);
    },
    clearCaptures(state) {
      state.captures = [];
    },
    setBox(state, { boxId, boxName, createdAt, options }) {
      const box = {
        id: boxId,
        name: boxName,
        createdAt: createdAt,
        options: options
      };
      state.boxes.push(box);
      localStorage.setItem("boxes", JSON.stringify(state.boxes));
    },
    setBoxes(state, boxes) {
      state.boxes = boxes;
    }
  },
  actions: {
    initBoxes(state) {
      const boxes = JSON.parse(localStorage.getItem("boxes")) || [];
      state.commit("setBoxes", boxes);
    },
    uploadPhotos(context, { captures, boxName, options }) {
      if (captures && captures.length !== 0) {
        const boxId = uuid.v4();
        const createdAt = new Date();
        context.commit("setBox", { boxId, boxName, createdAt, options });

        captures.forEach(imageData => {
          const fileName = createdAt.now;
          const access = {
            level: "protected",
            contentType: "image/png",
            tagging: "box=" + boxId
          };
          Storage.put(fileName, imageData, access)
            .then(() => {
              router.push({ path: "result", query: { value: boxId } });
            })
            .catch(err => console.error("uploadPhotos error: ", err));
        });
      }
    }
  },
  modules: {}
});
