import * as types from './mutation-types'
import { 
	addNavToNavArrInCache, 
	deleteNavFromNavArrInCache,
	updateNavInCache
} from './cache'

export const addNavToNavArr = function({ commit, state }, navInfo) {
	commit(types.ADD_NAV_TO_NAVARR, navInfo)
	addNavToNavArrInCache(navInfo)
}

export const deleteNavFromNavArr = function({ commit, state }, tagName) {
	commit(types.DELETE_NAV_FROM_NAVARR, tagName)
	deleteNavFromNavArrInCache(tagName)
}

export const updateNav = function({ commit, state }, newNavInfo) {
	commit(types.UPDATE_NAV, newNavInfo)
	updateNavInCache(newNavInfo)
}
