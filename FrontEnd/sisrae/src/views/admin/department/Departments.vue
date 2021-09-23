<template>
  <div class="hello">

     <br>
    <div>
      <h1>DEPARTAMENTOS</h1>
    </div>
    <br>
      <div class="text-right w-100">
        <!-- Change link to new register -->
        <b-link href="/admin/registroDepartamento"> 
        <!-- En el boton debe de ir al registro totalmente vacio , sustituri 1 por un id-->
        <b-button size="sm" class="mb-2" v-b-modal.new-modal>
          <b-icon icon="plus" aria-hidden="true"></b-icon> Registrar departamento
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
</template>

<script>
import {api } from '../../../variables.js'
export default {
  name: "Department",
  data() {
    return {
      elements: {},
      fields: [

       {
          key: "selection",
           sortable: true,
          label: "Selección",
        },

        {
          key: "_id",
           sortable: true,
          label: "Tipo",
        },
        {
          key: "name",
          sortable: true,
          label: "Nombre",
        },
        {
          key: "areas",
          sortable: true,
          label: "Areas",
        },
        
        {
          key: "del",
          sortable: true,
          label: "Eliminar",
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
           window.location.href = 'http://localhost:8080/admin/departamento/'+id;
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
      this.$http.get(api+"/department").then(
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
