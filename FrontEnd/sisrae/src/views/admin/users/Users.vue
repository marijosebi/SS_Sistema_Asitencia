<template>
  <div class="hello">

     <br>
    <div>
      <h1>USUARIOS</h1>
    </div>
    <br>
      <div class="text-right w-100">
        <!-- Change link to new register -->
        <b-link href="/admin/usuario/1"> 
        <!-- En el boton debe de ir al registro totalmente vacio , sustituri 1 por un id-->
        <b-button size="sm" class="mb-2" v-b-modal.new-modal>
          <b-icon icon="plus" aria-hidden="true"></b-icon> Registrar usuario
        </b-button>
        </b-link>
      </div>
<br>
 
      <b-table
        striped
        hover
        :items="elements"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        @row-clicked="rowClickHandler"
      >

             <!-- Check box  selection -->
        <template #cell(select)="data">
          <b-form-checkbox  v-model="data.item.select" name="active" >
          </b-form-checkbox>
        </template>   
        
        <!-- Eliminar -->
        <template #cell(del)="data">
        <b-link href="/admin/usuario/" + _id> 
        <!-- En el boton debe de ir al registro totalmente vacio -->
           <b-button   v-model="data.item.del" size="sm" class="mb-2" v-b-modal.new-modal  variant="danger">
              <!-- <b-icon icon="X" aria-hidden="true"></b-icon> -->
              Eliminar
          </b-button>
        </b-link>
        </template>
      
      </b-table>
      
 
  </div>
</template>

<script>
import {api } from '../../../variables.js'
export default {
  name: "HelloWorld",
  data() {
    return {
      elements: {},
      fields: [
          {
          key: "select",
           sortable: true,
          label: "",
        },
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
        //Nombre en bd tiene espacio
        {
          key: "information.name.second name",
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
      input: {
        firstname: "",
        lastname: "",
      },
      response: "",
    };
  },

  methods: {
    to(id)
        {
           window.location.href = 'http://localhost:8080/admin/usuario/'+id;
        },
    rowClickHandler(record)  
    {
      this.to(record._id);

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
      this.$http.get(api+"/user").then(
        (result) => {
          this.elements = result.data.data;
          console.log(this.elements);
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
  created() {
    this.getData();
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
