import './common/css/common.css'
import './common/css/mescroll.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import AlloyTouch from './common/js/lib/alloy-touch'
import AlloyFinger from './common/js/lib/alloy-finger'
import Transform from './common/js/lib/transform'
import AlloyFingerDirective from './directives/alloy-finger-directive'

Vue.prototype.AlloyTouch = AlloyTouch
Vue.prototype.AlloyFinger = AlloyFinger
Vue.prototype.Transform = Transform

Vue.use(AlloyFingerDirective, { AlloyFinger })

Vue.config.productionTip = false

const vm = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

window.Vue = Vue
window.vm = vm
