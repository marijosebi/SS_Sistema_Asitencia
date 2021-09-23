<template>
  <div>
    <br>
    <h1>Contancias</h1>
    <br>
    <div>
      <!-- Botones del tipo de documento -->
    </div>
    <b-card header="Constancias">
      <div class="text-right"></div>

      <b-table striped hover sticky-header :items="element" :fields="fields" >
        <template #cell(date)="data">
          {{ dateFormatter(data.item.date) }}
        </template>
        <template #cell(file)="data">
          <b-button title="Descargar" @click="download(data.item)">
           <b-icon icon="file-arrow-down" aria-hidden="true"></b-icon>
        </b-button>
        </template>
         <template #cell(actions)="data">
              <b-button size="sm" class="mb-2" @click="data">
      <b-icon icon="x" aria-hidden="true"></b-icon> 
    </b-button>
     
            </template>
             <template #cell(state)="data">
          
           <b-form-checkbox
            v-if="data.state"
            v-model="data.state"
            name="state"
            button
         button-variant="success"

           size="sm"
          >
           <b-icon
                title="Activo"
                  icon="check"
                  aria-hidden="true"
                 
                ></b-icon>
           
        </b-form-checkbox>

         <b-form-checkbox
          v-if="!data.state"
            v-model="data.state"
            name="state"
            button

         button-variant="danger"
          size="sm"
          >
           <b-icon
                title="Inactivo"
                  icon="x"
                  aria-hidden="true"
                 
                ></b-icon>
           
        </b-form-checkbox>
      </template>
      </b-table>

      <br />
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ConstanciasUA",
  data() {
    return {
      btn_const: true,
      state: [],
      element: {},
      departments: [],
      fields: [
        {
          key: "invoice",

          label: "Folio",
        },
        {
          key: "date",

          label: "Fecha de Expedición",
        },
        {
          key: "state",

          label: "Estado",
        },
        {
          key: "file",

          label: "Archvivo",
        },
        {
          key: "actions",

          label: "",
        },
      ],
    };
  },
  computed: {
    departmentGetter: function (object, look) {
      // `this` points to the vm instance
      console.log(object[look]);
      return "m";
    },
  },

  props: {
    id: String,
  },

  methods: {
    download(data)
    {   var moment = require("moment");
      data.reprint=moment().format("DD/MM/YYYY hh:mm:ss a");
console.log(data)
    },
    dateFormatter(date) {
      var moment = require("moment");
      return moment(date).format("DD/MM/YYYY");
    },
    getData() {
      axios
        .get("http://localhost:8081/api/constancy-filter/" + this.id)
        .then((result) => {
          this.element = result.data.data;
          this.filterData(this.element);
        });
      this.element.assistent = this.id;
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
