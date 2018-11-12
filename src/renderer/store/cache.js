import { local } from '../../shared/storage'
import { getTime } from '../util/index'
import { 
	COLLECT_VIDEO_KEY,
	VIDEO_RECORD_KEY,
	STORAGE_FILE_NAMES_KEY,
	CURRENT_STORAGE_FILE_NAME_KEY
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

export const getStorageFileNameInCache = function() {
	return local.getItem(STORAGE_FILE_NAMES_KEY, [])
}

export const addStorageFileNameToCache = function(fileName) {
	let storageFileNames = getStorageFileNameInCache()
	
	let i = storageFileNames.indexOf(fileName)
	if (i === -1) {
		storageFileNames.push(fileName)
	}
	
	return local.setItem(STORAGE_FILE_NAMES_KEY, storageFileNames)
}

export const deleteStorageFileNameFromCache = function(fileName) {
	let storageFileNames = getStorageFileNameInCache()
	
	let i = storageFileNames.indexOf(fileName)
	if (i != -1) {
		storageFileNames.splice(i, 1)
	}
	
	return local.setItem(STORAGE_FILE_NAMES_KEY, storageFileNames)
}

export const getCurStorageFileNameInCache = function() {
	return local.getItem(CURRENT_STORAGE_FILE_NAME_KEY, '')
}

export const setCurStorageFileNameToCache = function(fileName) {
	return local.setItem(CURRENT_STORAGE_FILE_NAME_KEY, fileName)
}