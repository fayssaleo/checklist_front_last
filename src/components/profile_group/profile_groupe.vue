<template>
  <div style="padding: 5px; padding-top: 8%">
    <v-data-table
      :headers="headers"
      :items="domainGroupes"
      :loading="loading"
      sort-by="item.id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Equipments groups</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#1D4F91"
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
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="#1D4F91"
                  class="mb-2 btn white--text"
                  @click="close(item)"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="#1D4F91"
                  class="mb-2 btn white--text"
                  @click="openSave"
                >
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
                <v-btn
                  color="#1D4F91"
                  class="mb-2 btn white--text"
                  @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="#1D4F91"
                  class="mb-2 btn white--text"
                  @click="deleteItemConfirm"
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
                <v-btn
                  color="#1D4F91"
                  class="mb-2 btn white--text"
                  @click="closeAddSaveDialog"
                  >No</v-btn
                >
                <v-btn
                  color="#1D4F91"
                  class="mb-2 btn white--text"
                  @click="save"
                  >Yes</v-btn
                >

                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogView" width="1000px">
            <v-card>
              <v-container>
                <div>Equipments groups :</div>
                <v-tabs color="#1D4F91" left>
                  <v-tab>users</v-tab>
                  <v-tab>Damage type</v-tab>
                  <v-tab>Equipment</v-tab>

                  <v-tab-item>
                    <v-container fluid>
                      <v-row>
                        <template>
                          <User />
                        </template>
                      </v-row>
                    </v-container>
                  </v-tab-item>
                  <v-tab-item>
                    <v-container fluid>
                      <v-row>
                        <template>
                          <DamageType />
                        </template>
                      </v-row>
                    </v-container>
                  </v-tab-item>
                  <v-tab-item>
                    <v-container fluid>
                      <v-row>
                        <template> </template>
                      </v-row>
                    </v-container>
                  </v-tab-item>
                </v-tabs>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="#1D4F91"
                  class="mb-2 btn white--text"
                  @click="closedialogView"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon large @click="pageView(item)" class="mr-5">
          mdi-eye-outline
        </v-icon>

        <v-icon large class="mr-5" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon large @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize()"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import User from "../user/Users.vue";
import DamageType from "../damage_Type/DamageType.vue";
export default {
  components: {
    User,
    DamageType,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    confirmAddSave: false,
    dialogView: false,
    loading: "false",
    headers: [
      { text: "name", value: "name", sortable: true },
      { text: "equipments", value: "equipments.length", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    domainGroupes: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
    },
    defaultItem: {
      id: "",
      name: "",
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
    ...mapGetters(["getdomainGroupes"]),
  },
  watch: {
    dialog(val) {
      if (this.editedIndex == -1) {
        this.editedIndex = -1;
        this.editedItem = {
          id: "",
          name: "",
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
      this.setDOMAINGROUPESAction().then(() => {
        this.domainGroupes = [...this.getdomainGroupes];
      });
    },
    pageView(item) {
      this.$router.push({
        name: "ViewEquipement",
        params: { name: item.name },
      });
      localStorage.removeItem("id");
      localStorage.setItem("id", item.id);
    },
    ...mapActions([
      "setDOMAINGROUPESAction",
      "editDOMAINGROUPEAction",
      "deleteDOMAINGROUPEAction",
      "addDOMAINGROUPEAction",
    ]),

    editItem(item) {
      this.editedIndex = this.domainGroupes.indexOf(item) + 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteDOMAINGROUPEAction(this.editedIndex).then(() => {
        this.domainGroupes = this.getdomainGroupes;
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
    closedialogView() {
      this.dialogView = false;
    },
    openSave() {
      this.confirmAddSave = true;
    },
    save() {
      if (this.editedIndex == -1) {
        this.addDOMAINGROUPEAction(this.editedItem).then(() => {
          this.domainGroupes = [...this.domainGroupes];
        });
        this.closeAddSaveDialog();
      } else {
        this.editDOMAINGROUPEAction(this.editedItem).then(() => {
          this.domainGroupes = this.getdomainGroupes;
        });
        this.closeAddSaveDialog();
      }

      this.close();
    },
  },
};
</script>
<style></style>
