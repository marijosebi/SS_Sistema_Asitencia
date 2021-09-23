<template>
<!-- Template  -->
<!-- Events table and state -->
  <div class="mx-auto text-aling" >
    <br>
    <div>
      <h1>EVENTOS</h1>
    </div>
    <br>

    <div class="text-right w-100">
        <!-- Change link to new register -->
        <b-link href="/admin/evento/1"> 
        <!-- En el boton debe de ir al registro totalmente vacio -->
        <b-button size="sm" class="mb-2" v-b-modal.new-modal>
          <b-icon icon="plus" aria-hidden="true"></b-icon> Nuevo
        </b-button>
        </b-link>
    </div>
    
    <div class="text-right w-100">
        <!-- Change link to new register -->
        <b-link href="/admin/evento/1"> 
        <!-- En el boton debe de ir al registro totalmente vacio -->
        <b-button size="sm" class="mb-2" v-b-modal.new-modal>
          <b-icon icon="download" aria-hidden="true"></b-icon> Generar reporte
        </b-button>
        </b-link>
    </div>

    <br>
  <!-- Table -->
  <!-- No forget the chekbox of  select form report -->
  <div  class="mx-auto text-center"	>
      <b-table   striped  :items="elements" :fields="fields" >
      <!--  <template #cell(title)="data">
         
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
        </template>-->

  <!-- Check box  selection -->
        <template #cell(select)="data">
          <b-form-checkbox  v-model="data.item.select" name="active" >
          </b-form-checkbox>
        </template>     

      <!-- Check box  by assistence -->
        <template #cell(assistence)="data">
          <b-form-checkbox v-if="data.item.assistence" v-model="data.item.assistence" name="active" button size="sm" button-variant="success">
            <b-icon title="Abierta" icon="circle" aria-hidden="true"></b-icon>
          </b-form-checkbox>
          <b-form-checkbox v-if="!data.item.assistence" v-model="data.item.assistence" name="inactive" button size="sm" button-variant="danger">
           <b-icon title="Cerrada" icon="circle" aria-hidden="true"></b-icon>

        </b-form-checkbox>
        </template>
      
          <!-- Ckeck box by event state -->
        <template #cell(state)="data">
          <b-form-checkbox v-if="data.item.state" v-model="data.item.state" name="active" button size="sm" button-variant="success">
            <b-icon title="Abierta" icon="check" aria-hidden="true"></b-icon>
          </b-form-checkbox>
          <b-form-checkbox v-if="!data.item.state" v-model="data.item.state" name="inactive" button size="sm" button-variant="danger">
           <b-icon title="Cerrada" icon="x" aria-hidden="true"></b-icon>
        </b-form-checkbox>
    
        </template>

        <template #cell(edit)="data">
        <b-link href="/admin/evento/1"> 
        <!-- En el boton debe de ir al registro totalmente vacio -->
           <b-button   v-model="data.item.edit" size="sm" class="mb-2" v-b-modal.new-modal>
              <b-icon icon="pencil" aria-hidden="true"></b-icon>
          </b-button>
        </b-link>
        </template>
        
        <template #cell(del)="data">
        <b-link href="/admin/evento/1"> 
        <!-- En el boton debe de ir al registro totalmente vacio -->
           <b-button   v-model="data.item.del" size="sm" class="mb-2" v-b-modal.new-modal variant="danger">
              <!-- <b-icon icon="X" aria-hidden="true"></b-icon> -->
              Eliminar
          </b-button>
        </b-link>

        </template>

        
      </b-table>
  </div>
 
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
          key: "select",

          label: "Selección",
        },
        
        {
          key: "_id",

          label: "id doc",
        },
        
        {
          key: "title",

          label: "Título",
        },

         {
          key: "location",

          label: "Lugar",
        },
        
        // {
        //   key: "period._id",

        //   label: "Periodo",
        // },
       
        // {
        //   key: "schedule.date",

        //   label: "Fecha",
        // },
        // {
        //   key: "organizer.area.name",

        //   label: "Área",
        // },
        {
          key: "assistence",

          label: "Asistencia",
        },

        {
          key: "state",

          label: "Estado",
        },
        {
          key: "edit",

          label: "Editar",
        },
        {
          key: "del",

          label: "Eeliminar",
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
