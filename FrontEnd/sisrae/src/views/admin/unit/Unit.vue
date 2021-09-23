<template>
<!-- Events table and state -->
  <div class="mx-auto text-center" >
    <br>
    <h1>Unidades</h1>
      <div class="text-right w-100">
         <b-link href="/admin/registroUnidad"> 
        <b-button size="sm" class="mb-2" v-b-modal.new-modal variant="">
          <b-icon icon="plus" aria-hidden="true"></b-icon> Registrar unidad
        </b-button></b-link>
      </div>
      <br>
  <!-- Table -->
  <!-- No forget the chekbox of  select form report -->
  <div  class="mx-auto text-center"	>
      <b-table   striped  :items="elements" :fields="fields" >

        <template #cell(editar)="data">
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


  <!-- Check y botones -->
      <!-- Check box  selection -->
        <template #cell(select)="data">
          <b-form-checkbox  v-model="data.item.select" name="active" >
          </b-form-checkbox>
        </template>   

        <template #cell(del)="data">
        <b-link href="/admin/evento/1"> 
        <!-- En el boton debe de ir al registro totalmente vacio -->
           <b-button   v-model="data.item.del" size="sm" class="mb-2" v-b-modal.new-modal  variant="danger">
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

          label: "Seleccion",
        },

        {
          key: "_id",

          label: "id",
        },

        {
          key: "code",

          label: "Código",
        },

    
        {
          key: "name",
          label: "Nombre",
        },
        {
          key: "programs",
          label: "Programas",
        },
        {
          key: "del",

          label: "Eliminar",
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
      await axios.get("http://localhost:8081/api/unit/").then((result) => {
        this.elements = result.data.data;
      });
    },
    // async getPeriod() {
    //   await axios.get("http://localhost:8081/api/period/").then((result) => {
    //     this.catalogues.period = result.data.data;
    //   });
    // },
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
