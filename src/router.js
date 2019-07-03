import Vue from 'vue'
import Router from 'vue-router'
import MapView from './views/MapView'
import Login from './views/Login'
import Media from '@/components/map/widget/MediaFeature'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MapView
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/media',
      component: Media
    }
  ]
})
