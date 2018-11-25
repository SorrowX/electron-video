import { local } from '../../shared/storage'
import { getTime } from '../util/index'
import { 
	COLLECT_VIDEO_KEY,
	VIDEO_RECORD_KEY,
	SEARCH_RECORD_ARR
} from '../constant/index'

export const getCollectVideoFromCache = function() {
	return local.getItem(COLLECT_VIDEO_KEY, [])
}

export const collectVideoToCache = function(videoData) {
	let videoCollection = local.getItem(COLLECT_VIDEO_KEY, [])
	let i = videoCollection.findIndex((video) => {
		return video['filename'] === videoData['filename']
	})
	if (i === -1) {
		videoCollection.push(videoData)
	}
	return local.setItem(COLLECT_VIDEO_KEY, videoCollection)
}

export const cancelCollectVideoInCache = function(videoData) {
	let videoCollection = local.getItem(COLLECT_VIDEO_KEY, [])
	let i = videoCollection.findIndex((video) => {
		return video['filename'] === videoData['filename']
	})
	if (i != -1) {
		videoCollection.splice(i, 1)
	}
	return local.setItem(COLLECT_VIDEO_KEY, videoCollection)
}

export const getVideoRecordFromCache = function() {
	return local.getItem(VIDEO_RECORD_KEY, {})
}

export const addVideoRecordToCache = function(videoData) {
	let videoRecordSet = getVideoRecordFromCache()
	let timeKey = getTime(+new Date)
	let mediaArr = videoRecordSet[timeKey] || (videoRecordSet[timeKey] = [])

	let i = mediaArr.findIndex((video) => {
		return video['filename'] === videoData['filename']
	})
	if (i != -1) {
		mediaArr.splice(i, 1)
	}
	mediaArr.unshift(videoData)
	return local.setItem(VIDEO_RECORD_KEY, videoRecordSet)
}

export const deleteVideoRecordByKeyInCache = function(key) {
	let videoRecordSet = getVideoRecordFromCache()

	if (videoRecordSet.hasOwnProperty(key)) {
		delete videoRecordSet[key]
	}
	return local.setItem(VIDEO_RECORD_KEY, videoRecordSet)
}

export const getSearchRecordFromCache = function() {
	return local.getItem(SEARCH_RECORD_ARR, [])
}

export const addSearchKeyToCache = function(searchKey) {
	let searchRecord = getSearchRecordFromCache()
	let i = searchRecord.findIndex((key) => {
		return key === searchKey
	})
	if (i != -1) {
		searchRecord.splice(i, 1)
	}
	searchRecord.unshift(searchKey)

	return local.setItem(SEARCH_RECORD_ARR, searchRecord)
}

export const clearSearchRecordInCache = function() {
	return local.setItem(SEARCH_RECORD_ARR, [])
}