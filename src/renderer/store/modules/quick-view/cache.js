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