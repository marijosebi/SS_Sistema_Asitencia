<template>
<div>
  <div style="width:70%" class="mx-auto">
   <!-- <p class="decode-result">Last result: <b>{{ result }}</b></p>-->
    <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
      <div v-show="showScanConfirmation" class="scan-confirmation">
        <img src="./../../../assets/check.png" alt="Checkmark" width="90px" height="90px" />
      </div>
    </qrcode-stream>
  </div>
   <!--  <RegIntern v-show="state" :data="assistent"> </RegIntern>-->
  </div>
</template>

<script>
//import RegIntern from '../register/register-intern.vue'
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: "Register",
  data() {
    return {
      assistent:{},
      camera: 'auto',
      result: null,
      state:false,
      showScanConfirmation: false,
    };
  },
 
  components:
  {
QrcodeStream ,
//RegIntern
  },
  methods: {
   async onInit (promise) {
      try {
        await promise
      } catch (e) {
        console.error(e)
      } finally {
        this.showScanConfirmation = this.camera === "off"
       this.result!=null?
      this.getData(this.result):
        console.log()
      }
    },
getData(url)
{
var http = require("http");
var getGitKey = function (context, callback) {
http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on("end", function() {
        console.log("DATA-------------------------------");
       // console.log(data);

        //get Name
         var n = data.search("class='nombre'");
        console.log(n)
        n+=15;
     var name=""
        while(data.charAt(n)!='<')
        {
          name=name+data.charAt(n);
          n++
        }
        this.assistent.name.name=name;
        console.log(name)
         //get Boleta
          n = data.search("class='boleta'");
        console.log(n)
        n+=41;
     var boleta=""
        while(data.charAt(n)!='<')
        {
          boleta=boleta+data.charAt(n);
          n++
        }
        this.assistent.user=boleta;
        this.assistent.type='Estudiante';
        console.log(boleta)
          //get Carrera
          n = data.search("class='carrera'");
        console.log(n)
        n+=16;
     var carrera=""
        while(data.charAt(n)!='<')
        {
          carrera=carrera+data.charAt(n);
          n++
        }
        this.assistent.carrera=carrera;
        console.log(carrera)
         //get Escuela
          n = data.search("class='escuela'");
        console.log(n)
        n+=16;
     var escuela=""
        while(data.charAt(n)!='<')
        {
          escuela=escuela+data.charAt(n);
          n++
        }
        console.log(escuela)
          this.assistent.escuela=escuela; 
        
        callback(data);
       
    });
}).on("error", function() {
    // callback(null);
});

};
getGitKey();
  
},
    async onDecode (content) {
      this.result = content

      this.pause()
      await this.timeout(500)
      this.unpause()
    },

    unpause () {
      this.camera = 'auto'
    },

    pause () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    },
  },
  created() {
  },
};
</script>
<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);

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
