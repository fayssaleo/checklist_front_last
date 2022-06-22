import CustomizedAxios from "../../plugins/axios";

const fonctionModule = {
  state: {
    fonctions: [],
  },
  mutations: {
    SET_FONCTIONS(state, fonctions) {
      state.fonctions = fonctions;
    },
    ADD_FONCTION(state, fonction) {
      state.fonctions.push(fonction);
    },
    DELETE_FONCTION(state, id) {
      state.fonctions = state.fonctions.filter((c) => c.id != id);
    },
    EDIT_FONCTION(state, fonction) {
      state.fonctions = state.fonctions.map((c) => {
        if (c.id == fonction.id) return fonction;
        return c;
      });
    },
  },
  actions: {
    setFonctionsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("fonctions/")
          .then((response) => {
            commit("SET_FONCTIONS", response.data.payload);
            console.log("set fonction 1");
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addFonctionAction({ commit }, fonction) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("fonctions/create", fonction)
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_FONCTION", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteFonctionAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("fonctions/delete" + id)
          .then((response) => {
            commit("DELETE_FONCTION", id);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editFonctionAction({ commit }, fonction) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.put("fonctions/update", fonction)
          .then((response) => {
            commit("EDIT_FONCTION", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getfonctions: (state) => {
      return state.fonctions;
    },
  },
};
export default fonctionModule;
