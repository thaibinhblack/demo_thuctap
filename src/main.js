import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VueSesion from 'vue-session'
import Lightbox from 'vue-easy-lightbox'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'


import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'
Vue.config.productionTip = false
Vue.use(axios)
Vue.use(VueSesion)
Vue.use(Lightbox)
Vue.use(VueSidebarMenu)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
