import { local } from '@/common/js/lib/storage'
import { MY_CHANNEL_LIST, ALL_CHANNEL_LIST } from '@/common/js/constants/index'
import { addTag, removeTag } from '@/common/js/util/index'

export const setMyChannelListDataToCache = function(list) {
	return local.setItem(MY_CHANNEL_LIST, list)
}

export const getMyChannelListDataFromCache = function() {
	return local.getItem(MY_CHANNEL_LIST, [])
}

export const addTagToMyChannelListToCache = function(nav) {
	let list = addTag(local.getItem(MY_CHANNEL_LIST, []), nav)
	return local.setItem(MY_CHANNEL_LIST, list)
}

export const removeTagFromMyChannelListFromCache = function(nav) {
	let list = removeTag(local.getItem(MY_CHANNEL_LIST, []), nav)
	return local.setItem(MY_CHANNEL_LIST, list)
}

export const setAllChannelListDataToCache = function(list) {
	return local.setItem(ALL_CHANNEL_LIST, list)
}

export const getAllChannelListDataFromCache = function() {
	return local.getItem(ALL_CHANNEL_LIST, [])
}

export const addTagToAllChannelListToCache = function(nav) {
	let list = addTag(local.getItem(ALL_CHANNEL_LIST, []), nav)
	return local.setItem(ALL_CHANNEL_LIST, list)
}

export const removeTagFromAllChannelListFromCache = function(nav) {
	let list = removeTag(local.getItem(ALL_CHANNEL_LIST, []), nav)
	return local.setItem(ALL_CHANNEL_LIST, list)
}
