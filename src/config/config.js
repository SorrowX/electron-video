import { getWindowInfo } from '../renderer/util/handler-window-config'
const winSize = getWindowInfo()
export const defaultWindowWidth = 1150
export const defaultWindowHeight = 660

let windowInfo = {
	windowWidth: winSize.width || defaultWindowWidth,
	windowHeight: winSize.height || defaultWindowHeight,
	minWindowWidth: defaultWindowWidth,
	minWindowHeight: defaultWindowHeight,
	isOpenDevTools: false,
	developScaleFactor: 1.2,
	productionScaleFactor: 1.32
}

export default windowInfo