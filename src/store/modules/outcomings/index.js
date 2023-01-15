export default {
  state: {
    items: [],
  },
  getters: {
    getOutcomings: (state) => state.items,
  },
  mutations: {
    setOutcomings: (state, items) => (state.items = items),
    sortOutcomings: (state) => {
      //modify date format from dd.mm.yyyy to yyyymmdd
      state.items.map(
        (item) => (item.date = item.date.split(".").reverse().join(""))
      );

      //parseInt method can work correctly only when the string has no any symbols
      state.items.sort((a, b) => parseInt(a.time) - parseInt(b.time));
      state.items.sort((a, b) => parseInt(a.date) - parseInt(b.date));

      //modify date format from yyyymmdd to dd.mm.yyyy
      state.items.map(
        (item) =>
          (item.date = `${
            item.date.slice(-2) +
            "." +
            item.date.slice(4, 6) +
            "." +
            item.date.slice(0, 4)
          }`)
      );
    },
    deleteOutcoming: (state, id) =>
      (state.items = state.items.filter((item) => item.id != id)),
    editOutcoming: (state, { id, value }) => {
      let result = state.items.find((item) => item.id == id);

      for (let key in result) result[key] = value[key];
    },
    addOutcoming: (state, value) => {
      state.items.push(value);
    },
  },
  actions: {
    /* commits must work after fetch or axios is returned the data */
    async fetchOutcomings({ commit }, items) {
      await commit("setOutcomings", items);
      await commit("sortOutcomings");
    },
    async removeOutcoming({ commit }, id) {
      await commit("deleteOutcoming", id);
    },
    async editOutcoming({ commit }, value) {
      await commit("editOutcoming", value);
      await commit("sortOutcomings");
    },
    async createOutcoming({ commit }, value) {
      await commit("addOutcoming", value);
      await commit("sortOutcomings");
    },
  },
};
