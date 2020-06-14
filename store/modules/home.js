const state = () => {
    menu: []
    hotPlace: []
}

const mutations = {
    setMenu(state, data) {
        state.menu = data
    },
    setHotPlace(state, data) {
        state.hotPlace = data
    }
}

const actions = {
    setMenu({ commit }, menu) {
        commit('setMenu', menu)
    },
    setHotPlace({ commit }, hotPlace) {
        commit('setHotPlace', hotPlace)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}