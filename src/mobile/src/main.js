import './common/css/common.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import AlloyTouch from './common/js/lib/alloy-touch'
import AlloyFinger from './common/js/lib/alloy-finger'
import Transform from './common/js/lib/transform'

Vue.prototype.AlloyTouch = AlloyTouch
Vue.prototype.AlloyFinger = AlloyFinger
Vue.prototype.Transform = Transform

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
