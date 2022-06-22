<template>
  <v-data-table
    :headers="headers"
    :items="usersFiltreByGRP"
    sort-by="item.id"
    class="elevation-1"
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
                  <v-col cols="12">
                    <v-col class="d-flex" cols="12" sm="12">
                      <v-select
                        :items="users"
                        item-text="username"
                        item-value="id"
                        v-model="editedItem.id"
                        label="users"
                      ></v-select>
                    </v-col>
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
        <v-dialog v-model="dialogModifier" max-width="1000px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.username"
                      label="username"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.lastName"
                      label="lastName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.firstName"
                      label="firstName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.update_date"
                      label="update date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.phone_number"
                      label="phone number"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closemodifier(item)">
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
        class="mr-2 btn white--text"
        @click="editItem(item)"
      >
        <v-icon medium class="mr-2"> mdi-pencil </v-icon>
      </v-btn>
      <v-btn
        color="#99A799"
        class="m-2 btn white--text"
        @click="deleteItem(item)"
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
    dialogModifier: false,
    search: "",
    headers: [
      { text: "username", value: "username", align: "start", sortable: true },
      { text: "lastName", value: "lastName", sortable: true },
      { text: "firstName", value: "firstName", sortable: true },
      { text: "email", value: "email", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    usersFiltreByGRP: [],

    profile_groupe_id: "",
    editedIndex: -1,
    editedItem: {
      id: "",
      created_date: "",
      email: "",
      password: "",
      phoneNumber: "",
      update_date: "",
      username: "",
      function: {
        id: null,
      },
      firstName: "",
      lastName: "",
    },
    defaultItem: {
      id: "",
      created_date: "",
      email: "",
      password: "",
      phoneNumber: "",
      update_date: "",
      username: "",
      function: {
        id: null,
      },
      firstName: "",
      lastName: "",
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
    ...mapGetters(["getUsers"]),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    // this.initialize();
  },
  methods: {
    initialize() {
      console.log("initialize");
      this.setUsersAction().then(() => {
        this.users = [...this.getUsers];

        this.users.forEach((element) => {
          element.profileGroups.map((item) => {
            if (item.id == localStorage.getItem("id")) {
              this.usersFiltreByGRP.push(element);
            }
          });
        });
        console.log(this.usersFiltreByGRP);
      });
    },
    ...mapActions([
      "setUsersAction",
      "editUserAction",
      "deleteUserAction",
      "addUserAction",
    ]),

    editItem(item) {
      this.editedIndex = this.users.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.dialogModifier = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteUserAction(this.editedIndex).then(() => {
        this.users = this.getUsers;
      });
      this.closeDelete();
    },
    close() {
      this.dialog = false;
    },
    closemodifier() {
      this.dialogModifier = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      if (this.editedIndex == -1) {
        console.log("add");
        this.addUserAction(this.editedItem).then(() => {
          this.users = [...this.getUsers];
        });
      } else {
        console.log("edite");

        this.editUserAction(this.editedItem).then(() => {
          this.users = [...this.getUsers];
        });
      }

      this.close();
    },
  },
};
</script>
