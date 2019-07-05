const state = {
    Features: null
}       

 const getters = {
    Features: state => {
        return state.Features
    }
 }

 const mutations = {
    Features: (state,payload) => {
        state.Features = payload
    }
 }

 const actions = {
    Features: ({commit},payload) => {
        commit("Features",payload)
    }
 }

 export default {
     state,
     getters,
     mutations,
     actions
 }