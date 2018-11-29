import Vue from 'vue'
import Vonic from 'vonic'
import routes from './router/index'
import store from './store/index'
import './util/flexible'

Vue.use(Vonic.app, {
    routes,
    store
})
