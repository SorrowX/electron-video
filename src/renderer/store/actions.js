import * as types from './mutation-types'
import { collectVideoToCache, cancelCollectVideoInCache } from './cache'

export const collectVideo = function({ commit, state }, videoData) {
	commit(types.COLLECT_VIDEO, videoData)
	collectVideoToCache(videoData)
}

export const cancelCollectVideo = function({ commit, state }, videoData) {
	commit(types.CANCEL_COLLECT_VIDEO, videoData)
	cancelCollectVideoInCache(videoData)
}