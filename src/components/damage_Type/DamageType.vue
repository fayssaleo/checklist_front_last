<template>
  <div style="padding: 5px; padding-top: 2%">
    <v-data-table
      :headers="headers"
      :items="damageTypesByProfile_group_id"
      sort-by="item.id"
      class="elevation-1 table"
      :search="search"
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
          <v-dialog v-model="dialog" max-width="500px">
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
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.name"
                        label="name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.profileGroup.id"
                        label="groupe"
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
                <v-btn color="blue darken-1" text @click="openSave">
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
          <v-dialog v-model="confirmAddSave" max-width="500px">
            <v-card>
              <v-card-title class="text-h5" v-if="editedIndex == -1"
                >Are you sure you want to add this item?</v-card-title
              >
              <v-card-title class="text-h5" v-else
                >Are you sure you want to update this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAddSaveDialog"
                  >No</v-btn
                >
                <v-btn color="blue darken-1" text @click="save">Yes</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="#99A799" class="m-2 mr-2 btn white--text">
          <v-icon medium class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn color="#99A799" class="m-2 btn white--text">
          <v-icon medium @click="deleteItem(item)"> mdi-delete </v-icon>
        </v-btn>
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
    dialog: false,
    dialogDelete: false,
    confirmAddSave: false,
    search: "",
    headers: [
      { text: "name", value: "name", sortable: true },
      { text: "created date", value: "createdDate", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    damageTypes: [],
    damageTypesByProfile_group_id: [],
    editedIndex: -1,
    editedItem: {
      created_date: "",
      updateDate: "",
      name: "",
      department: {
        id: "",
      },
      profileGroup: {
        id: "",
      },
    },
    defaultItem: {
      created_date: "",
      updateDate: "",
      name: "",
      department: {
        id: "",
      },
      profileGroup: {
        id: "",
      },
    },
  }),
  mounted() {
    document.title = "damage type";

    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["getdamageTypes", "getdamageTypesByProfile_group_id"]),
  },
  watch: {
    dialog(val) {
      if (this.editedIndex == -1) {
        this.editedIndex = -1;
        this.editedItem = {
          created_date: "",
          updateDate: "",
          name: "",
          department: {
            id: "",
          },
          profileGroup: {
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
  created() {},
  methods: {
    initialize() {
      this.setDAMAGETYPESByProfile_group_idAction(
        localStorage.getItem("id")
      ).then(() => {
        this.damageTypesByProfile_group_id = [
          ...this.getdamageTypesByProfile_group_id,
        ];
      });
    },
    ...mapActions([
      "setDAMAGETYPESAction",
      "editDAMAGETYPEAction",
      "deleteDAMAGETYPEAction",
      "addDAMAGETYPEAction",
      "setDAMAGETYPESByProfile_group_idAction",
    ]),

    editItem(item) {
      this.editedIndex = this.damageTypes.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      console.log("item :", item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteDAMAGETYPEAction(this.editedIndex).then(() => {
        this.damageTypes = this.getdamageTypes;
      });
      this.closeDelete();
    },
    close() {
      this.editedIndex = -1;
      this.dialog = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    closeAddSaveDialog() {
      this.confirmAddSave = false;
    },
    openSave() {
      this.confirmAddSave = true;
    },
    save() {
      if (this.editedIndex == -1) {
        this.addDAMAGETYPEAction(this.editedItem).then(() => {
          this.damageTypes = [...this.damageTypes];
        });
        this.closeAddSaveDialog();
      } else {
        this.editDAMAGETYPEAction(this.editedItem).then(() => {
          this.damageTypes = this.getdamageTypes;
        });
        this.closeAddSaveDialog();
      }

      this.close();
    },
  },
};
</script>
