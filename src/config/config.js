export const defaultWindowWidth = 1150
export const defaultWindowHeight = 660
export const deviceWidth = 1920
export const deviceHeight = 1080

export default {
	windowWidth: defaultWindowWidth,
	windowHeight: defaultWindowHeight,
	minWindowWidth: defaultWindowWidth,
	minWindowHeight: defaultWindowHeight,
	ratioWidth: defaultWindowWidth / deviceWidth,
	ratioHeight: defaultWindowHeight / deviceHeight,
	deviceWidth,
	deviceHeight,
	defaultWindowWidth,
	defaultWindowHeight,
	isOpenDevTools: false,
	developScaleFactor: 1.2,
	productionScaleFactor: 1.32
}