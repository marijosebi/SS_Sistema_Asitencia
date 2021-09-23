<template>
  <div>
    <b-card header="Eventos">
      <div class="text-right"></div>
      <br/>
     <Document :disabled="false" :assistent="id" :data="departments" :expedite="null">
      </Document>
        

      <br/>
      <div v-for="depa in departments" :key="depa">
        <b-card :header="depa.unit + '/' + depa.department">
          <b-table
            striped
            hover
            sticky-header
            :items="depa.events"
            :fields="fields"
          >
       <template #cell(checked)="data">
              <b-form-checkbox v-if="!data.item.blocked"
                v-model="data.item.checked"
              >
              
              </b-form-checkbox>
     
            </template>
          </b-table>
        </b-card>
        <br />
      </div>
    </b-card>
  </div>
</template>

<script>
//import jsPDF from "jspdf";
import Document from "../../../components/user/typePopUp.vue";
//import Department from "../../../components/constancy/groupEvent.vue";
import axios from "axios";
export default {
  name: "Events",
  data() {
    return {
      btn_const: true,
      state: [],
      element: {},
      departments: [],
      fields: [
        {
          key: "period.code",

          label: "Periodo",
        },
        {
          key: "title",

          label: "Evento",
        },
        {
          key: "schedule",

          label: "Fecha",
        },
        {
          key: "organizer.area.area.name",

          label: "Area",
        },

        {
          key: "checked",

          label: "",
        },
       
        
      ],
    };
  },
  computed: {
    departmentGetter: function (object, look) {
      // `this` points to the vm instance
      console.log(object[look]);
      return "m";
    },
  },
  components: {
    //   Department,
    Document,
  },
  props: {
    id: String,
  },

  methods: {
    getVariant(status) {
      var color = status ? "success" : "danger";
      return color;
    },

    rowClickHandler(record) {
      if (record.checked) {
        record.checked = !record.checked;
      }
      console.log(record.checked);
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
    filterData(obj) {
      obj.forEach((element) => {
        //Departments
        element.organizer.unit.departments.forEach((department) => {
          if (department.department._id == element.organizer.department) {
            element.organizer.department = department;
            if (department.areas.length)
              department.areas.forEach((area) => {
                if (area.area._id == element.organizer.area) {
                  element.organizer.area = area;
                  console.log(element.organizer.area);
                }
              });
            department.areas = "";
          }
        });
        element.organizer.unit.departments = "";

        //Dates
        element.schedule = this.getDate(element.schedule);
  
      });

      this.agrupate();
    },
    agrupate() {
      this.element.forEach((element) => {
        console.log(element.title);

        if (this.departments.length) {
          //Hay más de un elemento
          var flag = false;
          //segundo elemento
          this.departments.forEach((dep) => {
            console.log(dep.unit + " " + element.organizer.unit.code);
            /*   console.log('d:' )
             console.log(dep.department  )
              console.log('de:' )
                console.log(element.organizer.department.department.code  )*/
            console.log(
              dep.department +
                " " +
                element.organizer.department.department.code
            );
            if (
              dep.unit == element.organizer.unit.code &&
              dep.department == element.organizer.department.department.code
            ) {
              dep.events.push(element);
              console.log("if");
              flag = true;
            }
          });
          if (!flag) {
            var one = {
              unit: element.organizer.unit.code,
              department: element.organizer.department.department.code,
              events: [element],
            };
            this.departments.push(one);
            console.log(one);
            console.log("else");
          }
        } // primer elemento de la lista
        else {
          var doc = {
            unit: element.organizer.unit.code,
            department: element.organizer.department.department.code,
            events: [element],
          };
          this.departments.push(doc);
          // console.log(doc);
          console.log("First");
          console.log(this.departments);
        }
      });
      console.log("Dep:");
      console.log(this.departments);
    },
    getDate(obj) {
      var moment = require("moment");
      var dates = [];
      obj.forEach((element) => {
        dates.push(moment(element.date).format("DD/MM/YYYY"));
      });
      let date = dates.filter((item, index) => {
        return dates.indexOf(item) === index;
      });
      var text = "";
      for (var i = 0; i < date.length; i++) {
        text += date[i] + " ";
      }
      return text;
    },
    getData() {
      axios
        .get("http://localhost:8081/api/events/" + this.id)
        .then((result) => {
          this.element = result.data.data;
          this.filterData(this.element);
        });
      this.element.assistent = this.id;
    },
  },
  created() {
    this.getData();
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
