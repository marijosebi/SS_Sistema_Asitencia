<template>
  <div class="hello">

     <br>
    <div>
      <h1>Periodo</h1>
    </div>
    <br>
    
    <div class="text-right w-100">
            <!-- Change link to new register -->
            <b-link href="/admin/registroPeriodo"> 
            <!-- En el boton debe de ir al registro totalmente vacio , sustituri 1 por un id-->
            <b-button size="sm" class="mb-2" v-b-modal.new-modal>
              <b-icon icon="plus" aria-hidden="true"></b-icon> Registrar periodo
            </b-button>
            </b-link>
          </div>
    <b-card>
     
<br>
<br>
    <RegistroPeriodo></RegistroPeriodo>
<br>
 <hr>
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
      </b-card>
    
 
  </div>
</template>

<script>
import {api } from '../../../variables.js'
import RegistroPeriodo from "../../admin/period/PeriodReg.vue";

export default {
  name: "HelloWorld",
  components:{
      RegistroPeriodo
  },
  data() {
    return {
      elements: {},
      fields: [
         {
          key: "select",
          sortable: true,
          label: "Check",
        },
        {
          key: "_id",
          sortable: true,
          label: "ID de Documento",
        },
        {
          key: "code",
          sortable: true,
          label: "Código",
        },
                {
          key: "date",
           sortable: true,
          label: "Date-Fecha",
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
          ///Redireccionar en cuanto se acomode 
           window.location.href = 'http://localhost:8080/admin/period/'+id; //Put a popUp de Crear periodo
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
      this.$http.get(api+"/period").then(
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
