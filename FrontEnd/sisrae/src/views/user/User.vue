<template>
  <div class="h-100">
    
    <b-container class="full">
      <b-row>
        <b-col cols="2" >
        <div class="side-bar">
            <b-nav
              vertical
              pills
              style="
                padding-top: 90px;
                padding-bottom: 90px;
                position: -webkit-sticky;
                position: sticky;
                top: 20px;
              "
            >
              <b-nav-item active href="/user/">
               Información de: 
                </b-nav-item>
              <b-nav-item href="/user/userEvents">Eventos
                </b-nav-item>
              <b-nav-item href="/user/tusConstancias">Constancias
                </b-nav-item>
              <b-nav-item disabled href="#foo">
                </b-nav-item>
              <hr />
              <h6>Más.,.</h6>
              <b-nav-item  href="/admin/eventos">Próximos eventos
                </b-nav-item>
            </b-nav>
          </div>
        </b-col>
        <b-col style="width: 80%">
          <!-- Call an mantein this here -->
          <div><router-view /></div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {};
  },
  methods: {},
  created() {
    
  },
};
</script>
<style scoped>
.full
{
 margin-left: -15px; margin-right: 0px; margin-top: -20px
}
.side-bar
{
  margin-top:-10px ;
          background-color: #E3E4E4;
              height: 100%;
              
}
li {
  margin-right: 0px !important;
  margin-left: 0px !important;
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
