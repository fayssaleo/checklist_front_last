<template>
  <div style="padding: 0; padding-top: 13px">
    <div style="margin: 0 auto; width: 100%">
      <v-container class="damageContainer">
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-select
              :items="profile_groupe"
              item-text="name"
              item-value="id"
              v-model="profile_groupe_id"
              label="Equipment groupe :"
              @change="changeProfile_groupeSELECT"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
              :items="equipmentsFiltre"
              item-text="name"
              item-value="id"
              v-model="equipments_id"
              label="Equipment :"
              @change="changeEquipmentsFiltreSELECT"
              :disabled="disabledEquipmentsFiltre"
            ></v-select>
          </v-col>
        </v-row>
        <v-dialog
          v-model="dialogTEC"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="cancelTEC">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Settings</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="validerDamages"> Save </v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <v-card-title class="text-h5"> Description : </v-card-title>
            <v-col cols="12" md="6">
              <v-textarea
                solo
                name="input-7-4"
                label="Description"
              ></v-textarea>
            </v-col>
            <v-card-title class="text-h5"> Add picture : </v-card-title>
            <v-col cols="12" md="6">
              <v-file-input
                label="Pictures"
                filled
                multiple
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogIT"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="cancelIT">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Settings</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="dialogIT"> Save </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-title class="text-h5"> description : </v-card-title>
            <v-col cols="12" md="6">
              <v-textarea
                solo
                name="input-7-4"
                label="Description"
              ></v-textarea>
            </v-col>
            <v-card-title class="text-h5"> add picture : </v-card-title>
            <v-col cols="12" md="6">
              <v-file-input
                label="Pictures"
                filled
                v-model="file"
                @change="validerDamages"
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>
          </v-card>
        </v-dialog>
        <v-container>
          <v-row>
            <v-col cols="5" class="ITpanell">
              <v-container>
                <v-row>
                  <v-col cols="5"></v-col>
                  <v-col cols="4">
                    <span>IT </span>
                    <span class="red--text"
                      >({{ this.modelDamageIT.length }})</span
                    ></v-col
                  >
                  <v-col cols="3"></v-col>
                </v-row>
              </v-container>

              <v-col cols="12" sm="12" class="scroll">
                <v-list>
                  <v-list-item-group
                    name="it"
                    v-model="modelIT"
                    multiple
                    color="#f54"
                  >
                    <div>
                      <v-list-item
                        v-for="(item, i) in modelDamageIT"
                        :key="i"
                        class="item itemDamaged"
                        style="
                          background-color: rgb(255, 235, 234);
                          color: #f54;
                        "
                        @click="validerIT(item)"
                      >
                        <v-list-item-icon>
                          <v-icon medium> mdi-progress-wrench </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title
                            name="modelDamageIT"
                            v-text="item.name"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-col>
            <v-col cols="2"></v-col>
            <v-col cols="5" class="TECpanell">
              <v-container>
                <v-row>
                  <v-col cols="3"></v-col>
                  <v-col cols="6">
                    <span>Technique </span>
                    <span class="red--text">
                      ({{ this.modelDamageTEC.length }})</span
                    ></v-col
                  >
                  <v-col cols="3"></v-col>
                </v-row>
              </v-container>

              <v-col cols="12" sm="12" class="scroll">
                <v-list>
                  <v-list-item-group
                    name="TEC"
                    v-model="modelTEC"
                    multiple
                    color="#f54"
                  >
                    <div>
                      <v-list-item
                        v-for="(item, i) in modelDamageTEC"
                        :key="i"
                        class="item"
                        style="
                          background-color: rgb(255, 235, 234);
                          color: #f54;
                        "
                        @click="validerTEC(item)"
                      >
                        <v-list-item-icon>
                          <v-icon medium> mdi-progress-wrench </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title
                            name="modelDamageTEC"
                            v-text="item.name"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="4"> </v-col>
            <v-col cols="4">
              <v-btn
                color="#1D4F91"
                class="mb-2 btn white--text"
                @click="damageFunction"
              >
                Valider
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CustomizedAxios from "../../plugins/axios.js";
export default {
  data: () => ({
    profile_groupe: [],
    damage: [],
    equipmentsFiltre: [],
    damageTypesIT: [],
    damageTypesTEC: [],
    modelIT: [],
    modelTEC: [],
    modelDamageIT: [],
    modelDamageTEC: [],
    Data: [],
    equipments: [],
    departements: [],
    statusdamage: "",
    FindDamageTypeByEquipmentID: [],
    profile_groupe_id: null,
    equipments_id: "",
    disabledEquipmentsFiltre: true,
    dialogTEC: false,
    dialogIT: false,
    file: "",
    image: "",
    statusList: [
      {
        id: "1",
        name: "on progress",
      },
      {
        id: "2",
        name: "Confirmed",
      },
      {
        id: "3",
        name: "closed",
      },
    ],
  }),
  mounted() {
    document.title = "damage";

    this.initialize();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters([
      "getUsers",
      "getdamageTypes",
      "getdomainGroupes",
      "getequipments",
      "getDamageTypeByEquipmentID",
      "getdamage",
      "getDamageTypeByEquipmentID",
      "getdepartements",
    ]),
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
    changeProfile_groupeSELECT() {
      this.modelDamageIT.length = 0;
      this.modelDamageTEC.length = 0;
      this.equipmentsFiltre.length = 0;
      this.damageTypesIT.length = 0;
      this.damageTypesTEC.length = 0;
      this.Data.length = 0;
      this.disabledEquipmentsFiltre = false;
      this.profile_groupe.map((item) => {
        if (item.id == this.profile_groupe_id) {
          item.damageTypes.map((item) => {
            this.Data.push(item);
          });
        }
      });
      this.equipments.map((item) => {
        if (item.profileGroup.id == this.profile_groupe_id) {
          this.equipmentsFiltre.push(item);
        }
      });
      this.damagetypeITandTEC();
    },
    changeEquipmentsFiltreSELECT() {
      var IT = 1;
      var TEC = 2;
      CustomizedAxios.post(
        `DamageType/getAllByProfileGroupAndAndDepartmentAndEquipmentIN/${this.profile_groupe_id}/${IT}/${this.equipments_id}`
      )
        .then((response) => {
          this.modelDamageIT = response.data;
        })
        .catch((error) => {
          console.log("error :", error);
        });
      CustomizedAxios.post(
        `DamageType/getAllByProfileGroupAndAndDepartmentAndEquipmentIN/${this.profile_groupe_id}/${TEC}/${this.equipments_id}`
      )
        .then((response) => {
          this.modelDamageTEC = response.data;
        })
        .catch((error) => {
          console.log("error :", error);
        });
    },
    initialize() {
      console.log("initialize");

      this.setDOMAINGROUPESAction().then(() => {
        this.profile_groupe = [...this.getdomainGroupes];
        console.log("vvv", this.damageTypes);
      });
      this.setequipmentsAction().then(() => {
        this.equipments = [...this.getequipments];
        console.log(this.equipments);
      });
    },
    ...mapActions([
      "setDAMAGEAction",
      "editDAMAGEAction",
      "deleteDAMAGEAction",
      "addDAMAGEAction",
      "setDAMAGETYPESAction",
      "setDOMAINGROUPESAction",
      "setequipmentsAction",
      "FindDamageTypeByEquipmentIDAction",
      "addDAMAGESAction",
      "setDepartementsAction",
    ]),
    deleteDamage() {
      this.damageTypesIT = this.damageTypesIT.filter((e) => {
        return (
          this.modelDamageIT.filter((e1) => {
            return e.name == e1.name;
          }).length == 0
        );
      });
      this.damageTypesTEC.map((item) => {
        this.modelDamageTEC.map((item2) => {
          if (item.name == item2.name) {
            let index = this.damageTypesTEC.indexOf(item);
            this.damageTypesTEC.splice(index, 1);
          }
        });
      });
    },

    validerTEC(item) {
      CustomizedAxios.post(
        `Damage/FindDamageTypeByEquipmentID/${this.equipments_id}/${item.id}`
      )
        .then((response) => {
          this.FindDamageTypeByEquipmentID = response.data;
          this.statusdamage = response.data[0].status;
        })
        .catch((error) => {
          console.log("error :", error);
        });
      this.dialogTEC = true;
    },
    validerIT(item) {
      this.dialogIT = true;
    },
    cancelTEC() {
      this.modelTEC.pop();
      this.dialogTEC = false;
    },
    cancelIT() {
      this.modelIT.pop();
      this.dialogIT = false;
    },
    damageFunction() {
      this.setDAMAGEAction().then(() => {
        this.damage = [...this.getdamage];
      });
    },
    validerDamages() {
      var formData = new FormData();
      formData.append("file", this.file);
      formData.append(
        "damage",
        parseFloat(this.FindDamageTypeByEquipmentID[0].id)
      );
      formData.append(
        "description",
        this.FindDamageTypeByEquipmentID[0].description
      );

      CustomizedAxios.post("Picture/upload", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
