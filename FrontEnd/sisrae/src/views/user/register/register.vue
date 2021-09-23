<template>
  <div>
    <div v-if="state == 'form'" class="mx-auto" style="width: 70%">
      <div class="text-left">
        <b-link href="../eventos">Eventos</b-link> / {{ element.code }}
      </div>
      <br />
      <!--  <b-card class="text-left" header="Registro de Asistencia">-->
      <b-card class="text-left" header="Evento">
        <b-row>
          <b-col
            ><label class="">Título</label>
            <b-form-input
              class="mb-2 mr-sm-2 mb-sm-0"
              v-model="element.title"
              disabled
            ></b-form-input>
          </b-col>
          <b-col
            ><label class="">Fecha</label>
            <b-form-select v-model="date.selected" class="mb-3">
              <b-form-select-option
                v-for="(date, index) in filterDates(element.schedule)"
                :key="date.index"
                :value="index"
              >
                {{ getDate(date.date) }} hrs.
              </b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>

        <br />{{ date.selected }}
        <!-- <b-row>
            <b-col>
              <label class="">Ubicación</label>
              <b-form-input
                class="mb-2 mr-sm-2 mb-sm-0"
                v-model="element.location"
                disabled
              ></b-form-input>
            </b-col>
           <b-col>
              <label class="">Área organizadora</label>
              <b-form-input
                class="mb-2 mr-sm-2 mb-sm-0"
                v-model="element.area.name"
                disabled
              ></b-form-input>
            </b-col>
          </b-row>-->
      </b-card>
      <br />
      <div v-if="!element.state.assistent">
        <h3 class="text-center">
          El registro de asistencia a este evento no se encuentra disponible.
        </h3>
      </div>

      <b-card
        v-if="element.state.assistent"
        class="text-left"
        header="Asistente"
      >
        <b-row style="width: 50%" class="mx-auto text-center">
          <b-col>
            <label class="">Soy un asistente:</label>
            <b-form-radio-group
              id="radio-group-1"
              v-model="assistent.selected"
              :options="options"
              name="radio-options"
              style="position: sticky"
            ></b-form-radio-group> </b-col
        ></b-row>
        <br />
        <div v-if="assistent.selected == 'Interno'">
          <b-form @submit.stop.prevent="register">
            <b-row v-if="!qr" style="width: 50%" class="mx-auto">
              <b-col v-if="!reg" class="text-center">
                <label>Boleta/No.Empleado</label>
                <b-form inline class="text-center" style="display: block">
                  <!--Arreglar el required-->
                  <b-form-input
                    id="user"
                    class="mb-2"
                    v-model="assistent.pk"
                    max="10"
                    required
                  ></b-form-input>

                  <b-button
                    disabled
                    variant="primary"
                    class="mb-2"
                    @click="qrShow()"
                  >
                    <b-icon icon="upc-scan" aria-label="Qr"></b-icon>
                  </b-button>
                </b-form>
              </b-col>
            </b-row>
            <div v-if="assistent.selected != null && !reg" class="text-right">
              <b-button type="submit" variant="primary">Registrar</b-button>
            </div>
          </b-form>
          <p v-if="reg">
            El No. de boleta/ No. de Empleado <b>{{ assistent.pk }}</b> no ha
            sido registrado en el sistema, favor de llenar el siguiente
            formulario.
          </p>
          <p v-if="reg">
            Nota: Una vez registrada esta información, para aceder al sistema
            deberá contactar al Departamento de Servicios Estudiantiles para la
            validación su registro.
          </p>
          <RegIntern
            v-if="reg"
            @successReg="toggledSuccess"
            @cancelEvent="toggledCancel"
            :data="{ user: assistent.pk }"
          >
          </RegIntern>
        </div>
        <div
          v-if="qr"
          class="mx-auto"
          style="background-color: black; width: 50%"
        >
          <div class="text-right">
            <b-button variant="primary" class="mb-2" @click="qrShow()">
              <b-icon icon="x" aria-label="Help"></b-icon>
            </b-button>
          </div>
          <QrReader></QrReader>
        </div>

        <!------------------------------------------------------------>

        <ExternalForm
          v-if="assistent.selected == 'Externo'"
          :data="{ event: element._id }"
          @successReg="toggledSuccess"
          @cancelEvent="toggledCancel"
        ></ExternalForm>

        <br />
      </b-card>
      <!-- </b-card>-->
    </div>
    <div
      v-if="state == 'success'"
      class="mx-auto"
      style="width: 70%; margin-top: 25px"
    >
      <b-card header="Registro">
        <img src="../../../assets/check.png" alt="Kitten" height="70" />
        <br />
        <h5 class="text-center">
          ¡<b>{{ assistent.information.name.name }}</b> tu asistencia fue
          registrada con exito!
        </h5>
      </b-card>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import QrReader from "../register/qr-reader.vue";
import { api } from "../../../variables.js";
import qs from "qs";
import axios from "axios";
import RegIntern from "../register/internal.vue";
import ExternalForm from "../register/external.vue";
export default {
  name: "Register",
  data() {
    return {
      state: "form",
      reg: false,
      date: { selected: 0 },
      element: {},
      assistent: {},
      options: ["Interno", "Externo"],
      qr: false,
    };
  },
  components: {
    RegIntern,
    QrReader,
    ExternalForm,
  },
  methods: {
    getDate(date) {
      return moment(date).format("DD/MM/YYYY HH:mm");
    },
    filterDates(obj) {
      var now=moment().format("DD/MM/YYYY");
      console.log(now)
   
      var newObj;
      obj.forEach((dt) => {
        console.log( moment(dt.date).format("DD/MM/YYYY"))
        console.log( moment(now).isSameOrAfter(moment(dt.date).format("DD/MM/YYYY")))
        moment(now)<=moment(dt.date).format("DD/MM/YYYY")?
       alert('mayor'):alert('menor')
      });
      return newObj
    },
    toggledSuccess(state, data) {
      if (state) {
        this.state = "success";
        this.assistent = data;
        console.log(data);
        console.log("onfunction");
      } else this.state = "form";
    },
    toggledCancel(state) {
      state ? (this.reg = !this.reg) : null;
    },
    qrShow() {
      this.qr = !this.qr;
    },
    to() {
      window.location.href =
        "http://localhost:8080/constancy/" +
        encodeURIComponent(this.element.invoice);
    },
    getUser() {
      axios.get(api + "user-searcher/" + this.assistent.pk).then((result) => {
        console.log(result.data);
        if (result.data.status == 200) {
          this.add(this.element._id, result.data.data[0]._id);
          this.assistent = result.data.data[0];
          this.assistent.state = false;
        } else this.reg = true;
      });
    },
    add(event, user) {
      axios
        .post(
          api + "register-assistence/",
          qs.stringify({ event: event, user: user }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((result) => {
          console.log(result.data);
          result.data.status == 200 ? (this.state = "success") : alert("Error");
          return true;
        });
    },
    register() {
      this.getUser();
    },
    getData() {
      axios
        .get(
          api + "event-searcher/" + encodeURIComponent(this.$route.params.code)
        )
        .then((result) => {
          console.log(result.data.data);
          this.element = result.data.data;
          this.filterDates(this.element.schedule)
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.card-header {
  text-align: left !important;
}
.text-right {
  text-align: right !important;
}
.text-left {
  text-align: left !important;
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
