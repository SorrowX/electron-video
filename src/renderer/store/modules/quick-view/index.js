import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}