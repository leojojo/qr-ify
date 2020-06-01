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
    unsent: false,
    boxes: []
  },
  getters: {
    getBoxes: state => state.boxes.map(box => JSON.parse(box))
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    pushToCaptures(state, dataUrl) {
      state.captures.push(dataUrl);
      state.unsent = true;
    },
    clearCaptures(state) {
      state.captures = [];
      state.unsent = false;
    },
    setBox(state, { boxId, boxName, options }) {
      const box = {
        id: boxId,
        name: boxName,
        options: options
      };
      state.boxes.push(JSON.stringify(box));
      localStorage.setItem("box", state.boxes);
    }
  },
  actions: {
    uploadPhotos(context, { captures, boxName, options }) {
      if (captures && captures.length !== 0) {
        const boxId = uuid.v4();
        context.commit("setBox", { boxId, boxName, options });

        captures.forEach(imageData => {
          const fileName = Date.now();
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
