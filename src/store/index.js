import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import incomings from "./modules/incomings";
import outcomings from "./modules/outcomings";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    incomings,
    outcomings,
  },
});
