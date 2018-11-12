import * as types from './mutation-types'
import { getTime } from '../util/index'

const mutations = {
	[types.COLLECT_VIDEO](state, videoData) {
		let videoCollection = state.videoCollection
		let i = videoCollection.findIndex((video) => {
			return video['filename'] === videoData['filename']
		})
		if (i === -1) {
			videoCollection.push(videoData)
		}
	},

	[types.CANCEL_COLLECT_VIDEO](state, videoData) {
		let videoCollection = state.videoCollection
		let i = videoCollection.findIndex((video) => {
			return video['filename'] === videoData['filename']
		})
		if (i != -1) {
			videoCollection.splice(i, 1)
		}
	},

	[types.ADD_VIDEO_RECORD](state, videoData) {
		let videoRecordSet = state.videoRecord
		let timeKey = getTime(+new Date)
		let mediaArr = videoRecordSet[timeKey] || (videoRecordSet[timeKey] = [])

		let i = mediaArr.findIndex((video) => {
			return video['filename'] === videoData['filename']
		})
		if (i != -1) {
			mediaArr.splice(i, 1)
		}
		mediaArr.unshift(videoData)
	},

	[types.DELETE_VIDEO_RECORD_BY_KEY](state, key) {
		let videoRecordSet = state.videoRecord
		
		if (videoRecordSet.hasOwnProperty(key)) {
			delete videoRecordSet[key]
		}
	},

	[types.ADD_STORAGE_FILE_NAME](state, fileName) {
		let storageFileNames = state.storageFileNames
		
		let i = storageFileNames.indexOf(fileName)
		if (i === -1) {
			storageFileNames.push(fileName)
		}
	},

	[types.DELETE_STORAGE_FILE_NAME](state, fileName) {
		let storageFileNames = state.storageFileNames
		
		let i = storageFileNames.indexOf(fileName)
		if (i != -1) {
			storageFileNames.splice(i, 1)
		}
	},

	[types.SET_CURRENT_STORAGE_FILE_NAME](state, fileName) {
		state.curStorageFileName = fileName
	}
}

export default mutations