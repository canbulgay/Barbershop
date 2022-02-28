import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    if (store.state.loggedInUser) {
      config.headers.Authorization = `Bearer ${store.state.loggedInUser.token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
