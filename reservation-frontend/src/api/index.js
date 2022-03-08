import axios from "axios";
import router from "../router";
import store from "../store";
import { handleDates } from "../helpers/handledates";

const apiClient = axios.create({
  baseURL: "http://localhost/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
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

apiClient.interceptors.response.use(
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

export default apiClient;
