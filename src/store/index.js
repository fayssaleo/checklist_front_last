import Vue from "vue";
import Vuex from "vuex";
import usersModule from "./models/userModule";
import departmentModule from "./models/departmentModule";
import rolesModule from "./models/roleModule";
import fonctionModule from "./models/fonctionModule";
import domainGroupeModule from "./models/domainGroupeModule";
import damageTypeModule from "./models/damageTypeModule";
import domainModule from "./models/domainModule";
import damageModule from "./models/damageModule";
import equipmentModule from "./models/equipmentModule";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: "checklistCach",
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
  reducer: (state) => ({
    usersModule: state.usersModule,
  }),
});
let store = null;
export default function () {
  store = new Vuex.Store({
    modules: {
      usersModule,
      departmentModule,
      rolesModule,
      domainGroupeModule,
      damageTypeModule,
      domainModule,
      damageModule,
      equipmentModule,
      fonctionModule,
    },
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    plugins: [vuexLocalStorage.plugin],
  });
  return store;
}
export { store };
