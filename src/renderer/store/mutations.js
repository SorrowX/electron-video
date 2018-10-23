import * as types from './mutation-types'

const mutations = {
	[types.SET_WINDOW_SIZE](state, payload) {
		state.windowSize = payload
	}
}

export default mutations