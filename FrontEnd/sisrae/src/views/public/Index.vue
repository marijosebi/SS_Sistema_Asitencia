<template>
  <div class="home">
    <b-card
      overlay
      img-src="../../assets/portada.jpg"
      img-alt="Card Image"
      text-variant="white"
      style="
    padding: 0px;"
    >
      <b-container >
        <b-row align-v="stretch" > 
          <b-col cols="9"></b-col>
          <b-col>
            <h1>Link de prueba</h1>

            <h2>Publicos</h2>

            <b-row align-v="stretch">
              <b-col >
                <b-link href="/eventos">
                  <div>
                    Eventos
                  </div>
                </b-link>
              </b-col>
            </b-row>

            <b-row>
              <b-col >
                <b-link href="/constancia/buscador">
                  <div>
                    Constancias
                  </div></b-link>
              </b-col >
            </b-row>


            <b-row>
              <b-col>
               <h4>Administrador</h4>
              </b-col>
            </b-row>   

            <b-row>
              <b-col>
                <b-link href="/admin">
                  <div>
                    AdminHome
                  </div></b-link>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-link href="/admin/usuarios">
                  <div>
                    Vista-Admin : Usuarios
                  </div></b-link>
              </b-col>
            </b-row> 

            <b-row>
              <b-col>
                <b-link href="/admin/constancias">
                  <div>
                    Vista-Admin : Constancias
                  </div></b-link>
              </b-col>
            </b-row>  

            <b-row>
              <b-col>
                <b-link href="/admin/eventos">
                  <div>
                    Vista-Admin : Eventos
                  </div></b-link>
              </b-col>
            </b-row> 
          
            <b-row>
              <b-col>
                <b-link href="/admin/evento/1">
                  <div>
                    Vista-Admin : Evento Id:1
                  </div></b-link>
              </b-col>
            </b-row> 

            <b-row>
              <b-col>
                <b-link href="/admin/usuario/1">
                  <div>
                    Vista-Admin : Info de usuario 1
                  </div></b-link>
              </b-col>
            </b-row>
           
            <b-row>
              <b-col>
                <b-link href="/admin/eventoUsuario/1">
                  <div>
                    Vista-Admin :Eventos 1 de usuario 1
                  </div></b-link>
              </b-col>
            </b-row>   

             <b-row>
              <b-col>
                <b-link href="/admin/eventosUsuario">
                  <div>
                    Vista-Admin :Eventos de usuario 1
                  </div></b-link>
              </b-col>
            </b-row>   

              <b-row>
              <b-col>
               <h4>Publicas</h4>
              </b-col>
            </b-row> 

            <b-row>
              <b-col>
                <b-link href="/asistencia/1">
                  <div>
                    Publico - Asistencia de 1
                  </div></b-link>
              </b-col>
            </b-row>   
          
            <b-row>
              <b-col>
                <b-link href="/asistenciaExterna">
                  <div>
                    Publico - Reg. Asistencia Externa
                  </div></b-link>
              </b-col>
            </b-row> 

            <b-row>
              <b-col>
                <b-link href="/asistenciaInterna">
                  <div>
                    Publico - Reg. Asistencia Interna
                  </div></b-link>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-link href="/asistenciaQR">
                  <div>
                    Publico - Reg. Asistencia QR
                  </div></b-link>
              </b-col>
            </b-row>  


              <b-row>
              <b-col>
               <h4>Usuario</h4>
              </b-col>
            </b-row>

             <b-row>
              <b-col>
                <b-link href="/user">
                  <div>
                    Usuario HomePage 
                  </div></b-link>
              </b-col>
            </b-row>
        
           <b-row>
              <b-col>
                <b-link href="/user/registro">
                  <div>
                    Usuario - Registro 
                  </div></b-link>
              </b-col>
            </b-row>

             <b-row>
              <b-col>
                <b-link href="/user/userEvents">
                  <div>
                    Usuario - Events 
                  </div></b-link>
              </b-col>
            </b-row> 
            
            <b-row>
              <b-col>
                <b-link href="/user/registroExterno">
                  <div>
                    Usuario - Registro externo
                  </div></b-link>
              </b-col>
            </b-row>

             <b-row>
              <b-col>
                <b-link href="/user/registroInterno">
                  <div>
                    Usuario - Registro Interno
                  </div></b-link>
              </b-col>
            </b-row>    

            <b-row>
              <b-col>
                <b-link href="/user/registroQR">
                  <div>
                    Usuario - Registro QR
                  </div></b-link>
              </b-col>
            </b-row>          

          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Index",
  components: {},
};
</script>
