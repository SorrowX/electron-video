import * as types from './mutation-types'
import { addNavToNavArrInCache } from './cache'

export const addNavToNavArr = function({ commit, state }, navInfo) {
	commit(types.ADD_NAV_TO_NAVARR, navInfo)
	addNavToNavArrInCache(navInfo)
}
