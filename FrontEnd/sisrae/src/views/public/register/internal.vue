<template>
  <div>
    <b-card header="Información">
      <b-form @submit.stop.prevent="add">
        <b-container>
          <b-row>
            <b-col>
              <b-form-group
                id="example-input-group-1"
                label="Soy:"
                label-for="input-1"
              >
                <b-form-select
                  id="input-1"
                  v-model="assistent.type"
                  :options="catalogs.types"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="9"></b-col>
          </b-row>
          <br>
          <b-row>
            <b-col>
              <b-form-group id="input-group-2">
                <label v-if="assistent.type == 'Estudiante'">Boleta</label>
                <label v-if="assistent.type != 'Estudiante'">No.Empleado</label>
                <b-form-input
                  class="mb-2 mr-sm-2 mb-sm-0 text-center"
                  v-model="assistent.user"
                  required
                  disabled
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6"
              ><label>Unidad</label>
              <b-form-select v-model="assistent.unit" required>
                <b-form-select-option
                  v-for="unit in catalogs.units"
                  :key="unit.index"
                  :value="unit"
                  >{{ unit.name }}</b-form-select-option
                >
              </b-form-select>
            </b-col>
            <b-col v-if="assistent.type == 'Estudiante'"
              ><label>Programa</label>
              <b-form-select
                v-model="assistent.program"
                v-if="assistent.unit != null"
                required
              >
                <b-form-select-option
                  v-for="program in assistent.unit.programs"
                  :key="program.index"
                  :value="program"
                  >{{ program.name }}</b-form-select-option
                >
              </b-form-select>
            </b-col>
          </b-row>
          <br>
          <br />
          <b-row>
            <b-col
              ><label>Nombre</label>
              <b-form-input
                required
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                v-model="name.name"
              ></b-form-input>
            </b-col>
            <b-col>
              <label>Apellido Paterno</label>
              <b-form-input
                required
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                v-model="name.firstname"
              ></b-form-input>
            </b-col>
            <b-col
              ><label>Apellido Materno</label>
              <b-form-input
                required
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                v-model="name.secondname"
              ></b-form-input>
            </b-col>
          </b-row>
<br>
          <b-row>
            <b-col>
              <label>Fecha de Nacimiento</label>
              <b-form-input
                required
                placeholder="dd/mm/yyyy"
                v-model="assistent.birthdate"
              ></b-form-input>
            </b-col>
            <b-col>
              <label>Edad</label>
              <b-form-input
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                :value="calculateAge(assistent.birthdate)"
                disabled
              ></b-form-input>
            </b-col>
            <b-col>
              <label class="">Genero</label>
              <b-form-radio-group
                id="gender"
                required
                v-model="assistent.gender"
                :options="catalogs.gender"
                name="gender"
              ></b-form-radio-group>
            </b-col>
            <b-col>
              <label class="">Sexo</label>
              <b-form-radio-group
                id="sex"
                required
                v-model="assistent.sex"
                :options="catalogs.sex"
                name="sex"
              ></b-form-radio-group>
            </b-col>
          </b-row>
          <br>
        </b-container>
        <div class="text-right">
           <b-button @click="cancel()">Cancelar</b-button>
           <b-button type="submit" variant="primary">Registrar</b-button>
       
         
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { gender, userTypes, api, sex } from "../../../variables.js";
import qs from "qs";
import axios from "axios";
import moment from "moment";
export default {
  name: "Register",
  data() {
    return {
      state: false,
      assistent: this.data,
      name: {},
      options: ["Interno", "Externo"],
      catalogs: {
        gender: gender,
        sex: sex,
        types: userTypes,
      },
    };
  },
  props: {
    data: Object,
  },

  methods: {
    calculateAge(date) {
      var moment = require("moment");
      return moment().diff(date, "years");
    },
    getUnits() {
      axios.get(api + "unit/").then((result) => {
        this.catalogs.units = result.data.data;
        console.log(result.data.data);
      });
    },
    add() {
      console.log(
        moment(this.assistent.birthdate).format("YYYY-MM-DD h:mm:ss")
      );
      var user = {
        user: this.assistent.user,
        pass: this.assistent.user,
        type: this.assistent.type,
        state: this.assistent.state,
        info: {
          name: this.name,
          gender: this.assistent.gender,
          sex: this.assistent.sex,
          birthdate: moment(this.assistent.birthdate).format("YYYY-MM-DD"),
          unit: this.assistent.unit._id,  
        },
      };
      if(this.assistent.type=='Estudiante')
      user.info.program= this.assistent.program._id
      axios
        .post(api + "user/", qs.stringify(user), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((result) => {
          console.log(result.data);
          result.data.status == 200
            ? this.$emit("successReg", true, result.data.data)
            : alert("Error");
          return true;
        });
    },
    cancel()
    {
      this.$emit("cancelEvent",true)
    }
  },
  created() {
    this.getUnits();
  },
};
</script>
<style scoped>
.card-header {
  text-align: left !important;
}
.text-right {
  text-align: right !important;
}
.text-left {
  text-align: left !important;
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
