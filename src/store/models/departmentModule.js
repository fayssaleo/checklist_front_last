import CustomizedAxios from "../../plugins/axios";

const departmentModule = {
  state: {
    departments: [],
  },
  mutations: {
    SET_DEPARTMENTS(state, departments) {
      state.departments = departments;
    },
    ADD_DEPARTMENT(state, department) {
      state.departments.push(department);
    },
    DELETE_DEPARTMENT(state, id) {
      state.departments = state.departments.filter((c) => c.id != id);
    },
    EDIT_DEPARTMENT(state, departments) {
      state.departments = state.departments.map((c) => {
        if (c.id == departments.id) return departments;
        return c;
      });
    },
  },
  actions: {
    setDepartmentsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("departments/")
          .then((response) => {
            commit("SET_DEPARTMENTS", response.data.payload);
            console.log("set department 1");
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addDepartmentAction({ commit }, department) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("departments/create", department)
          .then((response) => {
            console.log("res add ", response.data.payload);
            commit("ADD_DEPARTMENT", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteDepartmentAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("departments/delete" + id)
          .then((response) => {
            commit("DELETE_DEPARTMENT", id);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editDepartmentAction({ commit }, department) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.put("departments/update", department)
          .then((response) => {
            commit("EDIT_DEPARTMENT", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getdepartments: (state) => {
      return state.departments;
    },
  },
};
export default departmentModule;
