import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    modules: {
        geo,
        home
    },
    actions: {
        async nuxtServerInit({ dispatch }, { req, app }) {
            const { status, data: { city, province } } = await app.$axios.get('/geo/getPosition')
            dispatch('geo/setPosition', status === 200 ? {
                province,
                city
            } : {
                province: '',
                city: ''
            })
            const { status: status2, data: { menu } } = await app.$axios.get('/geo/menu')
            dispatch('home/setMenu', status === 200 ? menu : [])
            const { status: status3, data: { result } } = await app.$axios.get('/search/hotPlace', {
                params: {
                    // city: app.store.state.geo.position.city.replace('市', '')
                    city: '广州'
                }
            })
            dispatch('home/setHotPlace', status3 === 200 ? result : [])
        }
    }
})

export default store