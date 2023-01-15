export default {
  state: {
    items: [],
  },
  getters: {
    getIncomings: (state) => state.items,
  },
  mutations: {
    setIncomings: (state, items) => (state.items = items),
    sortIncomings: (state) => {
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
    deleteIncoming: (state, id) =>
      (state.items = state.items.filter((item) => item.id != id)),
    editIncoming: (state, { id, value }) => {
      let result = state.items.find((item) => item.id == id);

      for (let key in result) result[key] = value[key];
    },
    addIncoming: (state, value) => {
      state.items.push(value);
    },
  },
  actions: {
    /* commits must work after fetch or axios is returned the data */
    async fetchIncomings({ commit }, items) {
      await commit("setIncomings", items);
      await commit("sortIncomings");
    },
    async removeIncoming({ commit }, id) {
      await commit("deleteIncoming", id);
    },
    async editIncoming({ commit }, value) {
      await commit("editIncoming", value);
      await commit("sortIncomings");
    },
    async createIncoming({ commit }, value) {
      await commit("addIncoming", value);
      await commit("sortIncomings");
    },
  },
};
