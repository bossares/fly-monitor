export default {
  state: {
    isAdmin: false,
  },
  getters: {
    getIsAdmin: (state) => state.isAdmin,
  },
  mutations: {
    setIsAdmin: (state, value) => (state.isAdmin = value),
  },
  actions: {
    toggleIsAdmin({ commit }, previousValue) {
      commit("setIsAdmin", !previousValue);
    },
  },
};
