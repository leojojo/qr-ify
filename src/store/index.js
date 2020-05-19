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
    boxName: ""
  },
  getters: {
    getCaptures: state => state.captures
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
    }
  },
  actions: {
    uploadPhotos(state, captures) {
      if (captures && captures.length !== 0) {
        captures.forEach(imageData => {
          const fileName = Date.now();
          const boxId = uuid.v4();
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
