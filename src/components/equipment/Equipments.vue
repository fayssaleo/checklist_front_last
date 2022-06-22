<template>
  <v-data-table
    :headers="headers"
    :items="equipmentsFiltres"
    :search="search"
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
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#002f6c"
              class="mb-2 btn white--text"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left> mdi-account-multiple-plus </v-icon>
              Add
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="description"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close(item)">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save(editedItem)">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        color="#99A799"
        class="mb-2 btn white--text"
        @click="editItem(item)"
      >
        <v-icon medium class="mr-2"> mdi-pencil </v-icon>
      </v-btn>

      <v-btn
        color="#99A799"
        class="mb-2 btn white--text"
        @click="editItem(item)"
      >
        <v-icon medium @click="deleteItem(item)"> mdi-delete </v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize()"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { text: "name", value: "name", sortable: true },
      { text: "description", value: "description", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    equipments: [],
    equipmentsFiltres: [],
    idgrp: null,
    editedIndex: -1,
    editedItem: {
      id: null,
      name: "",
      description: "",
      profileGroup: {
        id: null,
      },
    },
    defaultItem: {
      id: null,
      name: "",
      description: "",
      profileGroup: {
        id: null,
      },
    },
  }),
  mounted() {
    document.title = "user";
    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["getequipments"]),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {},
  methods: {
    initialize() {
      console.log("initialize");
      this.idgrp = localStorage.getItem("id");
      this.setequipmentsAction().then(() => {
        this.equipments = [...this.getequipments];
        this.equipments.map((item) => {
          if (item.profileGroup.id == this.idgrp) {
            this.equipmentsFiltres.push(item);
          }
        });
      });
    },
    ...mapActions([
      "setequipmentsAction",
      "editEQUIPMENTAction",
      "deleteEQUIPMENTAction",
      "addEQUIPMENTAction",
    ]),

    editItem(item) {
      this.editedIndex = this.equipments.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteEQUIPMENTAction(this.editedIndex).then(() => {
        this.equipments = [...this.getequipments];
      });
      this.closeDelete();
    },
    close() {
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      if (this.editedIndex == -1) {
        this.editedItem.profileGroup.id = localStorage.getItem("id");
        this.addEQUIPMENTAction(this.editedItem).then(() => {
          this.equipments = [...this.getequipments];
        });
      } else {
        this.editEQUIPMENTAction(this.editedItem).then(() => {
          this.equipments = [...this.getequipments];
        });
      }

      this.close();
    },
  },
};
</script>
