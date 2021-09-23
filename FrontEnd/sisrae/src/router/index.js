import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/public/Index.vue'
import PageNotFound from '../views/public/404.vue'
import EventsGeneral from '../views/public/events/Events.vue'
import RegisterAsistence from '../views/public/register/register.vue'
import AdminUsers from '../views/admin/users/Users.vue'
import Admin from '../views/admin/Admin.vue'
import AdminHome from '../views/admin/Home.vue'
import AdminUser from '../views/admin/users/User.vue'
import AdminEvents from '../views/admin/events/Events.vue'
import AdminEvent from '../views/admin/events/Event.vue'
//Constancy (folder constancias)
import Constancy from '../views/constancy/Constancy.vue'
import Searcher from '../views/constancy/Searcher.vue'

///Resto de rutas  - Admin -User 
 import AdminConstancies from '../views/admin/users/Constancies.vue'
 import AdminUserEvent from '../views/admin/users/Event.vue'
 import AdminUserEvents from '../views/admin/users/Events.vue'

 /// Consultas desde admin
   import Departamentos from '../views/admin/department/Departments.vue'
   import Periodos from '../views/admin/period/Periods.vue'
   import UnidadAcademica from '../views/admin/unit/Unit.vue'
   import RegistroUnidad  from '../views/admin/unit/UnitReg.vue'

  import Areas from '../views/admin/area/Areas.vue'
  import ProgramaAcademico from '../views/admin/program/Programs.vue'

// Catalagos create-regostro
import RegistroArea from '../views/admin/area/AreaReg.vue'
import RegistroDepartamento from '../views/admin/department/DepartmentReg.vue'
import RegistroPeriodo from '../views/admin/period/PeriodReg.vue'

import RegistroPA from '../views/admin/program/ProgramReg.vue'







 ///Resto de rutas  - Public
 import RegisterExternal from '../views/public/register/external.vue'
 import RegisterInternal from '../views/public/register/internal.vue'
 import RegisterQR from '../views/public/register/qr-reader.vue'

 //Resto de rutas - USER Events
 import UserEvents from '../views/user/events/Events.vue' 

 //Home user
 import UserHome from '../views/user/UserHome.vue'
 
 //User,  solicitud de constancias 
 import UserConstancy from '../views/user/constancy/Solicitud.vue' 

 //Resto de rutas - USER Register 
 import User from '../views/user/User.vue'
 import UserRegisterExternal from '../views/user/register/external.vue'
 import UserRegisterInternal from '../views/user/register/internal.vue'
 import UserRegisterQR from '../views/user/register/qr-reader.vue'
 import UserRegister from '../views/user/register/register.vue'

///Registro de catalagos

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: "*", component: PageNotFound
  },
  {
    path: '/asistencia/:code',
    name: 'RegisterAsistence',
    component: RegisterAsistence
  },

  ///Registros publicos -Cambiar nombres
  {
    path: '/asistenciaExterna',
    name: 'RegisterExternal',
    component: RegisterExternal
  },
  {
    path: '/asistenciaInterna',
    name: 'RegisterInternal',
    component: RegisterInternal
  },
  {
    path: '/asistenciaQR',
    name: 'RegisterQR',
    component: RegisterQR
  },


  //ADMIN PROFILE
  {
    path: '/admin/',
    name: 'Admin',
    component: Admin,
    children:[
    {
      path: '',
      name: 'AdminHome',
      component: AdminHome
    },
    {
      path: 'eventos',
      name: 'Events',
      component: AdminEvents
    },
    {
      path: 'evento/:id',
      name: 'Event',
      component: AdminEvent
    },
    {
      path: 'usuarios',
      name: 'Users',
      component: AdminUsers
    },
    {
      path: 'usuario/:id',
      name: 'User',
      component: AdminUser
    },
    {
      path: '',
      name: 'User',
      component: AdminUser
    },
    {
      path: 'constancias',
      name: 'Constancies',
      component: AdminConstancies
    },
    {///Hijo de la ruta admin usuario
      path: 'eventoUsuario/:id',
      name: 'EventoUsuario',
      component: AdminUserEvent
    },
    {///Hijo de la ruta admin usuario
       path: 'eventosUsuario',
       name: 'EventosUsuario',
       component: AdminUserEvents
    },    

    // {//Consulta departamento
    //   path: 'departamentos',
    //   name: 'Departamento',
    //   component: Departamentos
    // },

    {//Consulta area
      path: 'areas',
      name: 'Area',
      component: Areas
    },

    {//Consulta periodo escolar
    path: 'programas',
    name: 'ProgramaAcademico`',
    component: ProgramaAcademico
    },

     {//Consulta departamento
        path: 'departamentos',
       name: 'Departamento',
       component: Departamentos
     },

    {//Consulta unidad academica
      path: 'unidades',
      name: 'UnidadAcademica',
      component: UnidadAcademica
    },

    {//Consulta unidad academica
      path: 'registroUnidad',
      name: 'UnidadAcademica Registro',
      component: RegistroUnidad
    },

    {//Consulta periodo escolar
      path: 'periodos',
      name: 'PeriodoEscolar',
      component: Periodos
    },

    //Registro-Create Catalagos
    {//Registro area
      path: 'registroArea',
      name: 'Registro Area',
      component: RegistroArea
    },
     {//Registro departamento 
      path: 'registroDepartamento',
      name: 'Registro Departamento',
      component: RegistroDepartamento
    },

     {//Registro departamento 
      path: 'registroPeriodo',
      name: 'Registro Periodo',
      component: RegistroPeriodo
    },

     {//Registro departamento 
      path: 'registroPA',
      name: 'Registro Periodo',
      component: RegistroPA
    },    


  
  ]
  },


  //public
  {
    path: '/eventos/',
    name: 'Events',
    component: EventsGeneral,
    children:[
   ///Sin children por ahora  Eventos de carpeta publica  
  ]
  },

  //Carpeta Constancy
  {
    path: '/constancias/',
    name: 'Searcher',
    component: Searcher,
    children:[
    {
      path: 'validacion/:invoice',
      name: 'Constancy',
      component: Constancy
    },  
  ]
  },
  { ///Quiza este esta de mas porque es copia??
    path: '/validacion/:invoice',
    name: 'Constancy',
    component: Constancy
  },

  //Public 2



  //USER PERFIL
  {
    path: '/user/',
    name: 'Usuario',
    component: User,
    children:[
    {
      path: '',
      name: 'UserHome',
      component: UserHome
      }, 
    {
      path: 'registro',
      name: 'UserRegister',
      component: UserRegister
    },  
    {
      path: 'userEvents',
      name: 'UserEvents',
      component: UserEvents
    },    
    {
      path: 'registroExterno',
      name: 'ExternalRegister',
      component: UserRegisterExternal
    }, 
    {
      path: 'registroInterno',
      name: 'InternalRegister',
      component: UserRegisterInternal
    },
    {
      path: 'registroQR',
      name: 'QuickRegister',
      component: UserRegisterQR
    },
    {
      path: 'tusConstancias',
      name: 'UserConstancy',
      component: UserConstancy
      }, 
  ]
  },

  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
