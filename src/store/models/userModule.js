import CustomizedAxios from "../../plugins/axios";

const usersModule = {
  state: {
    users: [],
    authenticatedUser: null,
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    DELETE_USER(state, user) {
      state.users = state.users.filter((c) => c.id != user.id);
    },
    EDIT_USER(state, user) {
      state.users = state.users.map((c) => {
        if (c.id == user.id) return user;
        return c;
      });
    },
  },
  actions: {
    setUsersAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("users/")
          .then((response) => {
            commit("SET_USERS", response.data.payload);
            console.log("set user ");
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addUserAction({ commit }, user) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("users/create", user)
          .then((response) => {
            console.log("res add ", response.data.payload);
            commit("ADD_USER", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteUserAction({ commit }, user) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("users/delete", user)
          .then((response) => {
            commit("DELETE_USER", user);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editUserAction({ commit }, user) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("users/update", user)
          .then((response) => {
            commit("EDIT_USER", response.data.payload);
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getUsers: (state) => {
      return state.users;
    },
  },
};
export default usersModule;
