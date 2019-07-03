const state = {
    tinhtrang: null
}

const getters = {
    tinhtrang: state => {
        return state.tinhtrang
    }
}

const mutations = {
    tinhtrang: (state,payload) => {
        state.tinhtrang = payload
    }
}

const actions = {
    tinhtrang: ({commit}, payload) => {
        commit("tinhtrang",payload)
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}