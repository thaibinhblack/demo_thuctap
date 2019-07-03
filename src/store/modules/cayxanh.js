const state = {
    cayxanh: null
}

const getters = {
    cayxanh: state => {
        return state.cayxanh
    }
}

const mutations = {
    cayxanh: (state,payload) => {
        state.cayxanh = payload
    }
}

const actions = {
    cayxanh: ({commit},payload) => {
        commit("cayxanh",payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}