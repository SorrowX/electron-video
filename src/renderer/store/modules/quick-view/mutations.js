import * as types from './mutation-types'

const mutations = {
	/**
	 * 添加一个导航到navArr中
	 */
	[types.ADD_NAV_TO_NAVARR](state, navInfo) {
		let navArr = state.navArr
		navArr.push(navInfo)
	}
}

export default mutations