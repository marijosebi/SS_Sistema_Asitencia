<template>
  <div>
    <b-card no-block>
      <div class="text-right">
        <h1>Admini> user> event</h1>
        <b-button size="sm" class="mb-2" v-b-modal.new-modal>
          <b-icon icon="plus" aria-hidden="true"></b-icon> Nuevo
        </b-button>
      </div>
      <b-table striped hover :items="elements" :fields="fields" responsive>
        <template #cell(title)="data">
         
          <b-form-input
          v-model="data.item.title"
          type="email"
          placeholder="Título del evento"
          required
        ></b-form-input>
        </template>

         <template #cell(schedule)="data">
    <b-form inline>
          <b-form-datepicker id="example-datepicker" v-model="data.item.schedule"  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>
              <b-form-timepicker v-model="data.time" locale="en"></b-form-timepicker>
    </b-form>
        </template>

        <template #cell(period)="data">
          <b-form-select v-model="data.item.period">
            <b-form-select-option
              v-for="period in catalogues.period"
              :key="period.index"
              :value="period._id"
            >
              {{ period.code }}
            </b-form-select-option>
          </b-form-select>
        </template>
        <template #cell(unit)="data">
          <b-form-select v-model="data.item.organizer.unit">
            <b-form-select-option
              v-for="unit in catalogues.unit"
              :key="unit.index"
              :value="unit._id"
            >
              {{ unit.code }}
            </b-form-select-option>
          </b-form-select>
        </template>
        <template #cell(assistence)="data">
          <b-form-checkbox v-if="data.item.assistence" v-model="data.item.assistence" name="active" button size="sm" button-variant="success">
            <b-icon title="Abierta" icon="circle" aria-hidden="true"></b-icon>
          </b-form-checkbox>
          <b-form-checkbox v-if="!data.item.assistence" v-model="data.item.assistence" name="inactive" button size="sm" button-variant="danger">
           <b-icon title="Cerrada" icon="circle" aria-hidden="true"></b-icon>
           
        </b-form-checkbox>
        </template>
          <template #cell(state)="data">
          <b-form-checkbox v-if="data.item.state" v-model="data.item.state" name="active" button size="sm" button-variant="success">
            <b-icon title="Abierta" icon="check" aria-hidden="true"></b-icon>
          </b-form-checkbox>
          <b-form-checkbox v-if="!data.item.state" v-model="data.item.state" name="inactive" button size="sm" button-variant="danger">
           <b-icon title="Cerrada" icon="x" aria-hidden="true"></b-icon>
        </b-form-checkbox>
    
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Users",
  data() {
    return {
      elements: [],
      catalogues: {
        unit: [],
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
    async getData() {
      await axios.get("http://localhost:8081/api/event/").then((result) => {
        this.elements = result.data.data;
      });
    },
    async getPeriod() {
      await axios.get("http://localhost:8081/api/period/").then((result) => {
        this.catalogues.period = result.data.data;
      });
    },
    async getUnit() {
      await axios.get("http://localhost:8081/api/unit/").then((result) => {
        this.catalogues.unit = result.data.data;
      });
    },
    getDepa(unit) {
      if (this.catalogues.unit.length) console.log(unit);
      this.catalogues.unit.forEach((element) => {
        if (element._id == unit) {
          console.log(element._id);
          this.catalogues.department = element.departments;
          return null;
        }
      });
      return [];
    },
  },
  created() {
    this.getData();
    // this.getPeriod()
  },
};
</script>
<style scoped>
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