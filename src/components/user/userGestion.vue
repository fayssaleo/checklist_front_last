<template>
  <div style="padding: 5px; padding-top: 8%">
    <v-data-table
      :headers="headers"
      :items="users"
      sort-by="item.id"
      class="elevation-1"
      :search="search"
      :loading="loading"
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

          <v-dialog v-model="dialog" max-width="700px">
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
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="close(item)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>ADD USER</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items> </v-toolbar-items>
              </v-toolbar>
              <v-card-title class="text-h5 grey--text text--darken-3">
                User Profile :
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.username"
                      label="Username"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.lastName"
                      label="Last Name"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.firstName"
                      label="First Name"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.phoneNumber"
                      label="Phone Number"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="6" md="6">
                    <v-select
                      :items="departments"
                      item-text="name"
                      item-value="id"
                      v-model="departmentID"
                      label="Department"
                      outlined
                      @change="departmentChange"
                    ></v-select>
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-select
                      :items="fonctions"
                      item-text="name"
                      item-value="id"
                      v-model="editedItem.fonction_id"
                      label="Function"
                      outlined
                      :disabled="departmentID == '' || departmentID == null"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="" @click="dialog = false">
                  Close
                </v-btn>
                <v-btn depressed color="primary" @click="save(editedItem)">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogModifier" max-width="700px">
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="closemodifier">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Modify USER</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items> </v-toolbar-items>
              </v-toolbar>
              <v-card-title class="text-h5 grey--text text--darken-3">
                User Profile :
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.username"
                      label="Username"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.lastName"
                      label="Last Name"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.firstName"
                      label="First Name"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.phoneNumber"
                      label="Phone Number"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="6" md="6">
                    <v-select
                      :items="departments"
                      item-text="name"
                      item-value="id"
                      v-model="departmentID"
                      label="Department"
                      outlined
                      @change="departmentChange"
                    ></v-select>
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-select
                      :items="fonctions"
                      item-text="name"
                      item-value="id"
                      v-model="editedItem.fonction_id"
                      label="Function"
                      outlined
                      :disabled="departmentID == '' || departmentID == null"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="" @click="closemodifier"> Close </v-btn>
                <v-btn depressed color="primary" @click="save()"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-toolbar dark color="error">
                <v-toolbar-title>Warning !</v-toolbar-title>
              </v-toolbar>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this user?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="" @click="closeDelete">Cancel</v-btn>
                <v-btn depressed color="error" @click="deleteItemConfirm"
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogModifier: false,
    showInput: false,
    showInputDepartment: false,
    search: "",
    loading: "false",
    headers: [
      { text: "username", value: "username", align: "start", sortable: true },
      { text: "lastName", value: "lastName", sortable: true },
      { text: "firstName", value: "firstName", sortable: true },
      { text: "email", value: "email", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    departments: [],
    fonctions: [],

    profile_groupe_id: "",
    editedIndex: -1,
    departmentID: "",
    editedItem: {
      id: "",
      created_date: null,
      email: "",
      password: null,
      phoneNumber: "",
      update_date: null,
      username: "",
      fonction_id: "",
      firstName: "",
      lastName: "",
      fonction: {
        id: "",
        department: {
          id: "",
        },
      },
    },
    defaultItem: {
      id: "",
      created_date: "",
      email: "",
      password: null,
      phoneNumber: "",
      update_date: "",
      username: "",
      fonction_id: "",
      firstName: "",
      lastName: "",
      fonction: {
        id: "",
        department: {
          id: "",
        },
      },
    },
  }),
  mounted() {
    document.title = "user";
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
    ...mapGetters(["getUsers", "getdepartments", "getfonctions"]),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogModifier(val) {
      if (!val) {
        this.closemodifier();
      }
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
      });
      this.setDepartmentsAction().then(() => {
        this.departments = [...this.getdepartments];
      });
      this.setFonctionsAction().then(() => {
        this.fonctions = [...this.getfonctions];
      });
    },
    ...mapActions([
      "setUsersAction",
      "editUserAction",
      "deleteUserAction",
      "addUserAction",
      "setDepartmentsAction",
      "setFonctionsAction",
    ]),

    editItem(item) {
      this.editedIndex = this.users.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.departmentID = this.editedItem.fonction.department.id;
      this.dialogModifier = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteUserAction({
        id: this.editedItem.id,
      }).then(() => {
        this.users = [...this.getUsers];
      });
      this.closeDelete();
    },
    close() {
      this.dialog = false;
    },
    closemodifier() {
      this.dialogModifier = false;
      this.editedIndex = -1;
      this.editedItem = {
        id: "",
        created_date: "",
        email: "",
        password: null,
        phoneNumber: "",
        update_date: "",
        username: "",
        fonction_id: "",
        firstName: "",
        lastName: "",
        fonction: {
          id: "",
          department: {
            id: "",
          },
        },
      };
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      if (this.editedIndex == -1) {
        console.log("add");
        this.addUserAction(this.editedItem).then(() => {
          this.users = [...this.getUsers];
          this.closemodifier();
        });
      } else {
        console.log("edite");

        this.editUserAction(this.editedItem).then(() => {
          this.users = [...this.getUsers];
          this.dialogModifier = false;
          this.closemodifier();
        });
      }

      this.close();
    },
    departmentChange(id) {
      this.fonctions = this.getfonctions.filter((e) => {
        return e.department_id == id;
      });
    },
  },
};
</script>
