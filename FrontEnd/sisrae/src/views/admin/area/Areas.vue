<template>
  <div class="hello">

     <br>
    <div>
      <h1>ÁREAS</h1>
    </div>
    <br><br>
      <div class="text-right w-100">
        <!-- Change link to new register -->
        <b-link href="/admin/registroArea"> 
        <!-- En el boton debe de ir al registro totalmente vacio , sustituri 1 por un id-->
        <b-button size="sm" class="mb-2" v-b-modal.new-modal>
          <b-icon icon="plus" aria-hidden="true"></b-icon> Registrar área
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
      </b-table>
      
 
  </div>
</template>

<script>
import {api } from '../../../variables.js'
export default {
  name: "Areas",
  data() {
    return {
      elements: {},
      fields: [
        {
          key: "_id",
           sortable: true,
          label: "Identificador",
        },
        {
          key: "name",
           sortable: true,
          label: "Nombre del área",
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
      this.$http.get(api+"/area").then(
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
