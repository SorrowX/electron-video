import path from 'path'
import fu from '../../server/fu'
import { local } from '../../shared/storage'
import store from './index'
import { 
	CURRENT_STORAGE_FILE_NAME_KEY,
	QUICK_VIEW_NAV_ARR,
	STORAGE_FILE_NAMES_KEY,
	COLLECT_VIDEO_KEY,
	VIDEO_RECORD_KEY,
	WINDOW_ZOOM_FACTOR
} from '../constant/index'

const genFilePath = `${path.resolve(__dirname, '../../')}\\config\\generate\\`
const genFileSuffix = '.json'

/*
 * 创建一个存储localStorage数据的配置文件
*/
export const createStorageFile = function(fileName, stringData) {
	const file = genFilePath + fileName + genFileSuffix
	if (!fu.exist(genFilePath)) {
		fu.mkdir(genFilePath)
	}
	fu.write(file, stringData)
	return stringData
}

export const createEmptyStorageDataFile = function(fileName) {
	let data = {}
	local.forEach((key, val) => {
		if (
			key == STORAGE_FILE_NAMES_KEY ||
			key == CURRENT_STORAGE_FILE_NAME_KEY ||
			key == WINDOW_ZOOM_FACTOR
		) {
			if (WINDOW_ZOOM_FACTOR === key) {
				val = 1.2
			}
		} else if (Object.prototype.toString.call(val) === '[object Object]') {
			val = {}
		} else if (Array.isArray(val)) {
			val = []
		} else if (typeof val === 'string') {
			val = ''
		}  else if (typeof val === 'number') {
			val = 0
		}
		data[key] = val
	})

	return createStorageFile(fileName, JSON.stringify(data, null, 4))
}

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
 * 根据生成的配置文件数据重新写入localStorage和vuex存储系统中
*/
export const refreshData = function(fileName) {
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
		if (key === CURRENT_STORAGE_FILE_NAME_KEY) {
			state.curStorageFileName = val
		} else if (key === QUICK_VIEW_NAV_ARR) {
			state.quickView.navArr = val
		} else if (key === STORAGE_FILE_NAMES_KEY) {
            state.storageFileNames = val
		} else if (key === COLLECT_VIDEO_KEY) {
			state.videoCollection = val
		} else if (key === VIDEO_RECORD_KEY) {
			state.videoRecord = val
		}
	})
	store.replaceState(state)
}

const defaultStorageFileName = '默认'
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

