import Vue from 'vue'
import Vonic from 'vonic'
import routes from './router/index'
import store from './store/index'

Vue.use(Vonic.app, {
    routes,
    store
})
