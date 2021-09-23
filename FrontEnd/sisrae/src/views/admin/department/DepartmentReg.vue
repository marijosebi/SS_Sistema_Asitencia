<template>
<!-- Event form and register form  -->
  <div>
   
   <div class="text-left">
      <b-link href="../admin/departamentos">Departamentos</b-link> /
       <!-- {{ element.code }} -->
      <!-- Ensegida extraer los datos del elemento seleccionado como el nombre por ejemplo -->
    </div>   

    <br>
    <h1>REGISTRO DE DEPARTAMENTOS</h1>
    <br>
    <br>

    <b-card class="text-left" header="Registro">
      <b-container class="bv-example-row">
        <b-form>
          
         <b-row>
          <b-col cols="10"
            ><label>Nombre</label>
            <b-form-input
              class="mb-2 mr-sm-2 mb-sm-0 text-center" 
              v-model="element.name"
              placeholder="Nombre del departarmento"
              required
            ></b-form-input>
          </b-col>
        </b-row> 
        
         <br>
       
        <b-row>
          <b-col cols="8">
            <label>Áreas</label>
            <b-form-select
              v-model="element.area"
              :options="catalogs.areas"
            >  
          
          </b-form-select>
<!-- v-model="data.item.edit" -->
        
          </b-col>
          <b-col cols="">
          <label></label><br/>
                <b-button  class="mb-3" v-b-modal.new-modal>
                <b-icon icon="plus" aria-hidden="true"></b-icon> Nueva área
            </b-button>
          </b-col>

        </b-row>
        <br>
        <b-row>
          <b-col cols="8">
    <!-- Styled -->
            <label>Logotipo</label>              
            <b-form-file
              v-model="file1"
              :state="Boolean(file1)"
              placeholder="Logotipo en formato JPG o PNG"
              drop-placeholder="Adjuta el archivo aquí ..."
            ></b-form-file>
            <div class="mt-3">Archivo seleccionado: {{ file1 ? file1.name : '' }}</div>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col cols="10">
              <button block type="submit" class="btn btn-secondary" >Registrar</button>
          </b-col>
          
        </b-row>

        
      
        <div class="mb-3 text-right">
          <b-link v-b-toggle.my-collapse>Ver areas</b-link>
        </div>

        <!-- Here we are -->
      </b-form>
      </b-container>
    </b-card>
    
    

    <br />
  </div>
</template>

<script>

// import { eventsTypes } from "../../../variables.js";
//import QrReader from "../../public/register/qr-reader.vue";
import axios from "axios";
export default {
  name: "Departamento",
  components:
  {//QrReader
  },
  data() {
    return {
      element: {
        // schedule: [],
        // state: false,
        // edit: false,
        file1: null,
        areas: null
      },
      assistent: {},
      schedule: {},
      
      catalogs: {
        // unit: [],
      // areas: "array de areas",
      areas: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],

      },

      fields: [
        {
          key: "name",
          label: "Título",
        },
        {
          key: "organizer.area",
          label: "Área",
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
