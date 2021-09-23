<template>
  <div>
    <b-card header="Constancia">
      <b-form>
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col
                    ><label class="sr-only">Folio </label>
                    <b-form-input
                      class="mb-2 mr-sm-2 mb-sm-0"
                      v-model="element.invoice"
                      disabled="false"
                    ></b-form-input>
                    <!--  {{element.unit.code +'/'+element.department.code + '/'+ element.invoice + '/'+element.date}}-->
                  </b-col>
                  <b-col> </b-col>
                  <b-col> </b-col>
                  <b-col
                    ><label class="sr-only">Fecha de Expedición</label>
                    {{ dateFormatter(element.date, "DD/MM/YYYY") }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    ><label
                      class="sr-only"
                      v-if="element.assistent.type == 'Estudiante'"
                      >Boleta</label
                    >
                    <label
                      class="sr-only"
                      v-if="element.assistent.type != 'Estudiante'"
                      >Número de Empleado</label
                    >
                    <b-form-input
                      class="mb-2 mr-sm-2 mb-sm-0"
                      v-model="element.assistent.user"
                      disabled="false"
                    ></b-form-input
                  ></b-col>
                  <b-col
                    ><label class="sr-only">Apellido Paterno</label>
                    <b-form-input
                      class="mb-2 mr-sm-2 mb-sm-0"
                      v-model="element.assistent.information.name.firstname"
                      disabled="false"
                    ></b-form-input
                  ></b-col>
                  <b-col
                    ><label class="sr-only">Apellido Materno</label>
                    <b-form-input
                      class="mb-2 mr-sm-2 mb-sm-0"
                      v-model="element.assistent.information.name.secondname"
                      disabled="false"
                    ></b-form-input
                  ></b-col>
                  <b-col
                    ><label class="sr-only">Nombre(s)</label>
                    <b-form-input
                      class="mb-2 mr-sm-2 mb-sm-0"
                      v-model="element.assistent.information.name.name"
                      disabled="false"
                    ></b-form-input
                  ></b-col>
                </b-row>
              </b-container>
              <b-table
                v-if="element.type == '1'"
                :items="element.events"
                :fields="fields"
              >
                <template #cell(count)="data">
                  {{ data.index + 1 }}
                </template>
                <template #cell(date)="data">
                  {{ getDate(data.item.schedule) }}
                </template>
                <template #cell(hours)="data">
                  {{ calculateHours(data.item.schedule) }}
                </template>
              </b-table>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col></b-col>
                  <b-col></b-col>
                  <b-col>Horas totales:</b-col>
                  <b-col> {{ total_hours() }}</b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
var moment = require("moment");
export default {
  name: "Events",
  data() {
    return {
      btn_const: true,
      element: {},
      hours: 0,
      fields: [
        {
          key: "count",

          label: "#",
        },
        {
          key: "title",

          label: "Evento",
        },
        {
          key: "location",

          label: "Ubicación",
        },

        {
          key: "period.code",

          label: "periodo",
        },
        {
          key: "date",

          label: "Fecha",
        },
        {
          key: "hours",

          label: "Horas",
        },
      ],
    };
  },
  components: {},
  props: {
    id: String,
  },
  computed: {},
  methods: {
    dateFormatter(date, format) {
      return moment(date).format(format);
    },
    total_hours() {
      var hours = 0;
      this.element.events.forEach((element) => {
        // console.log(element.schedule)
        element.schedule.forEach((e) => {
          hours += e.duration;
          console.log(e.duration);
        });
      });
      return hours / 60;
    },
    getDate(obj) {
      var dates = [];
      obj.forEach((element) => {
        dates.push(moment(element.date).format("DD/MM/YYYY"));
      });
      let date = dates.filter((item, index) => {
        return dates.indexOf(item) === index;
      });
      var text = "";
      for (var i = 0; i < date.length; i++) {
        text += date[i] + " ";
      }
      /*if(date.length>1)
return date[0]+'-'+date[date.length-1]*/
      return text;
    },
    calculateHours(obj) {
      var hours = 0;
      obj.forEach((element) => {
        hours += element.duration;
      });
      return hours / 60;
    },
    getData() {
      var invoice = this.$route.params.invoice;
      axios
        .get(
          "http://localhost:8081/api/constancy/" + encodeURIComponent(invoice)
        )
        .then((result) => {
          this.element = result.data.data;
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
