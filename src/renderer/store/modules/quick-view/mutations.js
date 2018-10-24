import * as types from './mutation-types'

const mutations = {
	/**
	 * 添加一个导航到navArr中
	 */
	[types.ADD_NAV_TO_NAVARR](state, navInfo) {
		let navArr = state.navArr
		navArr.push(navInfo)
	},

	/**
	 * 根据tag名删除导航
	 */
	[types.DELETE_NAV_FROM_NAVARR](state, tagName) {
		let navArr = state.navArr
		let index = navArr.findIndex(nav => nav.tag === tagName)
		if (index !== -1) {
			navArr.splice(index, 1)
		}
	},

	/**
	 * 根据tag名更新导航
	 */
	[types.UPDATE_NAV](state, newNavInfo) {
		let { oldTag, tag, videoDirPath, imgDirPath } = newNavInfo
		let navArr = state.navArr
		let index = navArr.findIndex(nav => nav.tag === newNavInfo.oldTag)
		if (index !== -1) {
			navArr.splice(index, 1)
			navArr.splice(index, 0, { tag, videoDirPath, imgDirPath })
		}
	}
}

export default mutations