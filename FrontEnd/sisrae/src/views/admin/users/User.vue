<template>
  <div>
    <b-card no-block>
      <b-tabs small card ref="tabs" v-model="tabIndex">
        <b-tab title="Información">
          <User :id="this.$route.params.id"> </User>
        </b-tab>
        <b-tab title="Asistencias">
          <Events :id="this.$route.params.id"> </Events>
        </b-tab>
     <b-tab title="Constancias" >  <Constancies :id="this.$route.params.id"> </Constancies> </b-tab>
      </b-tabs>
   <!--   <div class="text-right">
        <b-button-group class="mt-2">
          <b-btn v-if="tabIndex != 0" @click="$refs.tabs.previousTab()"
            >Anterior</b-btn
          >
          <b-btn @click="$refs.tabs.nextTab()">Siguiente</b-btn>
        </b-button-group>
        <br />
      </div>-->
    </b-card>

    <!-- Control buttons-->
  </div>
</template>

<script>
import jsPDF from "jspdf";
import User from "../../../components/user/User.vue";
import Events from "../users/Events.vue";
import Constancies from "../users/Constancies.vue";
export default {
  name: "UserDetailView",
  components: {
    User,
    Events,
   Constancies
  },
  data() {
    return {
      tabIndex: null,
      tabs: [],
      tabCounter: 0,
    };
  },
  methods: {
     to(id)
        {
           window.location.href = 'http://localhost:8080/user/'+id;
        },
    closeTab(x) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] === x) {
          this.tabs.splice(i, 1);
        }
      }
    },
    newTab() {
      this.tabs.push(this.tabCounter++);
    },

    exportPDF() {
      const doc = new jsPDF();

      doc.text("Hello world!", 10, 10);
      doc.save("a4.pdf");
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
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
