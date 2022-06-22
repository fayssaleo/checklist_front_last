<template>
  <v-card v-if="logged" class="mx-auto overflow-hidden">
    <v-app-bar color="#fff" style="border-bottom: 2px solid #002f6c">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img
          contain
          lazy-src="./assets/TangerAlliance.png"
          max-height="100"
          max-width="150"
          src="./assets/TangerAlliance.png"
        ></v-img>
      </v-toolbar-title>
      <p><b>Checklist</b></p>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      width="15em"
      style="background-color: #fff"
    >
      <v-list style="padding: 0px; align-items: center" nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-img
            contain
            lazy-src="./assets/TangerAlliance.png"
            max-height="220"
            max-width="250"
            src="./assets/TangerAlliance.png"
          ></v-img>
          <v-list>
            <v-list-item
              v-for="item in listDrawerChildRouter"
              :key="item.id"
              link
              :to="item.ROUTE"
              class="sideBarItem"
            >
              <v-list-item class="test">
                <v-list-item-content>
                  <h4>{{ item.name }}</h4>
                </v-list-item-content>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>
                      <h1 class="header">{{ item.name }}</h1>
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item>
          </v-list>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app style="background-color: #d6e6f2">
      <router-view />
    </v-app>
  </v-card>
  <Login v-else />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Login from "./View/Login.vue";
export default {
  components: {
    Login,
  },
  data() {
    return {
      drawer: false,
      logged: false,
      listDrawerChildRouter: [
        { id: 1, name: "User", ROUTE: "/userGestion" },
        { id: 2, name: "Damage", ROUTE: "/Damage" },
        { id: 3, name: "Equipment Profile ", ROUTE: "/profile_groupe" },
        { id: 4, name: "Foreman ", ROUTE: "/Foreman" },
        { id: 5, name: "technique ", ROUTE: "/technique" },
        { id: 6, name: "Dashboard ", ROUTE: "/Dashboard" },
      ],
    };
  },
  mounted() {
    document.title = "Dashboard";
    if (localStorage.getItem("token") == null) {
      this.logged = true;
    } else if (localStorage.getItem("token") != null) this.logged = true;
  },
  computed: {
    ...mapGetters(["getUsers"]),
  },
  watch: {},
  methods: {
    initialize() {},
    logout() {
      localStorage.removeItem("token");
      window.location.reload();
      console.log(localStorage.getItem("token"));
    },
    ...mapActions([]),
  },
};
</script>
