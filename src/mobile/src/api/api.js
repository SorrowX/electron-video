import axios from 'axios'

let address = 'http://192.168.130.164:1314'
// let address = 'http://192.168.155.1:1314'

function getData(url) {
    return axios.get(url)
}

export const getNavListFromApi = function() {
	let url = `${address}/get_nav_list`
	return getData(url)
}

export const getVideoListByNavFromApi = function(options) {
	let { tag, num = 0, forceUpdate = false }  = options
	let url = `${address}/get_video_list_by_nav?tag=${tag}&num=${num}&forceUpdate=${forceUpdate}`
	return getData(url)
}

export const getCollectVideoListFromApi = function() {
	let url = `${address}/get_collect_video`
	return getData(url)
}

export const getVideoRecordListFromApi = function() {
	let url = `${address}/get_video_record`
	return getData(url)
}

export const getSearchListFromApi = function(options) {
	let { key, forceUpdate = false }  = options
	let url = `${address}/search?key=${key}&forceUpdate=${forceUpdate}`
	return getData(url)
}