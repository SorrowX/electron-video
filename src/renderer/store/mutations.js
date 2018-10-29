import * as types from './mutation-types'

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
	}
}

export default mutations