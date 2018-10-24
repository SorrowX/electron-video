import { local } from '../../../../shared/storage'
import { QUICK_VIEW_NAV_ARR } from '../../../constant/index'

/**
 * 载入缓存中 快速查看的导航信息
 */
export function localNavArrInfo() {
	return local.getItem(QUICK_VIEW_NAV_ARR, [])
}

/**
 * 添加一个导航到 快速查看的导航信息中
 * params
 *   navInfo { Object } 导航信息
 */
export function addNavToNavArrInCache(navInfo) {
	let navArr = localNavArrInfo()
	navArr.push(navInfo)
	return local.setItem(QUICK_VIEW_NAV_ARR, navArr)
}

/**
 * 根据tag名删除导航
 * params
 *   tagName { String } 导航名
 */
export function deleteNavFromNavArrInCache(tagName) {
	let navArr = localNavArrInfo()
	let index = navArr.findIndex(nav => nav.tag === tagName)
	if (index !== -1) {
		navArr.splice(index, 1)
	}
	return local.setItem(QUICK_VIEW_NAV_ARR, navArr)
}

/**
 * 根据tag名删除导航
 * params
 *   newNavInfo { Object } 导航信息
 */
export function updateNavInCache(newNavInfo) {
	let { oldTag, tag, videoDirPath, imgDirPath } = newNavInfo
	let navArr = localNavArrInfo()
	let index = navArr.findIndex(nav => nav.tag === newNavInfo.oldTag)
	if (index !== -1) {
		navArr.splice(index, 1)
		navArr.splice(index, 0, { tag, videoDirPath, imgDirPath })
	}
	return local.setItem(QUICK_VIEW_NAV_ARR, navArr)
}