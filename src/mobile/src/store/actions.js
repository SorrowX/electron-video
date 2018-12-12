import * as types from './mutation-types'
import {
	setMyChannelListDataToCache,
	addTagToMyChannelListToCache,
	removeTagFromMyChannelListFromCache,
	setAllChannelListDataToCache,
	addTagToAllChannelListToCache,
	removeTagFromAllChannelListFromCache,
} from './cache'

export const setMyChannelListData = function({ commit, state }, list) {
	commit(types.SET_MY_CHANNEL_LIST_DATA, list)
	setMyChannelListDataToCache(list)
}

export const addTagToMyChannelList = function({ commit, state }, nav) {
	commit(types.ADD_TAG_TO_MY_CHANNEL_LIST, nav)
	addTagToMyChannelListToCache(nav)
}

export const removeTagFromMyChannelList = function({ commit, state }, nav) {
	commit(types.REMOVE_TAG_FROM_MY_CHANNEL_LIST, nav)
	removeTagFromMyChannelListFromCache(nav)
}

export const setAllChannelListData = function({ commit, state }, list) {
	commit(types.SET_ALL_CHANNEL_LIST_DATA, list)
	setAllChannelListDataToCache(list)
}

export const addTagToAllChannelList = function({ commit, state }, nav) {
	commit(types.ADD_TAG_TO_All_CHANNEL_LIST, nav)
	addTagToAllChannelListToCache(nav)
}

export const removeTagFromAllChannelList = function({ commit, state }, nav) {
	commit(types.REMOVE_TAG_FROM_All_CHANNEL_LIST, nav)
	removeTagFromAllChannelListFromCache(nav)
}