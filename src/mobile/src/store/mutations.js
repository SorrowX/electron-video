import * as types from './mutation-types'
import { addTag, removeTag } from '@/common/js/util/index'

const mutations = {
	[types.SET_MY_CHANNEL_LIST_DATA](state, list) {
		if (Array.isArray(list)) {
			state.myChannelList = list
		}
	},
	[types.ADD_TAG_TO_MY_CHANNEL_LIST](state, nav) {
    	addTag(state.myChannelList, nav)
	},
	[types.REMOVE_TAG_FROM_MY_CHANNEL_LIST](state, nav) {
		removeTag(state.myChannelList, nav)
	},
	[types.SET_ALL_CHANNEL_LIST_DATA](state, list) {
		if (Array.isArray(list)) {
			state.allChannelList = list
		}
	},
	[types.ADD_TAG_TO_All_CHANNEL_LIST](state, nav) {
		addTag(state.allChannelList, nav)
	},
	[types.REMOVE_TAG_FROM_All_CHANNEL_LIST](state, nav) {
		removeTag(state.allChannelList, nav)
	}
}

export default mutations