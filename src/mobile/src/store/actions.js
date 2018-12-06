import * as types from './mutation-types'

export const test = function({ commit, state }, test) {
	commit(types.TEST, test)
}