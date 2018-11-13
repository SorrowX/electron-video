import * as types from './mutation-types'
import { 
	collectVideoToCache, 
	cancelCollectVideoInCache,
	addVideoRecordToCache,
	deleteVideoRecordByKeyInCache
} from './cache'
import { 
	createEmptyStorageDataFile,
	delStorageFileByName
 } from './local'

export const collectVideo = function({ commit, state }, videoData) {
	commit(types.COLLECT_VIDEO, videoData)
	collectVideoToCache(videoData)
}

export const cancelCollectVideo = function({ commit, state }, videoData) {
	commit(types.CANCEL_COLLECT_VIDEO, videoData)
	cancelCollectVideoInCache(videoData)
}

export const addVideoRecord = function({ commit, state }, videoData) {
	commit(types.ADD_VIDEO_RECORD, videoData)
	addVideoRecordToCache(videoData)
}

export const deleteVideoRecordByKey = function({ commit, state }, key) {
	commit(types.DELETE_VIDEO_RECORD_BY_KEY, key)
	deleteVideoRecordByKeyInCache(key)
}