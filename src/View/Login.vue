<template>
  <v-row style="margin: 0; padding: 0;background: #fff;" >
    <v-col cols="7" class="backgroundLogin"> </v-col>
    <v-col cols="5" class="form">
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-text-field v-model="username" label="username"></v-text-field
        ></v-col>
        <v-col cols="1"></v-col>
      </v-row>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-text-field
            type="password"
            v-model="password"
            label="password"
          ></v-text-field>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>

      <div class="btn_form">
        <v-btn color="#A6CEE3" class="mb-2 btn white--text" @click="Login">
          <v-icon left> mdi-login-variant </v-icon>
          LOGIN
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      logged: false,
      username: null,
      password: null,
    };
  },
  mounted() {
    document.title = "Dashboard";

    //  this.initialize();
  },
  computed: {
    ...mapGetters(["getUsers"]),
  },
  watch: {},
  methods: {
    initialize() {
      console.log("xccc");
      console.log(this.logged);
    },
    Login() {
      console.log("username", this.username);
      console.log("password", this.password);

      axios.defaults.headers.common["Accept"] = "application/json";

      axios
        .post("authenticate", {
          password: this.password,
          username: this.username,
        })
        .then((response) => {
          console.log("res login ", response.data);
          // localStorage.removeItem("token");
          localStorage.setItem("token", response.data.token);
          this.$router.push({
            name: "Damage",
            params: { token: response.data.token },
          });
          window.location.reload();
        })
        .catch((error) => {
          console.log("error login ", error);
        });
    },
    ...mapActions([
      "setUsersAction",
      "editUserAction",
      "deleteUserAction",
      "addUserAction",
    ]),
  },
};
</script>
<style></style>
