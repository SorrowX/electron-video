import fu from '../file-server/fu'
const app = require('electron').app || require('electron').remote.app
import { defaultWindowWidth, defaultWindowHeight } from './config'

const genFilePath = app.getPath('documents') + '\\AQY Files\\config\\'
const file = genFilePath + 'window.json'

export function writeWindowInfo(stringData) {
    if (!fu.exist(genFilePath)) {
        fu.mkdir(genFilePath)
    }
    fu.write(file, stringData)
}

export function getWindowInfo() {
	let result = { width: 0, height: 0, currentDeviceWidth: 0, currentDeviceHeight: 0 }
    if (!fu.exist(file)) {
        writeWindowInfo(JSON.stringify(result, null, 4))
        return result
    } else {
    	return JSON.parse(fu.read(file))
    }
}