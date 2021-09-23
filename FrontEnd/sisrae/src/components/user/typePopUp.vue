<template>
  <div>
    <div class="text-right">

     <b-button
        v-b-modal.type-choosen
        variant="outline-primary"
        size="sm"
        :disabled="disabled"
      >
        Generar Constancia
      </b-button>

    </div>

    <b-modal
      id="type-choosen"
      ref="modal"
      title="Generar Constancia"
      subtitle="Tipo de constancia"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Seleccione una opción"
          label-for="pass-input-1"
          invalid-feedback="Campo requerido"
        >
          <b-form-radio-group
            id="radio-group-2"
            v-model="selected"
            buttons
            button-variant="outline-primary"
          >
            <b-form-radio
              v-model="selected"
              name="some-radios"
              value="0"
              @click="errors(selected)"
              >General</b-form-radio
            >
            <b-form-radio v-model="selected" name="some-radios" value="1"
              >Detallada</b-form-radio
            >
          </b-form-radio-group>
        </b-form-group>
      </b-form>
      <p>{{ selectedDescript }}</p>
      <div v-if="error.state">
        <p>
          <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
          {{ error.mssg }}
        </p>
      </div>
    </b-modal>
    <b-modal
      id="confirmations"
      ref="modal-confirmations"
      title="Constancia"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk2"
      @close="handleOk2"
      
    >
      <p>Constancia(s) generada(s) con éxito</p>
      <div v-for="c in constancias" :key="c">
        <b-icon icon="check-circle-fill" variant="success"></b-icon>
      <a :href="'http://localhost:8080/constancy/'+encodeURIComponent(c.id)" target="_blank">{{c.id}}</a>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import moment from "moment";
export default {
  name: "Constancy-Creator",
  data: function () {
    return {
      options: ["General", "Detallada"],
      selected: null,
      description: [
        "Incluirá unicamente horas totales de participación",
        "Mostrará a detalle la información de cada evento al que se asistio.",
      ],
      trigger: false,
      element: {},
      error: {
        state: false,
        mssg: "Campo Obligatorio",
      },
      constancias: [],
      last: "",
    };
  },

  props: {
    id: String,
    disabled: Boolean,
    assistent: String,
    expedite: String,
    data: Array,
  },
  computed: {
    selectedDescript: function () {
      return this.description[this.selected];
    },
  },
  methods: {
    errors(e) {
      this.error.state = e;
    },
    async filterEvents() {
      var departments = [];
      this.data.forEach((department) => {
        var events = [];
        department.events.forEach((event) => {
          if (event.checked) {
            events.push(event._id);
          }
        });

        if (events.length)
          departments.push({
            events: events,
            code: department.unit + "/" + department.department,
          });
      });

      //For each department a constance
      var moment = require("moment");
      departments.forEach(async (depa) => {
        var data = {
          date: moment().format("YYYY/MM/YY h:mm:ss a"),
          events: depa.events,
          assistent: this.assistent,
          type: this.selected,
          invoice: await this.getInvoice(depa.code),
        };
        if (this.expedite) data.expedite = this.expedite;
        await this.create(data);
      });
    },
    async getInvoice(code) {
      var numeral = require("numeral");
      var year = moment().format("YYYY");
      await this.getLast(code, year);

      return code + "/" + numeral(this.last + 1).format("0000") + "/" + year;
    },
    resetModal() {
      this.selected = "";
      this.state = false;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleOk2(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      this.$nextTick(() => {
        this.$bvModal.hide("confirmations");
      });

      this.$router.go();
    },
    async create(data) {
      await axios
        .post("http://localhost:8081/api/constancy", qs.stringify(data), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(
          (response) => {
            if (response.status == 200)
              var res = {
                status: true,
                mssg: response.data.message,
                id: response.data.data.invoice,
              };
              this.constancias.push(res)
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    async getLast(code, year) {
      var data = {
        code: code,
        year: year,
      };

      await axios
        .post("http://localhost:8081/api/c-last/", qs.stringify(data), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(
          (response) => {
            this.last = response.data;
          },
          (error) => {
            console.log(error);
          }
        );
    },
    /* handleOk() {
  this.$bvModal.hide("confirmations")
    },*/
    handleSubmit() {
      if (!this.selected) {
        this.error.state = true;
      } else {
        this.filterEvents();

        this.$nextTick(() => {
          this.$bvModal.hide("type-choosen");
        });

        this.$bvModal.show("confirmations");
      }
    },
    to(id) {
      window.location.href = "http://localhost:8082/constancy/" + id;
    },
  },
};
</script>