import * as types from './mutation-types'

const mutations = {
	/**
	 * 添加一个导航到navArr中
	 */
	[types.ADD_NAV_TO_NAVARR](state, navInfo) {
		let navArr = state.navArr
		let i = navArr.find((obj) => {
			return obj.tag === navInfo.tag
		})
		if (!i) {
			navArr.unshift(navInfo)
		}
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
	},

	/**
	 * 根据oldIdx找到nav然后更新到newIdx位置
	 */
	[types.UPDATE_NAV_BY_INDEX](state, { oldIdx, newIdx }) {
		let navArr = state.navArr
		if (newIdx < 0 || newIdx > navArr.length - 1) return
		let nav = navArr.splice(oldIdx, 1)
	    navArr.splice(newIdx, 0, nav[0])
	}
}

export default mutations