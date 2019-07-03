

const state = {
    user: {
        username: '',
        password: '',
        token: ''
    }
}

const getters = {
    user: state => {
        return state.user
    },
}

const mutations = {
    user: (state, payload) => {
        state.user = payload
    },
    token: (state,payload) =>
    {
       state.token = payload
    }
}

const actions = {
    user: ({commit}, payload) => {
        commit("user",payload)
    },
    token: ({commit},payload) => {
        commit("token",payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}