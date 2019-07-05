import Vue from 'vue'
import Vuex from 'vuex'
import MapModule from './store/modules/map'
import UserModule from './store/modules/user'
import TuyenDuongModule from './store/modules/tuyenduong'
import TinhTrangModule from './store/modules/tinhtrang'
import CayXanhModule from './store/modules/cayxanh'
import DashboardModule from './store/modules/dashboard'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      alert: {
        show:false,
        color: '',
        message: 'Thông báo từ alert'
      }
  },
  getters: {
    alert: state => {
      return state.alert
    }
  },
  mutations: {
    alert:  (state,payload) => {
      state.alert = payload
    },
    alertSuccessUpdate: (state) => {
      const alert = {
        show:true,
        color: 'success',
        message: 'Cập nhật thành công'
      }
      state.alert = alert
    },
    alertSuccessError: (state) => {
      const alert = {
        show:true,
        color: 'error',
        message: 'Cập nhật thất bại xin vui lòng thử lại!'
      }
      state.alert = alert
    }
  },
  actions: {
    alert: ({commit},payload) => {
      commit("alert",payload)
    },
    alertSuccessUpdate: ({commit}) => {
      commit("alertSuccessUpdate")
    },
    alertSuccessError: ({commit}) => {
      commit("alertSuccessError")
    },
  },
  modules:
  {
    MapModule,
    UserModule,
    TuyenDuongModule,
    TinhTrangModule,
    CayXanhModule,
    DashboardModule
  }
})
