import { local } from '../../shared/storage'
import { COLLECT_VIDEO_KEY } from '../constant/index'

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