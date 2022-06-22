import CustomizedAxios from "../../plugins/axios";

const damageTypeModule = {
  state: {
    damages: [],
    DamageTypeByEquipmentID: [],
  },
  mutations: {
    DAMAGE(state, damages) {
      state.damages = damages;
      console.log("cccc", state.damages);
    },
    ADD_DAMAGE(state, damage) {
      state.damages.push(damage);
    },
    ADD_DAMAGES(state, damages) {
      state.damages.push(damages);
    },
    DELETE_DAMAGE(state, id) {
      state.damages = state.damages.filter((c) => c.id != id);
    },
    EDIT_DAMAGE(state, damage) {
      state.damages = state.damages.map((c) => {
        if (c.id == damage.id) return damage;
        return c;
      });
    },
    FindDamageTypeByEquipmentID(state, damages) {
      state.DamageTypeByEquipmentID = damages;
    },
  },
  actions: {
    setDAMAGEAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("Damage/")
          .then((response) => {
            commit("DAMAGE", response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    addDAMAGEAction({ commit }, damage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("Damage/add", {
          created_date: damage.created_date,
          updateDate: damage.updateDate,
          name: damage.name,
          department: {
            id: damage.department.id,
          },
          profileGroup: {
            id: damage.profileGroup.id,
          },
        })
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_DAMAGE", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addDAMAGESAction({ commit }, damages) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("Damage/addList", damages)
          .then((response) => {
            commit("ADD_DAMAGES", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteDAMAGEAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("Damage/delete/" + id)
          .then((response) => {
            commit("DELETE_DAMAGE", id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editDAMAGEAction({ commit }, damage) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.put("Damage/update", {
          created_date: damage.created_date,
          updateDate: damage.updateDate,
          name: damage.name,
          department: {
            id: damage.department.id,
          },
          profileGroup: {
            id: damage.profileGroup.id,
          },
        })
          .then((response) => {
            commit("EDIT_DAMAGE", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    FindDamageTypeByEquipmentIDAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("Damage/FindDamageType/" + id)
          .then((response) => {
            commit("FindDamageTypeByEquipmentID", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getdamage: (state) => {
      return state.damages;
    },
    getDamageTypeByEquipmentID: (state) => {
      return state.DamageTypeByEquipmentID;
    },
  },
};
export default damageTypeModule;
