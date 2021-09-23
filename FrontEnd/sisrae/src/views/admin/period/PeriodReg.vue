<template>
<!-- Event form and register form  -->
  <div>
   
   <!-- <div class="text-left">
      <b-link href="../admin/areas">Áreas</b-link>
       {{ element.code }}
    </div>    -->

    <!-- <br/>
    <h1>REGISTRO DE PERIODOS</h1>
    <br>
    <br> -->

    <b-card class="text-left" header="Registro">
      <b-container class="bv-example-row">
        <b-form>
          
         <b-row>
          <b-col cols="10"
            ><label>Código</label>
            <b-form-input
              class="mb-2 mr-sm-2 mb-sm-0 text-center" 
              v-model="element.code"
              placeholder="Nombre del área"
              required
            ></b-form-input>
          </b-col>
        </b-row> 
        
         <br>

        <b-row>
            <b-col
                >
                <b-container class="bv-example-row">
                  <b-row>
                    <b-col cols="4" class="s-input">
                        <label>Fecha de inicio</label>
                      <b-form-input
                        type="date"
                        size="md"
                        v-model="schedule.date1"
                      ></b-form-input>
                    </b-col>

                    


                  </b-row>
                </b-container>
              </b-col>
        </b-row>

    
        <br>
        <b-row>
          <b-col cols="10">
              <button block type="submit" class="btn btn-secondary" >Registrar</button>
          </b-col>
          
        </b-row>

        
      


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
  name: "Registro Área",
  components:
  {//QrReader
  },
  data() {
    return {
      element: {
        // schedule: [],
        // state: false,
        // edit: false,
        code:"",
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
          key: "code",
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
