import axios from "axios";
const CustomizedAxios = axios;
CustomizedAxios.defaults.baseURL = "http://localhost:8000/api/";
//var token;
/* if (localStorage.cache) {
  token = JSON.parse(localStorage.cache);
  CustomizedAxios.defaults.headers.common["Accept"] = "application/json";
  CustomizedAxios.defaults.headers.common = {
    Authorization: `Bearer ${token.utilisateurModule.token}`,
    Accept: "application/json",
  };
} */
//var tk = localStorage.getItem("token");
//debugger;
/*const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYW16YSIsImV4cCI6MTY1MzIyOTYwNiwiaWF0IjoxNjUzMjExNjA2fQ.zlSDDLns0yA-VI46NtC-DEPMwIwtxeNMphgFnESmuW-aQMUG99vo-na1uAxugTrs6zFIAreBbaXe14bkX7CPrA";
/* CustomizedAxios.defaults.headers.common["Accept"] = "application/json";
CustomizedAxios.defaults.headers.common = {
  Authorization: `Bearer ` + token,
}; */

CustomizedAxios.defaults.headers.common["Accept"] = "application/json";
CustomizedAxios.defaults.headers.common["Content-Type"] = "multipart/form-data";
/*if (tk != null) {
  CustomizedAxios.defaults.headers.common["Authorization"] = `Bearer ${tk}`;
}

/*
//console.log("store.getters.getCurrentdepartement", this.$store);
/* if (departementModule.state.currentdepartement != null) {
  console.log("departement", departementModule.state.currentdepartement);
  axios.defaults.headers.common = {
    Authorization: `Bearer ${departementModule.state.currentdepartement.token}`,
  };
} */
/*axios.interceptors.request.use(
  function (config) {
    const token = store.getters.getCurrentdepartement.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);*/

export default CustomizedAxios;
