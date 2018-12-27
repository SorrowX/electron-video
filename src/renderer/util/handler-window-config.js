// 该文件最好主进程调用

const app = require('electron').app || require('electron').remote.app
import fu from '../../file-server/fu'

const genFilePath = app.getPath('documents') + '\\AQY Files\\config\\'
const file = genFilePath + 'window.json'

export function writeWindowInfo(stringData) {
    if (!fu.exist(genFilePath)) {
        fu.mkdir(genFilePath)
    }
    fu.write(file, stringData)
}

export function getWindowInfo() {
	let result = {}
    if (!fu.exist(file)) {
        return result
    } else {
    	return JSON.parse(fu.read(file))
    }
}