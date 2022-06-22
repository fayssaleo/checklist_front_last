<template>
  <div style="padding: 5px; padding-top: 8%">
    <v-col cols="6" md="6">
      <v-select
        :items="departements"
        item-text="name"
        item-value="name"
        v-model="departementId"
        label="departements"
        @change="changeDepartment"
      ></v-select>
    </v-col>
    <v-data-table
      :headers="headers"
      :items="domainGroupesBydepartements"
      :search="search"
      :loading="loading"
      sort-by="item.id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon medium class="mr-2" @click="pageView(item)">
          mdi-eye-outline
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize()"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    search: "",
    confirmAddSave: false,
    headers: [
      { text: "name", value: "name", sortable: true },
      { text: "equipments", value: "equipments.length", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    domainGroupes: [],
    domainGroupesBydepartements: [],
    departements: [],
    departementId: "",
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      departement: "",
      domain: {
        id: "",
      },
    },
    defaultItem: {
      id: "",
      name: "",
      departement: "",
      domain: {
        id: "",
      },
    },
  }),
  mounted() {
    document.title = "domainGroupes";

    this.loading = true;
    setTimeout(() => {
      this.initialize();
      this.loading = false;
    }, 2500);
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["getdomainGroupes", "getdepartements"]),
  },
  watch: {
    dialog(val) {
      if (this.editedIndex == -1) {
        this.editedIndex = -1;
        this.editedItem = {
          id: "",
          name: "",
          departement: "",
          domain: {
            id: "",
          },
        };
      }

      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
  },
  methods: {
    initialize() {
      this.domainGroupesBydepartements.length = [];
      this.setDOMAINGROUPESAction().then(() => {
        this.domainGroupes = [...this.getdomainGroupes];
        this.domainGroupesBydepartements = [...this.getdomainGroupes];
        console.log(this.domainGroupes);
      });
      this.setDepartementsAction().then(() => {
        this.departements = [...this.getdepartements];
        console.log(this.departements);
      });
    },
    pageView(item) {
      this.$router.push({
        name: "techniqueView",
        params: { name: item.name },
      });
      localStorage.removeItem("idDomainGroupes");
      localStorage.setItem("idDomainGroupes", item.name);

    },
    ...mapActions([
      "setDOMAINGROUPESAction",
      "setDepartementsAction",
    ]),
    changeDepartment() {
      this.domainGroupesBydepartements = [];
      this.domainGroupes = [];
      this.setDOMAINGROUPESAction().then(() => {
        this.domainGroupes = [...this.getdomainGroupes];
        this.domainGroupes.map((element) => {
          if (element.department == this.departementId) {
            this.domainGroupesBydepartements.push(element);
          }
        });
      });
    },

  },
};
</script>
