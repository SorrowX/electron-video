import * as types from './mutation-types'
import { getTime } from '../util/index'

const mutations = {
	[types.COLLECT_VIDEO](state, videoData) {
		let videoCollection = state.videoCollection
		let i = videoCollection.findIndex((video) => {
			return video['filename'] === videoData['filename']
		})
		if (i === -1) {
			videoCollection.unshift(videoData)
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

	[types.ADD_SEARCH_KEY](state, searchKey) {
		let searchRecord = state.searchRecord
		let i = searchRecord.findIndex((key) => {
			return key === searchKey
		})
		if (i != -1) {
			searchRecord.splice(i, 1)
		}

		searchRecord.unshift(searchKey)
	},

	[types.CLEAR_SEARCH_RECORD](state) {
		state.searchRecord = []
	}
}

export default mutations