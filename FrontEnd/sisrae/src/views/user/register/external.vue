<template>
  <div>
    <b-form @submit.stop.prevent="add">
      <b-row>
        <b-col
          ><label class="">Nombre(s)</label>
          <b-form-input
            required
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="name.name"
          ></b-form-input>
        </b-col>
        <b-col>
          <label class="">Apellido Paterno</label>
          <b-form-input
            required
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="name.firstname"
          ></b-form-input>
        </b-col>
        <b-col>
          <label class="">Apellido Materno</label>
          <b-form-input
            required
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="name.secondname"
          ></b-form-input>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col>
          <label class="">Genero</label>
          <b-form-radio-group
            id="gender"
            v-model="assistent.gender"
            :options="catalogs.genders"
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
        <b-col>
          <label class="">Fecha de Nacimiento</label>
          <b-form-input
            required
            placeholder="dd/mm/yyyy"
            v-model="assistent.birthdate"
          ></b-form-input>
        </b-col>
      </b-row>
      <br>
      <b-roW>
        <b-col>
          <label class="">Procedencia</label>
          <b-form-input
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="assistent.procedencia"
          ></b-form-input>
        </b-col>
      </b-row>
      <br>
      <div class="text-right">
        <b-button type="submit" variant="primary">Registrar</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>

import { gender, api, sex } from "../../../variables.js";
import qs from "qs";
import axios from "axios";
import moment from "moment";
export default {
  name: "ExternalForm",
  data() {
    return {
      assistent: this.data,
      catalogs:{genders: gender,sex:sex},
      name:{}
    };
  },
  props:
  {
    data:Object
  },
  components: {
  },
  methods: {
    toggledSuccess(state) {
      state ? (this.state = "success") : (this.state = "form");
    },

    add() { 
    
      var user = {
          name: this.name,
          gender: this.assistent.gender,
          sex: this.assistent.sex,
          birthdate: moment(this.assistent.birthdate).format("YYYY-MM-DD"),
          procedencia:this.assistent.procedencia
      };
      axios
        .post(api + "register-assistence-external/", qs.stringify({assistent:user,event:this.assistent.event}), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((result) => {
          console.log(result.data);
          result.data.status == 200
            ? this.$emit("successReg", true,{information:  result.data.data})
            : alert("Error");
          return true;
        });},

  },
};
</script>
<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
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
