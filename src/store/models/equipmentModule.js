import CustomizedAxios from "../../plugins/axios";

const equipmentModule = {
  state: {
    equipments: [],
  },
  mutations: {
    SET_EQUIPMENTS(state, equipments) {
      state.equipments = equipments;
    },
    ADD_EQUIPMENT(state, EQUIPMENT) {
      state.equipments.push(EQUIPMENT);
    },
    DELETE_EQUIPMENT(state, id) {
      state.equipments = state.equipments.filter((c) => c.id != id);
    },
    EDIT_EQUIPMENT(state, EQUIPMENT) {
      console.log("EQUIPMENT", EQUIPMENT);
      state.equipments = state.equipments.map((c) => {
        if (c.id == EQUIPMENT.id) return EQUIPMENT;
        return c;
      });
    },
  },
  actions: {
    setequipmentsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("Equipment/")
          .then((response) => {
            commit("SET_EQUIPMENTS", response.data);
            console.log("set EQUIPMENT 1");
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    addEQUIPMENTAction({ commit }, EQUIPMENT) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("Equipment/add", {
          id: EQUIPMENT.id,
          name: EQUIPMENT.name,
          description: EQUIPMENT.description,
          profileGroup: {
            id: EQUIPMENT.profileGroup.id,
          },
        })
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_EQUIPMENT", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteEQUIPMENTAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("Equipment/delete",
        {
          id: id,
          
        }
         )
          .then((response) => {
            commit("DELETE_EQUIPMENT", id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editEQUIPMENTAction({ commit }, EQUIPMENT) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.put("Equipment/update", {
          id: EQUIPMENT.id,
          name: EQUIPMENT.name,
          description: EQUIPMENT.description,
          profileGroup: {
            id: EQUIPMENT.profileGroup.id,
          },
        })
          .then((response) => {
            commit("EDIT_EQUIPMENT", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getequipments: (state) => {
      return state.equipments;
    },
  },
};
export default equipmentModule;
