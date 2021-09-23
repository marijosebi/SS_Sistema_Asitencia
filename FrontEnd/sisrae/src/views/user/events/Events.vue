<template>
  <div>
    <h2>Eventos en carperta Usuario
      
    </h2>
    <!-- <div >
      <b-row>
        <b-col></b-col>
         <b-col></b-col>
        <b-col>
          <b-row  v-if="filter.state">
            <b-col
              ><label for="datepicker-init">Inicio</label>
              <b-form-datepicker
                id="datepicker-init"
                v-model="filter.date.init"
                class="mb-2"
                 placeholder="dd/mm/yy" 
                  :date-format-options="{ year: '2-digit', month: '2-digit', day: '2-digit'}"
              ></b-form-datepicker
            ></b-col>
            <b-col>
              <label for="datepicker-end">Fin</label>
              <b-form-datepicker
                id="datepicker-end"
                v-model="filter.date.end"
                class="mb-2"
                 placeholder="dd/mm/yy" 
                  :date-format-options="{ year: '2-digit', month: '2-digit', day: '2-digit'}"
              ></b-form-datepicker>
            </b-col>
          </b-row>
        </b-col>
        <b-col><b-button title="Filtros">
            <b-icon
              icon="filter"
              v-if="!filter.state"
              @click="toggleState()"
            ></b-icon>
            <b-icon icon="x" v-if="filter.state" @click="toggleState()"></b-icon>
          </b-button></b-col>
      </b-row>
    </div>-->
    <div
      v-if="state == 'form'"
      class="mx-auto"
      style="width: 75%; margin-top: 25px"
    >
      <b-card-group columns>
        <b-card
          v-for="(element, index) in elements"
          :key="element.index"
          :header="element.type"
        >
          <b-card-title class="medium">{{ element.title }}</b-card-title>

          <div class="mb-3 text-right small">
            <a v-b-toggle :href="'#schedule' + index" @click.prevent>Horario</a>
          </div>

          <b-collapse :id="'schedule' + index">
            <b-table :items="element.schedule" :fields="fields">
              <template #cell(date)="data">{{getDate(data.item.date)}} </template>
               <template #cell(duration)="data">{{data.item.duration}} min. </template>
            </b-table>
          </b-collapse>

          <b-card-text class="small text-muted text-left">{{
            element.organizer.area.name
          }}</b-card-text>
          <b-card-text class="small text-muted text-left">{{
            element.location
          }}</b-card-text>

          <div class="mb-3 text-right small">
            <a v-b-toggle :href="'#details' + index" @click.prevent>Ver más</a>
          </div>

          <b-collapse :id="'details' + index">
            <b-card-text class="small text-muted text-left"
              >Descripción: {{ element.description }}</b-card-text
            >
            <b-card-text class="small text-muted text-center">
              <b-button
                variant="primary"
                :href="'/asistencia/' + encodeURIComponent(element.code)"
                >Registar asistencia</b-button
              >
            </b-card-text>
          </b-collapse>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import { api } from "../../../variables.js";
import axios from "axios";
import moment from "moment";
export default {
  name: "Register",
  data() {
    return {
      state: "form",
      filter: {
        date: {},
      },
      fields:[{
          key: "date",
          label: "Fecha",
        },{
          key: "duration",
          label: "Duración",
        },],
      elements: {},
      assistent: {},
      options: ["Interno", "Externo"],
    };
  },
  mounted() {},
  methods: {
    getDate(date) {
     
       return moment(date).format("DD/MM/YYYY HH:mm:ss");
   
     
    },

    toggleState(state) {
      return !state;
    },
    to() {
      window.location.href =
        "http://localhost:8080/constancy/" +
        encodeURIComponent(this.elements.invoice);
    },
    getData() {
      axios.get(api + "event/").then((result) => {
        console.log(result.data.data);
        this.elements = result.data.data;
      });
    },
  },
  created() {
    this.getData();
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
