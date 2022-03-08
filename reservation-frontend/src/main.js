import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import {handleDates} from "./helpers/handledates";

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

axios.interceptors.response.use(
  function (response) {
    handleDates(response.data);
    return response;
  },
  function (error) {
    if (error.response?.status == 401) {
      store.commit("addError", error.response.data.message);
      store.commit("deleteLoggedInUser");
      router.push("/login");
    }
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
