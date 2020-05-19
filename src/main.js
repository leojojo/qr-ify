import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/index.js";
import store from "./store/index.js";

// Amplify
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

Vue.use(AmplifyPlugin, AmplifyModules);

require("@/assets/sass/main.scss");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
