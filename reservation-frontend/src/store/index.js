import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errors : [],
    loggedInUser : null,
  },
  mutations: {
    addError(state, error){
      this.errors.push(error);
    },
    deleteError(state, errorIndex){
      this.errors.splice(errorIndex, 1);
    },
    setLoggedInUser(state, user){
      this.loggedInUser = user;
    }
  },
  actions: {
    
  },
  modules: {},
});
