import Vue from 'vue'
import Router from 'vue-router'
import MapView from './views/MapView'
import Login from './views/Login'
import Media from '@/components/map/widget/MediaFeature'
import PageSystem from './views/PageSystem'
import Dashboard from '@/components/quanly/Dashboard'
import Users from './views/Users'
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
    },
    {
      path: '/quanly/',
      component: PageSystem,
      children: [
        {
          path: 'dashboard',
          component: Dashboard
        },
        {
          path: 'users',
          component: Users
        }
      ]

    }
  ]
})
