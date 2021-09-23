import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import {  BootstrapVueIcons } from 'bootstrap-vue'
import VueResource from 'vue-resource';

Vue.use(require('vue-moment'));
Vue.use(Vuesax)
Vue.use(BootstrapVueIcons)
Vue.use(VueResource);
Vue.config.productionTip = false
import Modal from "@burhanahmeed/vue-modal-2";

Vue.use(Modal);




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
