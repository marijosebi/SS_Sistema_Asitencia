<template>
  <div>
    <b-card
      header="Buscar"
      header-text-variant="white"
      header-tag="header"
      header-bg-variant="info"
      style="max-width: 20rem"
    >
      <label class="sr-only">Folio</label>
      <b-form-input
        class="mb-2 mr-sm-2 mb-sm-0"
        v-model="element.invoice"
      ></b-form-input>
      <br />
      
      <b-button @click="to" variant="info">Buscar</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Searcher",
  data() {
    return {
      element: {},
    };
  },
  methods: {
    to()
    {
       window.location.href = 'http://localhost:8080/validacion/'+encodeURIComponent(this.element.invoice);
    }

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
