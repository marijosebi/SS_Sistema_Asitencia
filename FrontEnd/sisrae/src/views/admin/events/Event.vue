<template>
<!-- Event form and register form  -->
  <div>
    <div class="text-left">
      <b-link href="../eventos">Eventos</b-link> / {{ element.code }}
      <!-- Ensegida extraer los datos del elemento seleccionado como el nombre por ejemplo -->
    </div>
      <!-- <b-col class="text-rigth"> -->
        <!-- Edicion y eliminar elemento
            <label>Edición</label>
            <br />
            <b-button v-if="!element.edit" @click="toggleState"
              ><b-icon icon="dash"></b-icon> Inactivo
            </b-button>
            <b-button variant="success" v-if="element.edit" @click="toggleState"
              ><b-icon icon="check"></b-icon> Activo
            </b-button>
              <b-button variant="outline-primary">Eliminar</b-button>

          </b-col> -->
    <br />


    <b-card class="text-left" header="Evento">
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="4"
            ><label>Tipo</label>
            <b-form-select
              v-model="element.type"
              :options="catalogs.types"
            ></b-form-select>
          </b-col>
          <b-col cols="6">
            <p></p>
          </b-col>
          <b-col>
            <label>Estado</label>
            <br />
            <b-button v-if="!element.state" @click="toggleState"
              ><b-icon icon="dash"></b-icon> Inactivo
            </b-button>
            <b-button variant="success" v-if="element.state" @click="toggleState"
              ><b-icon icon="check"></b-icon> Activo
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="10"
            ><label>Título</label>
            <b-form-input
              class="mb-2 mr-sm-2 mb-sm-0 text-center" v-model="element.title"
            ></b-form-input>
          </b-col>
        </b-row>
        <div class="mb-3 text-right">
          <b-link v-b-toggle.my-collapse>Ver más</b-link>
        </div>
        <b-collapse id="my-collapse">
          <b-card>
            <b-row>
              <b-col cols="6">
                <label>Ubicación</label>
                <b-form-input
                  class="mb-2 mr-sm-2 mb-sm-0 text-center"
                  v-model="element.location"
                ></b-form-input>
              </b-col>
              <b-col
                ><label>Horario</label>
                <b-container class="bv-example-row">
                  <b-row>
                    <b-col cols="4" class="s-input">
                      <b-form-input
                        type="date"
                        size="sm"
                        v-model="schedule.date"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="4" class="s-input">
                      <b-form-input
                        type="time"
                        size="sm"
                        v-model="schedule.time"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="2" class="s-input">
                      <b-form-input
                        type="number"
                        size="sm"
                        v-model="schedule.duration"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="1">
                      <b-button variant="primary" size="sm" class="mb-2">
                        <b-icon icon="plus" @click="addDate"></b-icon>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="6">
                <label>Descripción</label>
                <b-form-input
                  class="mb-2 mr-sm-2 mb-sm-0 text-center"
                  v-model="element.location"
                ></b-form-input>
              </b-col>
              <b-col>
                <b-container class="bv-example-row">
                  <b-row v-for="(date, index) in element.schedule" :key="date">
                    <b-col cols="4" class="s-input">
                      <b-form-input
                        type="date"
                        size="sm"
                        v-model="date.date"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="4" class="s-input">
                      <b-form-input
                        type="time"
                        size="sm"
                        v-model="date.time"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="2" class="s-input">
                      <b-form-input
                        type="number"
                        size="sm"
                        v-model="date.duration"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="1">
                      <b-button
                        variant="primary"
                        size="sm"
                        class="mb-2"
                        @click="supr(index)"
                      >
                        <b-icon icon="x" aria-label="Help"></b-icon>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-col>
            </b-row>
          </b-card>
        </b-collapse>
      </b-container>
    </b-card>

    <br />

    <b-card header="Asistencia">
      <b-form>
        <b-container class="bv-example-row">
          <b-row>
            <b-col cols="8">
              <b-table :fields="fields"> </b-table>
            </b-col>
            <b-col cols="4">
              <b-card>
                <b-card>
                  <br />
                  <b-button>
                    <b-icon icon="upc-scan" aria-label="Help"></b-icon>
                  </b-button>
                  <!-- <QrReader></QrReader>-->
                  <br />
                </b-card>
                <br />
                <div>
                  <b-tabs content-class="mt-3">
                    <b-tab title="Interno" active
                      ><div>
                        <br>
                        <label>No. Boleta / No. Empleado</label>
                        <b-form-input
                          size="sm"
                          v-model="assistent.pk"
                        ></b-form-input>
                      </div>
                      <br>
                      <b-button>Registrar</b-button>
                    </b-tab>
                    <b-tab title="Externo"><p>I'm the second tab</p></b-tab>
                  </b-tabs>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
    </b-card>
  </div>
</template>
<script>
import { eventsTypes } from "../../../variables.js";
//import QrReader from "../../public/register/qr-reader.vue";
import axios from "axios";
export default {
  name: "Event",
  components:
  {//QrReader
  },
  data() {
    return {
      element: {
        schedule: [],
        state: false,
        edit: false,
      },
      assistent: {},
      schedule: {},
      catalogs: {
        unit: [],
        types: eventsTypes,
      },
      fields: [
        {
          key: "period",

          label: "Periodo",
        },
        {
          key: "title",

          label: "Título",
        },
        {
          key: "schedule",

          label: "Fecha",
        },
        {
          key: "organizer.area",

          label: "Área",
        },
        {
          key: "assistence",

          label: "Asistencia",
        },
        {
          key: "state",

          label: "Estado",
        },
      ],
    };
  },
  mounted() {
    this.getPeriod();
    this.getUnit();
  },
  methods: {
    supr(index) {
      this.element.schedule.splice(index, 1);
    },
    ///Observacion aqio    
    toggleState() {
      this.element.state = !this.element.state;
    },
    addDate() {
      this.element.schedule.push(this.schedule);
      this.schedule = {};
    },
    async getData() {
      await axios.get("http://localhost:8081/api/event/"+this.$route.params.id).then((result) => {
        this.element = result.data.data;
      });
    },
    async getPeriod() {
      await axios.get("http://localhost:8081/api/period/").then((result) => {
        this.catalogs.period = result.data.data;
      });
    },
    async getUnit() {
      await axios.get("http://localhost:8081/api/unit/").then((result) => {
        this.catalogs.unit = result.data.data;
      });
    },
    getDepa(unit) {
      if (this.catalogs.unit.length) console.log(unit);
      this.catalogs.unit.forEach((element) => {
        if (element._id == unit) {
          console.log(element._id);
          this.catalogs.department = element.departments;
          return null;
        }
      });
      return [];
    },
  },
  created() {
    if (this.$route.params.id == "nuevo") {
      this.element.code = "Nuevo";
      console.log(this.element.code);
    } else this.getData();
  },
};
</script>

<style scoped>
.s-input {
  padding-left: 0px;
  padding-right: 0px;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

textarea {
  width: 600px;
  height: 200px;
}
</style>
