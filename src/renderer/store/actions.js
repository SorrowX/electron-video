import * as types from './mutation-types'

export const switchTaskTab = function({ commit, state }, payload) {
	commit(types.SET_WINDOW_SIZE, payload)
}