import { stat } from "fs";

const state = {
    tuyenduong: null
}

const getters =  {
    tuyenduong: state => {
        return state.tuyenduong
    }
}

const mutations = {
    tuyenduong: (state,payload) => {
        state.tuyenduong = payload
    } 
}

const actions = {
    tuyenduong: ({commit},payload) => {
        commit("tuyenduong",payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}