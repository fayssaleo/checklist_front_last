import CustomizedAxios from "../../plugins/axios";

const damageTypeModule = {
  state: {
    damageTypes: [],
    ByProfile_group_id: [],
    ByProfileGroupAndAndDepartmentAndEquipmentIN:[],
  },
  mutations: {
    SET_DAMAGETYPS(state, damageTypes) {
      state.damageTypes = damageTypes;
    },
    SET_DAMAGETYPSByProfile_group_id(state, damageTypes) {
      state.ByProfile_group_id = damageTypes;
    },
    SET_ByProfileGroupAndAndDepartmentAndEquipmentIN(state, damageTypes) {
      state.ByProfileGroupAndAndDepartmentAndEquipmentIN = damageTypes;
    },
    ADD_DAMAGETYPE(state, damageTypes) {
      state.damageTypes.push(damageTypes);
    },
    DELETE_DAMAGETYPE(state, id) {
      state.damageTypes = state.damageTypes.filter((c) => c.id != id);
    },
    EDIT_DAMAGETYPE(state, damageTypes) {
      state.damageTypes = state.damageTypes.map((c) => {
        if (c.id == damageTypes.id) return damageTypes;
        return c;
      });
    },
  },
  actions: {
    setDAMAGETYPESAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("DamageType/")
          .then((response) => {
            commit("SET_DAMAGETYPS", response.data);
            console.log("set damageTypes ");
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    setDAMAGETYPESByProfile_group_idAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("DamageType/getByProfile_group_id/" + id)
          .then((response) => {
            commit("SET_DAMAGETYPSByProfile_group_id", response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    setByProfileGroupAndAndDepartmentAndEquipmentINAction({ commit }, id,id2,id3) {
      console.log(id, id2, id3);
      return new Promise((resolve, reject) => {
        CustomizedAxios.post(`DamageType/getAllByProfileGroupAndAndDepartmentAndEquipmentIN/${id}/${id2}/${id3}`)
          .then((response) => {
            commit("SET_ByProfileGroupAndAndDepartmentAndEquipmentIN", response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log("error :", error);
          });
      });
    },
    addDAMAGETYPEAction({ commit }, damageTypes) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("DamageType/add", {
          created_date: damageTypes.created_date,
          updateDate: damageTypes.updateDate,
          name: damageTypes.name,
          department: {
            id: damageTypes.department.id,
          },
          profileGroup: {
            id: damageTypes.profileGroup.id,
          },
        })
          .then((response) => {
            console.log("res add ", response);
            commit("ADD_DAMAGETYPE", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteDAMAGETYPEAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("DamageType/delete/" + id)
          .then((response) => {
            commit("DELETE_DAMAGETYPE", id);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editDAMAGETYPEAction({ commit }, damageTypes) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.put("DamageType/update", {
          created_date: damageTypes.created_date,
          updateDate: damageTypes.updateDate,
          name: damageTypes.name,
          department: {
            id: damageTypes.department.id,
          },
          profileGroup: {
            id: damageTypes.profileGroup.id,
          },
        })
          .then((response) => {
            commit("EDIT_DAMAGETYPE", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getdamageTypes: (state) => {
      return state.damageTypes;
    },
    getdamageTypesByProfile_group_id: (state) => {
      return state.ByProfile_group_id;
    },
    getAllByProfileGroupAndAndDepartmentAndEquipmentIN: (state) => {
      return state.ByProfileGroupAndAndDepartmentAndEquipmentIN;
    },
  },
};
export default damageTypeModule;
