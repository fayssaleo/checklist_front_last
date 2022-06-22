import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import "@/scss/GlobalStyle.scss";

import VueChartsCSS from "vue.charts.css";
import 'charts.css';
Vue.config.productionTip = false;
Vue.use(VueChartsCSS); 

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
