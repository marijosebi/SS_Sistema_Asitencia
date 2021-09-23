<template>
  <div>
    <b-card class="text-left"
      header="Usuario"
    >
     <b-form>
        <b-container class="bv-example-row">
          <b-row>
            <b-col
              ><label class="sr-only" 
                >Usuario</label
              >
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0"
                v-model="element.user"
                disabled="false"
              ></b-form-input
              ><label class="sr-only" 
                >Contraseña</label
              >
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0"
                v-model="element.password"
                disabled="false"
                type="password"
              ></b-form-input>
       
              <PassPopUp :id="this.id"></PassPopUp>
              
            </b-col>
            <b-col>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col
                    ><label class="sr-only" >
                      Estado
                    </label></b-col
                  >
                  <b-col
                    ><b-icon
                      icon="bullseye"
                      :variant="isActive(element.state)"
                    ></b-icon
                  ></b-col>
                  <b-col>{{ isActiveLabel(element.state) }}</b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
    </b-card>

   <br>

    <b-card header="Información">
      <b-form>
        <b-container class="bv-example-row">
          <b-row>
            <b-col
              ><label class="sr-only" >Tipo</label>
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                v-model="element.type"
                disabled="false"
              ></b-form-input>
            </b-col>
             <b-col cols="9"
              ></b-col>
              
          </b-row>
          <b-row>
           <b-col
              ><label class="sr-only" 
                >Boleta</label
              >
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                v-model="element.user"
                disabled="false"
              ></b-form-input>
            </b-col>
            <b-col cols="6"
              ><label class="sr-only" 
                >Unidad</label
              >
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                v-model="element.information.unit.name"
                disabled="false"
              ></b-form-input>
            </b-col>
            <b-col
              ><label class="sr-only" 
                >Programa</label
              >
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                v-model="element.information.program.name"
                disabled="false"
              ></b-form-input>
            </b-col>
          </b-row>
          <br>
          <b-row>
             
            <b-col 
              ><label class="sr-only" 
                >Nombre</label
              >
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                v-model="element.information.name.name"
                disabled="false"
              ></b-form-input>
               </b-col>
            <b-col 
              >
              <label class="sr-only" 
                >Apellido Paterno</label
              >
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                v-model="element.information.name.firstname"
                disabled="false"
              ></b-form-input
              >
              </b-col>
            <b-col 
              ><label class="sr-only" 
                >Apellido Materno</label
              >
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                v-model="element.information.name.secondname"
                disabled="false"
              ></b-form-input
            ></b-col>
          </b-row>
          <b-row>
            
            <b-col >  
              <label class="sr-only" 
                >Fecha de Nacimiento</label
              >
              <b-form-datepicker
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                v-model="element.information.birthdate"
                disabled="false"
                type="date"
                :date-format-options="{ year: 'numeric', month: 'long', day: '2-digit'}"
              ></b-form-datepicker>
            </b-col>
            <b-col >  
               <label class="sr-only" >Edad</label>
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                :value="calculateAge(element.information.birthdate)"
                disabled="false"
              ></b-form-input>
            </b-col>
            <b-col >  
              <label class="sr-only" >Sexo</label>
              <b-form-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0 text-center"
                v-model="element.information.gender"
                disabled="false"
              ></b-form-input>
            
   
 </b-col>
            
          </b-row>
        </b-container>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import PassPopUp from '../user/passPopUp.vue'
import {api } from '../../variables.js'
import axios from "axios";
export default {
  name: "User",
  data() {
    return {

      element: {},
      fields: [
        {
          key: "type",
          sortable: true,
          label: "Tipo",
        },
        {
          key: "user",
          sortable: true,
          label: "Usuario",
        },
        {
          key: "information.name.name",
          sortable: true,
          label: "Nombre",
        },
        {
          key: "information.name.firstname",
          sortable: true,
          label: "Paterno",
        },
        {
          key: "information.name.secondname",
          sortable: true,
          label: "Materno",
        },
        {
          key: "information.gender",
          sortable: true,
          label: "Sexo",
        },
        {
          key: "information.program",
          sortable: true,
          label: "Programa Academico",
        },
        {
          key: "information.unit",
          sortable: true,
          label: "Unidad",
        },
      ],
      options: {
        type: ["Estudiante", "PAEE", "Docente"],
      },
    };
  },
  components:
{
PassPopUp
},
  props: {
    id: String,
  },
  
  methods: {
    calculateAge(date)
    {
      var moment = require("moment");
      return moment().diff(date, 'years');
    },
    isActive(state) {
      var color = state ? "success" : "danger";
      return color;
    },
    isActiveLabel(state) {
      var text = state ? "Activo" : "Desactivado";
      return text;
    },
    sendData() {
      this.$http
        .post("https://httpbin.org/post", this.input, {
          headers: { "content-type": "application/json" },
        })
        .then(
          (result) => {
            this.response = result.data;
          },
          (error) => {
            console.error(error);
          }
        );
    },
    
    getData() {

     axios.get(api+"/user/" + this.id).then((result) => {
      console.log(result.data.data);
      this.element=result.data.data;
    })
     
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style scoped>
.card-header{


  text-align: left!important;

}
.text-right{
  text-align: right!important;
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
