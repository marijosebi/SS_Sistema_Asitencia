<template>
  <div>
      <div class="text-right">
    <b-button v-b-modal.modal-prevent-closing variant="outline-primary" size="sm">Cambiar contraseña</b-button></div>
   
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Cambiar contraseña"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Nueva contraseña"
          label-for="pass-input-1"
          invalid-feedback="Campo requerido"
      
        >
          <b-form-input
            id="pass-input-1"
            v-model="pass"
            :state="passState[0]"
            required
            type='password'
            
            
          ></b-form-input>
          
        </b-form-group>
        <b-form-group
          label="Confirmar contraseña"
          label-for="pass-input"
          invalid-feedback="Campo requerido"
        
        >
          <b-form-input
            id="pass-input-2"
            v-model="confirmpass"
            :state="passState[1]"
            required
            type='password'
          ></b-form-input>
          
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
  export default {
    data() {
      return {
        pass:  '',
        confirmpass:'',
        passState: [null,null],
        submittedNames: ['1','2']
      }
    },
    props:
    {
        id:String
    },
    methods: {
        changePass() {
     axios.put("http://localhost:8081/api/changepass/"+this.id,  'pass='+this.pass,{
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
  }
})
        

    },
      checkFormValidity() {
       /* if(this.pass[0]==this.pass[1])
        this.passState=[true,true]*/
        return true
      },
      resetModal() {
        this.pass = ''
        this.passState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
         console.log("Aqui va la petición")
        }
        this.changePass();
        // Push the pass to submitted passs
        this.submittedNames.push(this.pass)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
  }
</script>