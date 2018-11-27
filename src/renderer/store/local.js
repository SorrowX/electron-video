import path from 'path'
import fu from '../../file-server/fu'
import { local } from '../../shared/storage'
import { getDocumentGenFileDir } from '../../shared/util'
import store from './index'
import { 
	QUICK_VIEW_NAV_ARR,
	COLLECT_VIDEO_KEY,
	VIDEO_RECORD_KEY,
	WINDOW_ZOOM_FACTOR
} from '../constant/index'

const app = require('electron').remote.app
const genFilePath = app.getPath('documents') + '\\AQY Files\\storage\\'
const genFileSuffix = '.json'
const defaultStorageFileName = '默认'

/*
 * 创建一个存储localStorage数据的配置文件
 * @params
 *     fileName { String } 文件名
 *     stringData { String } json字符串数据
 * @return
 *     返回 json字符串数据
*/
export const createStorageFile = function(fileName, stringData) {
	const file = genFilePath + fileName + genFileSuffix
	if (!fu.exist(genFilePath)) {
		fu.mkdir(genFilePath)
	}
	fu.write(file, stringData)
	return stringData
}

/*
 * 创建一个空数据的配置文件
 * @params
 *     fileName { String } 文件名
 * @return
 *     返回 空数据的json字符串数据
*/
export const createEmptyStorageDataFile = function(fileName) {
	let data = {}
	local.forEach((key, val) => {
		if (Object.prototype.toString.call(val) === '[object Object]') {
			val = {}
		} else if (Array.isArray(val)) {
			val = []
		} else if (typeof val === 'string') {
			val = ''
		}  else if (typeof val === 'number') {
			val = 0
		}
		if (WINDOW_ZOOM_FACTOR === key) {
			val = 1.2
		}
		data[key] = val
	})

	return createStorageFile(fileName, JSON.stringify(data, null, 4))
}

/*
 * 创建一个含有localStorage数据的配置文件
 * @params
 *     fileName { String } 文件名
 * @return
 *     返回 含有localStorage数据的json字符串数据
*/
export const createLocalStorageDataFile = function(fileName) {
	return createStorageFile(fileName, JSON.stringify(local.getAll(), null, 4))
}


function forEachObjData(obj, callback) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			callback(key, obj[key])
		}
	}
}

/*
 * 刷新 localStorage 和 vuex存储系统中 的数据 根据存储文件中的数据
 * @params 
 *     fileName { String } 文件名
 * @return
 *     返回 undefined
*/
export const refreshData = function(fileName) {
	fileName = fileName || defaultStorageFileName
	const file = genFilePath + fileName + genFileSuffix
	let newData
	if (!fu.exist(file)) {
		newData = JSON.parse(createEmptyStorageDataFile(fileName))
	} else {
		newData = JSON.parse(fu.read(file))
	}

	// 更新 localStorage 中的数据
	forEachObjData(newData, (key, val) => {
		local.setItem(key, val)
	})

	// 更新 vuex 存储系统的数据
	let state = { quickView: {} }
	forEachObjData(newData, (key, val) => {
		if (key === QUICK_VIEW_NAV_ARR) {
			state.quickView.navArr = val
		} else if (key === COLLECT_VIDEO_KEY) {
			state.videoCollection = val
		} else if (key === VIDEO_RECORD_KEY) {
			state.videoRecord = val
		}
	})
	store.replaceState(state)
}

/*
 * 根据文件名删除已存储的文件
 * @params 
 *     fileName { String } 文件名
 * @return
 *     返回 undefined
*/
export const delStorageFileByName = function(fileName) {
	const file = genFilePath + fileName + genFileSuffix
	if (fu.exist(file)) {
		if (store.state.curStorageFileName === fileName) {
			createEmptyStorageDataFile(defaultStorageFileName)
			refreshData(defaultStorageFileName)
			fu.delete(file)
		} else {
			fu.delete(file)
		}
	}
}

/*
 * 获取已经生成好的存储文件名的集合
 * @return
 *     返回 Array ['文件名']
*/
export const getStorageFileNames = function() {
	let ret = []
	fu.each(genFilePath, function(item) {
	    ret.push(item['filename'])
	})
	return ret
}

