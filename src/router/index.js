import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
//import Login from "../views/Login.vue";
import store from "../store/index.js";

// Amplify
//import Amplify, * as AmplifyModules from "aws-amplify";
import * as AmplifyModules from "aws-amplify";
//import { components, AmplifyEventBus } from "aws-amplify-vue";
import { AmplifyEventBus } from "aws-amplify-vue";
import { AmplifyPlugin } from "aws-amplify-vue";

Vue.use(VueRouter);
Vue.use(AmplifyPlugin, AmplifyModules);

function getUser() {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
    .then(data => {
      if (data && data.signInUserSession) {
        store.commit("setUser", data);
        return data;
      }
    })
    .catch(() => {
      store.commit("setUser", null);
      return null;
    });
}

let user;

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { requiresAuth: true },
    component: Home
  },
  {
    path: "/about",
    name: "About",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/result",
    name: "Result",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "result" */ "../views/Result.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// user management
getUser().then(user => {
  if (user) {
    router.push({ path: "/" });
  }
});

// login state
AmplifyEventBus.$on("authState", async state => {
  if (state === "signedOut") {
    user = null;
    store.commit("setUser", null);
    router.push({ path: "/login" });
  } else if (state === "signedIn") {
    user = await getUser();
    router.push({ path: "/" });
  }
});

// redirect
router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    user = await getUser();
    if (!user) {
      return next({
        path: "/login"
      });
    }
    return next();
  }
  return next();
});

export default router;
